import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Tabs } from 'antd'
import { AudioOutlined } from '@ant-design/icons'
import TabsContentActive from './TabsContentActive'
import TabsContentEnd from './TabsContentEnd'
import TabsContentJoined from './TabsContentJoined'
import { useHookProjects } from './Store'
import Schedules from './Schedules'
import { STATUS } from './index.d'

const TabsIDO = () => {
  const [state, actions]: any = useHookProjects()
  const listIdo: any = state.idoList
  const listIdoEnd: any = state.idoListEnd
  const listIdoJoined: any = state.idoListJoined
  const idoListSchedule: any = state.idoListSchedule
  const idoListScheduleJoined: any = state.idoListScheduleJoined
  const { TabPane } = Tabs
  const [activeTab, setActiveTab] = useState('Upcoming')
  const history = useHistory()
  const [defaultKey, setDefaultKey] = useState('Upcoming')

  // Get Path Name
  const pathname = history.location.search.split('?')
  const tabBox = pathname[1]

  function callback(key) {
    setActiveTab(key)
    setDefaultKey(key)
    history.push({
      pathname: history.location.pathname,
      search: `${key}`,
    })
  }

  useEffect(() => {
    if (tabBox) {
      setDefaultKey(tabBox)
      setActiveTab(tabBox)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabBox])

  return (
    <>
      <div className="tabs-v3 cus">
        <Tabs activeKey={defaultKey} onChange={callback}>
          <TabPane tab="Upcoming" key="Upcoming">
            <div className="table-collapse-custom">
              <Schedules activeTab={activeTab} idoListSchedule={idoListSchedule} />
            </div>
          </TabPane>
          <TabPane tab="Active" key="Active">
            <div className="main-cnt-tabs">
              <TabsContentActive activeTab={activeTab} idoList={listIdo} status={STATUS.COMING} />
            </div>
          </TabPane>
          <TabPane tab="Ended" key="Ended">
            <TabsContentEnd activeTab={activeTab} idoList={listIdo} listIdoEnd={listIdoEnd} status={STATUS.CLOSE} />
          </TabPane>
          <TabPane tab="Joined" key="Joined">
            <TabsContentJoined
              activeTab={activeTab}
              idoList={listIdo}
              listIdoJoined={listIdoJoined}
              status={STATUS.CLOSE}
              idoListScheduleJoined={idoListScheduleJoined}
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}
export default TabsIDO
