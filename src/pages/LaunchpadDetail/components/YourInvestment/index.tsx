/* eslint-disable prefer-template */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { memo, useEffect, useState } from 'react'
import { Tooltip, Modal } from 'antd'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { isMobile } from 'react-device-detect'
import { useWeb3React } from '@web3-react/core'
import Button, { PropsButtonBSC } from 'components/Button'
import addNotify from 'components/Notify/addNotify'
import { useHookDetail } from '../Store-Detail'
import './index.less'

const YourInvestment = memo(({ props }: any) => {
  const { match: { params }, }: any = props
  const [state, actions]: any = useHookDetail()
  const { account } = useWeb3React()
  const { objData, objClaim, objJoin, listAllocations } = state
  const [loadingClaim, setLoadingClaim] = useState(0) // 0: nomal, 1: loading claim, 2: loading refund
  const [isModalRefundVisible, setModalRefundVisible] = useState(false)
  const [isModalClaimVisible, setModalClaimVisible] = useState(false)
  const idoId = params && params.id

  const showRefundModal = () => {
    setModalRefundVisible(true)
  }
  const handleRefundCancel = () => {
    setModalRefundVisible(false)
  }
  const showClaimModal = () => {
    setModalClaimVisible(true)
  }
  const handleClaimCancel = () => {
    setModalClaimVisible(false)
  }

  const _handleClaim = () => {
    setLoadingClaim(1)
    actions.checkIsClaim(idoId, account).then((resData) => {
      setModalClaimVisible(false)
      if (!resData.succeeded) {
        setLoadingClaim(0)
        store.addNotification(addNotify(resData.message, 'warning'))
      } else if (resData.data.totalToken > 0) {
        actions
          .insertClaimIDo(idoId, account, resData.data.totalToken)
          .then((response) => {
            if (!response.succeeded) {
              setLoadingClaim(0)
              store.addNotification(addNotify(response.message, 'danger'))
            } else {
              store.addNotification(addNotify('Claim Successful', 'success'))
            }
          })
      } else {
        setLoadingClaim(0)
      }
    })
  }

  const _handleClaimRefund = () => {
    setLoadingClaim(2)
    actions.checkIsClaim(idoId, account).then((resData) => {
      setModalRefundVisible(false)
      if (!resData.succeeded) {
        setLoadingClaim(0)
        store.addNotification(addNotify(resData.message, 'warning'))
      } else if (resData.data.allowRefund && resData.data.totalToken > 0) {
        actions.refundAmount(idoId, account)
          .then((response) => {
            if (!response.succeeded) {
              setLoadingClaim(0)
              store.addNotification(addNotify(response.message, 'danger'))
            } else {
              store.addNotification(addNotify('Refund Successful', 'success'))
            }
          })
      } else {
        setLoadingClaim(0)
      }
    })
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
  ).valueOf() / 1000
  const startClaim = objData && objData.socical && objData.socical.startClaim
  const claimDate = new Date(startClaim)
  const claimTS = Date.UTC(
    claimDate.getFullYear(),
    claimDate.getMonth(),
    claimDate.getDate(),
    claimDate.getHours(),
    claimDate.getMinutes(),
    claimDate.getSeconds(),
    0
  ).valueOf() / 1000 + 86400
  let delta = Math.abs(claimTS - utcDate)
  const hours = Math.floor(delta / 3600)
  delta -= hours * 3600
  const minutes = Math.floor(delta / 60) % 60

  let isYourToken = (objData && objData.isHot) || (objJoin && objJoin.status === 2)
  const fundsNeed = objData && objData.pricePer
  const yourTK = objJoin && objJoin.totalToken
  let fundsNeeded = Number(yourTK * fundsNeed).toFixed(2)
  let claimedTokens: any = 0
  for (let i = 0; i < listAllocations.length; i++) {
    claimedTokens += listAllocations[i].tokenClaim
  }
  claimedTokens = Number(claimedTokens).toFixed(2)

  const statusWL = objData && objData.status
  const isJoined = objJoin && objJoin.status === 2
  const isClaimed = isJoined && objClaim && objClaim.isClaimed
  const isAllowClaim = objClaim && objClaim.totalToken > 0
  const allowRefund = objJoin && objClaim && objClaim.allowRefund
  const isRefundBusd = objClaim && objClaim.isRefundBusd
  const showButtonClaim = !isRefundBusd
  const showButtonRefund = allowRefund || isRefundBusd
  const buttonClaim = (objClaim && objClaim.isProcessing) || loadingClaim === 1 ? 'Pending' : isClaimed ? 'Claimed' : 'Claim Token'
  const buttonRefund = (objClaim && objClaim.isProcessing) || loadingClaim === 2 ? 'Pending' : isClaimed ? 'Refunded' : 'Refund'
  const is_network_bep = objData && objData.network === 'bep'
  const is_network_erc = objData && objData.network === 'erc'
  const is_network_poly = objData && objData.network === 'poly'
  let tokenName = 'BUSD'
  let className = 'bsc-p-launchpad_detail-investment-top'
  if (is_network_erc) {
    tokenName = 'USDT'
    className = 'erc20-p-launchpad_detail-investment-top'
  } else if (is_network_poly) {
    tokenName = 'USDC'
    className = 'poly-p-launchpad_detail-investment-top'
  }

  const dataYourInvestment: any[] = [
    {
      title: 'Your Tokens',
      value: !isRefundBusd && isYourToken && loadingClaim !== 2 ? Number(objJoin.totalToken).toFixed(2) : '0',
    },
    {
      title: isRefundBusd || loadingClaim === 2 ? 'Refunded' : 'Claimed Tokens',
      value: isRefundBusd || loadingClaim === 2 ? `${claimedTokens} ${tokenName}` : `${claimedTokens}`,
    },
    {
      title: isRefundBusd || loadingClaim === 2 ? '' : 'Funds needed',
      value: isRefundBusd || loadingClaim === 2 ? '' : `${fundsNeeded} ${tokenName}`,
    },
  ]

  const actions1: PropsButtonBSC[] = [
    {
      text: buttonClaim,
      primary: isJoined && !isClaimed && isAllowClaim,
      disabled: isClaimed || !isAllowClaim || !isJoined || loadingClaim === 1 || (objClaim && objClaim.isProcessing),
      loading: loadingClaim === 1 || (objClaim && objClaim.isProcessing),
      click: () => {
        showClaimModal()
      },
    },
  ]
  const actions2: PropsButtonBSC[] = [
    {
      text: buttonRefund,
      primary: isJoined && !isClaimed && isAllowClaim && allowRefund,
      disabled: !allowRefund || isClaimed || !isAllowClaim || !isJoined || loadingClaim === 2 || (objClaim && objClaim.isProcessing),
      loading: loadingClaim === 2 || (objClaim && objClaim.isProcessing),
      click: () => {
        showRefundModal()
      },
    },
  ]

  let isWhite = true
  if (objData && objData.isAllocation && listAllocations.length === 0) {
    isWhite = false
  }

  return (
    <div className={`bsc-p-launchpad_detail-investment ${isMobile && 'bsc-p-launchpad_detail-investment-mobile'}`}>
      {objData && !objData.isAllocation ? (
        <div className="bsc-p-launchpad_detail-investment-not-whitelisted">
          <span>Coming Soon</span>
        </div>
      ) : !isWhite ? (
        <div className="bsc-p-launchpad_detail-investment-not-whitelisted">
          <span>You&apos;re not whitelisted</span>
        </div>
      ) : ('')}
      <div className={className}>
        <span>Your Investment</span>
      </div>
      <div className="bsc-p-launchpad_detail-investment-mid">
        {dataYourInvestment.map((investment, index) => (
          <div key={`investment-detail-${index}`} className="bsc-p-launchpad_detail-investment-mid-col">
            <span>{investment.title}</span>
            <span>{investment.value}</span>
          </div>
        ))}
      </div>
      <div className="bsc-p-launchpad_detail-investment-bottom">
        {showButtonClaim && (loadingClaim === 0 || loadingClaim === 1) ?
          actions1.map((btn) => (
            <Button {...btn} />
          ))
          : ('')}

        {showButtonRefund && (loadingClaim === 0 || loadingClaim === 2) ? (
          <div className='show' style={{ marginLeft: '10px' }}>
            {actions2.map((btn) => (
              <Button {...btn} />
            ))}
          </div>
        ) : ('')}

        {allowRefund && buttonRefund === 'Refund' && hours >= 0 && minutes > 0 && (loadingClaim === 0 || loadingClaim === 2) ? (
          <div className='show' style={{ marginLeft: '10px', paddingTop: '1px' }}>
            <span style={{ color: 'white' }}>Time remaining <br /> {hours} : {minutes}</span>
          </div>
        ) : ('')}

        {buttonClaim === "Pending" || buttonRefund === "Pending" ? (
          <Tooltip title="Currently, the network is unstable, so the token delivery may be slower than expected">
          <i className="fa fa-exclamation-circle icon-warning-networks" aria-hidden="true" />
          </Tooltip>) : ''
        }
      </div>
      <Modal className="modal-refund" title="Confirm Claim Token" visible={isModalClaimVisible} onOk={_handleClaim} onCancel={handleClaimCancel}>
        Are you sure want to Claim tokens?
      </Modal>
      <Modal className="modal-refund" title="Confirm Refund" visible={isModalRefundVisible} onOk={_handleClaimRefund} onCancel={handleRefundCancel}>
        Are you sure you want to refund?
      </Modal>
    </div>
  )
})

export default YourInvestment
