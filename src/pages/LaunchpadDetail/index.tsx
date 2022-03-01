import React, { memo, useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { isMobile } from 'react-device-detect'
import { Collapse } from 'antd';
import Tabs, { PropsTabBSC } from 'components/TabsV2'
import InfoProject from './components/InfoProject'
import Actions from './components/Actions'
import ModalDisClaimer from './ModalDisClaimer'
import PoolDetails from './components/PoolDetails'
import Schedule from './components/Schedule'
import About from './components/About'
import YourAllocations from './components/YourAllocations'
import ProgressProject from './components/ProgressProject'
import YourInvestment from './components/YourInvestment'
import './index.less'

import { useHookDetail } from './components/Store-Detail'
import { socketSignalR } from '../Predic/utils'
import { SOCKET_KEY_IDO_PROCESS } from '../../config/constants'

const { Panel } = Collapse;
function callback(key) {
  console.log();
}

const LaunchpadDetail = memo((props) => {
  const { account } = useWeb3React()
  const [state, actions]: any = useHookDetail()
  const [socketInfo, setSocketInfo] = useState({})

  const {
    match: { params },
  }: any = props

  const idoId = params && params.id
  const { objJoin, objData } = state
  const [isOpenModal, setIsOpenModal] = useState(false);
  
  useEffect(() => {
    actions.getProjectDetail(idoId)
    return () => {
      actions.resetData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idoId])

  useEffect(() => {
    return () => {
      actions.resetListAllocations()
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idoId]);

  useEffect(() => {
    if (account) {
      actions.checkIsClaim(idoId, account)
      actions.checkJoinPool({
        idoId: parseInt(idoId),
        address: account,
      }).then((res) => {
        console.log("RES: ", res)
        if (res.succeeded) {
          actions.updateShowDisClaimer(res.data.showDisClaimer)
        } 
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idoId, account])

  useEffect(() => {
    try {
      const socketConnect = socketSignalR()
      if (socketConnect) {
        if (socketConnect && socketConnect.state === 'Disconnected') {
          socketConnect.start().then(() => {
            socketConnect.on(SOCKET_KEY_IDO_PROCESS, (e) => {
              setSocketInfo(JSON.parse(e.extraData))
            })
          })
        }
      }
    } catch {
      // TODO
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const socical = objData && objData.socical
  const projectImg = socical && socical.logoUrl
  const isJoined = objJoin && objJoin.status === 2

  const tabs: PropsTabBSC[] = [
    {
      eventKey: 'pool_details',
      title: 'Pool Details',
      content: <PoolDetails />,
    },
    {
      eventKey: 'schedule',
      title: 'Schedule',
      content: <Schedule />,
    },
    {
      eventKey: 'about_the_project',
      title: 'About the Project',
      content: <About />,
    },
    {
      eventKey: 'your_allocations',
      title: 'Your allocations',
      content: <YourAllocations idoId={idoId} />,
    },
  ]

  const tabsOpen: PropsTabBSC[] = [
    {
      eventKey: 'pool_details',
      title: 'Your allocations',
      content: <YourAllocations idoId={idoId} />,
    },
    {
      eventKey: 'details',
      title: 'Pool Details',
      content: <PoolDetails />,
    },
    {
      eventKey: 'schedule',
      title: 'Schedule',
      content: <Schedule />,
    },
    {
      eventKey: 'about_the_project',
      title: 'About the Project',
      content: <About />,
    },
  ]

  return (
    <div className={`bsc-p-launchpad_detail ${isMobile && 'bsc-p-launchpad_detail-mobile'}`}>
      <div className="bsc-p-launchpad_detail-top">
        <div className="bsc-p-launchpad_detail-top-top">
          <div className="bsc-p-launchpad_detail-sub-logo">
            <img src="/images/launchpad_detail/sub_logo1.svg" alt="..." />
            <img src={projectImg} alt="..." />
          </div>
        </div>
        <div className="bsc-p-launchpad_detail-top-mid">
          <div className="bsc-p-launchpad_detail-top-mid-left">
            <InfoProject props={props} objData={state.objData} />
          </div>
          <div className="bsc-p-launchpad_detail-top-mid-right">
            <ProgressProject ido_detail={state.objData} socical={socical} socketInfo={socketInfo} />
            {isMobile && <Actions isOpenModalPool = {isOpenModal} />}
          </div>
        </div>
        <div className="bsc-p-launchpad_detail-top-bottom">
          <YourInvestment props={props} idoId={idoId} />
        </div>
      </div>

      <div className="bsc-p-launchpad_detail-bottom display-desktop">
        {isJoined && objData && (objData.status === 3 || objData && objData.status === 4) ? (
          <Tabs defaultActiveKey="pool_details" id="tabs-launchpad_detail" tabs={tabsOpen} />
        ) : (
          <Tabs defaultActiveKey="pool_details" id="tabs-launchpad_detail" tabs={tabs} />
        )}
      </div>
      <ModalDisClaimer />
      <div className="bsc-p-launchpad_detail-bottom display-mobile">
        {isJoined && (objData && objData.status === 3 || objData && objData.status === 4) ? (
          <Collapse defaultActiveKey={['1']} onChange={callback}>
            <Panel header="Your allocations" key="1">
              <YourAllocations idoId={idoId} />
            </Panel>
            <Panel header="Pool Details" key="2">
              <PoolDetails />
            </Panel>
            <Panel header="Schedule" key="3">
              <Schedule />
            </Panel>
            <Panel header="About the Project" key="4">
              <About />
            </Panel>

          </Collapse>
        ) : (
          <Collapse defaultActiveKey={['1']} onChange={callback}>
            <Panel header="Pool Details" key="1">
              <PoolDetails />
            </Panel>
            <Panel header="Schedule" key="2">
              <Schedule />
            </Panel>
            <Panel header="About the Project" key="3">
              <About />
            </Panel>
            <Panel header="Your allocations" key="4">
              <YourAllocations idoId={idoId} />
            </Panel>
          </Collapse>
        )}
      </div>
    </div>
  )
})

export default LaunchpadDetail
