/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Swiper from 'swiper/bundle'
import { isMobile } from 'react-device-detect'
import MainChart from './MainChart'
import SlideCustom from './SlideCustom'
import SocialInfo from './SocialInfo'
import MobilePrediction from './MobilePrediction'
import Leaderboard from './Leaderboard'

import Maintenance from '../../components/Maintenance'
import { useHookPrediction } from './Store'
import { useActiveWeb3React } from '../../hooks'
import './styless.css'
import { socketSignalR } from './utils'
import {
  SOCKET_KEY_EVENT_CALCULATING,
  SOCKET_KEY_EVENT_RELOAD,
  SOCKET_KEY_REALTIME_JOIN,
  SOCKET_KEY_REALTIME_PRICE, SOCKET_KEY_SERVERTIME
} from '../../config/constants'

const Predict = () => {
  const [socketInfo, setSocketInfo] = useState({})
  const [state, actions]: any = useHookPrediction()
  const { account } = useActiveWeb3React()
  useEffect(() => {
    actions.getRounds(account)
  }, [])

  useEffect(() => {
    try {
      const socketConnect = socketSignalR();
      if (socketConnect) {
        if (socketConnect && socketConnect.state === "Disconnected") {
          socketConnect
            .start()
            .then(() => {
              socketConnect.on(SOCKET_KEY_EVENT_CALCULATING, (e) => {
                setSocketInfo(JSON.parse(e.extraData))
              });
              socketConnect.on(SOCKET_KEY_EVENT_RELOAD, (e) => {
                setSocketInfo(JSON.parse(e.extraData))
              });
              socketConnect.on(SOCKET_KEY_REALTIME_JOIN, (e) => {
                setSocketInfo(JSON.parse(e.extraData))
              });
              socketConnect.on(SOCKET_KEY_REALTIME_PRICE, (e) => {
                setSocketInfo(JSON.parse(e.extraData))
              });
              socketConnect.on(SOCKET_KEY_SERVERTIME, (e) => {
                setSocketInfo(JSON.parse(e.extraData))
              });
            });
        }
      }
    } catch {
      // socketConnect.off("prediction_calculating");
    }
  }, [])

  const _HandeClick = () => {
    const swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      spaceBetween: 0,
      centeredSlides: true,
      mousewheel: true,
      grabCursor: true,
      shortSwipes: false,
      slidesPerView: 2,
    })
    swiper.slideTo(4)
  }

  if (isMobile) {
    return <MobilePrediction socketInfo={socketInfo} />
  }
  return (
    <main className="full-with-cus">
      <div className="container-max">
        <Leaderboard />
        {state.rounds.length > 0 ?
          (<div className="main-content-wrap">
            <MainChart />
            <div className="box-slide-current">
              <SocialInfo socketInfo={socketInfo} />
              <div className="icon-wrap-bscs">
                <button onClick={_HandeClick.bind(this)} type="button">
                  <img src="/images/imagesPrediction/icon-wrap-bscs.png" alt="" />
                </button>
              </div>
              <SlideCustom socketInfo={socketInfo}/>
            </div>
          </div>)
          :
          (
            <div className="mainternanceleft main-content-wrap">
             <Maintenance isMaintenance={state.isMaintenance} />
              <div className="box-slide-current">
                <SocialInfo socketInfo={socketInfo} />
              </div>
            </div>
          )
        }

      </div>
    </main>
  )
}

export default Predict
