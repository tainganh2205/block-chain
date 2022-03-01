/* eslint-disable prefer-template */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return, no-param-reassign */
import axios from 'axios'
import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'

import { API_NFT, TOKEN_BSCS, BSCSCAN_APIKEY, BSCSCAN_API_MAINNET } from 'constants/index'
import { set } from 'lodash'

const headersConfig = {
  'Content-Type': 'application/json',
}

const StoreProjects = createStore({
  initialState: {
    yourBalanceBSCS: {},
    idoList: [],
    idoListEnd: [],
    idoListEndMore: [],
    idoListJoinedMore: [],
    idoListJoined: [],
    idoListSchedule: {},
    idoListScheduleJoined:{},
    idoDetail: {},
    logo: '',
    listIdIdo:'',
    listPrice:[],
    currenPrice:0,
    counter: 0,
    owner: null
  },
  actions: {
    getOwner: ({ account }) => async ({ setState }) => {
      try {
        const res = await axios.post(`${API_NFT}/Ido/owner_address`, {
          ownerAddress: account
        })
        const { data: { data } } = res
        setState({ owner: data })
      } catch (err) {
        // TODO
      }
    },
    getBalanceByWallet: (addresswallet) => async ({ setState }) => {
      try {
        const { data } = await axios(
          `${BSCSCAN_API_MAINNET}/api?module=account&action=tokenbalance&contractaddress=${TOKEN_BSCS}&address=${addresswallet}&apikey=${BSCSCAN_APIKEY}`
        )
        setState({ yourBalanceBSCS: data })
      } catch (err) {
        // TODO
      }
    },
    getProjectNew: (params) => async ({ setState }) => {
      let res = null;
      try {
        res = await axios.post(`${API_NFT}/launchpad/open_idos`, params)
        const { data: { data } } = res
        setState({ idoList: data || [] })
      } catch (err) {
        // TODO
      }
      return res;
    },
    getProjectDetal: (params) => async ({ setState, getState }) => {
      try {
        const res = await axios.post(`${API_NFT}/launchpad/detail`, { ...params })
        setState({ idoDetail: res.data.data } || {})
        setState({ counter: getState().counter + 1 })
        return res
      } catch (err) {
        // TODO
      }
    },
    getProjectEnd: (params) => async ({ setState, getState }) => {
      try {
         await axios.post(`${API_NFT}/launchpad/ended_idos`,params).then((res)=>{
          const { data: { data } } = res
          setState({ idoListEnd: data || [] })  
          for(let i=0;i<data.length;i++){
            if(data[i].referenceId !== null && data[i].referenceId !== ""){
              setState({listIdIdo: getState().listIdIdo + data[i].referenceId+ ','})
            }
          }
          const paramsCoingecko = {
            vs_currency: "usd",
            ids: getState().listIdIdo,
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
            price_change_percentage: "24h",
          };

          if(getState().listIdIdo !== ''){
            axios
                .get("https://api.coingecko.com/api/v3/coins/markets", {
                      params: paramsCoingecko,
                    }).then((res1)=>{
              setState({listPrice : res1.data})
            })             
          }
        })
        
      } catch (err) {
        // TODO
      }
    },

    getProjectEndMore: (params) => ({ getState, setState }) => {
      return new Promise((resolve, reject) => {
        axios
        .post(`${API_NFT}/launchpad/ended_idos`, params)
          .then((res) => {
            const { data: { data } } = res
            setState({ idoListEndMore: getState().idoListEndMore.concat(data) || [] })
            for(let i=0;i<data.length;i++){
              if(data[i].referenceId !== null && data[i].referenceId !== ""){
                setState({listIdIdo: getState().listIdIdo + data[i].referenceId+ ','})
              }
            }
            const paramsCoingecko = {
              vs_currency: "usd",
              ids: getState().listIdIdo,
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
              price_change_percentage: "24h",
            };
  
            if(getState().listIdIdo !== ''){
              axios
                  .get("https://api.coingecko.com/api/v3/coins/markets", {
                        params: paramsCoingecko,
                      }).then((res1)=>{
                setState({listPrice : res1.data})
              })             
            }
            resolve(data)
          })
      })
    },
    getProjectJoinedMore: (params) => ({ getState, setState }) => {
      return new Promise((resolve, reject) => {
        axios
        .post(`${API_NFT}/launchpad/joined_idos`, params)
          .then((res) => {
            const { data: { data } } = res
            setState({ idoListJoinedMore: getState().idoListJoinedMore.concat(data) || [] })
            resolve(data)
          })
      })
    },
    getProjectJoined: (params) => async ({ setState }) => {
      try {
        const res = await axios.post(`${API_NFT}/launchpad/joined_idos`, params)
        const { data: { data } } = res
        setState({ idoListJoined: data || [] })
      } catch (err) {
        // TODO
      }
    },
    getSchedule: (m, y) => async ({ setState }) => {
      try {
        const res = await axios.post(`${API_NFT}/ido/schedule`, {
          month: m,
          year: y
        })
        const { data: { data } } = res
        setState({ idoListSchedule: data || [] })
      } catch (err) {
        // TODO
      }
    },
    getScheduleJoined: (params) => async ({ setState }) => {
      try {
        const res = await axios.post(`${API_NFT}/launchpad/claim_calendar`, params) 
        const { data: { data } } = res
        setState({ idoListScheduleJoined: data || [] })
      } catch (err) {
        // TODO
      }
    },
    resetData: () => async ({ setState }) => {
      setState({ idoList: [] })
    },
  },
  name: 'Projects Store',
})

export const useHookProjects = createHook(StoreProjects)
export const Container = createContainer(StoreProjects, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props })
  },
})
export const Subscriber = createSubscriber(StoreProjects)
