/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-else-return */
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Progress, Button, Modal, Tooltip } from 'antd'

import { ScheduleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import Countdown from 'react-countdown'
import { useWeb3React } from '@web3-react/core'
import { ADDRESS_USD } from 'config/constants'
import { useContract } from 'hooks/useContract'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import addNotify from 'components/Notify/addNotify'
import ModalClaimedAfter from './ModalClaimedAfter/ModalClaimedAfter'
import ModalDisClaimer from './ModalDisClaimer'
import { useHookDetail } from './Store-Detail'
import {
  _approveBUSD,
  _isRefundedRC,
  _totalClaimed,
  _refund,
  _claimTokens,
  _showClaimBtn,
  _isClaimed,
  _joinPoolNew,
  _isJoined,
} from './utils'
import abiBUSD from './abiBUSD.json'
import abiJoinPool from './abiJoinPoolNew.json'
import abiClaimOneButton from './abiClaimOneButton.json'
import { STATUS } from '../LaunchpadV3/index.d'
import { useIdoTokenClaimContract } from '../../hooks/useContract'
import { totalDailyClaimed } from '../LaunchpadDetail/components/YourInvestment/utils'

const ItemIdo = ({ x, network }) => {
  const [state, actions]: any = useHookDetail()
  const { isShowDisClaimer } = state
  const [isLoading, setIsLoading] = useState(false)
  const { account, chainId }: any = useWeb3React()
  const [isClaimed, setIsClaimed] = useState(false)
  const [isShowClaim, setIsShowClaim] = useState(false)
  const [isJoined, setIsJoined] = useState(false)
  const [totalClaimed, setTotalClaimed] = useState(0)
  const [isLoadingRefund, setLoadingRefund] = useState(false)
  const [isRefundedRC, setRefundedFromSC] = useState(false)
  const [isApproveJoin, setApproveJoin] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [totalClaimDaily, setTotalClaimDaily] = useState(0)
  const [disnableJoin, setDisnableJoin] = useState(false)

  const busdContract = useContract(ADDRESS_USD[chainId], abiBUSD)
  const scClaimAddress = x.allocation && x.allocation.claimContract
  const claimContract = useContract(scClaimAddress, abiClaimOneButton)
  const scJoinAddress = x.allocation && x.allocation.joinContract
  console.log('scJoinAddress',scJoinAddress);
  const joinPoolContract = useContract(scJoinAddress, abiJoinPool)

  const daily_obj = x.allocation && x.allocation.claimbles.find((f) => f.claimRound === 100)
  const contract_daily = daily_obj !== undefined && daily_obj !== null ? daily_obj.contractAddress : ''
  const idoTokenClaimDailyContract = useIdoTokenClaimContract(contract_daily, daily_obj)

  const is_allow_joinpool = x.allocation && x.allocation.joinSignBusd !== null && x.status === 3

  useEffect(() => {
    try {
      if (idoTokenClaimDailyContract !== null) {
        totalDailyClaimed(idoTokenClaimDailyContract, account).then((res) => {
          setTotalClaimDaily(res.tokensClaimed / 1e18)
        })
      }
    } catch (error) {
      // TODO
    }
  }, [account, idoTokenClaimDailyContract])

  useEffect(() => {
    if (account) {
      if (claimContract !== null) {
        _isClaimed(claimContract, account).then((result) => {
          setIsClaimed(result)
        })
        _totalClaimed(claimContract, account).then((res) => {
          setTotalClaimed(res)
        })
        _isRefundedRC(claimContract, account).then((res) => {
          setRefundedFromSC(res)
        })
      }
      if (x.allocation && x.allocation.joinStatus === 2) {
        setIsJoined(true)
      } else if (joinPoolContract !== null) {
        _isJoined(joinPoolContract, account, x.id, x.id).then((res) => {
          setIsJoined(res)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, claimContract, x.allocation && x.allocation.joinStatus, joinPoolContract])

  useEffect(() => {
    if ((x.allocation && x.allocation.joinStatus === 2) || isJoined) {
      setApproveJoin(true)
    } else if (busdContract && scJoinAddress) {
      busdContract.allowance(account, scJoinAddress).then((res) => {
        if (res.toString() / 1e18 > 0) {
          setApproveJoin(true)
        } else {
          setApproveJoin(false)
        }
      })
    }
  }, [busdContract, x.allocation && x.allocation.joinStatus, isJoined, scJoinAddress, account])

  useEffect(() => {
    if (account && x.allocation && x.allocation.claimbles[0] && !x.showPopupClaim) {
      _showClaimBtn(claimContract, account, x.allocation.claimbles[0].claimToken).then((res) => {
        setIsShowClaim(res)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, x.allocation])

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const _approveJoinPool = async () => {
    setIsLoading(true)
    await _approveBUSD(busdContract, x.allocation.joinContract, x.allocation.joinBusd)
      .then((res) => {
        if (res.hash !== null) {
          setTimeout(() => {
            setIsLoading(false)
            setApproveJoin(true)
            if (!is_allow_joinpool) setDisnableJoin(true)
          }, 10000)
        } else {
          setIsLoading(false)
        }
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }

  // HANDLE CLICK JOIN POOL
  const _handleJoinPool = async (idoId) => {
    if (!busdContract) {
      return
    }
    const amtJoin = x.allocation.joinBusd
    const balance = await busdContract.balanceOf(account)
    if (balance.toString() < amtJoin) {
      store.addNotification(addNotify('Not enough balance!', 'danger'))
      return
    }
    if (is_network_bep && chainId !== 56) {
      store.addNotification(addNotify('Please select network BSC', 'danger'))
      return
    }
    if (is_network_erc && chainId !== 1) {
      store.addNotification(addNotify('Please select network Ethereum', 'danger'))
      return
    }
    if (is_network_poly && chainId !== 137) {
      store.addNotification(addNotify('Please select network Polygon', 'danger'))
      return
    }
    setIsLoading(true)

    await _joinPoolNew(joinPoolContract, amtJoin, idoId, x.allocation.joinSignBusd, chainId)
      .then((res) => {
        if (res.hash !== null) {
          setTimeout(() => {
            setIsLoading(false)
            setIsJoined(true)
          }, 15000)
        } else {
          setIsLoading(false)
        }
      })
      .catch((error) => {
        store.addNotification(addNotify(error.data.message, 'warning'))
        setIsLoading(false)
      })
  }

  const _handleRefund = async () => {
    try {
      setLoadingRefund(true)
      await _refund(claimContract, x.allocation.joinBusd, x.allocation.claimbles[0])
      setTimeout(() => {
        setLoadingRefund(false)
        setRefundedFromSC(true)
      }, 15000)
      return true
    } catch (error) {
      setLoadingRefund(false)
      if (error.data) {
        store.addNotification(addNotify(error.data.message, 'warning'))
      }
      return false
    }
  }

  const _handleClaim = async () => {
    if (x.showPopupClaim) {
      actions.changeOpenModalClaim(x.id)
      return
    }
    if (x.allocation.claimbles[0]) {
      try {
        setIsLoading(true)
        await _claimTokens(claimContract, x.allocation.claimbles[0])
        setTimeout(() => {
          setIsLoading(false)
          setIsShowClaim(false)
          setIsClaimed(true)
        }, 13000)
      } catch (error) {
        setIsLoading(false)
        if (error.data) {
          store.addNotification(addNotify(error.data.message, 'warning'))
        }
      }
    }
  }

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    // Render a countdown
    if (days > 1) {
      return (
        <span>
          {days}days : {hours}h : {minutes}m : {seconds}s
        </span>
      )
    } else if (days === 1) {
      return (
        <span>
          {days}day : {hours}h : {minutes}m : {seconds}s
        </span>
      )
    } else {
      return (
        <span>
          {hours}h : {minutes}m : {seconds}s
        </span>
      )
    }
  }

  const getProgressTime = useCallback((startTime) => {
    if (!startTime) {
      return Date.now()
    }
    const now = new Date()
    const utcDate = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      0
    )
    const startDate = new Date(startTime)

    const startTS = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
      startDate.getSeconds(),
      0
    )
    if (startTS <= utcDate) {
      return Date.now()
    } else {
      let delta = Math.abs(startTS.valueOf() - utcDate.valueOf()) / 1000

      const days = Math.floor(delta / 86400)
      delta -= days * 86400
      const hours = Math.floor(delta / 3600)
      delta -= hours * 3600
      const minutes = Math.floor(delta / 60) % 60
      delta -= minutes * 60
      const seconds = Math.floor(delta % 60) // in theory the modulus is not required

      // return `${days} day${days > 1 ? 's' : ''} ${hours}:${minutes}:${seconds}`
      if (days >= 1) {
        return Date.now() + days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000
      } else {
        return Date.now() + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000
      }
    }
  }, [])

  let _is_refunded_api = 0
  let _claimedTokens : any = totalClaimed + totalClaimDaily
  if (x.allocation && x.allocation.claimbles.length > 0) {
    for (let i = 0; i < x.allocation.claimbles.length; i++) {
      if (x.allocation.claimbles[i].claimedType === 2)
        _claimedTokens += x.allocation.claimbles[i].claimToken
      else if (x.allocation.claimbles[i].claimedType === 1)
        _is_refunded_api = 1
    }
  }

  let processClaim = x.allocation !== null ? Number(((_claimedTokens / x.allocation.joinToken) * 100).toFixed(2)) : 0
  if (_is_refunded_api === 1 || isRefundedRC)
    processClaim = 100
  const is_network_bep = network === 'bep'
  const is_network_erc = network === 'erc'
  const is_network_poly = network === 'poly'

  const btnJoinPool = (item) => {
    const obj = {
      className: `btn-view-dt`,
      disabled: isLoading || isJoined || disnableJoin,
    }
    return obj
  }

  const btnApprove = (item) => {
    const obj = {
      className: `btn-view-dt`,
      disabled: isApproveJoin,
    }
    return obj
  }

  const btnClaim = (item) => {
    const obj = {
      className: `btn-view-dt`,
      disabled: isLoading || !isShowClaim,
    }
    return obj
  }

  const btnOldClaim = (item) => {
    const obj = {
      className: `btn-view-dt`,
    }
    return obj
  }

  const btnRefund = (item) => {
    const obj = {
      className: `btn-view-dt`,
      disabled: isLoading || isRefundedRC,
    }
    return obj
  }

  return (
    <>
      <div className="round-one">
        <div className="g-title">
          <h4 className="title">{x.name}</h4>
          <img className='blur-title' src="/images/imagesV3/blur-title.svg" alt="" />
        </div>
        <div className="list-info-ido border-none">
          <div className="item">
            <div className="t-left">Total Raise:</div>
            <div className="t-right">$ {Number(x.totalRaise).toFixed(2)}</div>
          </div>
          <div className="item">
            <div className="t-left">Swap Rate:</div>
            <div className="t-right">{x.swapAmount}</div>
          </div>
          <div className="item">
            <div className="t-left">Start Pool:</div>
            <div className="t-right">{x.startDate}</div>
          </div>
          <div className="item">
            <div className="t-left">End Pool:</div>
            <div className="t-right">{x.endDate}</div>
          </div>
          <div className="item">
            <div className="t-left">Vesting:</div>
            <div className="t-right exc-vt">
              <Tooltip placement="leftTop" title={x.vesting ? x.vesting : 'TBA'}>
                <ExclamationCircleOutlined />
              </Tooltip>
            </div>
          </div>
          {isJoined ? (
            <div className="item">
              <div className="t-left">Investment:</div>
              <div className="t-right">{x.allocation?.joinBusd}&nbsp;
                {network === 'bep'? 'BUSD' : (
                  network === 'poly' ? 'USDC' : 'ETH'
                )}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="process-bar-v3">
          <h4 className="title-process">
            {x.status === STATUS.COMING ? (
              <>Join pool starts in : TBA</>
            ) : x.status === STATUS.GOING ? (
              <>
                Join pool starts in : &ensp;
                <Countdown date={getProgressTime(x.startOpenIdo)} renderer={renderer} />
              </>
            ) : x.status === STATUS.OPEN ? (
              <>
                Join pool close in : &ensp;
                <Countdown date={getProgressTime(x.closeJoinIdo)} renderer={renderer} />
              </>
            ) : (
              ''
            )}
          </h4>
          {x.status === STATUS.CLOSE && x.allocation !== null ? (
            <>
              <Progress percent={processClaim} status="active" />
            </>
          ) : (
            <>
              <Progress percent={x.percentProcess} status="active" />
            </>
          )}
        </div>
        <div className="box-button-dt">
          {x.allocation === null ? (
            <div className="noti-whitelist">
              <p>You’re not whitelisted</p>
            </div>
          ) : (
            <>
              {x.status === 4 ? ( // khi pool da dong
                !isJoined ? ( // neu khong join
                  <div className="noti-whitelist">
                    <p>You have&apos;t joined pool</p>
                  </div>
                ) : // neu da join roi thi lam gi
                isRefundedRC ? (
                  <Button {...btnRefund(x)} disabled>
                    Refunded
                  </Button>
                ) : (
                  <>
                    {x.showPopupClaim ? ( // TH claim loai cu
                      <Button {...btnOldClaim(x)} onClick={() => _handleClaim()}>
                        View Claim
                      </Button>
                    ) : // TH claim loai moi
                    !isRefundedRC ?
                      x.allocation.claimbles.length > 0 && x.allocation.claimbles[0].signToken !== null ? (
                        <Button {...btnClaim(x)} onClick={() => _handleClaim()}>
                          {isLoading ? <i className="fa fa-spinner fa-spin" /> : !isShowClaim ? 'Claimed' : 'Claim'}
                        </Button>
                      ) : (
                        <Button {...btnClaim(x)} disabled>
                          Claim
                        </Button>
                      ) : ('')
                    }
                    {x.enableKYC && !x.allocation.completeKYC ? (
                      <div className="noti-whitelist">
                        <p>You have&apos;t completed the KYC</p>
                      </div>
                    ) : ('')}
                    {!isClaimed && x.allocation.claimbles.length > 0 && x.allocation.claimbles[0].signBusd !== null ? (
                      <Button {...btnRefund(x)} onClick={() => _handleRefund()}>
                        Refund{isLoadingRefund ? <i className="fa fa-spinner fa-spin" /> : ''}
                      </Button>
                    ) : (
                      ''
                    )}
                    {!x.showPopupClaim ? (
                      <div className="inf-claim">
                        <ScheduleOutlined onClick={showModal} />
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                )
              ) : // kiem tra xem da approve chua
              !isApproveJoin && !isJoined ? (
                <Button {...btnApprove(x)} onClick={() => _approveJoinPool()}>
                  Approve {isLoading ? <i className="fa fa-spinner fa-spin" /> : ''}
                </Button>
              ) : is_allow_joinpool ? (
                <Button {...btnJoinPool(x)} onClick={() => _handleJoinPool(x.id)}>
                  {isLoading ? <i className="fa fa-spinner fa-spin" /> : isJoined ? 'Joined' : 'Join Pool'}
                </Button>
              ) : (
                <Button {...btnJoinPool(x)} disabled>
                  Coming soon
                </Button>
              )}
              {x.allocation && (
                <div className="row-claim-box">
                  <div className="row-claim-token">
                    <div className="text">{x.status === 4 && isJoined ? 'Claimed' : 'Funds needed:'}</div>
                    <div className="name-row">
                      {x.status === 4 && isJoined
                        ? Number(totalClaimed).toFixed(2)
                        : Number(x.allocation.joinBusd).toFixed(6)}
                    </div>
                  </div>
                  <div className="row-allocation-token">
                    <div className="text">Allocation:</div>
                    <div className="name-row">{Number(x.allocation.joinToken).toFixed(2)}</div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Modal className="modal-claimed-after" title="Schedule Claim" visible={isModalVisible} onCancel={handleCancel}>
        <div className="bsc-p-launchpad_detail-allocations">
          <table>
            <tr>
              <th style={{ width: '33%' }}>Claimable</th>
              <th style={{ width: '34%' }}>Claim Date</th>
              <th style={{ width: '33%' }}>%</th>
            </tr>

            {x.allocation !== null ? (
              x.allocation.schedules.map((item: any, i) => (
                <tr>
                  <td style={{ width: '33%', paddingLeft: '15px' }}>
                    {item.claimToken !== null ? item.claimToken : 'TBA'}
                  </td>
                  <td style={{ width: '34%', justifyContent: 'start', paddingLeft: '15px' }}>
                    {item.claimTime !== null ? item.claimTime : 'TBA'}
                  </td>
                  <td style={{ width: '33%', paddingLeft: '15px' }}>
                    {item.percentage !== null ? item.percentage : 'TBA'}
                  </td>
                </tr>
              ))
            ) : (
              <div className="bsc-p-launchpad_detail-allocations-empty">
                <span>Empty</span>
              </div>
            )}
          </table>
        </div>
      </Modal>
    </>
  )
}

const DetailsTabsContentActive = (props): any => {
  const { activeDetail } = props
  console.log('activeDetail',activeDetail);
  useState<
    Array<{
      checkJoin: boolean
      endDate: string
      id: number
      idoId: number
      isJoinPool: boolean
      name: string
      startDate: string
      startOpenIdo: string
      swapAmount: string
      totalRaise: number
      vesting: any
      whiteListed: boolean
      status: number
      totalToken
      percentProcess
      isShowButtonClaim: boolean
    }>
  >([])

  return (
    <>
      {activeDetail && activeDetail.details.map((x) => <ItemIdo x={x} network={activeDetail.network} />)}
      <ModalClaimedAfter dataFromParent={activeDetail} />

      <ModalDisClaimer isShowDisClaim={activeDetail.showdisclaimer} symbol={activeDetail.symbol}/>
    </>
  )
}
export default memo(DetailsTabsContentActive)
