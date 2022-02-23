/* eslint-disable no-return-await, import/no-cycle, react-hooks/exhaustive-deps, no-return-assign, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { memo, useCallback, useMemo, useContext, useEffect, useState } from 'react'
import { store } from 'react-notifications-component'
import { useApproveCallbackCustom, useApproveNFTCallbackCustom } from 'hooks/useApproveCallback'
import { CONTRACT_BID_VERSION, CONTRACT_NFT, TOKEN_BSCS_TESTNET, API_IMAGE, STAKE_NFT } from 'constants/index'
import { useActiveWeb3React } from 'hooks'
import { useHookNft } from 'pages/Nft/Store-Nft'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import Button from 'components/Button'
import { useContract } from 'hooks/useContract'
import { ListStakeContext } from '../ArtworkList'
import { ArtworkItemProps } from './index.d'
import { STATUS_ARTWORK } from '../ArtworkList/index.d'
import { _stake, _unStake, _getReward, _havest } from '../../utils'
import './index.less'
import abiStakeNFT from '../../abiStakeNFT.json'
import { useOwnerTokenFT, AllowceTokenNFT } from '../../../../data/Nft'

// function moviePropsAreEqual(prevMovie, nextMovie) {
//   console.log( prevMovie.artwork.stakeStatus, nextMovie.artwork.stakeStatus)
//   return prevMovie.artwork.stakeStatus !==  nextMovie.artwork.stakeStatus
// }

const ItemStake = memo<ArtworkItemProps>((props) => {
  const { gotoDetail } = useContext(ListStakeContext)
  const [state, actions] = useHookNft()
  const [reward, setReward] = useState(0)
  const { account } = useActiveWeb3React()

  const [statusStake, setStatusStake] = useState(false)
  const [statusUnStake, setStatusUnStake] = useState(false)
  const [statusHarvest, setStatusHarvest] = useState(false)
  const [isApprove, setApprove] = useState(false)
  const [loadAprrove, setLoadApprove] = useState(false)
  const stakeNFTContract = useContract(STAKE_NFT, abiStakeNFT)
  const [isView, setIsView] = useState(false)
  const _onCick = (_type) => {
    if (_type === 'stake') {
      setStatusStake(true)
      try {
        _stake(stakeNFTContract, props.artwork.tokenId, CONTRACT_NFT).then((response) => {
          if (response.hash) {

              actions
                .nftStake({
                  txnHash: response.hash,
                  ownerAddress: account,
                  nftCode: props.artwork.code,
                })
                .then(() => {
                  setTimeout(() => {
                    setStatusStake(false)
                    actions.getMoreStakeNFT(account)
                    store.addNotification({
                      title: 'Stake',
                      message: (
                        <div className="custom-fontsize">
                          <i className="fa fa-check-square-o icon-success" aria-hidden="true" />
                          Successfully
                        </div>
                      ),
                      type: 'warning',
                      width: 300,
                      insert: 'center',
                      container: 'top-center',
                      animationIn: ['animate__animated success', 'animate__fadeIn'],
                      animationOut: ['animate__animated success', 'animate__fadeOut'],
                      dismiss: {
                        duration: 2000,
                        onScreen: true,
                        pauseOnHover: true,
                        click: true,
                        touch: true,
                      },
                    })
                  } , 10000)
                })

          } else {
            setStatusStake(false)
            // User denied transaction signature
            if (response.code === 4001) {
              return
            }
            store.addNotification({
              title: 'Error',
              message: (
                <div className="custom-fontsize">
                  <i className="fa fa-times icon-fail" aria-hidden="true" />
                  {response.data.message}
                </div>
              ),
              type: 'warning',
              width: 300,
              insert: 'center',
              container: 'top-center',
              animationIn: ['animate__animated fail', 'animate__fadeIn'],
              animationOut: ['animate__animated fail', 'animate__fadeOut'],
              dismiss: {
                duration: 2000,
                onScreen: true,
                pauseOnHover: true,
                click: true,
                touch: true,
              },
            })
          }
        })
      } catch (error) {
        setStatusStake(false)
        console.log(error)
      }
    }

    if (_type === 'unstake') {
      setStatusUnStake(true)
      _unStake(stakeNFTContract, props.artwork.tokenId, CONTRACT_NFT).then((response) => {
        if (response.hash) {
            actions
              .nftUnStake({
                ownerAddress: account,
                nftCode: props.artwork.code,
              })
              .then(() => {
                setTimeout(() => {
                  setStatusUnStake(false)
                  actions.getMoreStakeNFT(account)
                  setLoadApprove(true)
                  store.addNotification({
                    title: 'Unstake',
                    message: (
                      <div className="custom-fontsize">
                        <i className="fa fa-check-square-o icon-success" aria-hidden="true" />
                        Successfully
                      </div>
                    ),
                    type: 'warning',
                    width: 300,
                    insert: 'center',
                    container: 'top-center',
                    animationIn: ['animate__animated success', 'animate__fadeIn'],
                    animationOut: ['animate__animated success', 'animate__fadeOut'],
                    dismiss: {
                      duration: 2000,
                      onScreen: true,
                      pauseOnHover: true,
                      click: true,
                      touch: true,
                    },
                  })
                },10000)
              })
        } else {
          setStatusUnStake(false)
          // User denied transaction signature
          if (response.code === 4001) {
            return
          }
          store.addNotification({
            title: 'Error',
            message: (
              <div className="custom-fontsize">
                <i className="fa fa-times icon-fail" aria-hidden="true" />
                {response.data.message}
              </div>
            ),
            type: 'warning',
            width: 300,
            insert: 'center',
            container: 'top-center',
            animationIn: ['animate__animated fail', 'animate__fadeIn'],
            animationOut: ['animate__animated fail', 'animate__fadeOut'],
            dismiss: {
              duration: 2000,
              onScreen: true,
              pauseOnHover: true,
              click: true,
              touch: true,
            },
          })
        }
      })
    }
  }
  const allowanceNFT = AllowceTokenNFT(props.artwork?.tokenId)
  const OwnerTokenFT = useOwnerTokenFT(props.artwork?.tokenId)
  const [approvalStake] = useApproveNFTCallbackCustom(
    CONTRACT_NFT,
    STAKE_NFT,
    props.artwork?.tokenId,
    props.artwork?.tokenId
  )

  async function onAttemptToApproveStake() {
    return approvalStake()
  }
  const handleApproveStake = useCallback(async () => {
    try {
      setApprove(true)
      await onAttemptToApproveStake()
      setTimeout(()=>{
        setApprove(false)
        setLoadApprove(false)
      },12000)
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalStake])
  useEffect(() => {
    getRward()
  }, [reward, props.artwork.tokenId])
  const havest = () => {
    setStatusHarvest(true)
    _havest(stakeNFTContract, props.artwork.tokenId, CONTRACT_NFT).then((response) => {
      if (response.hash) {
        setTimeout(() => {
          setStatusHarvest(false)
          store.addNotification({
            title: 'Successfully',
            message: (
              <div className="custom-fontsize">
                <i className="fa fa-check-square-o icon-success" aria-hidden="true" />
                Harvest Successfully
              </div>
            ),
            type: 'warning',
            width: 300,
            insert: 'center',
            container: 'top-center',
            animationIn: ['animate__animated success', 'animate__fadeIn'],
            animationOut: ['animate__animated success', 'animate__fadeOut'],
            dismiss: {
              duration: 2000,
              onScreen: true,
              pauseOnHover: true,
              click: true,
              touch: true,
            },
          })
        }, 2000)
      } else {
        setStatusHarvest(false)
        // User denied transaction signature
        if (response.code === 4001) {
          return
        }
        store.addNotification({
          title: 'Error',
          message: (
            <div className="custom-fontsize">
              <i className="fa fa-times icon-fail" aria-hidden="true" />
              {response.data.message}
            </div>
          ),
          type: 'warning',
          width: 300,
          insert: 'center',
          container: 'top-center',
          animationIn: ['animate__animated fail', 'animate__fadeIn'],
          animationOut: ['animate__animated fail', 'animate__fadeOut'],
          dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true,
            click: true,
            touch: true,
          },
        })
      }
    })
  }
  const ownerNFTTemp = OwnerTokenFT && OwnerTokenFT.toLowerCase()
  const accountTemp = account && account.toLowerCase()
  const allowanceNFTTemp = (allowanceNFT && allowanceNFT.toString().toLowerCase()) || ''
  useEffect(() => {
    const interval = setInterval(async () => {
      getRward()
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getRward = () => {
    _getReward(stakeNFTContract, account, props.artwork.tokenId, CONTRACT_NFT).then((res) => {
      setReward(res[0] && res[0][0].toString() / 1e18)
    })
  }
  return (
    <li className="bsc-artwork-item">
      <div onClick={() => gotoDetail(props.artwork)} className="bsc-artwork-item-top">
        {props.artwork.fileType === 2 ? (
          <img
            loading="lazy"
            className="lazy-loading-bsc"
            data-src={
              props.artwork.fileType === 2
                ? props.artwork.thumbnail
                : `${props.artwork.fileName && props.artwork.fileName.indexOf('amazonaws') !== -1 ? '' : API_IMAGE}${
                    props.artwork.fileName
                  }?v=122`
            }
            alt={props.artwork?.name}
          />
        ) : (
          <img
            loading="lazy"
            className="lazy-loading-bsc"
            data-src={`${
              props.artwork.fileName && props.artwork.fileName.indexOf('amazonaws') !== -1 ? '' : API_IMAGE
            }${props.artwork.fileName}?v=122`}
            alt={props.artwork?.name}
          />
        )}
      </div>
      <div className="bsc-artwork-item-bottom">
        {/* <div>
          <span>{props.artwork?.fileType === 2 ? 'Video' : 'Image'}</span>
          <div>
            {account === props.artwork?.ownerAddress && (
              <span>
                {(() => {
                  switch (props.artwork?.status) {
                    case STATUS_ARTWORK.REVIEWED:
                      return 'Approved'
                    case STATUS_ARTWORK.PENDING:
                      return 'Pending'
                    case STATUS_ARTWORK.REJECT:
                      return 'Rejected'
                    case STATUS_ARTWORK.BIDDING:
                      return 'Bidding'
                    default:
                      return 'Unknow'
                  }
                })()}
              </span>
            )}
          </div>
        </div> */}

        <div className="NFT-stake-row">
          <span className="NFT-stake-name">{props.artwork?.name || 'Unknow'}</span>
          <span className="NFT-stake-authorName">{props.artwork?.authorName || ''}</span>
        </div>
        <div className="box-stake">
          <div className="stake-row">
            <div className="text-left">Stake amount:</div>
            <div className="text-right">{props.artwork?.price} ATF</div>
          </div>
          <div className="stake-row">
            <div className="text-left">
              <span className="main-color">ATF </span> earned
            </div>
          </div>
          <div className="stake-row">
            <div className="text-left">
              <span className="main-color">{(reward && reward.toFixed(2)) || '0.00'}</span>
            </div>
            <div className="text-right">
              <button
                onClick={() => havest()}
                type="button"
                className={`button-havest ${statusHarvest ? 'disable' : ''}`}
              >
                Harvest
              </button>
            </div>
          </div>
        </div>

        <div>
          {!loadAprrove && ((ownerNFTTemp && ownerNFTTemp === STAKE_NFT.toLowerCase()) ||
          (allowanceNFTTemp && allowanceNFTTemp === STAKE_NFT.toLowerCase()) ||
          props.artwork?.stakeStatus === 1) ? (
            <>
              {allowanceNFTTemp && allowanceNFTTemp !== STAKE_NFT.toLowerCase() || props.artwork?.stakeStatus === 1 ? (
                <Button
                  className="NFT-stake-button"
                  primary
                  disabled={statusUnStake}
                  text="UnStake"
                  right={statusUnStake && <i className="fa fa-spinner fa-spin btn-pending" />}
                  click={() => {
                    _onCick('unstake')
                  }}
                />
              ) : (
                <Button
                  className="NFT-stake-button"
                  primary
                  disabled={statusStake}
                  text="Stake"
                  right={statusStake && <i className="fa fa-spinner fa-spin btn-pending" />}
                  click={() => {
                    _onCick('stake')
                  }}
                />
              )}
            </>
          ) : (
            <>
              <Button
                className="NFT-stake-button"
                primary
                disabled={isApprove}
                right={isApprove && <i className="fa fa-spinner fa-spin btn-pending" />}
                click={() => {
                  handleApproveStake()
                }}
                text="Approve Stake"
              />
            </>
          )}
        </div>
        {isView && (
          <div
            onClick={() => {
              window.open(
                `https://bscscan.com/token/0x2433be070faee3f960c435fb91e9f320986dde34?a=${props.artwork?.tokenId}`,
                '_blank'
              )
            }}
            className="more-detail"
          >
            <h5 className="view-contract">
              View Contract <img src="/images/imagesNFT/view.png" alt="" />
            </h5>
          </div>
        )}
        <Button
          link
          click={() => setIsView(!isView)}
          text={isView ? 'Hide' : 'Details'}
          className="button-detail"
          right={isView ? <UpOutlined color="#0DBA88" size={16} /> : <DownOutlined color="#0DBA88" size={16} />}
        />
      </div>
    </li>
  )
})

export default ItemStake
