
import React, { memo, useEffect, useState } from 'react'
import './index.less'
import { useWeb3React } from '@web3-react/core'
import { Store } from 'react-notifications-component'
import { isRefundedRC, claimTokens, isClaimed, totalClaimAble } from './utils'
import { useHookDetail } from '../Store-Detail'
import { useIdoTokenClaimContract } from 'hooks/useContract'

const ItemIdo = ({ idoId, account, isJoinPool, item, isShowButton }) => {
  const [isClaim, setIsClaim] = useState(false)
  const [isClaimDaily, setIsClaimDaily] = useState(false)
  const [claimAble, setClaimAble] = useState(0)

  const idoTokenClaimContract = useIdoTokenClaimContract(item.contractAddress, item)

  const [isLoadingClaim, setLoadingClaim] = useState(false)
  const [state, actions]: any = useHookDetail()
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
  }, [account, idoId.idoId, idoTokenClaimContract])

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
  }, [account, idoId.idoId, idoTokenClaimContract, item.claimRound])

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
  }, [account, idoId.idoId, idoTokenClaimContract, item.claimRound])


  const is_claimed = isClaim || (item.tokenClaim > 0 && item.claimRound > 0)
  const is_refunded = isRefund || (item.tokenClaim > 0 && item.claimRound === 0)
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
            {is_claimed && isShowButton ? (
              <button type='button' className='btn-claimed-cus btn-disible-cus btn-bsc-disabled'>
                Claimed
              </button>
            ) : isLoadingClaim && isShowButton ? (
              <div className='btn-bsc-common btn-bsc-primary '>
                <button type='button'>
                  <i className='fa fa-spinner fa-spin' />
                </button>
              </div>
            ) : is_refunded && isShowButton ? (
              <button type='button' className='btn-refunded-cus btn-disible-cus btn-bsc-disabled'>
                Refunded
              </button>
            ) : !isJoinPool || !isShowButton ? (
              <p>TBA</p>
            ) : item.isActive === true && !isClaim && item.signToken !== null && isShowButton ? (
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
        <td>{item.claimRound !== 100 ? item.token : claimAble > 0 ? Number(claimAble).toFixed(4) : item.token}</td>
        <td>{item.claimTime !== null ? item.claimTime : `${item.created} UTC`}</td>
        <td>{is_refunded ? '100%' : item.percentage !== null ? item.percentage : 'TBA'}</td>
      </tr>
    </>
  )
}
const YourAllocations = memo((idoId: any) => {
  const [state, actions]: any = useHookDetail()
  const { account, chainId } = useWeb3React()
  const { listAllocations, objJoin, objData }: any = state
  const isJoinPool = objJoin && objJoin.status === 2
  const is_network_bep = objData && objData.network === 'bep'
  const is_network_erc = objData && objData.network === 'erc'
  const is_network_poly = objData && objData.network === 'poly'
  const showBtnClaim = ((is_network_bep && chainId === 56) || (is_network_erc && chainId === 1) || (is_network_poly && chainId === 137))
  return (
    <div className='bsc-p-launchpad_detail-allocations'>
      <table>
        <tr>
          <th>Action</th>
          <th>{isJoinPool ? 'Claimable' : 'Allocation'}</th>
          <th>Claim Date</th>
          <th>%</th>
        </tr>
        {listAllocations && listAllocations.length > 0 ? (
          listAllocations.map((item: any, i) => (
            <ItemIdo idoId={idoId} account={account} item={item} isJoinPool={isJoinPool} isShowButton={showBtnClaim} />
          ))
        ) : (
          <div className='bsc-p-launchpad_detail-allocations-empty'>
            <span>Empty</span>
          </div>
        )}
      </table>
    </div>
  )
})

export default YourAllocations
