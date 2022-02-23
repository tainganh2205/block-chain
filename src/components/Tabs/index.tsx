import React, { memo } from 'react'
import { Tabs } from 'antd'

import { TabsPropsBSC } from './index.d'

import './index.less'

const TabPane = Tabs.TabPane

const TabsBSC = memo<TabsPropsBSC>(({tabs ,...props}) => {
  return (
    <Tabs
      className='tabs-bsc h__myartwork'
      {...props}
    >
      {tabs.map(tab => (
        <TabPane
          {...tab}
        >
          {tab.children}
        </TabPane>
      ))}
    </Tabs>
  )
})

export * from './index.d'

export default TabsBSC