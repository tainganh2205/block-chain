/* eslint-disable react/jsx-boolean-value */
// @ stylescript-eslint / no-var-Required
import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import { useHistory } from "react-router-dom";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { isMobile } from "react-device-detect";
import { useHookProjects } from "./Store";
import TabDetail from "./TabDetail";


type ScheduleProps = {
  start: Date,
  title: string,
  id: string
};

const Schedules = (props) => {
  const { idoListSchedule, activeTab, optionSchedule } = props;
  const [state, actions]: any = useHookProjects();
  const [newSchedule, setNewSchedule] = useState<ScheduleProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const history = useHistory();
  const pathHash = history.location.search.split("?");
  const tabSymbol = pathHash[2];

  const handleChangeView = (symbol) => {
    setShowDetail(!showDetail);
    history.push({
      pathname: history.location.pathname,
      search: `${activeTab}?${symbol}`
    });
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <button type="button" className="btn-view-dt p-name-token" onClick={() => handleChangeView(eventInfo.event.id)}>
          <img className="event-image" src={eventInfo.event.title} alt="" />
        </button>
      </>
    );
  }


  function getMonthYear(e) {
    actions.getSchedule(e.view.calendar.currentDataManager.state.currentDate.getMonth() + 1,
      e.view.calendar.currentDataManager.state.currentDate.getFullYear());
  }

  useEffect(() => {
    if (idoListSchedule.length > 0) {
      setIsLoading(false);
      const arr = idoListSchedule.map((item) => ({
        start: item.startDate,
        title: item.logoUrl,
        id: item.symbol
      }));
      setNewSchedule(arr);
    } else if (idoListSchedule?.length === 0) {
      setIsLoading(false);
    }
  }, [idoListSchedule]);

  useEffect(() => {
    if (activeTab && !tabSymbol) {
      setShowDetail(false);
    }
  }, [activeTab, tabSymbol]);

  useEffect(() => {
    if (tabSymbol) {
      setShowDetail(true);
    } else {
      setShowDetail(false);
    }
  }, [tabSymbol]);
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

        {showDetail ? <TabDetail activeTab={activeTab} /> : ""}
      </>
    );
  }
  return (
    <>
      {!showDetail ? (
        optionSchedule === "Table" ?
          <div className="box-table">
            <table>
              <tr>
                <th>Project</th>
                <th>Symbol</th>
                <th>Start Date</th>
              </tr>

              {newSchedule.length ? (
                newSchedule.map((ido, index) => (
                  <tr key={+index + 1}>
                    <td className="main-cl-v3">
                      <button type="button" className="btn-view-dt p-name-token" onClick={() => handleChangeView(ido.id)}>
                        <img className="event-image" src={ido.title} alt="" />
                      </button>
                    </td>
                    <td>{ido.id}</td>
                    <td>{new Date(ido.start).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <td colSpan={6}>
                  <div className="box-message res">
                    <img src="/images/nobidding.svg" alt="unknown-artwork" className="img-message" />
                    <div className="info-message">Empty !</div>
                  </div>
                </td>
              )}
            </table>
            {/* <div className="btn-more-v3"> */}
            {/*   {enableLoadMore && newSchedule.length ? ( */}
            {/*     <button className="load-more-v3" type="button" onClick={handleLoadMore}> */}
            {/*       Load more */}
            {/*     </button> */}
            {/*   ) : ( */}
            {/*     '' */}
            {/*   )} */}
            {/* </div> */}
          </div>
          :
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
    </>
  );
};

export default Schedules;

