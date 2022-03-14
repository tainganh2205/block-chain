import React, { useContext, useEffect, useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { Store } from 'react-notifications-component'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Mousewheel, Pagination, Keyboard, Scrollbar, A11y } from 'swiper'
import { Slider, Input, Button, InputNumber } from 'antd'
import { useHookPrediction } from './Store'
import { useActiveWeb3React } from '../../hooks'
import 'antd/dist/antd.css'
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'

const RESET_INTERVAL_S = 300
const formatTime = (time) => `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`

const Timer = ({ time }) => {
  const timeRemain = RESET_INTERVAL_S - (time % RESET_INTERVAL_S)

  return <>{formatTime(timeRemain)}</>
}
const IntervalTimerFunctional = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((t) => t + 1)
    }, 1000)
    return () => clearInterval(timerId)
  }, [])

  return <Timer time={time} />
}
const IntegerStep = () => {
  const [inputValue, setInputValue] = useState(30)

  const onChangeHandle = (value) => {
    setInputValue(value)
  }
  const handleClickAdd10 = (value) => {
    setInputValue(10)
  }
  const handleClickAdd25 = (value) => {
    setInputValue(25)
  }
  const handleClickAdd50 = (value) => {
    setInputValue(50)
  }
  const handleClickAdd75 = (value) => {
    setInputValue(75)
  }
  const handleClickAddMax = (value) => {
    setInputValue(100)
  }
  return (
    <div>
      <div className="box-input">
        <InputNumber value={inputValue} onChange={onChangeHandle} />
        <span className="text-input">Balance: 100</span>
      </div>
      <div className="box-slide">
        <Slider
          min={0}
          max={100}
          tooltipVisible={false}
          onChange={onChangeHandle}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </div>
      <div className="box-btn-number">
        <Button value={10} onClick={handleClickAdd10}>
          10%
        </Button>
        <Button value={25} onClick={handleClickAdd25}>
          25%
        </Button>
        <Button value={50} onClick={handleClickAdd50}>
          50%
        </Button>
        <Button value={75} onClick={handleClickAdd75}>
          75%
        </Button>
        <Button value={100} onClick={handleClickAddMax}>
          Max
        </Button>
      </div>
    </div>
  )
}
const SliderContent = ({ item }) => {
  const [isbetUp, setBetUp] = useState(false)
  const [isbetDown, setBetDown] = useState(false)

  if (isbetUp) {
    return <SliderContentSetPosition setBetUp={setBetUp} item={item} />
  }
  if (isbetDown) {
    return <SliderContentSetPositionDown setBetDown={setBetDown} item={item} />
  }
  return (
    <div className="item-swiper-content">
      <div className="item-top">
        <div className="item-top-left">
          <div className="box-icon">
            <img src="/images/imagesPrediction/play-button-1.png" alt="" />
          </div>
          <h3 className="txt">Next</h3>
        </div>
        <div className="item-top-right">
          <h3 className="txt">#{item.id}</h3>
        </div>
      </div>
      <div className="item-body">
        <div className="box-price-pool">
          <h4 className="text">Prize Pool:</h4>
          <p className="price">{item.prizePool} BNB</p>
        </div>
        <h2 className="title-body">Select your positions</h2>
        <div className="box-trader-view">
          <button
            className="btn-up"
            type="button"
            onClick={() => {
              setBetUp(true)
              Store.addNotification({
                message: (
                  <div className="custom-fontsize custome-checked">
                    <img src="/images/imagesPrediction/checked.png" alt="" /> DOWN position entered
                  </div>
                ),
                type: 'warning',
                width: 300,
                insert: 'top',
                container: 'top-center',
                animationIn: ['animate__animated success', 'animate__fadeIn'],
                animationOut: ['animate__animated success', 'animate__fadeOut'],
                dismiss: {
                  duration: 2000,
                  onScreen: true,
                  pauseOnHover: true,
                  click: true,
                  touch: true,
                },
              })
            }}
          >
            Up <span className="price-btn"> {item.totalUp}x Payout</span>
            <div className="img-btn">
              <img src="/images/imagesPrediction/up-btn.png" alt="" />
            </div>
          </button>
          <button
            className="btn-down"
            type="button"
            onClick={() => {
              setBetDown(true)
              Store.addNotification({
                message: (
                  <div className="custom-fontsize custome-checked">
                    <img src="/images/imagesPrediction/checked.png" alt="" /> Claim successfully
                  </div>
                ),
                type: 'warning',
                width: 300,
                insert: 'top',
                container: 'top-center',
                animationIn: ['animate__animated success', 'animate__fadeIn'],
                animationOut: ['animate__animated success', 'animate__fadeOut'],
                dismiss: {
                  duration: 2000,
                  onScreen: true,
                  pauseOnHover: true,
                  click: true,
                  touch: true,
                },
              })
            }}
          >
            Down <span className="price-btn"> {item.totalDown}x Payout</span>
            <div className="img-btn">
              <img src="/images/imagesPrediction/down-btn.png" alt="" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
const SliderContentLast = ({ item }) => (
  <div className="item-swiper-content later">
    <div className="item-top">
      <div className="item-top-left">
        <div className="box-icon">
          <img src="/images/imagesPrediction/time-left.png" alt="" />
        </div>
        <h3 className="txt">Later</h3>
      </div>
      <div className="item-top-right">
        <h3 className="txt">#{item.id}</h3>
      </div>
    </div>
    <div className="item-body">
      <div className="box-price-pool">
        <h4 className="text">Entry starts:</h4>
        <p className="price">~00:00</p>
      </div>
      <div className="box-trader-view">
        <div className="btn-up custom-img">
          Up
          <div className="img-btn">
            <img src="/images/imagesPrediction/bg-later-up.png" alt="" />
          </div>
        </div>
        <div className="btn-down custom-img">
          Down
          <div className="img-btn">
            <img src="/images/imagesPrediction/bg-later-down.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
)
const SliderContentLockedCalculating = ({ item }) => (
  <div className="item-swiper-content later">
    <div className="item-top">
      <div className="item-top-left">
        <div className="box-icon">
          <img src="/images/imagesPrediction/time-left.png" alt="" />
        </div>
        <h3 className="txt">Later</h3>
      </div>
      <div className="item-top-right">
        <h3 className="txt">#{item.id}</h3>
      </div>
    </div>
    <div className="item-body">
      <div className="box-price-pool">
        <h4 className="text">Entry starts:</h4>
        <p className="price">~00:00</p>
      </div>
      <div className="box-trader-view">
        <div className="btn-up custom-img">
          Up
          <div className="img-btn">
            <img src="/images/imagesPrediction/bg-later-up.png" alt="" />
          </div>
        </div>
        <div className="btn-down custom-img">
          Down
          <div className="img-btn">
            <img src="/images/imagesPrediction/bg-later-down.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
)
const SliderContentLiveDown = ({ item }) => (
  <div className="item-swiper-content live current">
    <div className="item-top">
      <div className="item-top-left">
        <div className="box-icon">
          <img src="/images/imagesPrediction/play-button-2.png" alt="" />
        </div>
        <h3 className="txt">Live</h3>
      </div>
      {/* <div className="btn-entered">
        <a href="#!">UP Entered</a>
      </div> */}
      <div className="item-top-right">
        <h3 className="txt">#{item.id}</h3>
      </div>
    </div>
    <div className="item-body">
      <div className="box-last-price">
        <h3 className="title-price">Last Price</h3>
        <div className="price-wrap">
          <div className="price-wrap-left">
            ${item.closedPrice} <img src="/images/imagesPrediction/information.png" alt="" />
          </div>
          <div className="price-wrap-right">
            <img src="/images/imagesPrediction/left-arrow-red.png" alt="" className="img-arrow" /> $-0.123
          </div>
        </div>
        <ul className="list-wrap-ul">
          <li>
            <h4 className="wrap-name">Locked Price:</h4>
            <p className="wrap-price">${item.lockedPrice}</p>
          </li>
          <li>
            <h4 className="wrap-name font-w-bold">Prize Pool:</h4>
            <p className="wrap-price font-w-bold">{item.prizePool} BNB</p>
          </li>
        </ul>
      </div>
      <div className="box-trader-view">
        <div className="btn-down">
          <span className="price-btn"> {item.totalDown}x Payout</span> DOWN
          <div className="img-btn">
            <img src="/images/imagesPrediction/down-btn-cus.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
)
const SliderContentLiveDownPrev = ({ item }) => (
  <div className="item-swiper-content live prev">
    <div className="item-top">
      <div className="item-top-left">
        <div className="box-icon">
          <img src="/images/imagesPrediction/banned-sign.png" alt="" />
        </div>
        <h3 className="txt color-expair font-s-17">Expired</h3>
      </div>
      <div className="item-top-right">
        <h3 className="txt color-expair font-s-17">#1235</h3>
      </div>
    </div>
    <div className="item-body">
      <div className="box-last-price">
        <h3 className="title-price">Last Price</h3>
        <div className="price-wrap">
          <div className="price-wrap-left">
            ${item.closedPrice} <img src="/images/imagesPrediction/information.png" alt="" />
          </div>
          <div className="price-wrap-right">
            <img src="/images/imagesPrediction/left-arrow-red.png" alt="" className="img-arrow" /> $-0.123
          </div>
        </div>
        <ul className="list-wrap-ul">
          <li>
            <h4 className="wrap-name">Locked Price:</h4>
            <p className="wrap-price">${item.lockedPrice}</p>
          </li>
          <li>
            <h4 className="wrap-name font-w-bold">Prize Pool:</h4>
            <p className="wrap-price font-w-bold">{item.prizePool} BNB</p>
          </li>
        </ul>
      </div>
      <div className="box-trader-view">
        <div className="btn-down">
          <span className="price-btn"> {item.totalDown}x Payout</span> DOWN
          <div className="img-btn">
            <img src="/images/imagesPrediction/down-btn-cus.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const SliderContentLiveUp = ({ item }) => {
  return (
    <div className="item-swiper-content live cus current">
      <div className="item-top">
        <div className="item-top-left">
          <div className="box-icon">
            <img src="/images/imagesPrediction/play-button-2.png" alt="" />
          </div>
          <h3 className="txt">Live</h3>
        </div>
        <div className="item-top-right">
          <h3 className="txt">#{item.id}</h3>
        </div>
      </div>
      <div className="item-body">
        <div className="box-trader-view">
          <div className="btn-down">
            UP <span className="price-btn"> {item.totalUp}x Payout</span>
            <div className="img-btn">
              <img src="/images/imagesPrediction/btn-up-cus.png" alt="" />
            </div>
          </div>
        </div>
        <div className="box-last-price cus">
          <h3 className="title-price">Last Price</h3>
          <div className="price-wrap">
            <div className="price-wrap-left">
              ${item.closedPrice} <img src="/images/imagesPrediction/information.png" alt="" />
            </div>
            <div className="price-wrap-right">
              <img src="/images/imagesPrediction/left-arrow-green.png" alt="" className="img-arrow" /> $0.123
            </div>
          </div>
          <ul className="list-wrap-ul">
            <li>
              <h4 className="wrap-name">Locked Price:</h4>
              <p className="wrap-price">${item.lockedPrice}</p>
            </li>
            <li>
              <h4 className="wrap-name font-w-bold">Prize Pool:</h4>
              <p className="wrap-price font-w-bold">{item.prizePool} BNB</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
const SliderContentSetPosition = ({ item, setBetUp }) => {
  const { account } = useActiveWeb3React()
  const [state, actions] = useHookPrediction()
  const [amount, setAmount] = useState(0)

  return (
    <div className="item-swiper-content set-position">
      <div className="item-top">
        <div className="item-top-left">
          <button type="button" onClick={() => setBetUp(false)} className="box-icon">
            <img src="/images/imagesPrediction/left-arrow-2.png" alt="" />
          </button>
          <h3 className="txt">Set Position</h3>
        </div>
        <div className="item-top-right">
          <div className="btn-right-position">
            <img src="/images/imagesPrediction/left-arrow-white.png" alt="" className="img-arrow" /> UP
          </div>
        </div>
      </div>
      <div className="item-body">
        <div className="box-commit">
          <h3 className="title">Commit:</h3>
          <div className="commit-logo">
            <div className="box-logo">
              <img src="/images/imagesPrediction/logoBNB.png" alt="" className="img-logo" />{' '}
              <span className="text">BNB</span>
            </div>
          </div>
        </div>
        <IntegerStep />
        <div className="box-btn-amount">
          <button
            type="button"
            onClick={() => actions.joinPool({ id: item.id, hash: 'temp', amount, account, type: true })}
            className="btn-amount confirm"
          >
            Enter an amount
          </button>
        </div>
        <div className="box-desc">
          <p>You won be able to remove or change your position once you enter it</p>
        </div>
      </div>
    </div>
  )
}
const SliderContentSetPositionDown = ({ item, setBetDown }) => {
  const { account } = useActiveWeb3React()
  const [state, actions] = useHookPrediction()
  const [amount, setAmount] = useState(0)

  return (
    <div className="item-swiper-content set-position">
      <div className="item-top">
        <div className="item-top-left">
          <button type="button" onClick={() => setBetDown(false)} className="box-icon">
            <img src="/images/imagesPrediction/left-arrow-2.png" alt="" />
          </button>
          <h3 className="txt">Set Position</h3>
        </div>
        <div className="item-top-right">
          <div className="btn-right-position down">
            <img src="/images/imagesPrediction/left-arrow-down.png" alt="" className="img-arrow" /> DOWN
          </div>
        </div>
      </div>
      <div className="item-body">
        <div className="box-commit">
          <h3 className="title">Commit:</h3>
          <div className="commit-logo">
            <div className="box-logo">
              <img src="/images/imagesPrediction/logoBNB.png" alt="" className="img-logo" />{' '}
              <span className="text">BNB</span>
            </div>
          </div>
        </div>
        <IntegerStep />
        <button
          type="button"
          onClick={() => actions.joinPool({ id: item.id, hash: 'temp', amount, account, type: false })}
          className="btn-amount confirm"
        >
          Enter an amount
        </button>
        <div className="box-desc">
          <p>You won be able to remove or change your position once you enter it</p>
        </div>
      </div>
    </div>
  )
}
const SliderContentCalculating = ({ item }) => (
  <div className="item-swiper-content set-position">
    <div className="item-top">
      <div className="item-top-left">
        <div className="box-icon">
          <img src="/images/imagesPrediction/calating.png" alt="" />
        </div>
        <h3 className="txt color-white font-s-17 ">Calculating</h3>
      </div>
      <div className="item-top-right">
        <h3 className="txt color-white font-s-17">#1235</h3>
      </div>
    </div>
    <div className="item-body">
      <div className="box-calculating">
        <div className="btn-calculating">
          <span className="text">Calculating</span> <img src="/images/imagesPrediction/loading.png" alt="" />
        </div>
      </div>
    </div>
  </div>
)
const SliderContentDownCollecting = ({ item }) => (
  <div className="item-swiper-content live prev">
    <div className="item-top">
      <div className="item-top-left">
        <div className="box-icon">
          <img src="/images/imagesPrediction/banned-sign.png" alt="" />
        </div>
        <h3 className="txt color-expair font-s-17">Expired</h3>
      </div>
      <div className="item-top-right">
        <h3 className="txt color-expair font-s-17">#1235</h3>
      </div>
    </div>
    <div className="item-body">
      <div className="box-last-price">
        <h3 className="title-price">Last Price</h3>
        <div className="price-wrap">
          <div className="price-wrap-left">
            ${item.closedPrice} <img src="/images/imagesPrediction/information.png" alt="" />
          </div>
          <div className="price-wrap-right">
            <img src="/images/imagesPrediction/left-arrow-red.png" alt="" className="img-arrow" /> $-0.123
          </div>
        </div>
        <ul className="list-wrap-ul">
          <li>
            <h4 className="wrap-name">Locked Price:</h4>
            <p className="wrap-price">${item.lockedPrice}</p>
          </li>
          <li>
            <h4 className="wrap-name font-w-bold">Prize Pool:</h4>
            <p className="wrap-price font-w-bold">{item.prizePool} BNB</p>
          </li>
        </ul>
      </div>
      <div className="box-trader-view">
        <div className="btn-down">
          <span className="price-btn"> {item.totalDown}x Payout</span> DOWN
          <div className="img-btn">
            <img src="/images/imagesPrediction/down-btn-cus.png" alt="" />
          </div>
        </div>
      </div>
      {/* <div className="box-colleting-win">
        <div className="icon-colleting">
          <img src="/images/imagesPrediction/icon-collecting.png" alt="" />
        </div>
        <div className="text-collecting">
          <a href="!#" className="btn-collecting">
            Collect Winnings
          </a>
        </div>
      </div> */}
    </div>
  </div>
)
const SliderContentUpCollecting = ({ item }) => (
  <div className="item-swiper-content live prev">
    <div className="item-top">
      <div className="item-top-left">
        <div className="box-icon">
          <img src="/images/imagesPrediction/banned-sign.png" alt="" />
        </div>
        <h3 className="txt color-expair font-s-17">Expired</h3>
      </div>
      <div className="item-top-right">
        <h3 className="txt color-expair font-s-17">#1235</h3>
      </div>
    </div>
    <div className="item-body">
      <div className="box-last-price">
        <h3 className="title-price">Last Price</h3>
        <div className="price-wrap">
          <div className="price-wrap-left">
            ${item.closedPrice} <img src="/images/imagesPrediction/information.png" alt="" />
          </div>
          <div className="price-wrap-right">
            <img src="/images/imagesPrediction/left-arrow-red.png" alt="" className="img-arrow" /> $-0.123
          </div>
        </div>
        <ul className="list-wrap-ul">
          <li>
            <h4 className="wrap-name">Locked Price:</h4>
            <p className="wrap-price">${item.lockedPrice}</p>
          </li>
          <li>
            <h4 className="wrap-name font-w-bold">Prize Pool:</h4>
            <p className="wrap-price font-w-bold">{item.prizePool} BNB</p>
          </li>
        </ul>
      </div>
      <div className="box-trader-view">
        <div className="btn-down">
          <span className="price-btn"> {item.totalDown}x Payout</span> DOWN
          <div className="img-btn">
            <img src="/images/imagesPrediction/down-btn-cus.png" alt="" />
          </div>
        </div>
      </div>
      {/* <div className="box-colleting-win">
        <div className="icon-colleting">
          <img src="/images/imagesPrediction/icon-collecting.png" alt="" />
        </div>
        <div className="text-collecting">
          <a href="!#" className="btn-collecting">
            Collect Winnings
          </a>
        </div>
      </div> */}
    </div>
  </div>
)
const SliderContentLiveUpExpair = ({ item }) => (
  <div className="item-swiper-content live cus current">
    <div className="item-top">
      <div className="item-top-left">
        <div className="box-icon">
          <img src="/images/imagesPrediction/play-button-2.png" alt="" />
        </div>
        <h3 className="txt">Live</h3>
      </div>
      <div className="item-top-right">
        <h3 className="txt">#{item.id}</h3>
      </div>
    </div>
    <div className="item-body">
      <div className="box-trader-view">
        <div className="btn-down">
          UP <span className="price-btn"> {item.totalUp}x Payout</span>
          <div className="img-btn">
            <img src="/images/imagesPrediction/btn-up-cus.png" alt="" />
          </div>
        </div>
      </div>
      <div className="box-last-price cus">
        <h3 className="title-price">Last Price</h3>
        <div className="price-wrap">
          <div className="price-wrap-left">
            ${item.closedPrice} <img src="/images/imagesPrediction/information.png" alt="" />
          </div>
          <div className="price-wrap-right">
            <img src="/images/imagesPrediction/left-arrow-green.png" alt="" className="img-arrow" /> $0.123
          </div>
        </div>
        <ul className="list-wrap-ul">
          <li>
            <h4 className="wrap-name">Locked Price:</h4>
            <p className="wrap-price">${item.lockedPrice}</p>
          </li>
          <li>
            <h4 className="wrap-name font-w-bold">Prize Pool:</h4>
            <p className="wrap-price font-w-bold">{item.prizePool} BNB</p>
          </li>
        </ul>
      </div>
      <div className="box-colleting-win cus">
        <div className="icon-colleting">
          <img src="/images/imagesPrediction/icon-collecting.png" alt="" />
        </div>
        <div className="text-collecting">
          <a href="!#" className="btn-collecting">
            Collect Winnings
          </a>
        </div>
      </div>
    </div>
  </div>
)
const SliderContentLastEntered = ({ item }) => (
  <div className="item-swiper-content entered later">
    <div className="item-top">
      <div className="item-top-left">
        <div className="box-icon">
          <img src="/images/imagesPrediction/play-button-1.png" alt="" />
        </div>
        <h3 className="txt">Next</h3>
      </div>
      <div className="item-top-right">
        <h3 className="txt color-white">#1235</h3>
      </div>
    </div>
    <div className="item-body">
      <div className="box-price-pool">
        <h4 className="text">Entry starts:</h4>
        <p className="price">{item.prizePool} BNB</p>
      </div>
      <div className="box-trader-view">
        <div className="btn-up">
          Up
          <div className="img-btn">
            <img src="/images/imagesPrediction/bg-later-up.png" alt="" />
          </div>
        </div>
        <div className="btn-down">
          Down
          <div className="img-btn">
            <img src="/images/imagesPrediction/bg-later-down.png" alt="" />
          </div>
        </div>
      </div>
      <div className="box-entered">
        <a href="#!" className="btn-entered">
          Entered
        </a>
      </div>
    </div>
  </div>
)
const SliderContentSelectUpDown = (
  <div className="item-swiper-content select-up-down">
    <div className="item-top">
      <div className="item-top-left">
        <div className="box-icon">
          <img src="/images/imagesPrediction/play-button-1.png" alt="" />
        </div>
        <h3 className="txt">Next</h3>
      </div>
      <div className="item-top-right">
        <h3 className="txt">#1235</h3>
      </div>
    </div>
    <div className="item-body">
      <div className="btn-up">
        Up <span className="price-btn"> 1.3x Payout</span>
        <div className="img-btn">
          <img src="/images/imagesPrediction/button-up-select.svg" alt="" />
        </div>
      </div>
      <div className="rating-pool">
        <div className="box-price-pool">
          <h4 className="text">Prize Pool:</h4>
          <p className="price">12.312 BNB</p>
        </div>
        <div className="box-btn-rating">
          <a href="#!" className="btn-rating-up">
            Enter Up
          </a>
          <a href="#!" className="btn-rating-down">
            Enter Down
          </a>
        </div>
      </div>
      <div className="btn-down">
        Down <span className="price-btn"> 5.07x Payout</span>
        <div className="img-btn">
          <img src="/images/imagesPrediction/button-down-select.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
)
const RenderDynamic = (data): any => {
  const list: any = []
  if (data.length === 0) {
    return list
  }
  data.forEach((elm) => {
    switch (elm.status) {
      case 0:
        // round later
        list.push(
          <SwiperSlide>
            <SliderContentLast item={elm} />
          </SwiperSlide>
        )
        break
      case 1:
        // round next
        list.push(
          <SwiperSlide>
            <SliderContent item={elm} />
          </SwiperSlide>
        )
        break
      case 2:
        // round locked when calculating
        list.push(
          <SwiperSlide>
            <SliderContentLastEntered item={elm} />
          </SwiperSlide>
        )
        break
      case 3:
        if (elm.profit >= 0) {
          // round live
          list.push(
            <SwiperSlide>
              <SliderContentLiveUp item={elm} />
            </SwiperSlide>
          )
        } else {
          // round live
          list.push(
            <SwiperSlide>
              <SliderContentLiveDown item={elm} />
            </SwiperSlide>
          )
        }
        break
      case 4:
        // round calculator
        list.push(
          <SwiperSlide>
            <SliderContentCalculating item={elm} />
          </SwiperSlide>
        )
        break
      case 5:
        if (elm.profit >= 0) {
          // round up expired
          list.push(
            <SwiperSlide>
              <SliderContentUpCollecting item={elm} />
            </SwiperSlide>
          )
        } else {
          // round down expired
          list.push(
            <SwiperSlide>
              <SliderContentDownCollecting item={elm} />
            </SwiperSlide>
          )
        }
        break
        break
      case 6:
        if (elm.profit >= 0) {
          // round up expired
          list.push(
            <SwiperSlide>
              <SliderContentUpCollecting item={elm} />
            </SwiperSlide>
          )
        } else {
          // round down expired
          list.push(
            <SwiperSlide>
              <SliderContentDownCollecting item={elm} />
            </SwiperSlide>
          )
        }
        break
      default:
        break
    }
  })
  return list
}
const SlideCustom = () => {
  const [state, actions] = useHookPrediction()
  const { account } = useActiveWeb3React()

  useEffect(() => {
    actions.getRounds(account)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  console.log(state.rounds)
  SwiperCore.use([Navigation, Mousewheel, Pagination, Scrollbar, Keyboard, A11y])
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides
      loop
      mousewheel
      slidesPerView={2}
      direction="vertical"
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {/* <SwiperSlide>{SliderContentSelectUpDown}</SwiperSlide>
      <SwiperSlide>{SliderContentLast}</SwiperSlide>
      <SwiperSlide>{SliderContentLiveDownPrev}</SwiperSlide> */}
      {RenderDynamic(state.rounds)}
    </Swiper>
  )
}
export default SlideCustom
