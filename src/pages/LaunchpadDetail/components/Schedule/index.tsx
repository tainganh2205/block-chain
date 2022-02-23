import React, { memo } from 'react'

import { useHookDetail } from "../Store-Detail";

import './index.less'

const Schedule = memo(() => {

  const [state]: any = useHookDetail();
  const { objData } = state;

  const schedules = objData && (objData.socical && objData.socical.schedules)

  return (
    <div
      className='bsc-p-launchpad_detail-schedule'
    >
      <table >
          <tr>
            <td >Round</td>
            <td >Open</td>
            <td >Close</td>
          </tr>
          {schedules ? (
            schedules.map((item: any, i) => (
              <tr>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.date !== '' ? `${item.date}, ` : ''} {item.opens}
                </td>
                <td>
                  {item.dateClose !== '' ? `${item.dateClose}, ` : ''} {item.closes}
                </td>
              </tr>
            ))
          ): ''}
      </table>
    </div>
  )
})

export default memo(Schedule)