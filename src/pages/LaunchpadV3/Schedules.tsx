/* eslint-disable react/jsx-boolean-value */
// @ stylescript-eslint / no-var-Required
// @ stylescript-eslint / no-shadow
import React, { useCallback, useEffect, useState } from 'react'
// import * as $ from "jquery";

import FullCalendar, { EventContentArg } from '@fullcalendar/react'
import { useHistory, Router } from 'react-router-dom'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import moment from 'moment'
import { isMobile } from 'react-device-detect'
import { Spin } from 'antd'
import { useHookProjects } from './Store'
import TabDetail from './TabDetail'



const Schedules = (props) => {
  const { idoListSchedule, activeTab } = props
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


  function getMonthYear (e){
    actions.getSchedule(e.view.calendar.currentDataManager.state.currentDate.getMonth()+1,
    e.view.calendar.currentDataManager.state.currentDate.getFullYear())
  }

  const listRender: any = []
  const now = moment().format()

 

  useEffect(() => {
    if (idoListSchedule.length > 0) {
      setIsLoading(false)
      const arr = idoListSchedule.map((item) => ({
        start: item.startDate,
        title: item.logoUrl,
        id: item.symbol,
      }))
      setNewSchedule(arr)
    } else if (idoListSchedule?.length === 0) {
      setIsLoading(false)
    }
  }, [idoListSchedule])

  useEffect(() => {
    if (activeTab && !tabSymbol) {
      setShowDetail(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  useEffect(() => {
    if (tabSymbol ) {
      setShowDetail(true)
    } else {
      setShowDetail(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabSymbol])




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
      ) : <TabDetail activeTab={activeTab} />}

      {/* {showDetail ? <TabDetail activeTab={activeTab} /> : ''} */}
    </>
  )
}

export default Schedules

