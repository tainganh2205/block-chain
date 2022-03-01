/* eslint-disable consistent-return */
/* eslint-disable array-callback-return, no-param-reassign */
import axios from 'axios'
import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'

import { API_NFT, TOKEN_BSCS, BSCSCAN_APIKEY,BSCSCAN_API_MAINNET } from 'constants/index'

const StoreProjects = createStore({
  initialState: {
    yourBalanceBSCS: {},
    idoList: [],
    logo:'',
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
    getProjectNew: () => async ({ setState }) => {
      try {
        const res = await axios.get(`${API_NFT}/launchpad/open_idos`, {
        })
        const { data: { data } } = res
        setState({ idoList: data || []})
      } catch (err) {
        // TODO
      }
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
