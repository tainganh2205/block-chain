import React, { useEffect, useState, useCallback } from 'react'
import FullCalendar, { EventContentArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useHistory } from 'react-router-dom'
import { Input, Collapse, Tabs } from 'antd'
import { AudioOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useWeb3React } from '@web3-react/core'
import { isMobile } from 'react-device-detect'
import { useContract } from 'hooks/useContract'
import TabDetail from './TabDetail'
import { useHookProjects } from './Store'
import abiClaim from './abiClaim.json'
import SchedulesJoined from './SchedulesJoined'

const ItemDesktop = ({ handleChangeView, account, ido, index }: any) => {
  const claimContract = useContract(ido.contractAddress, abiClaim)
  const [claimed, setClaimed] = useState(0)
  const [claimedDaily, setClaimedDaily] = useState(0)

  useEffect(() => {
    if (claimContract && ido.contractAddress) {
      claimContract.totalClaimed(account).then((res) => {
        setClaimed(res.toString() / 1e18)
      })
    }
  }, [account, claimContract, ido.contractAddress])

  useEffect(() => {
    if (account && claimContract && ido.contractDailyAddress) {
      claimContract.userInfo(account).then((res) => {
        setClaimedDaily(res.tokensClaimed / 1e18)
      })
    }
  }, [account, claimContract, ido.contractDailyAddress])

  return (
    <tr>
      <td className="main-cl-v3">
        <button type="button" className="btn-view-dt p-name-token" onClick={() => handleChangeView(ido.symbol)}>
          {ido.name}
        </button>
      </td>
      <td>{ido.symbol}</td>
      {/* <td>{ido.symbol}</td> */}
      <td>{ido.nextClaim}</td>
      <td className="main-cl-v3">{ido.allocation}</td>
      <td className="main-cl-v3">{(claimed + claimedDaily + ido.claimed).toFixed(2)}</td>
      <td className="main-cl-v3">{ido.claimable}</td>
    </tr>
  )
}
const ItemMobile = ({ account, ido, index }: any) => {
  const claimContract = useContract(ido.contractAddress, abiClaim)
  const [claimed, setClaimed] = useState(0)
  const [claimedDaily, setClaimedDaily] = useState(0)

  useEffect(() => {
    if (claimContract && ido.contractAddress) {
      claimContract.totalClaimed(account).then((res) => {
        setClaimed(res.toString() / 1e18)
      })
    }
  }, [account, claimContract, ido.contractAddress])

  useEffect(() => {
    if (account && claimContract && ido.contractDailyAddress) {
      claimContract.userInfo(account).then((res) => {
        setClaimedDaily(res.tokensClaimed / 1e18)
      })
    }
  }, [account, claimContract, ido.contractDailyAddress])

  return (
    <div className="content-joined-mobile">
      <div className="colum-content">
        <div className="item-content">
          <div className="text-l">Next Claim:</div>
          <div className="text-r">{ido.nextClaim}</div>
        </div>
        <div className="item-content">
          <div className="text-l">Allocation:</div>
          <div className="text-r">{ido.allocation}</div>
        </div>
        <div className="item-content">
          <div className="text-l">Claimed:</div>
          <td className="main-cl-v3">{(claimed + claimedDaily + ido.claimed).toFixed(2)}</td>
        </div>
        <div className="item-content">
          <div className="text-l">Claimable:</div>
          <div className="text-r">{ido.claimable}</div>
        </div>
      </div>
    </div>
  )
}
const ListHeader = (props: any) => {
  const { ido, handleChangeView } = props
  return (
    <div className="content-heaer">
      <div className="item">
        <span className="main-cl-v3">{ido.name}</span>
      </div>
      <div className="item">{ido.symbol}</div>
      <div className="item main-green">
        <button type="button" className="btn-view-dt p-name-token" onClick={() => handleChangeView(ido.symbol)}>
          Details
        </button>
      </div>
    </div>
  )
}

