/* eslint-disable react/jsx-boolean-value */
// @ stylescript-eslint / no-var-Required
// @ stylescript-eslint / no-shadow
import React, { useCallback, useEffect, useState } from 'react'
import FullCalendar, { EventContentArg } from '@fullcalendar/react'
import { useHistory, Router } from 'react-router-dom'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import moment from 'moment'
import { isMobile } from 'react-device-detect'
import { useWeb3React } from '@web3-react/core'
import { Spin } from 'antd'
import { useHookProjects } from './Store'
import TabDetail from './TabDetail'

const SchedulesJoined = (props) => {
  const { account, chainId }: any = useWeb3React()
  const { idoListScheduleJoined, activeTab } = props
  const [state, actions]: any = useHookProjects()
  const [newSchedule, setNewSchedule] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeSymbol, setActiveSymbol] = useState('')
  const [showDetail, setShowDetail] = useState(false)
  const history = useHistory()
  const pathHash = history.location.search.split('?')
  const tabSymbol = pathHash[2]

  const handleChangeView = (symbol) => {
    setActiveSymbol(symbol)
    setShowDetail(!showDetail)
    history.push({
      pathname: history.location.pathname,
      search: `${activeTab}?${symbol}`,
    })
  }

  function renderEventContent(eventInfo, arr) {
    return (
      <>
        <button type="button" className="btn-view-dt p-name-token" onClick={() => handleChangeView(eventInfo.event.id)}>
          <img className="event-image" src={eventInfo.event.title} alt="" />
        </button>
      </>
    )
  }

  function getMonthYear(e) {
    actions.getScheduleJoined({
      ownerAddress: account,
      month: e.view.calendar.currentDataManager.state.currentDate.getMonth() + 1,
      year: e.view.calendar.currentDataManager.state.currentDate.getFullYear(),
    })
  }

  const listRender: any = []
  const now = moment().format()

  useEffect(() => {
    if (idoListScheduleJoined && idoListScheduleJoined.length > 0) {
      setIsLoading(false)
      const arr = idoListScheduleJoined.map((item) => ({
        start: item.startDate,
        title: item.logoUrl,
        id: item.symbol,
      }))
      setNewSchedule(arr)
    } else if (idoListScheduleJoined?.length === 0) {
      setIsLoading(false)
    }
  }, [idoListScheduleJoined])

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

  const d = new Date()
    const currentMonth = d.getMonth() + 1
    const currentYear = d.getFullYear()
  
    const loadDataOnConnectWallet = useCallback(() => {
      if (account) {
        actions.getScheduleJoined({
          month:currentMonth,
          year:currentYear,
          ownerAddress: account,
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, actions])
  
    // const initData = useCallback(() => {
    //  // actions.getSchedule(currentMonth, currentYear)
    //  // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [ actions.getScheduleJoined])
  
    // useEffect(() => {
    //   initData()
    // }, [initData])
  
    // useEffect(() => {
    //   loadDataOnConnectWallet()
    // }, [loadDataOnConnectWallet])

  if (isMobile) {
    return (
      <>
        {!showDetail && (
          <div className="main-caledar mobile-caledar">
            <FullCalendar
              selectable={false}
              navLinks={false}
              plugins={[listPlugin]}
              initialView="listWeek"
              eventContent={renderEventContent}
              events={newSchedule}
              datesSet={getMonthYear}
            />
          </div>
        )}

        {showDetail ? <TabDetail activeTab={activeTab} /> : ''}
      </>
    )
  }
  return (
    <>
      {!showDetail ? (
        <div className="main-caledar">
          <FullCalendar
            selectable={false}
            navLinks={false}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            eventContent={renderEventContent}
            events={newSchedule}
            datesSet={getMonthYear}
          />
        </div>
      ) : (
        <TabDetail activeTab={activeTab} />
      )}

      {/* {showDetail ? <TabDetail activeTab={activeTab} /> : ''} */}
    </>
  )
}
export default SchedulesJoined
