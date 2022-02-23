import React, { useState } from 'react'
import { Drawer, Button, Tabs, Radio, Modal, Collapse, Progress, Tooltip } from 'antd'
import { useHookPrediction } from './Store'
import { useActiveWeb3React } from '../../hooks'
import ModalClaim from './ModalClaim'
import SocketTimer from './SocketTimer'

const SocialInfo = ({socketInfo}) => {
  const { account } = useActiveWeb3React()
  const [state, actions] = useHookPrediction()
  const [visible, setVisible] = useState(false)

  let historys: any = state.historys
  const report: any = state.report
  const showDrawer = () => {
    actions.setHistory(true)
    if (account) {
      actions.getHitorys(account)
    }
    setVisible(true)
  }
  const onClose = () => {
    actions.setHistory(false)
    setVisible(false)
  }
  const { TabPane } = Tabs
  function callback(key) {
    if (key === 'history' && account) {
      actions.getHitorys(account)
    }
    if (key === 'pnl' && account) {
      actions.getReport(account)
    }
  }
  const [value, setValue] = React.useState(1)
  const onChange = (e) => {
    setValue(e.target.value)
  }

  // claim
  if (value === 2) {
    historys = historys && historys.filter((x) => [4, 5, 6].indexOf(x.joinedStatus) !== -1)
  }

  // not claim
  if (value === 3) {
    historys = historys && historys.filter((x) => [2].indexOf(x.joinedStatus) !== -1)
  }

  const { Panel } = Collapse

  const handleCancel = () => {
    actions.setModal(false)
  }

  const headerTabV2 = (item) => (
    <div className="box-header">
      <div className="header-left">
        <h3 className="title">
          Round <span className="price">{item.id}</span>
        </h3>
      </div>
      <div className="header-right">
        <h3 className="title">
          Your Result <span className="price main-color-win">+{item.bonus}</span>
        </h3>
      </div>
      <div className="header-btn">
        {item.joinedStatus === 2 && (value === 3 || value === 1) ? (
          <Button
            className="btn-collect"
            type="primary"
            onClick={() => {
              actions.updateObjHistory(item)
              actions.setModal(true)
            }}
          >
            Collect
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
  const headerTabV3 = (item) => (
    <div className="box-header">
      <div className="header-left">
        <h3 className="title">
          Round <span className="price">{item.id}</span>
        </h3>
      </div>
      <div className="header-right">
        <h3 className="title">
          Your Result <span className="price main-color-lose">-{Math.abs(item.yourPosition)}</span>
        </h3>
      </div>
    </div>
  )
  const headerTabCommon = (item) => (
    <div className="box-header">
      <div className="header-left">
        <h3 className="title">
          Round <span className="price">{item.id}</span>
        </h3>
      </div>
      <div className="header-right">
        <span className="text-win">
          {item.roundStatus === 2 ? (
            <h3 className="title live-start-custome">
              LIVE NOW <img src="/images/imagesPrediction/play-button-1.png" alt="" />{' '}
            </h3>
          ) : (
            ''
          )}
          {item.roundStatus === 1 ? (
            <h3 className="title live-start-custome">
              Starting Soon <img src="/images/imagesPrediction/play-button-1.png" alt="" />
            </h3>
          ) : (
            ''
          )}
        </span>
      </div>
    </div>
  )
  const historyWin = (item) => {
    return (
      <div className="box-history-win">
        <div className="item-history">
          <div className="item-content">
            <h3 className="title">
              Your History{' '}
              <span className="text-win">
                WIN <img src="/images/imagesPrediction/icon-surface.png" alt="" />
              </span>
            </h3>
            <div className="guide-wrap">
              <ul className="list-result">
                <li>
                  <div className="text-left">Your choice</div>
                  <div className={`text-right ${item.yourPosition < 0 ? 'cus lose' : 'cus'}`}>
                    <img
                      className="img-arrow"
                      alt=""
                      src={`/images/imagesPrediction/${
                        item.yourPosition > 0 ? 'left-arrow-white.png' : 'left-arrow-down.png'
                      }`}
                    />
                    {'\u00A0'}
                    {item.yourPosition > 0 ? 'Up' : 'Down'}
                  </div>
                </li>
                <li>
                  <div className="text-left">Your position</div>
                  <div className="text-right">{Math.abs(item.yourPosition)} BNB</div>
                </li>
                <li>
                  <div className="text-left font-w-bold">Your Result</div>
                  <div className="text-right font-w-bold main-color-win">
                    +{item.bonus} BNB <span className="txt-re">~${(item.bonus * item.closedPrice).toFixed(4)}</span>
                  </div>
                </li>
                <li>
                  <div className="text-left css-amount">Amount to collect:</div>
                  <div className="text-right css-amount">
                    {item.amount} BNB
                    <Tooltip title="Includes your original position and your winnings, minus the 3% free.">
                      <img src="/images/imagesPrediction/information.png" alt="" />
                    </Tooltip>
                    <span className="txt-re">{` `}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="item-content">
            <h3 className="title">Round History</h3>
            <div className={`guide-wrap ${item.profit < 0 ? 'res' : 'cus'}`}>
              <ul className="list-result">
                <li>
                  <div className="box-close-price">
                    <h5 className="title-close">CLOSED PRICE</h5>
                    <div className="wrap-close">
                      <div className="price-left">
                        ${item.closedPrice}{' '}
                        <Tooltip title="Last price from Binance Exchange">
                          <img src="/images/imagesPrediction/information.png" alt="" />
                        </Tooltip>
                      </div>
                      <div className={`price-right ${item.profit < 0 ? 'cus' : ''}`}>
                        <img
                          src={`/images/imagesPrediction/${
                            item.profit < 0 ? 'left-arrow-red' : 'left-arrow-green'
                          }.png`}
                          alt=""
                          className="img-arrow"
                        />{' '}
                        ${item.profit}
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="text-left">Locked Price:</div>
                  <div className="text-right">${item.lockedPrice}</div>
                </li>
                <li>
                  <div className="text-left font-w-bold">Prize Pool:</div>
                  <div className="text-right font-w-bold">{item.prizePool} BNB</div>
                </li>
                <li>
                  <div className="text-left">UP:</div>
                  <div className="text-right">
                    <span className="font-w-bold">{item.upPayout}x Payout</span> | {item.totalUp}
                    BNB
                  </div>
                </li>
                <li>
                  <div className="text-left">DOWN:</div>
                  <div className="text-right">
                    <span className="font-w-bold">{item.downPayout}x Payout</span> | {item.totalDown}
                    BNB
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="box-opening">
            <div className="item-opening mar-b-10">
              <h5 className="title-open">Opening Block</h5>
              <p className="price-open">{item.openBlock}</p>
            </div>
            <div className="item-opening">
              <h5 className="title-open">Closing Block</h5>
              <p className="price-open">{item.closeBlock}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const historyLose = (item) => {
    return (
      <div className="box-history-win">
        <div className="item-history">
          <div className="item-content">
            <h3 className="title">
              Your History{' '}
              <span className="text-win cus">
                LOSE <img src="/images/imagesPrediction/banned-sign.png" alt="" />
              </span>
            </h3>
            <div className="guide-wrap">
              <ul className="list-result">
                <li>
                  <div className="text-left">Your choice</div>
                  <div className={`text-right ${item.yourPosition < 0 ? 'cus lose' : 'cus'}`}>
                    <img
                      src={`/images/imagesPrediction/${
                        item.yourPosition > 0 ? 'left-arrow-white.png' : 'left-arrow-down.png'
                      }`}
                      alt=""
                      className="img-arrow"
                    />{' '}
                    {item.yourPosition > 0 ? 'Up' : 'Down'}
                  </div>
                </li>
                <li>
                  <div className="text-left">Your position</div>
                  <div className="text-right">{Math.abs(item.yourPosition)} BNB</div>
                </li>
                <li>
                  <div className="text-left font-w-bold">Your Result</div>
                  <div className="text-right font-w-bold main-color-lose">
                    -{Math.abs(item.yourPosition)} BNB{' '}
                    <span className="txt-re">~${(Math.abs(item.yourPosition) * item.closedPrice).toFixed(4)}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="item-content">
            <h3 className="title">Round History</h3>
            <div className={`guide-wrap  ${item.profit < 0 ? 'res' : 'cus'}`}>
              <ul className="list-result">
                <li>
                  <div className="box-close-price">
                    <h5 className="title-close">CLOSED PRICE</h5>
                    <div className="wrap-close">
                      <div className="price-left">
                        ${item.closedPrice}{' '}
                        <Tooltip title="Last price from Binance Exchange">
                          <img src="/images/imagesPrediction/information.png" alt="" />
                        </Tooltip>
                      </div>
                      <div className={`price-right ${item.profit < 0 ? 'cus' : ''}`}>
                        <img
                          src={`/images/imagesPrediction/${
                            item.profit < 0 ? 'left-arrow-red' : 'left-arrow-green'
                          }.png`}
                          alt=""
                          className="img-arrow"
                        />{' '}
                        ${item.profit}
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="text-left">Locked Price:</div>
                  <div className="text-right">${item.lockedPrice}</div>
                </li>
                <li>
                  <div className="text-left font-w-bold">Prize Pool:</div>
                  <div className="text-right font-w-bold">{item.prizePool} BNB</div>
                </li>
                <li>
                  <div className="text-left">UP:</div>
                  <div className="text-right">
                    <span className="font-w-bold">{item.upPayout}x Payout</span> | {item.totalUp} BNB
                  </div>
                </li>
                <li>
                  <div className="text-left">DOWN:</div>
                  <div className="text-right">
                    <span className="font-w-bold">{item.downPayout}x Payout</span> | {item.totalDown}BNB
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="box-opening">
            <div className="item-opening mar-b-10">
              <h5 className="title-open">Opening Block</h5>
              <p className="price-open">{item.openBlock}</p>
            </div>
            <div className="item-opening">
              <h5 className="title-open">Closing Block</h5>
              <p className="price-open">{item.closeBlock}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const contentRounds = (state2) => (
    <div className="content-rounds-wrap">
      <div className="box-filter">
        <h4 className="title-filter">Filter</h4>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>All</Radio>
          <Radio value={2}>Collected</Radio>
          <Radio value={3}>Uncollected</Radio>
        </Radio.Group>
      </div>
      <div className="box-tab-collapse">
        <Collapse defaultActiveKey={['']} onChange={callback}>
          {historys.map((item: any) => {
            if (item.roundStatus === 3) {
              return (
                <Panel header={headerTabV2(item)} key={item.id}>
                  {historyWin(item)}
                </Panel>
              )
            }
            if (item.roundStatus === 4) {
              return (
                <Panel header={headerTabV3(item)} key={item.id}>
                  {historyLose(item)}
                </Panel>
              )
            }

            // start soon / live
            return <>{headerTabCommon(item)}</>
          })}
        </Collapse>
      </div>
    </div>
  )

  const ContentPnl = () => {
    const { lost, won, entered, avgPositionEntered, bestRound, avgReturn, wonPercent, netResult }: any = report
    return (
      <div className="content-pnl-wrap">
        <div className="box-pnl-wrap">
          <h3 className="title-pnl">Your History</h3>
          <div className="box-progess-pnl">
            <div className="progess">
              <span className="status-progess">Won</span>
              <Progress
                strokeLinecap="square"
                type="circle"
                percent={wonPercent.percent}
                // percent={50}
                format={(percent) => `${percent}%`}
              />{' '}
              <span className="status-percent">
                {wonPercent.totalWon}/{wonPercent.totalLost + wonPercent.totalWon}
              </span>
            </div>
            <div className="box-result">
              <h4 className="title-result">Net results</h4>
              <p className="price-result">{netResult.amount} BNB</p>
              <p className="price-donate">~${netResult.price}</p>
            </div>
          </div>
          <div className="box-list-rounds">
            <div className="list-item">
              <div className="item-round">
                <h4 className="title-round">Average return/ round</h4>
                <p className="price-round">{avgReturn.amount} BNB</p>
                <p className="price-donate">~${avgReturn.price}</p>
              </div>
              <div className="item-round">
                <h4 className="title-round">Best round: #{bestRound.roundId}</h4>
                <p className="price-round">
                  <span className="main-color-win">{bestRound.amount} BNB</span>{' '}
                  <span className="cus-price">({bestRound.payout}x)</span>
                </p>
                <p className="price-donate">~${bestRound.price}</p>
              </div>
              <div className="item-round">
                <h4 className="title-round">Average postion entered / round</h4>
                <p className="price-round">
                  <span className="main-color-buy">{avgPositionEntered.amount} BNB</span>
                </p>
                <p className="price-donate">~${avgPositionEntered.price}</p>
              </div>
            </div>
          </div>
          <div className="box-summary">
            <div className="item-summary">
              <h4 className="title-sum">Won</h4>
              <ul className="list-summary">
                <li className="main-color-win">
                  {won.total} rounds <span className="tlt"> {won.percent}%</span>
                </li>
                <li className="main-color-win">
                  {won.amount} BNB <span className="tlt">~${won.price}</span>
                </li>
              </ul>
            </div>
            <div className="item-summary">
              <h4 className="title-sum">Lost</h4>
              <ul className="list-summary">
                <li className="main-color-lose">
                  {lost.total} rounds <span className="tlt">{lost.percent}%</span>
                </li>
                <li className="main-color-lose">
                  {lost.amount} BNB <span className="tlt">~${lost.price}</span>
                </li>
              </ul>
            </div>
            <div className="item-summary">
              <h4 className="title-sum">Entered</h4>
              <ul className="list-summary">
                <li className="main-color-buy">
                  {entered.total} rounds <span className="tlt">Total</span>
                </li>
                <li className="main-color-buy">
                  {entered.amount} BNB <span className="tlt">~${entered.price} </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="box-view-claim">
            <button
              onClick={() => {
                window.open(`https://bscscan.com/address/${account}`, '_blank')
              }}
              type="button"
              className="button-claim"
            >
              View Reclaimed &#38; Won
            </button>
          </div>
        </div>
      </div>
    )
  }

  const drawerBox = (state2) => (
    <div className="content-wrap-drawer">
      <Button className="button-close" onClick={() => setVisible(false)} type="text">
        <span className="menu-size">Close</span>
      </Button>
      <Tabs className="tab-in-drawer" defaultActiveKey="history" onChange={callback}>
        <TabPane tab="Rounds" key="history">
          {contentRounds(state2)}
        </TabPane>
        <TabPane tab="PNL" key="pnl">
          <ContentPnl />
        </TabPane>
      </Tabs>
    </div>
  )
  // @ts-ignore
  return (
    <>
      <ModalClaim
        handleOk={handleCancel}
        handleCancel={handleCancel}
        account={account}
        isModal={state.isModal}
        objHistory={state.objHistory}
        actions={actions}
      />
      <Drawer
        className="drawer-wrapper"
        title="History"
        width={592}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {drawerBox(state)}
      </Drawer>
      <div className="box-social-info">
        <ul className="list-social">
          <li>
            <div className="item-wrap">
              <h5 className="title-wrap">History</h5>
              <div className="icon-wrap">
                <Button type="primary" onClick={showDrawer}>
                  <img src="/images/imagesPrediction/icon-clock.png" alt="" />
                </Button>
              </div>
            </div>
          </li>
          <li>
            <div className="item-wrap cus-dollar">
              <h5 className="title-wrap">BNB/USDT</h5>
              <div className="icon-wrap">
                <img src="/images/imagesPrediction/icon-bnb.png" alt="" />
              </div>
            </div>
          </li>
          <li>
            <div className="item-wrap cus-time">
              <h5 className="title-wrap">
                <SocketTimer socketInfo={socketInfo}/> <span className="cus-txt">5m</span>
              </h5>
              <div className="icon-wrap">
                <img src="/images/imagesPrediction/icon-time.png" alt="" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}
export default SocialInfo
