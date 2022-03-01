import React, { useRef, useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useHistory } from 'react-router-dom'
import { Tabs, Progress, Input } from 'antd'
import { AudioOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { store } from 'react-notifications-component'
import DetailsTabsContentActive from '../LaunchpadV3Detail/DetailsTabsContentActive'

import { useHookProjects } from './Store'
import bgLogo from '../../images/bg-ab-v3.png'
import TabDetail from './TabDetail'

const TabsContentActive = (props): any => {
  const [state, actions]: any = useHookProjects()
  const { idoList, activeTab, activeSymbol } = props
  const { account } = useWeb3React()


  // ------- GET PATH NAME --------
  const history = useHistory()
  const pathHash = history.location.search.split("?");
  const tabSymbol = pathHash[2];
  // const tabBox = pathHash[2];
  // const typeIdo = pathHash[1];

  const [typeView, setTypeView] = useState("")
  const [activeIDO, setActiveIDO] = useState<{
    pageIndex: number | null
    pageID: number | null
    symbol: string | null
  }>({
    pageIndex: null,
    pageID: null,
    symbol: null,
  })

  const [idoListView, setIdoListView] = useState(idoList)
  const [activeDetail, setActiveDetail] = useState(null)
  const [isCallDetail, setIsCallDetail] = useState(false);

  // HANDLE CHANGEVIEW

  const handleCallClick = (symbol) => {
    history.push({
      pathname: history.location.pathname,
      search: `${activeTab}?${symbol}`
    })
    setTypeView("detail")
  }


  const handleCallDetail = async (symbol) => {

    const address = account
    const param = { address, symbol }

    actions.getProjectDetal(param).then((res) => {
      if (res && res.status === 200) {

        setActiveDetail(res.data.data)
        const arr: any = []
        arr.push(res.data.data)
        setIdoListView(arr)
      }
    })
   setTypeView('detail')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  useEffect(() => {
   
    if(tabSymbol) {
      setTypeView('detail')
    } else {
      setTypeView("list")
      setIdoListView(state.idoList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tabSymbol]);
  

  useEffect(() => {
    if(!tabSymbol) {
      setIdoListView(state.idoList)
      setTypeView("list")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state])

  return (
    <>

            {typeView === "list" ? idoListView?.length > 0
                ? idoListView.map((ido, index) => (
                  <div className="main-cnt-tabs">
                    <div className="box-content-active">
                      <div className="top-content" style={{ backgroundImage: `url(${bgLogo})` }}>
                        <div className="box-img">
                          <img src={ido.logoUrl} alt="" />
                        </div>
                      </div>
                      <div className="body-content">
                        <div className="guide-wrap">
                          <div className="wrap-top">
                            <h4 className="title">
                              {ido.name} <span>{ido.unit}</span>
                            </h4>
                            <p className="desc">{ido.description}</p>
                          </div>
                          <div className="wrap-middle">
                            <div className="social-address">
                              <div className="box-social">
                                <a href={ido.socical.telegram} target="blank">
                                  <img src="/images/imagesV3/telegram.png" alt="" />
                                </a>
                                <a href={ido.socical.twitter} target="blank">
                                  <img src="/images/imagesV3/twi.png" alt="" />
                                </a>
                                <a href={ido.socical.medium} target="blank">
                                  <img src="/images/imagesV3/medium.png" alt="" />
                                </a>
                                <a href={ido.socical.website} target="blank">
                                  <img src="/images/imagesV3/link.png" alt="" />
                                </a>
                              </div>
                              <div className="box-address">
                                <div className="address-wl">
                                  <span>
                                    {ido.idoContract &&
                                      `${ido.idoContract.substring(0, 8)}...${ido.idoContract.substring(
                                        28,
                                        ido.idoContract.length
                                      )}`}
                                  </span>
                                  <CopyToClipboard
                                    text={ido.idoContract}
                                    onCopy={() =>
                                      store.addNotification({
                                        title: 'Copied',
                                        message: (
                                          <div className="custom-fontsize">
                                            <i className="fa fa-check-square-o icon-success" aria-hidden="true" />
                                            Successfully !
                                          </div>
                                        ),
                                        type: 'warning',
                                        width: 300,
                                        insert: 'center',
                                        container: 'top-center',
                                        animationIn: ['animate__animated success', 'animate__fadeIn'],
                                        animationOut: ['animate__animated success', 'animate__fadeOut'],
                                        dismiss: {
                                          duration: 1000,
                                          onScreen: true,
                                          pauseOnHover: true,
                                          click: true,
                                          touch: true,
                                        },
                                      })
                                    }
                                  >
                                    <span className="img">
                                      <img src="/images/imagesV3/copy-v3.png" alt="" />
                                    </span>
                                  </CopyToClipboard>
                                </div>
                              </div>
                            </div>
                            <div className="list-info-ido">
                              <div className="item">
                                <div className="t-left">Swap Rate:</div>
                                <div className="t-right">{ido.swapAmount}</div>
                              </div>
                              <div className="item">
                                <div className="t-left">IDO Supply:</div>
                                <div className="t-right">
                                  {ido.idoSupply} {ido.symbol}
                                </div>
                              </div>
                              <div className="item">
                                <div className="t-left">Total Supply:</div>
                                <div className="t-right">
                                  {ido.totalSupply || 'TBA'} {ido.symbol}
                                </div>
                              </div>
                            </div>
                            <div className="list-info-ido border-none">
                              {ido.schedules.map((item) => (
                                <div className="item">
                                  <div className="t-left">{item.round}</div>
                                  <div className="t-right">{item.startDate}</div>
                                </div>
                              ))}
                            </div>
                            <div className="box-button-dt">
                              {state?.owner !== null && typeView === 'list' && (
                                <button type="button" className="btn-view-dt" onClick={() => handleCallClick(ido.symbol)}>
                                  View details
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                : (
                  <div className="box-message res">
                    <img src="/images/nobidding.svg" alt="unknown-artwork" className="img-message" />
                    <div className="info-message">Empty !</div>
                    </div>
                ) : <TabDetail activeTab={activeTab}/>
                
              }
      
    </>
  )
}
export default TabsContentActive
