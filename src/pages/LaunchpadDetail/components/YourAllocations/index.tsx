/* eslint-disable no-nested-ternary */
import React, { memo } from 'react'
import { useHookDetail } from "../Store-Detail";
import './index.less'

const YourAllocations = memo(() => {
  const [state, actions]: any = useHookDetail();
  const { objData, listAllocations, objJoin, objClaim}: any = state;
  const isJoinPool = objJoin && objJoin.status === 2
  const isRefundBusd = objClaim && objClaim.isRefundBusd
  const is_network_bep = objData && objData.network === 'bep'
  const is_network_poly = objData && objData.network === 'poly'
  const tokenName = is_network_bep ? 'BUSD' : is_network_poly ? 'USDC' : 'USDT'

  return (
    <div
      className='bsc-p-launchpad_detail-allocations'
    >
      <table>
        <tr>
          <td>Token Allocation</td>
          <td>Percentage</td>
          <td>Start Claim Date</td>
          <td>{isRefundBusd ? 'Refunded' : 'Token(s) Claimed'}</td>
          <td>Action</td>
        </tr>

        {listAllocations && listAllocations.length > 0 ? listAllocations.map((item: any, i) => (
          <tr>
            <td>{item.token}</td>
            <td>{isRefundBusd ? "100%" : item.percentage !== null ? item.percentage : "TBA"}</td>
            <td>{item.claimTime !== null ? item.claimTime : `${item.created} UTC` }</td>
            <td>{item.tokenClaim > 0 ? isRefundBusd ? `${Number(item.tokenClaim).toFixed(2)} ${tokenName}` : Number(item.tokenClaim).toFixed(2) : 0}</td>
            <td>
              {item.tokenClaim > 0 ? (
                <p>Completed</p>
              ) : !isJoinPool ? <p>TBA</p> : (
                (item.isActive === true && item.tokenClaim === 0) ? (
                  <p> Waiting claim</p>
                ) : (
                  <p> Pending</p>
                )
              )
              }
            </td>
          </tr>
        )) : <div className='bsc-p-launchpad_detail-allocations-empty'><span>Empty</span></div>}
      </table>
    </div>
  )
})

export default YourAllocations