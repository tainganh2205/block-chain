import React, { memo } from 'react'

import { PropsPoolDetailTable } from './index.d'

import './index.less'

const PoolDetailTabel = memo<PropsPoolDetailTable>((props) => {
  return (
    <div
      className='table-bsc-pool-detail'
    >
      <div
        className='table-bsc-pool-detail-top'
      >
        <span>{props.title}</span>
      </div>
      <div
        className='table-bsc-pool-detail-bottom'
      >
        <table>
          {props.rows?.map(row => (
            <tr key={row.label}>
              <th>
                {row.label}
              </th>
              <th>
                {row.value}
              </th>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
})
export * from './index.d'
export default PoolDetailTabel