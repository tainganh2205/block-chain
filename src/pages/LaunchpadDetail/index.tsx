import React, { memo, useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { isMobile } from 'react-device-detect'
import Tabs, { PropsTabBSC } from 'components/TabsV2'
import InfoProject from './components/InfoProject'
import Actions from './components/Actions'
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

const LaunchpadDetail = memo((props) => {
  const { account } = useWeb3React()
  const [state, actions]: any = useHookDetail()
  const [socketInfo, setSocketInfo] = useState({})
  const { match: { params }, }: any = props
  const idoId = params && params.id

  useEffect(() => {
    actions.getProjectDetail(idoId)
    return ()=>{
      actions.resetData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idoId])

  useEffect(() => {
    if (account) {
      actions.checkIsClaim(idoId, account)
      actions.checkJoinPool({
        idoId: parseInt(idoId),
        address: account,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idoId, account]);

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

  const { objData } = state
  const socical = objData && objData.socical
  const projectImg = socical && socical.logoUrl

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
      content: <YourAllocations />,
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
                {isMobile && <Actions />}
              </div>
            </div>
            <div className="bsc-p-launchpad_detail-top-bottom">
              <YourInvestment props={props} />
            </div>
          </div>

      <div className="bsc-p-launchpad_detail-bottom">
        <Tabs defaultActiveKey="pool_details" id="tabs-launchpad_detail" tabs={tabs} />
      </div>
    </div>
  )
})

export default LaunchpadDetail
