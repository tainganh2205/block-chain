import React, { useEffect, useState } from 'react'
import { store } from 'react-notifications-component'
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Mousewheel, Pagination, Keyboard, Scrollbar, A11y, Controller } from 'swiper/core'
import { Slider, Modal, Input, Button, InputNumber, Progress, Tooltip } from 'antd'
import { useETHBalances } from 'state/wallet/hooks'
import { useJoinPoolContract } from 'hooks/useContract'
import ConnectWalletButton from 'components/ConnectWalletButton'
import CurrencyInputPanelCustom from '../../components/CurrencyInputPanelCustom'
import { useHookPrediction } from './Store'
import { useActiveWeb3React } from '../../hooks'
import _joinPool from './utils'
import { ADDRESS_ADMIN_BNB, CONTRACT_JOIN_POOL } from '../../constants'
import {
  SOCKET_KEY_EVENT_RELOAD,
  SOCKET_KEY_EVENT_CALCULATING,
  SOCKET_KEY_REALTIME_PRICE,
  SOCKET_KEY_REALTIME_JOIN,
} from '../../config/constants'
import ModalClaim from './ModalClaim'
import TimerLater from './TimerLater'
import SocketProcessing from './SocketProcessing'

import 'antd/dist/antd.css'
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'

const minAmount = 0.001
const IntegerStep = ({ inputValue, setInputValue }): any => {
  const [state, actions] = useHookPrediction()
  const { balance } = state
  const [percent, setPercent] = useState(0)

  const onChangeHandle = (value) => {
    setInputValue(value)
  }
  const onChangePercent = (value) => {
    setInputValue(((balance * value) / 100).toFixed(4))
    setPercent(value)
  }
  const handleClickAdd10 = () => {
    setInputValue(((balance * 10) / 100).toFixed(4))
    setPercent(10)
  }
  const handleClickAdd25 = () => {
    setInputValue(((balance * 25) / 100).toFixed(4))
    setPercent(25)
  }
  const handleClickAdd50 = () => {
    setInputValue(((balance * 50) / 100).toFixed(4))
    setPercent(50)
  }
  const handleClickAdd75 = () => {
    setInputValue(((balance * 75) / 100).toFixed(4))
    setPercent(75)
  }
  const handleClickAddMax = () => {
    setInputValue(balance)
    setPercent(100)
  }
  return (
    <div>
      <div className="box-input">
        <CurrencyInputPanelCustom
          value={inputValue.toString()}
          onUserInput={(e: any) => {
            onChangeHandle(e)
          }}
          id={inputValue && parseFloat(inputValue) < minAmount ? 'add-liquidity-input-tokenaa' : ''}
        />
        {inputValue && parseFloat(inputValue) < minAmount ? (
          <span className="text-mininum">A minimum amount of {minAmount} BNB is required</span>
        ) : (
          ''
        )}

        <span className="text-input">Balance: {state.balance}</span>
      </div>
      <div className="box-slide">
        <Slider min={0} max={100} onChange={(e) => onChangePercent(e)} tooltipVisible={false} value={percent} />
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
  const [state, actions] = useHookPrediction()
  const [isbetUp, setBetUp] = useState(false)
  const [isbetDown, setBetDown] = useState(false)
  const { account } = useActiveWeb3React()

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
            <img src="/images/imagesPrediction/play-button-1.svg" alt="" />
          </div>
          <h3 className="txt">Next</h3>
        </div>
        <div className="item-top-right">
          <h3 className="txt">#{item.id}</h3>
        </div>
      </div>

      {item.yourPosition !== null ? (
        <div className="item-body">
          <div className="box-price-pool">
            <h4 className="text">Prize Pool:</h4>
            <p className="price">{state.socketJoin.prizePool > 0 ? state.socketJoin.prizePool : item.prizePool} BNB</p>
          </div>
          {item.yourPosition > 0 ? (
            <div className="box-entered cus">
              <Tooltip title={Math.abs(item.yourPosition)}>
                <button type="button" className="btn-entered">
                  Entered
                </button>
              </Tooltip>
            </div>
          ) : (
            ' '
          )}
          <div className="box-trader-view mar-top-30">
            <button className="btn-up" type="button">
              UP{' '}
              <span className="price-btn">
                {' '}
                {state.socketJoin.upPayout > 0 ? state.socketJoin.upPayout : item.upPayout}x Payout
              </span>
              <div className="img-btn respon-img">
                <img src="/images/imagesPrediction/bg-later-up.png" alt="" />
              </div>
            </button>
            <button className="btn-down" type="button">
              Down{' '}
              <span className="price-btn">
                {' '}
                {state.socketJoin.downLayout > 0 ? state.socketJoin.downLayout : item.downPayout}x Payout
              </span>
              <div className="img-btn respon-img">
                <img src="/images/imagesPrediction/bg-later-down.png" alt="" />
              </div>
            </button>
          </div>
          {item.yourPosition < 0 ? (
            <div className="box-entered">
              <Tooltip title={Math.abs(item.yourPosition)}>
                <button type="button" className="btn-entered">
                  Entered
                </button>
              </Tooltip>
            </div>
          ) : (
            ' '
          )}
        </div>
      ) : (
        <div className="item-body">
          <div className="box-price-pool">
            <h4 className="text">Prize Pool:</h4>
            <p className="price">{state.socketJoin.prizePool > 0 ? state.socketJoin.prizePool : item.prizePool} BNB</p>
          </div>
          <h2 className="title-body">Select your positions</h2>
          <div className="box-trader-view">
            <button
              className="btn-up"
              type="button"
              disabled={item.joinedStatus !== null}
              onClick={() => {
                setBetUp(true)
              }}
            >
              UP{' '}
              <span className="price-btn">
                {' '}
                {state.socketJoin.upPayout > 0 ? state.socketJoin.upPayout : item.upPayout}x Payout
              </span>
              <div className="img-btn">
                <img src="/images/imagesPrediction/up-green.svg" alt="" />
              </div>
            </button>
            <button
              className="btn-down"
              type="button"
              disabled={item.joinedStatus !== null}
              onClick={() => {
                setBetDown(true)
              }}
            >
              Down{' '}
              <span className="price-btn">
                {' '}
                {state.socketJoin.downLayout > 0 ? state.socketJoin.downLayout : item.downPayout}x Payout
              </span>
              <div className="img-btn">
                <img src="/images/imagesPrediction/down-red.svg" alt="" />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
const SliderContentLast = ({ item }) => {
  const now = new Date()
  const utcDate = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    0
  )
  const seconds = item.startTime - utcDate.valueOf() / 1000

  return (
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
          <p className="price">
            <TimerLater startTimeInSeconds={seconds} />
          </p>
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
}

const SliderContentLiveNow = ({ item, socketInfo }) => {
  const [state, actions] = useHookPrediction()
  const [isUp, setIsUp] = useState(true)
  useEffect(() => {
    if (state.socketLiveNow.Profit > 0) setIsUp(true)
    else if (state.socketLiveNow.Profit < 0) setIsUp(false)
    else if (item.profit >= 0) setIsUp(true)
    else setIsUp(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, state.socketLiveNow.Profit, isUp])

  return (
    <div className={isUp ? 'item-swiper-content live cus current animation' : 'item-swiper-content live current animation'}>
      <div className="item-top">
        <div className="item-top-left">
          <div className="box-icon">
            <img src="/images/imagesPrediction/play-button-2.svg" alt="" />
          </div>
          <h3 className="txt">Live</h3>
        </div>
        {item.yourPosition !== null ? (
          <Tooltip title={item.prizePool}>
            <button type="button" className="btn-entered">
              {item.yourPosition > 0 ? 'UP ' : 'DOWN '}Entered
            </button>
          </Tooltip>
        ) : (
          ''
        )}

        <div className="item-top-right">
          <h3 className="txt">#{item.id}</h3>
        </div>
        <div className="progess-live">
          <SocketProcessing socketInfo={socketInfo} />
        </div>
      </div>
      <div className={isUp ? 'item-body' : 'item-body'}>
        {isUp ? (
          <div className={state.socketLiveNow.Profit > 0 ? 'box-trader-view animation-up' : 'box-trader-view animation-end-up'}>
            <div className="btn-down">
              UP <span className="price-btn">{item.upPayout} x Payout</span>
              <div className="img-btn">
                <img src="/images/imagesPrediction/up-res-green.svg" alt="" />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className={isUp ? 'box-last-price cus' : 'box-last-price'}>
          <h3 className="title-price">Last Price</h3>
          <div className="price-wrap">
            <div className="price-wrap-left">
              $
              {state.socketLiveNow.LastPrice !== 0
                ? state.socketLiveNow.LastPrice
                : item.closedPrice > 0
                ? item.closedPrice
                : item.lockedPrice}
              <Tooltip title="Last price from Binance Exchange">
                <img src="/images/imagesPrediction/information.png" alt="" />
              </Tooltip>
            </div>
            <div className="price-wrap-right">
              {isUp ? (
                <img src="/images/imagesPrediction/left-arrow-green.png" alt="" className="img-arrow" />
              ) : (
                <img src="/images/imagesPrediction/left-arrow-red.png" alt="" className="img-arrow" />
              )}
              ${state.socketLiveNow.Profit !== 0 ? state.socketLiveNow.Profit : item.profit}
            </div>
          </div>
          <ul className="list-wrap-ul">
            <li>
              <h4 className="wrap-name">Locked Price:</h4>
              <p className="wrap-price">${item.lockedPrice}</p>
            </li>
            <li>
              <h4 className="wrap-name font-w-bold">Prize Pool:</h4>
              <p className="wrap-price font-w-bold"> {item.prizePool} BNB</p>
            </li>
          </ul>
        </div>
        {isUp ? (
          ''
        ) : (
          <div className={state.socketLiveNow.Profit === 0 ? 'box-trader-view animation-end-down' : 'box-trader-view animation-down'}>
            <div className="btn-down down-animation">
              <span className="price-btn">{item.downPayout} x Payout</span> DOWN
              <div className="img-btn">
                <img src="/images/imagesPrediction/down-btn-cus.png" alt="" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const SliderContentSetPosition = ({ item, setBetUp }) => {
  const { account } = useActiveWeb3React()
  const [state, actions] = useHookPrediction()
  const joinPoolContract = useJoinPoolContract(CONTRACT_JOIN_POOL)
  const [inputValue, setInputValue] = useState(0)
  const [isType, setIsType] = useState(true)
  const [isLoading, setLoading] = useState(false)

  const joinPool = () => {
    if (inputValue <= 0) {
      return
    }
    setLoading(true)
    _joinPool(joinPoolContract, ADDRESS_ADMIN_BNB, inputValue, account)
      .then((resData) => {
        actions.joinPool({ id: item.id, hash: resData.hash, amount: inputValue, account, type: isType }).then((res) => {
          if (res.succeeded) {
            actions.getRounds(account)
            actions.getHitorys(account)
            store.addNotification({
              title: 'Successfully',
              message: (
                <div className="custom-fontsize">
                  <i className="fa fa-check-square-o icon-success" aria-hidden="true" /> UP position entered
                </div>
              ),
              type: 'warning',
              width: 300,
              insert: 'center',
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
            setBetUp(false)
            actions.changeAmount(0)
          } else {
            store.addNotification({
              title: res.message,
              message: (
                <div className="custom-fontsize">
                  <i className="fa fa-check-square-o icon-success" aria-hidden="true" /> UP position entered
                </div>
              ),
              type: 'warning',
              width: 300,
              insert: 'center',
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
          }
          setLoading(false)
        })
      })
      .catch((err) => {
        setLoading(false)
      })
  }
  return (
    <div className="item-swiper-content set-position">
      <div className="item-top">
        <div className="item-top-left">
          <button type="button" onClick={() => setBetUp(false)} className="box-icon">
            <img src="/images/imagesPrediction/left-arrow-2.png" alt="" /> {`  `}
          </button>
          <h3 className="txt">Set Position</h3>
        </div>
        <div className="item-top-right">
          <button
            type="button"
            onClick={() => setIsType(!isType)}
            className={`btn-right-position ${!isType ? 'down' : ''}`}
          >
            <img
              src={
                isType
                  ? '/images/imagesPrediction/left-arrow-white.png'
                  : '/images/imagesPrediction/left-arrow-down.png'
              }
              alt=""
              className="img-arrow"
            />{' '}
            {isType ? 'UP' : 'DOWN'}
          </button>
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
        <div className={`${account ? '' : 'disible-round'}`}>
          <IntegerStep inputValue={inputValue} setInputValue={setInputValue} />
        </div>
        {account ? (
          <div className="box-btn-amount">
            <button
              disabled={isLoading || !inputValue || !!(inputValue && parseFloat(inputValue.toString()) < minAmount)}
              type="button"
              onClick={() => joinPool()}
              className={inputValue ? 'btn-amount confirm' : 'btn-amount'}
            >
              {inputValue ? 'Confirm' : 'Enter an amount'}
            </button>{' '}
          </div>
        ) : (
          <div className="box-btn-amount">
            <ConnectWalletButton />
          </div>
        )}

        <div className="box-desc">
          <p>You won&rsquo;t be able to remove or change your position once you confirm it</p>
        </div>
      </div>
    </div>
  )
}
const SliderContentSetPositionDown = ({ item, setBetDown }) => {
  const { account } = useActiveWeb3React()
  const [state, actions] = useHookPrediction()
  const [inputValue, setInputValue] = useState(0)
  const joinPoolContract = useJoinPoolContract(CONTRACT_JOIN_POOL)
  const [isLoading, setLoading] = useState(false)
  const [isType, setIsType] = useState(false)

  const joinPool = () => {
    if (inputValue <= 0) {
      return
    }
    setLoading(true)
    _joinPool(joinPoolContract, ADDRESS_ADMIN_BNB, inputValue, account)
      .then((resData) => {
        actions.joinPool({ id: item.id, hash: resData.hash, amount: inputValue, account, type: isType }).then((res) => {
          if (res.succeeded) {
            actions.getRounds(account)
            actions.getHitorys(account)
            store.addNotification({
              title: 'Successfully',
              message: (
                <div className="custom-fontsize">
                  <i className="fa fa-check-square-o icon-success" aria-hidden="true" /> DOWN position entered
                </div>
              ),
              type: 'warning',
              width: 300,
              insert: 'center',
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
            setBetDown(false)
          } else {
            store.addNotification({
              title: res.message,
              message: (
                <div className="custom-fontsize">
                  <i className="fa fa-check-square-o icon-success" aria-hidden="true" /> DOWN position entered
                </div>
              ),
              type: 'warning',
              width: 300,
              insert: 'center',
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
          }
          setLoading(false)
        })
      })
      .catch((err) => {
        setLoading(false)
      })
  }
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
          <button
            type="button"
            onClick={() => setIsType(!isType)}
            className={`btn-right-position ${!isType ? 'down' : ''}`}
          >
            <img
              src={
                isType
                  ? '/images/imagesPrediction/left-arrow-white.png'
                  : '/images/imagesPrediction/left-arrow-down.png'
              }
              alt=""
              className="img-arrow"
            />{' '}
            {isType ? 'UP' : 'DOWN'}
          </button>
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
        <div className={`${account ? '' : 'disible-round'}`}>
          <IntegerStep inputValue={inputValue} setInputValue={setInputValue} />
        </div>
        {account ? (
          <div className="box-btn-amount">
            <button
              disabled={isLoading || !inputValue}
              type="button"
              onClick={() => joinPool()}
              className={inputValue ? 'btn-amount confirm' : 'btn-amount'}
            >
              {inputValue ? 'Confirm' : 'Enter an amount'}
            </button>{' '}
          </div>
        ) : (
          <div className="box-btn-amount">
            <ConnectWalletButton />
          </div>
        )}
        <div className="box-desc">
          <p>You won&rsquo;t be able to remove or change your position once you confirm it</p>
        </div>
      </div>
    </div>
  )
}
const SliderContentCalculating = ({ item }) => (
  <div className="item-swiper-content set-position resize-responsive">
    <div className="item-top">
      <div className="item-top-left">
        <div className="box-icon">
          <img src="/images/imagesPrediction/calating.png" alt="" />
        </div>
        <h3 className="txt color-white font-s-17 ">Calculating</h3>
      </div>
      <div className="item-top-right">
        <h3 className="txt color-white font-s-17">#{item.id}</h3>
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
const SliderContentDownCollecting = ({ item }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { account } = useActiveWeb3React()
  const [state, actions] = useHookPrediction()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="item-swiper-content live prev before">
      <div className="item-top">
        <div className="item-top-left">
          <div className="box-icon">
            <img src="/images/imagesPrediction/banned-sign.png" alt="" />
          </div>
          <h3 className="txt color-expair font-s-17">Expired</h3>
        </div>
        <div className="item-top-right">
          <h3 className="txt color-expair font-s-17">#{item.id}</h3>
        </div>
        <div className="progess-live">
          <Progress percent={100} />
        </div>
      </div>
      <div className="item-body">
        <Modal
          title="Collect Winnings"
          className="modal-collect"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="content-modal-collect">
            <div className="box-icon">
              <img src="/images/imagesPrediction/logo-modal-collect.png" alt="" />
            </div>
            <div className="collect-price">
              <h5 className="title">Collecting</h5>
              <p className="price">
                {item.amount} BNB <span className="txt">{(item.amount * item.closedPrice).toFixed(4)}$</span>
              </p>
            </div>
            <button
              onClick={() =>
                actions.claim(account, item.id).then((res) => {
                  if (res.succeeded) {
                    store.addNotification({
                      title: 'Collecting',
                      message: (
                        <div className="custom-fontsize">
                          <i className="fa fa-check-square-o icon-success" aria-hidden="true" />{' '}
                          {res.message || 'Successfully'}
                        </div>
                      ),
                      type: 'warning',
                      width: 300,
                      insert: 'center',
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
                  } else {
                    store.addNotification({
                      title: 'Collecting',
                      message: (
                        <div className="custom-fontsize">
                          <i className="fa fa-times icon-fail" aria-hidden="true" /> Collecting fail
                        </div>
                      ),
                      type: 'warning',
                      width: 300,
                      insert: 'center',
                      container: 'top-center',
                      animationIn: ['animate__animated fail', 'animate__fadeIn'],
                      animationOut: ['animate__animated fail', 'animate__fadeOut'],
                      dismiss: {
                        duration: 2000,
                        onScreen: true,
                        pauseOnHover: true,
                        click: true,
                        touch: true,
                      },
                    })
                  }
                  actions.getHitorys(account)
                  handleCancel()
                })
              }
              type="button"
              className="btn-cofirm"
            >
              Confirm
            </button>
          </div>
        </Modal>

        {item.joinedStatus === 2 ? (
          <div className="box-colleting-win cus">
            <div className="icon-colleting">
              <img src="/images/imagesPrediction/icon-collecting.png" alt="" />
            </div>
            <div className="text-collecting">
              <button
                type="button"
                onClick={() => {
                  actions.updateObjHistory(item)
                  actions.setModal(true)
                }}
                className="btn-collecting"
              >
                Collect Winnings
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="box-last-price">
          <h3 className="title-price">Last Price</h3>
          <div className="price-wrap">
            <div className="price-wrap-left">
              ${item.closedPrice} <img src="/images/imagesPrediction/information.png" alt="" />
            </div>
            <div className="price-wrap-right">
              <img src="/images/imagesPrediction/left-arrow-red.png" alt="" className="img-arrow" /> ${item.profit}
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
            <span className="price-btn"> {item.downPayout}x Payout</span> DOWN
            <div className="img-btn">
              <img src="/images/imagesPrediction/down-res-red.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const SliderContentUpCollecting = ({ item }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { account } = useActiveWeb3React()
  const [state, actions] = useHookPrediction()

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="item-swiper-content cus live current before">
      <div className="item-top">
        <div className="item-top-left">
          <div className="box-icon">
            <img src="/images/imagesPrediction/banned-sign.png" alt="" />
          </div>
          <h3 className="txt color-expair font-s-17">Expired</h3>
        </div>
        <div className="item-top-right">
          <h3 className="txt color-expair font-s-17">#{item.id}</h3>
        </div>
        <div className="progess-live">
          <Progress percent={100} />
        </div>
      </div>

      <div className="item-body">
        <div className="box-trader-view">
          <div className="btn-down">
            <span className="price-btn"> {item.downPayout}x Payout</span> UP
            <div className="img-btn">
              <img src="/images/imagesPrediction/up-res-green.svg" alt="" />
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
              <img src="/images/imagesPrediction/left-arrow-green.png" alt="" className="img-arrow" /> ${item.profit}
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
        <Modal
          title="Collect Winnings"
          className="modal-collect"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="content-modal-collect">
            <div className="box-icon">
              <img src="/images/imagesPrediction/logo-modal-collect.png" alt="" />
            </div>
            <div className="collect-price">
              <h5 className="title">Collecting</h5>
              <p className="price">
                {item.amount} BNB <span className="txt">{(item.amount * item.closedPrice).toFixed(4)}$</span>
              </p>
            </div>
            <button
              onClick={() =>
                actions.claim(account, item.id).then((res) => {
                  if (res.succeeded) {
                    store.addNotification({
                      title: 'Collecting',
                      message: (
                        <div className="custom-fontsize">
                          <i className="fa fa-check-square-o icon-success" aria-hidden="true" />{' '}
                          {res.message || 'Successfully'}
                        </div>
                      ),
                      type: 'warning',
                      width: 300,
                      insert: 'center',
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
                  } else {
                    store.addNotification({
                      title: 'Collecting',
                      message: (
                        <div className="custom-fontsize">
                          <i className="fa fa-times icon-fail" aria-hidden="true" /> Collecting fail
                        </div>
                      ),
                      type: 'warning',
                      width: 300,
                      insert: 'center',
                      container: 'top-center',
                      animationIn: ['animate__animated fail', 'animate__fadeIn'],
                      animationOut: ['animate__animated fail', 'animate__fadeOut'],
                      dismiss: {
                        duration: 2000,
                        onScreen: true,
                        pauseOnHover: true,
                        click: true,
                        touch: true,
                      },
                    })
                  }
                  actions.getHitorys(account)
                  handleCancel()
                })
              }
              type="button"
              className="btn-cofirm"
            >
              Confirm
            </button>
          </div>
        </Modal>
        {item.joinedStatus === 2 ? (
          <div className="box-colleting-win">
            <div className="icon-colleting">
              <img src="/images/imagesPrediction/icon-collecting.png" alt="" />
            </div>
            <div className="text-collecting">
              <button
                type="button"
                onClick={() => {
                  actions.updateObjHistory(item)
                  actions.setModal(true)
                }}
                className="btn-collecting"
              >
                Collect Winnings
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

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
        <h3 className="txt color-white">#{item.id}</h3>
      </div>
    </div>
    <div className="item-body">
      <div className="box-price-pool">
        <h4 className="text">Entry starts:</h4>
        <p className="price">{item.prizePool} BNB</p>
      </div>
      <div className="box-trader-view">
        <button className="btn-up" type="button">
          UP <span className="price-btn"> {item.upPayout}x Payout</span>
          <div className="img-btn">
            <img src="/images/imagesPrediction/bg-later-up.png" alt="" />
          </div>
        </button>
        <button className="btn-down" type="button">
          Down <span className="price-btn"> {item.downPayout}x Payout</span>
          <div className="img-btn">
            <img src="/images/imagesPrediction/bg-later-down.png" alt="" />
          </div>
        </button>
      </div>
      <div className="box-entered">
        <button type="button" className="btn-entered">
          Entered
        </button>
      </div>
    </div>
  </div>
)

const RenderDynamic = (data, socketInfo): any => {
  const list: any = []
  if (data.length === 0) {
    return list
  }
  data.forEach((elm, index) => {
    const keyName = `swiperslide-${index}`
    switch (elm.status) {
      case 0:
        // round later
        list.push(
          <SwiperSlide key={keyName}>
            <SliderContentLast item={elm} />
          </SwiperSlide>
        )
        break
      case 1:
        // round next
        list.push(
          <SwiperSlide key={keyName}>
            <SliderContent item={elm} />
          </SwiperSlide>
        )
        break
      case 2:
        // round locked when calculating
        list.push(
          <SwiperSlide key={keyName}>
            <SliderContentLastEntered item={elm} />
          </SwiperSlide>
        )
        break
      case 3:
        list.push(
          <SwiperSlide key={keyName}>
            <SliderContentLiveNow item={elm} socketInfo={socketInfo} />
          </SwiperSlide>
        )
        break
      case 4:
        // round calculator
        list.push(
          <SwiperSlide key={keyName}>
            <SliderContentCalculating item={elm} />
          </SwiperSlide>
        )
        break
      case 5:
        if (elm.profit >= 0) {
          // round up expired
          list.push(
            <SwiperSlide key={keyName}>
              <SliderContentUpCollecting item={elm} />
            </SwiperSlide>
          )
        } else {
          // round down expired
          list.push(
            <SwiperSlide key={keyName}>
              <SliderContentDownCollecting item={elm} />
            </SwiperSlide>
          )
        }
        break
      case 6:
        if (elm.profit >= 0) {
          // round up expired
          list.push(
            <SwiperSlide key={keyName}>
              <SliderContentUpCollecting item={elm} />
            </SwiperSlide>
          )
        } else {
          // round down expired
          list.push(
            <SwiperSlide key={keyName}>
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

const SlideCustom = ({ socketInfo }) => {
  const [state, actions] = useHookPrediction()
  const { account } = useActiveWeb3React()
  const userEthBalance: any = useETHBalances(account ? [account] : [])?.[account ?? '']

  useEffect(() => {
    if (state.isLoadingRounds) {
      actions.changeLoadingRounds(false)
      actions.getRounds(account)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isLoadingRounds])

  useEffect(() => {
    if (socketInfo.Key === SOCKET_KEY_EVENT_CALCULATING) {
      actions.changeLoadingRounds(true)
    } else if (socketInfo.Key === SOCKET_KEY_EVENT_RELOAD) {
      actions.changeLoadingRounds(true)
    } else if (socketInfo.Key === SOCKET_KEY_REALTIME_JOIN) {
      actions.changeJoin(socketInfo.Item)
    } else if (socketInfo.Key === SOCKET_KEY_REALTIME_PRICE) {
      actions.changeLiveNow(socketInfo.Item)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, socketInfo.Key, socketInfo.Item])

  // [smith end] lock
  const handleCancel = () => {
    actions.setModal(false)
  }

  useEffect(() => {
    if (userEthBalance) {
      const result: any = userEthBalance.toFixed(4)
      actions.changeBalance(parseFloat(result))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, userEthBalance])

  SwiperCore.use([Navigation, Mousewheel, Pagination, Scrollbar, A11y, Controller])

  return (
    <>
      <ModalClaim
        handleOk={handleCancel}
        handleCancel={handleCancel}
        account={account}
        isModal={state.isModal}
        objHistory={state.objHistory}
        actions={actions}
      />
      <SwiperComponent
        spaceBetween={0}
        centeredSlides
        mousewheel
        initialSlide={5}
        allowTouchMove={false}
        grabCursor
        noSwiping
        noSwipingClass="swiper-no-swiping"
        shortSwipes={false}
        slidesPerView={2}
        direction="vertical"
        navigation
        onSlideChange={() => null}
      >
        {RenderDynamic(state.rounds, socketInfo)}
      </SwiperComponent>
    </>
  )
}
export default SlideCustom
