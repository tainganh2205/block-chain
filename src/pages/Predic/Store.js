/* eslint-disable object-shorthand */
import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import axios from 'axios'
import _ from 'lodash'
import { API_NFT } from '../../constants'

const StorePrediction = createStore({
  initialState: {
    rounds: [{}],
    amount: 0,
    historys: [],
    balance: 0,
    report: {
      lost: {},
      won: {},
      entered: {},
      avgPositionEntered: {},
      bestRound: {},
      avgReturn: {},
      wonPercent: {},
      netResult: {},
    },
    theBest:[],
    isLoadingRounds: false,
    isLoadingHistory: false,
    timeCountDown: { Mins: 0, Secs: 0 },
    timeProcess: 0,
    laterTimeRemain: 5,
    socketLiveNow: { GroupPool: 0, LastPrice: 0, Profit: 0 },
    socketJoin: { groupPool: 0, upPayout: 0, downLayout: 0, prizePool: 0 },
    isHistory: false,
    isModal: false,
    isModalClaimBonus: false,
    objHistory: { id: 0, amount: 0, closedPrice: 0 },
    roundIdToClaim: 0,
    isMaintenance: false,
    objBonus :{Bonus: 0, BonusPrice: 0, ReceiveId: 0},
  },

  actions: {
    updateObjHistory: (objHistory) => ({ setState }) => {
      setState({ objHistory })
    },
    updateObjBonus: (objBonus) => ({ setState }) => {
      setState({ objBonus })
    },
    setModal: (isModal) => ({ setState }) => {
      setState({ isModal })
    },
    setModalClaimBonus: (isModalClaimBonus) => ({ setState }) => {
      setState({ isModalClaimBonus })
    },
    changeLiveNow: (Item) => ({ setState }) => {
      setState({ socketLiveNow: Item })
    },
    changeJoin: (Item) => ({ setState }) => {
      setState({ socketJoin: Item })
    },
    changeTimeCountDown: (Item) => ({ setState }) => {
      setState({ timeCountDown: Item })
    },
    changeTimeProcess: (percent) => ({ setState }) => {
      setState({ timeProcess: percent })
    },

    setHistory: (isHistory) => ({ setState }) => {
      setState({ isHistory })
    },
    setTheBestWin: (isTheBest) => ({ setState }) => {
      setState({ isTheBest })
    },
    setTheBestVolum: (isTheBest) => ({ setState }) => {
      setState({ isTheBest })
    },
    changeLoadingRounds: (isLoadingRounds) => ({ setState }) => {
      setState({ isLoadingRounds: isLoadingRounds })
    },
    changeLoadingHistory: (isLoadingHistory) => ({ setState }) => {
      setState({ isLoadingHistory: isLoadingHistory })
    },
    changeAmount: (amount) => ({ setState }) => {
      setState({ amount })
    },
    changeBalance: (balance) => ({ setState }) => {
      setState({ balance })
    },
    getReport: (account) => ({ setState }) => {
      return new Promise((resolve, reject) => {
        try {
          axios.post(`${API_NFT}/prediction/report`, { ownerAddress: account }).then((res) => {
            const { data } = res.data
            setState({ report: data })
            resolve(data)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    getTheBests: (type, account) => ({ setState }) => {
      return new Promise((resolve, reject) => {
        try {
          axios.post(`${API_NFT}/prediction/top_the_best`, { Type : type , ownerAddress: account }).then((res) => {
            const { data } = res.data
            setState({ theBest: data })
            resolve(data)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    getHitorys: (account) => ({ setState }) => {
      return new Promise((resolve, reject) => {
        try {
          axios.post(`${API_NFT}/prediction/joined_history`, { ownerAddress: account }).then((res) => {
            const { data } = res.data
            setState({ historys: data })
            resolve(data)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    getRounds: (account) => ({ setState }) => {
      let params = {}
      if (account) {
        params = { ownerAddress: account }
      }
      return new Promise((resolve, reject) => {
        axios.post(`${API_NFT}/prediction/all`, params).then((res) => {
          let { data } = res.data
          data = data.length > 0 && _.sortBy(data, (o) => o.id)
          setState({ rounds: data || [], isMaintenance: data.length <= 0 })
          resolve(data || [])
        })
      })
    },
    joinPool: ({ id, type, account, hash, amount }) => ({ getState }) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${API_NFT}/prediction/join
        `,
            {
              ownerAddress: account,
              poolId: id, // Id của pool
              balance: parseFloat(type ? amount : -amount), // nếu > 0 Up; nếu  < 0 Down;
              txnHash: hash,
            }
          )
          .then((res) => {
            resolve(res.data)
          })
      })
    },
    claim: (account, id) => ({ getState }) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${API_NFT}/prediction/claim
        `,
            {
              ownerAddress: account,
              poolId: id,
            }
          )
          .then((res) => {
            resolve(res.data)
          })
      })
    },
    checkClaim: (account) => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${API_NFT}/prediction/is_has_round_win
        `,
            {
              ownerAddress: account,
            }
          )
          .then((res) => {
            setState({ roundIdToClaim: res.data.data || 0 })
            resolve(res.data)
          })
      })
    },
    claimBonus: (account , receiveId) => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${API_NFT}/prediction/claim_bonus
        `,
            {
              receiveId: receiveId,
              ownerAddress: account,
            }
          )
          .then((res) => {
            setState({ receiveId: res.data.data || 0 })
            resolve(res.data)
          })
      })
    },
  },
  name: 'StorePrediction',
})

export const useHookPrediction = createHook(StorePrediction)
export const Container = createContainer(StorePrediction, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props })
  },
})
export const Subscriber = createSubscriber(StorePrediction)
