import React, { memo } from 'react'
import { isMobile } from 'react-device-detect'
import { Collapse } from 'antd'

import Statistic from 'pages/Nft_new/components/Statistic'
import Artwork from './components/Artwork'

import './index.less'

const Nft = memo(() => {
  const { Panel } = Collapse;
  return (
    <div
      className={`p-bscs-nft ${isMobile ? 'p-bscs-nft-mobile' : ''}`}
    >
      <div
        className='p-bscs-nft-mid'
      >
        {isMobile ? (
          <>
            <Collapse defaultActiveKey={['1']}>
              <Panel key='1' header={<span>Statistic</span>}>
                <Statistic />
              </Panel>
            </Collapse>
            <div className='p-bscs-nft-mid-padding' />
          </>
        ) : <Statistic />}
      </div>
      <div
        className='p-bscs-nft-bottom'
      >
        <Artwork />
      </div>
    </div>
  )
})

export default Nft