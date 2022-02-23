import React, { memo } from 'react'
import { isMobile } from 'react-device-detect'
import PoolDetailTabel, { PropsPoolDetailRow } from '../PoolDetailTabel'
import { useHookDetail } from "../Store-Detail";

import './index.less'

const PoolDetails = memo(() => {

  const [state, actions]: any = useHookDetail();
  const { objData } = state;

  // formatNumber
  function numberWithCommas(x) {
    // eslint-disable-next-line prefer-template
    const y = "" + x;
    return y.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const totalSupply = numberWithCommas(objData && objData.totalSupply);
  const softCap = numberWithCommas(objData && objData.softCap);
  const totalFundsSwapped = numberWithCommas(objData && objData.minAllocation)
  const totalUsersParticipated = numberWithCommas(objData && objData.maxAllocation)

  const tokenDistribution = objData && objData.tokenDistribution;
  const accessType = objData && objData.accessType;
  const tierWhitelist = 0;
  const isHot = objData && objData.isHot
  const projectName = objData && objData.name;
  const ownerAddress = objData && objData.ownerAddress;
  const decimals = objData && objData.decimals;
  const symbol = objData && objData.symbol;

  const rowsPoolInformation: PropsPoolDetailRow[] = [
    {
      label: "Token Distribution",
      value: tokenDistribution
    },
    {
      label: "Total Funds Swapped",
      value: `$${totalFundsSwapped}`
    },
    {
      label: "Total Users Participated",
      value: totalUsersParticipated
    },
    {
      label: "Hard Cap",
      value: softCap
    },
    {
      label: "Access type",
      value: (accessType === tierWhitelist && isHot===true) ? (
        'Tier whitelist' 
      ) : (
          'Whitelist'
      )}
    
  ]
  // console.log("isHot: ", isHot)

  const rowsTokenInformation: PropsPoolDetailRow[] = [
    {
      label: "Name",
      value: projectName
    },
    {
      label: "Address",
      value: ownerAddress
    },
    {
      label: "Total Supply",
      value: totalSupply
    },
    {
      label: "Decimals",
      value: decimals
    },
    {
      label: "Symbol",
      value: symbol
    }
  ]

  return (
    <div
      className={`bsc-p-launchpad_detail-pool ${isMobile&&'bsc-p-launchpad_detail-pool-mobile'}`}
    >
      <div
        className='bsc-p-launchpad_detail-pool-left'
      >
        <PoolDetailTabel
          title='Pool information'
          rows={rowsPoolInformation}
        />
      </div>
      <div
        className='bsc-p-launchpad_detail-pool-right'
      >
        <PoolDetailTabel
          title='Token information'
          rows={rowsTokenInformation}
        />
      </div>
    </div>
  )
})

export default memo(PoolDetails)