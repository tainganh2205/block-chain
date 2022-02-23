/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import Swiper from 'swiper/bundle';
import SliderMobile from './SliderMobile';
import MainChartMobile from './MainChartMobile';
import HistoryMobile from './HistoryMobile';
import LeaderboardMobile from './LeaderboardMobile';
import SocketTimer from '../SocketTimer'
import Maintenance from '../../../components/Maintenance'
import { useHookPrediction } from '../Store'
import { useActiveWeb3React } from '../../../hooks'

const PredicMobile = ({ socketInfo }) => {
  const { TabPane } = Tabs;
  const [state, actions]: any = useHookPrediction()
  const { account } = useActiveWeb3React()
  useEffect(() => {
    actions.getRounds(account)

  }, [])

  const _HandeClick = () => {
    const swiper = new Swiper('.swiper-container', {
      spaceBetween: 0,
      centeredSlides: true,
      mousewheel: true,
      initialSlide: 5,
      slidesPerView: 1,
      navigation: true
    })
    swiper.slideTo(4)
  }

  return (
    <main className="full-with-cus mobile-prediction">
      <div className="container-max">
        <div className="box-time-mobile">
          <div className="box-social-info cus">
            <ul className="list-social">
              <li>
                <div className="item-wrap cus-dollar">
                  <div className="icon-wrap">
                    <img src="/images/imagesPrediction/icon-bnb.png" alt="" />
                  </div>
                  <h5 className="title-wrap">
                    BNB/USDT
                  </h5>
                </div>
              </li>
              <li>
                <div className="item-wrap cus-time">
                  <h5 className="title-wrap">
                    <SocketTimer socketInfo={socketInfo} /> <span className="cus-txt">5m</span>
                  </h5>
                  <div className="icon-wrap">
                    <img src="/images/imagesPrediction/icon-time.png" alt="" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <LeaderboardMobile />
        <Tabs defaultActiveKey="2">
          <TabPane tab="Chart" key="1">
            <MainChartMobile />
          </TabPane>
          <TabPane tab="Prediction" key="2">
            {state.rounds.length > 0 ?
              (
                <div className="box-slide-mobile">
                  <SliderMobile socketInfo={socketInfo} />
                  <div className="icon-wrap-bscs">
                    <button onClick={_HandeClick.bind(this)} type="button">
                      <img src="/images/imagesPrediction/icon-wrap-bscs.png" alt="" />
                    </button>
                  </div>
                </div>
              )
              :
              (
                <div className="box-slide-mobile">
                   <Maintenance isMaintenance={state.isMaintenance} />
                </div>

              )
            }

          </TabPane>
          <TabPane tab="History" key="3">
            <HistoryMobile />
          </TabPane>
        </Tabs>
      </div>
    </main>
  )
}

export default PredicMobile;
