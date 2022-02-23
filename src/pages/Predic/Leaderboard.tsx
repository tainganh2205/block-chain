import React, { useState } from 'react'
import { Button, Drawer, Radio, Tabs } from 'antd'
import { useHookPrediction } from './Store'
import { useActiveWeb3React } from '../../hooks'
import ModalClaimBonus from './ModalClaimBonus'

const Leaderboard = React.memo((): any => {
    const { account } = useActiveWeb3React()
    const [state, actions] = useHookPrediction()
    const [visible, setVisible] = useState(false)
    const theBest: any = state.theBest
    const [valueRadio, setValueRadio] = React.useState(3)

    const showDrawer = () => {
        actions.setTheBestWin(true)
        actions.getTheBests(3, '')
        setVisible(true)
    }
    function callback(key) {
        if (key === 'winner') {
            setValueRadio(4)
            actions.getTheBests(4, '')
        } else if (key === 'top_volume') {
            setValueRadio(3)
            actions.getTheBests(3, '')
        }
    }
    const onChange = (e) => {
        const _value = e.target.value
        setValueRadio(_value)
        actions.getTheBests(_value, account)
    }
    const onClose = () => {
        setVisible(false);
    };
    const { TabPane } = Tabs
    const handleCancel = () => {
        actions.setModalClaimBonus(false)
    }

    const tenVolum = (item , index, key) => {
        return (
            <>
                <div className="box-ten-volum" key={key}>
                    <ul className="list-ten-volum" key={key}>
                        <li key={key}>
                            <div className="box-item-volum">
                                <div className="content-volum">
                                    <div className="content-top">
                                        No
                                    </div>
                                    <div className="content-bottom">
                                       {index}
                                    </div>
                                </div>
                                <div className="content-volum">
                                    <div className="content-top">
                                        Wallet
                                    </div>
                                    <div className="content-bottom">
                                        {item.address}
                                    </div>
                                </div>
                                <div className="content-volum">
                                    <div className="content-top">
                                        Amount
                                    </div>
                                    <div className="content-bottom color-amount">
                                    {item.balance} BNB
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        )
    }

    const tenWinner = (item , index, key) => {
        return (
            <>
                <div className="box-ten-volum" key={key}>
                    <ul className="list-ten-volum" key={key}>
                        <li key={key}>
                            <div className="box-item-volum">
                                <div className="content-volum">
                                    <div className="content-top">
                                        No
                                    </div>
                                    <div className="content-bottom">
                                        {index}
                                    </div>
                                </div>
                                <div className="content-volum">
                                    <div className="content-top">
                                        Wallet
                                    </div>
                                    <div className="content-bottom">
                                        {item.address}
                                    </div>
                                </div>
                                <div className="content-volum">
                                    <div className="content-top">
                                        Amount
                                    </div>
                                    <div className="content-bottom color-amount">
                                    {item.balance} BNB
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        )
    }

    const collectBonus = theBest.find(x => x.receiveId > 0 && x.bonus > 0)
    let claimStatus = 0
    if (collectBonus !== undefined)
        claimStatus = collectBonus.statusBonus

    const ContentTopVolume = () => {
        return (
        <div className="content-rounds-wrap">
            <div className="box-volume-filter">
                <Radio.Group onChange={onChange} value={valueRadio}>
                    <Radio value={3}>Current Week</Radio>
                    <Radio value={2}>Last Week</Radio>
                </Radio.Group>
            </div>
            <div className="box-tab-collapse">
                {claimStatus === 1 ? (
                  <div className="box-collect-win">
                      <button
                        type="button"
                        className="btn-collect-win"
                        onClick={() => {
                            actions.updateObjBonus({
                                Bonus: collectBonus.bonus,
                                BonusPrice: collectBonus.bonusPrice,
                                ReceiveId: collectBonus.receiveId
                            })
                            actions.setModalClaimBonus(true)
                        }}
                      >
                          Collect
                      </button>
                  </div>
                ) : claimStatus === 2 ? (
                  <div className="box-collect-win">
                      <button
                        type="button"
                        className="btn-collected-win"
                        disabled
                      >
                          Collected
                      </button>
                  </div>
                ) : ("")}
                {theBest.map((item: any, index) => (
                  (tenVolum(item, index + 1, valueRadio * index + 100))
                ))}
            </div>
        </div>
        )
    }

    const ContentTopWiner = () => {
        return (
          <div className="content-rounds-wrap">
              <div className="box-volume-filter">
                  <Radio.Group onChange={onChange} value={valueRadio}>
                      <Radio value={4}>Current Week</Radio>
                      <Radio value={1}>Last Week</Radio>
                  </Radio.Group>
              </div>
              <div className="box-tab-collapse">
                  {theBest.map((item: any, index) => (
                    (tenWinner(item,  index + 1, valueRadio * index + 200))
                  ))}
              </div>
          </div>
        )
    }

    const drawerLeaderboard = (
      <div className="content-wrap-drawer">
          <Button className="button-close" onClick={() => setVisible(false)} type="text">
              <span className="menu-size">Close</span>
          </Button>
          <Tabs className="tab-in-drawer" defaultActiveKey="history" onChange={callback} key="0">
              <TabPane tab="Top 10 Volume" key="top_volume">
                  <ContentTopVolume />
              </TabPane>
              <TabPane tab="Top 10 Winner" key="winner">
                  <ContentTopWiner />
              </TabPane>
          </Tabs>
      </div>
    )
    return (
        <>
            <ModalClaimBonus
              handleOk={handleCancel}
              handleCancel={handleCancel}
              account={account}
              isModal={state.isModalClaimBonus}
              objBonus={state.objBonus}
              actions={actions}
            />
            <Drawer
                className="drawer-wrapper drawer-leader-board"
                title="Leaderboard"
                width={592}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                {drawerLeaderboard}
            </Drawer>
            <div className="box-leader-board">
                <button type="button" onClick={showDrawer} className="btn-leader-board">
                    Leaderboard <img src="/images/imagesPrediction/podium.svg" alt="" />
                </button>
            </div>
        </>
    )
})

export default Leaderboard