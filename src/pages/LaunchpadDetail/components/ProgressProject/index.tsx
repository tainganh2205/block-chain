/* eslint-disable prefer-const */
import React from "react"
import "./index.less"
import IdoProcessing from '../../IdoProcessing'

const ProgressProject = ({ido_detail, socical, socketInfo}) => {
  const ido_status = ido_detail ? ido_detail.status : 0
  const idoId = ido_detail ? ido_detail.id : 0
  const percentProcess = ido_detail ? ido_detail.percentProcess : null

  function numberWithCommas(x) {
    x = parseInt(String(x))
    // eslint-disable-next-line prefer-template
    const y = "" + x;
    return y.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const totalSale = numberWithCommas(ido_detail && ido_detail.totalSale);
  const symbol = ido_detail && ido_detail.symbol;
  const swapAmount = ido_detail && ido_detail.swapAmount;
  const is_network_bep = ido_detail && ido_detail.network === 'bep'
  const is_network_poly = ido_detail && ido_detail.network === 'poly'
  const classNetwork = is_network_bep ? 'bsc-p-launchpad_detail-progress' : is_network_poly ? 'poly-p-launchpad_detail-progress' : 'erc20-p-launchpad_detail-progress'
  return (
    <div className={classNetwork}>
      <div className="bsc-p-launchpad_detail-progress-top">
        <div className="bsc-p-launchpad_detail-progress-top-left">
          <span>Swap Amount</span>
          <span>
            {totalSale} {symbol}
          </span>
        </div>
        <div className="bsc-p-launchpad_detail-progress-top-right">
          <span>{swapAmount}</span>
        </div>
      </div>
      <div className="bsc-p-launchpad_detail-progress-line" />
      <div className="bsc-p-launchpad_detail-progress-bottom">
        <span>Swap progress</span>
        <IdoProcessing idoId={idoId} ido_status={ido_status} percentProcess={percentProcess} socketInfo={socketInfo}/>
        <div>
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProgressProject)
