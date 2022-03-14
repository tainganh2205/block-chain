/* eslint-disable react/jsx-boolean-value */
import React, { useEffect, useState, memo } from 'react'
import { Modal } from 'antd';
import { useWeb3React } from '@web3-react/core'
import { Store } from 'react-notifications-component'
import addNotify from 'components/Notify/addNotify'
import { isRefundedRC, claimTokens, isClaimed, totalClaimAble } from './utils'
import { useIdoTokenClaimContract } from '../../../hooks/useContract'
import { useHookDetail } from '../Store-Detail'
import "./style.less"

const ItemIdo = ({ account, item, isShowButton }) => {
  const [state, actions]: any = useHookDetail()
  const [isClaim, setIsClaim] = useState(false)
  const [isClaimDaily, setIsClaimDaily] = useState(false)
  const [claimAble, setClaimAble] = useState(0)
  const idoTokenClaimContract = useIdoTokenClaimContract(item.contractAddress, item)
  const [isLoadingClaim, setLoadingClaim] = useState(false)
  const [isRefund, setIsRefund] = useState(false)

  const handleClaim = async () => {
    try {
      if (idoTokenClaimContract !== null) {
        setLoadingClaim(true)
        actions.changeRefundStatus(true)
        await claimTokens(idoTokenClaimContract, item).then(() => {
          setTimeout(() => {
            setIsClaim(true)
            setIsClaimDaily(false)
            setLoadingClaim(false)
          }, 10000)
        })
      }
    } catch (error:any) {
      setLoadingClaim(false)
      actions.changeRefundStatus(false)
      if (error.data) {
        Store.addNotification({
          title: "Notify !",
          message: error.data.message,
          type: "warning",
          width: 300,
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true,
            click: true,
            touch: true
          }
        });
      }
    }
  }

  useEffect(() => {
    try {
      if (idoTokenClaimContract !== null) {
        isClaimed(idoTokenClaimContract, account, item).then((res) => {
          setIsClaim(res)
          setIsClaimDaily(res)
        })
      }
    } catch (error) {
      setIsClaim(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, idoTokenClaimContract])

  useEffect(() => {
    try {
      if (idoTokenClaimContract !== null && item.claimRound !== 100) {
        isRefundedRC(idoTokenClaimContract, account).then((res) => {
          setIsRefund(res)
        })
      }
    } catch (error) {
      setIsRefund(false)
    }
  }, [account, idoTokenClaimContract, item.claimRound])

  useEffect(() => {
    try {
      if (idoTokenClaimContract !== null && item.claimRound === 100) {
        totalClaimAble(idoTokenClaimContract, account).then((res) => {
          setClaimAble(res)
        })
      }
    } catch (error) {
      // TODO
    }
  }, [account, idoTokenClaimContract, item.claimRound])

  return (
    <>
        <tr key={item.claimRound}>
          {item.claimRound === 100 ?
            <td>
              {!isClaimDaily ? (
                <button type='button' className='btn-waiting-cus'>
                  Waiting
                </button>
              ) : isLoadingClaim ? (
                <div className='btn-bsc-common btn-bsc-primary '>
                  <button type='button'>
                    <i className='fa fa-spinner fa-spin' />
                  </button>
                </div>
              ) : (
                <div>
                  <div className='btn-bsc-common btn-bsc-primary '>
                    <button type='button' onClick={() => handleClaim()}>
                      Claim
                    </button>
                  </div>
                </div>
              )}
            </td>
            :
            <td>
              {(item.claimedType === 2 || isClaim) && isShowButton ? (
                <button type='button' className='btn-claimed-cus btn-disible-cus btn-bsc-disabled'>
                  Claimed
                </button>
              ) : isLoadingClaim && isShowButton ? (
                <div className='btn-bsc-common btn-bsc-primary '>
                  <button type='button'>
                    <i className='fa fa-spinner fa-spin' />
                  </button>
                </div>
              ) : (item.claimedType === 1 || isRefund) && isShowButton ? (
                <button type='button' className='btn-refunded-cus btn-disible-cus btn-bsc-disabled'>
                  Refunded
                </button>
              ) : !isShowButton ? (
                <p>TBA</p>
              ) : !isClaim && item.signToken !== null && isShowButton ? (
                <div>
                  <div className='btn-bsc-common btn-bsc-primary '>
                    <button type='button' onClick={() => handleClaim()}>
                      Claim
                    </button>
                  </div>
                </div>
              ) : (
                <button type='button' className='btn-waiting-cus'>
                  Waiting
                </button>
              )}
            </td>
          }
          <td>{item.claimRound !== 100 ? item.claimToken : claimAble > 0 ? Number(claimAble).toFixed(4) : item.claimToken}</td>
          <td>{item.claimTime !== null ? item.claimTime : 'TBA'}</td>
          <td>{isRefund ? '100%' : item.percentage !== null ? item.percentage : 'TBA'}</td>
        </tr>
    </>
  )
}

const ModalClaimedAfter = memo((props : any) => {
  const objIdo = props.dataFromParent
  const [state, actions]: any = useHookDetail()
  const { account, chainId } = useWeb3React()
  const is_network_bep = objIdo && objIdo.network === 'bep'
  const is_network_erc = objIdo && objIdo.network === 'erc'
  const is_network_poly = objIdo && objIdo.network === 'poly'
  const showBtnClaim = ((is_network_bep && chainId === 56) || (is_network_erc && chainId === 1) || (is_network_poly && chainId === 137))

  const handleOk = () => {
    actions.changeOpenModalClaim(false)
  };
  const handleCancel = () => {
    actions.changeOpenModalClaim(false)
  };

  let claimbles = []
  for (let i = 0; i < objIdo.details.length; i++) {
    if (objIdo.details[i].id === state.claimIdoId) {
      claimbles = objIdo.details[i].allocation.claimbles
    }
  }

  const isHide = state.claimIdoId !== -1
  return (
    <>
      <Modal className="modal-claimed-after" title="Claim Progress" visible={isHide} onOk={handleOk} onCancel={handleCancel}>
        <div className='bsc-p-launchpad_detail-allocations'>
          <table>
            <tr>
              <th>Action</th>
              <th>Claimable</th>
              <th>Claim Date</th>
              <th>%</th>
            </tr>
             {claimbles !== null ? (
              claimbles.map((item: any, i) => (
                <ItemIdo account={account} item={item} isShowButton={showBtnClaim} />
              ))
            ) : (
              <div className='bsc-p-launchpad_detail-allocations-empty'>
                <span>Empty</span>
              </div>
            )}
          </table>
        </div>
      </Modal>
    </>
  )
})
export default ModalClaimedAfter
