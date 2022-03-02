/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, Router } from 'react-router-dom'
import { Tabs, Progress, Input, Select } from 'antd'
import { AudioOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useWeb3React } from '@web3-react/core'

import { Flex } from '@artechain/uikit'

import { useHookProjects } from './Store'
import TabsContentActive from './TabsContentActive'
import TabDetail from './TabDetail'

const TabsContentEnd = (props): any => {
  const { Option } = Select
  const { idoList, listIdoEnd, status, activeTab } = props
  const { Search } = Input
  const [showDetail, setShowDetail] = useState(false)
  const [state, actions]: any = useHookProjects()
  const [activeSymbol, setActiveSymbol] = useState('')
  const [enableLoadMore, setEnableLoadMore] = useState(true)

  const history = useHistory()
  const pathHash = history.location.search.split('?')
  const tabSymbol = pathHash[2]
  // const typeIdo = pathHash[1]

  // const returnCate = () => {
  //   let cate: number | null = null

  //   switch (typeIdo) {
  //     case 'gamefi':
  //       cate = 0
  //       break
  //     case 'meta':
  //       cate = 1
  //       break
  //     case 'defi':
  //       cate = 2
  //       break
  //     default:
  //       break
  //   }

  //   return cate
  // }

  function handleChange(value) {
    // setValueSearch(value)
    const params = {
      category: 0,
      symbol: value,
    }

    actions.getProjectEnd(params)
  }

  // HANDLE CHANGE VIEW
  const handleChangeView = (symbol) => {
    setActiveSymbol(symbol)
    setShowDetail(!showDetail)
    history.push({
      pathname: history.location.pathname,
      search: `${activeTab}?${symbol}`,
    })
  }

  useEffect(() => {
    if (activeTab && !tabSymbol) {
      setShowDetail(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  useEffect(() => {
    if (tabSymbol) {
      setShowDetail(true)
    } else {
      setShowDetail(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabSymbol])

  const listRender: any = []
  state.idoListEnd.forEach((ido, index) => {
    listRender.push(
      <tr>
        <td className="main-cl-v3">
          <button type="button" className="btn-view-dt p-name-token" onClick={() => handleChangeView(ido.symbol)}>
            {ido.name}
          </button>
        </td>
        <td>{ido.network}</td>
        <td>{ido.symbol}</td>
        <td>{ido.pricePer} BUSD</td>
        <td className="main-cl-v3">TBA</td>
        <td className="main-cl-up">TBA</td>
      </tr>
    )
  })

  const params = {
    category: 0,
    lastTime: listIdoEnd.length > 0 ? listIdoEnd[listIdoEnd.length - 1].created : null,
  }

  const handleLoadMore = () => {
    if (state.idoListEndMore.length > 0) {
      params.lastTime = state.idoListEndMore[state.idoListEndMore.length - 1].created
    }
    actions.getProjectEndMore(params).then((data) => {
      if (data.length === 0) setEnableLoadMore(false)
    })
  }

  function showPrice(ido): any {
    if (state.listPrice.length > 0 && ido !== null) {
      for (let i = 0; i < state.listPrice.length; i++) {
        // if (state.listPrice[i].id === ido.referenceId) {
        //   return state.listPrice[i].price_change_percentage_24h
        // }
        if (state.listPrice[i].id === ido.referenceId) {
          return state.listPrice[i].current_price
        }
      }
      return 0
    } else {
      return 0
    }
  }


  return (
    <>
      <div className="main-table-end">
        {!showDetail && (
          <div className="box-search-v3">
            <div className="box-search-stake">
              <Search placeholder="Search" onSearch={handleChange} />
            </div>

            <Flex justifyContent="space-between">
                  <Select className="devCus__select" disabled defaultValue="CALENDER" style={{ width: 194 }}>
                    <Option value="Calendar">Calendar</Option>
                    <Option value="Table">Table</Option>
                  </Select>
                </Flex>
          </div>
        )}

        {showDetail ? (
          <TabDetail activeTab={activeTab} />
        ) : (
          <div className="box-table">
            <table>
              <tr>
                <th>Project Name</th>
                <th>Chain</th>
                <th>Token</th>
                <th>Swap rate</th>
                <th>Current price</th>
                <th>ROI</th>
              </tr>
              {state.idoListEnd?.length > 0 ? (
                state.idoListEnd.map((ido, index) => (
                  <tr>
                    <td className="main-cl-v3">
                      <button
                        type="button"
                        className="btn-view-dt p-name-token"
                        onClick={() => handleChangeView(ido.symbol)}
                      >
                        {ido.name}
                      </button>
                    </td>
                    <td>
                      {ido.network === 'bep'
                        ? 'BSC'
                        : ido.network === 'poly'
                        ? 'Poly'
                        : ido.network === 'erc'
                        ? 'Ethereum'
                        : ''}
                    </td>
                    <td>{ido.symbol}</td>
                    <td>{ido.pricePer} BUSD</td>
                    <td className="main-cl-v3">
                      {ido.referenceId !== null && showPrice(ido) !== 0
                        ? showPrice(ido)
                        : ido.currentPrice !== 0
                        ? ido.currentPrice
                        : '--'}
                    </td>
                    <td className="main-cl-up">
                      <div
                        className={
                          ido.referenceId !== null &&
                          showPrice(ido) !== 0 &&
                          Number(((showPrice(ido) / ido.pricePer) * 100).toFixed(2)) < 100
                            ? 'down'
                            : ido.referenceId !== null &&
                              showPrice(ido) !== 0 &&
                              Number(((showPrice(ido) / ido.pricePer) * 100).toFixed(2)) > 100
                            ? 'up'
                            : ido.currentPrice < ido.pricePer
                            ? 'down'
                            : 'up'
                        }
                      >
                        {ido.referenceId !== null && showPrice(ido) !== 0 ? (
                          Number(((showPrice(ido) / ido.pricePer) * 100).toFixed(2))
                        ) : ido.currentPrice !== 0 ? (
                          Number(((ido.currentPrice / ido.pricePer) * 100).toFixed(2))
                        ) : (
                          <span className="main-cl-up">--</span>
                        )}
                        {ido.referenceId !== null && showPrice(ido) !== 0 ? '%' : ido.currentPrice !== 0 ? '%' : ''}
                      </div>

                      {/* {ido.referenceId !== null
                        ? showPrice(ido) === 0 ? '--'
                          : Number((showPrice(ido) / ido.pricePer).toFixed(4)) * 100
                        : '--'}
                        {showPrice(ido) !== 0 ? '%': ''} */}
                    </td>
                  </tr>
                ))
              ) : (
                <td colSpan={6}>
                  <div className="box-message res">
                    <div className="info-message">Empty !</div>
                    <img src="/images/nobidding.svg" alt="unknown-artwork" className="img-message" />
                  </div>
                </td>
              )}

              {state.idoListEnd?.length > 0 && state.idoListEndMore?.length > 0
                ? state.idoListEndMore.map((ido, index) => (
                    <tr>
                      <td className="main-cl-v3">
                        <button
                          type="button"
                          className="btn-view-dt p-name-token"
                          onClick={() => handleChangeView(ido.symbol)}
                        >
                          {ido.name}
                        </button>
                      </td>
                      <td>
                        {ido.network === 'bep'
                          ? 'BSC'
                          : ido.network === 'poly'
                          ? 'Poly'
                          : ido.network === 'erc'
                          ? 'Ethereum'
                          : ''}
                      </td>
                      <td>{ido.symbol}</td>
                      <td>{ido.pricePer} BUSD</td>
                      <td className="main-cl-v3">
                        {ido.referenceId !== null && showPrice(ido) !== 0
                          ? showPrice(ido)
                          : ido.currentPrice !== 0
                          ? ido.currentPrice
                          : '--'}
                        {/* {ido.referenceId !== null && showPrice(ido) !== 0 ? showPrice(ido) : '--'} */}
                      </td>
                      <td className="main-cl-up">
                        <div
                          className={
                            ido.referenceId !== null &&
                            showPrice(ido) !== 0 &&
                            Number(((showPrice(ido) / ido.pricePer) * 100).toFixed(2)) < 100
                              ? 'down'
                              : ido.referenceId !== null &&
                                showPrice(ido) !== 0 &&
                                Number(((showPrice(ido) / ido.pricePer) * 100).toFixed(2)) > 100
                              ? 'up'
                              : ido.currentPrice < ido.pricePer
                              ? 'down'
                              : 'up'
                          }
                        >
                          {ido.referenceId !== null && showPrice(ido) !== 0 ? (
                            Number(((showPrice(ido) / ido.pricePer) * 100).toFixed(2))
                          ) : ido.currentPrice !== 0 ? (
                            Number(((ido.currentPrice / ido.pricePer) * 100).toFixed(2))
                          ) : (
                            <span className="main-cl-up">--</span>
                          )}
                          {ido.referenceId !== null && showPrice(ido) !== 0 ? '%' : ido.currentPrice !== 0 ? '%' : ''}

                          {/* {ido.referenceId !== null && showPrice(ido) !== 0
                          ? Number(((showPrice(ido) / ido.pricePer) * 100).toFixed(2))
                          : '--'}
                        {ido.referenceId !== null && showPrice(ido) !== 0 ? '%' : ''} */}
                        </div>
                      </td>
                    </tr>
                  ))
                : ''}
            </table>
            <div className="btn-more-v3">
              {enableLoadMore && state.idoListEnd.length !== 0 ? (
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
    </>
  )
}
export default TabsContentEnd