const TabsContentJoined = (props): any => {
  const { account, chainId }: any = useWeb3React()
  const history = useHistory()
  const [state, actions]: any = useHookProjects()
  const { idoList, listIdoJoined, idoListScheduleJoined, status, activeTab } = props
  console.log(idoListScheduleJoined)
  const [isLoading, setIsLoading] = useState(true)
  const [newSchedule, setNewSchedule] = useState([])
  const { Search } = Input
  const [showDetail, setShowDetail] = useState(false)
  const [enableLoadMore, setEnableLoadMore] = useState(true)
  const [activeSymbol, setActiveSymbol] = useState('')
  const { Panel } = Collapse
  function callback(key) {
    // TODO
  }
  const { TabPane } = Tabs

  function renderEventContent(eventInfo, arr) {
    return (
      <>
        <button type="button" className="btn-view-dt p-name-token" onClick={() => handleChangeView(eventInfo.event.id)}>
          <img className="event-image" src={eventInfo.event.title} alt="" />
        </button>
      </>
    )
  }

  useEffect(() => {
    if (listIdoJoined?.length > 0) {
      setIsLoading(false)
      const arr = listIdoJoined.map((ido) => ({
        start: ido.nextDate,
        title: ido.logoUrl,
        id: ido.symbol,
      }))
      const arrMore = state.idoListJoinedMore.map((ido) => ({
        start: ido.nextDate,
        title: ido.logoUrl,
        id: ido.symbol,
      }))
      const arrFull = arr.concat(arrMore)
      setNewSchedule(arrFull)
      // setNewSchedule(arr)
    } else if (listIdoJoined?.length === 0) {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listIdoJoined, state.idoListJoinedMore])

  function handleChange(value) {
    const params = {
      category: 0,
      symbol: value,
      address: account,
      lastTime: null,
    }
    actions.getProjectJoined(params)
  }

  // HANDLE CHANGE VIEW
  const pathHash = history.location.search.split('?')
  const tabSymbol = pathHash[2]
  // const typeIdo = pathHash[1]

  const handleChangeView = (symbol) => {
    setActiveSymbol(symbol)
    setShowDetail(!showDetail)
    history.push({
      pathname: history.location.pathname,
      search: `${activeTab}?${symbol}`,
    })
  }

  useEffect(() => {
    if (tabSymbol) {
      setShowDetail(true)
    } else {
      setShowDetail(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabSymbol])

  useEffect(() => {
    if (activeTab && !tabSymbol) {
      setShowDetail(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  const params = {
    address: account,
    category: 0,
    lastTime: listIdoJoined.length > 0 ? listIdoJoined[listIdoJoined.length - 1].created : null,
  }

  const handleLoadMore = () => {
    if (state.idoListJoinedMore.length > 0) {
      params.lastTime = state.idoListJoinedMore[state.idoListJoinedMore.length - 1].created
    }

    console.log('params', params)

    actions.getProjectJoinedMore(params).then((data) => {
      if (data.length === 0) setEnableLoadMore(false)
    })
  }

  if (isMobile) {
    return (
      <>
        {!showDetail && (
          <div className="style-btn">
            <Tabs defaultActiveKey="ListTabs" onChange={callback}>
              <TabPane tab="View Table" key="ListTabs">
                <div className="main-table-end">
                  {showDetail ? (
                    <TabDetail activeTab={activeTab} />
                  ) : (
                    <>
                      <div className="box-search-v3">
                        <Search placeholder="Search for project" onSearch={handleChange} />
                      </div>
                      <div className="box-table table-mobile">
                        <table>
                          <tr>
                            <th>Project Name</th>
                            <th>Symbol</th>
                            <th>Action</th>
                          </tr>
                        </table>
                      </div>
                      <div className="tab-collapse-mobile">
                        <Collapse defaultActiveKey={['index']} onChange={callback}>
                          {state.idoListJoined?.length > 0 &&
                            state.idoListJoined?.map((ido, index) => (
                              <Panel
                                header={<ListHeader ido={ido} handleChangeView={handleChangeView} />}
                                key={index.toString()}
                              >
                                <ItemMobile ido={ido} account={account} index={index} />
                              </Panel>
                            ))}

                          {state.idoListJoined?.length > 0 && state.idoListJoinedMore?.length > 0
                            ? state.idoListJoinedMore.map((ido, index) => (
                                <Panel
                                  header={<ListHeader ido={ido} handleChangeView={handleChangeView} />}
                                  key={index.toString()}
                                >
                                  <ItemMobile ido={ido} account={account} index={index} />
                                </Panel>
                              ))
                            : ''}
                        </Collapse>
                      </div>
                      <div className="btn-more-v3">
                        {enableLoadMore && state.idoListJoined.length !== 0 ? (
                          <button className="load-more-v3" type="button" onClick={handleLoadMore}>
                            Load more
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    </>
                  )}
                </div>
              </TabPane>
              <TabPane tab="View Calendar" key="ListCalendar">
                <div className="main-caledar">
                  <SchedulesJoined activeTab={activeTab} idoListScheduleJoined={idoListScheduleJoined} />
                </div>
              </TabPane>
            </Tabs>
          </div>
        )}
        {showDetail ? <TabDetail activeTab={activeTab} /> : ''}
      </>
    )
  }
  return (
    <>
      {!showDetail && (
        <div className="list-grid-joined">
          <Tabs defaultActiveKey="ListTabs" onChange={callback}>
            <TabPane tab="View Table" key="ListTabs">
              <div className="main-table-end">
                {!showDetail && (
                  <div className="box-search-v3">
                    <div className="box-search-v3">
                      <Search placeholder="Search" onSearch={handleChange} />
                    </div>
                  </div>
                )}
                {showDetail ? (
                  <TabDetail activeTab={activeTab} />
                ) : (
                  <div className="box-table">
                    <table>
                      <tr>
                        <th>Project Name</th>
                        <th>Symbol</th>
                        <th>Next Claim</th>
                        <th>Allocation</th>
                        <th>Claimed</th>
                        <th>Claimable</th>
                      </tr>

                      {state.idoListJoined?.length > 0 ? (
                        state.idoListJoined?.map((ido, index) => (
                          <ItemDesktop handleChangeView={handleChangeView} account={account} ido={ido} index={index} />
                        ))
                      ) : (
                        <td colSpan={6}>
                          <div className="box-message res">
                            <div className="info-message">Empty !</div>
                            <img src="/images/nobidding.svg" alt="unknown-artwork" className="img-message" />
                          </div>
                        </td>
                      )}
                      {state.idoListJoined?.length > 0 && state.idoListJoinedMore?.length > 0
                        ? state.idoListJoinedMore.map((ido, index) => (
                            <ItemDesktop
                              handleChangeView={handleChangeView}
                              account={account}
                              ido={ido}
                              index={index}
                            />
                          ))
                        : ''}
                    </table>
                    <div className="btn-more-v3">
                      {enableLoadMore && state.idoListJoined.length !== 0 ? (
                        <button className="load-more-v3" type="button" onClick={handleLoadMore}>
                          Load more
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabPane>
            <TabPane tab="View Calendar" key="ListCalendar">
              <div className="main-caledar mar-top-60">
                <SchedulesJoined activeTab={activeTab} idoListScheduleJoined={idoListScheduleJoined} />
              </div>
            </TabPane>
          </Tabs>
        </div>
      )}
      {showDetail ? <TabDetail activeTab={activeTab} /> : ''}
    </>
  )
}
export default TabsContentJoined
