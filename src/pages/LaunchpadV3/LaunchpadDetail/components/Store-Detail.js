import axios from "axios";
import {
  createStore,
  createHook,
  createContainer,
  createSubscriber,
} from "react-sweet-state";
import { API_NFT } from 'constants/index';
import _ from 'lodash'

const headersConfig = {
  'Content-Type': 'application/json',
}

const StoreDetail = createStore({
  initialState: {
    isShowDisClaimer:false,
    statusClaimed:false,
    statusJoined:false,
    objData: null,
    listAllocations: [],
    process: 0,
    objJoin: {
      busd: 0,
      isJionPool: false,
      totalToken: 0
    },
    objGetJoin: { },
    isClaim: false,
    objClaim: null,
    processRealtime: {
      isJoined: false,
      isClaimed: false,
    },
    isReloadDetail: false,
    isHideRefundClaiming:false
  },
  actions: {
    insertClaimIDo: (idoId, account, amount) =>
        ({ getState, setState }) => {
          return new Promise((resolve, reject) => {
            axios
              .post(`${API_NFT}/Ido/ido_claim`, {
                idoId: parseInt(idoId),
                ownerAddress: account,
                balance: amount,
              })
              .then((res) => {
                setState({
                  objClaim: { ...getState().objClaim, totalToken: 0 },
                }); // TODO
                resolve(res.data);
              });
          });
        },
    addJoinPool:
      (obj) =>
        ({ getState, setState }) => {
          return new Promise((resolve, reject) => {
            axios
              .post(`${API_NFT}/Ido/join_pool`, {
                ido_Id: parseInt(obj.id),
                ownerAddress: obj.account,
                balance: obj.amount,
                txnhash: obj.blockHash
              })
              .then((res) => {
                const { data } = res.data
                setState({
                  objJoin: { ...getState().objJoin, isJionPool: false }
                })
                resolve(res.data)
              })
          })
        },
    checkJoinPool:
      (obj) =>
        ({ getState, setState }) => {
          return new Promise((resolve, reject) => {
            axios
              .post(`${API_NFT}/Ido/pool_weight_by_address`, obj)
              .then((res) => {
                const { data } = res.data
                if (data) {
                  setState({ objJoin: data })
                }
                resolve(res.data)
              })
          })
        },
    getProjectDetail: (id) => ({ getState, setState }) => {
      return new Promise((resolve, reject) => {
        axios.get(`${API_NFT}/Ido/${id}`).then((res) => {
          const { data } = res.data
          setState({ objData: data });
          resolve(data || {})
        })
      })
    },
    updateShowDisClaimer: (val) => ({ setState }) => {
      setState({ isShowDisClaimer: val});
    },
    resetData: () => ({ setState }) => {
      setState({ objData: null});
    },
    resetListAllocations: () => ({ setState }) => {
      setState({ listAllocations:[] });
    },
    checkIsClaim:
      (idoId, account) => ({ getState, setState }) => {
          return new Promise((resolve, reject) => {
            axios
              .post(`${API_NFT}/Ido/isClaim`, {
                ownerAddress: account,
                idoId: parseInt(idoId),
              })
              .then((res) => {
                setState({ objClaim: res.data.data })
                resolve(res.data)
              })
          })
      },
      refundAmount:
      (idoId, account) => ({ getState, setState }) => {
          return new Promise((resolve, reject) => {
            axios
              .post(`${API_NFT}/Ido/refund`, {
                ownerAddress: account,
                idoId: parseInt(idoId),
              })
              .then((res) => {
                resolve(res.data)
              })
          })
      },
      addDisclaimer:
      (valueConfirm) => ({ getState, setState }) => {
          // console.log("statuis:", valueConfirm)
          return new Promise((resolve, reject) => {
            
            axios
              .post(`${API_NFT}/Ido/disclaimer`, valueConfirm, {
                headers: headersConfig
              })
              .then((res) => {
                resolve(res.data)
              })
          })
      },
    getYourAllocations: (account, idoId) => async ({ setState }) => {
        const res = await axios.post(`${API_NFT}/Ido/your_allocations`, {
          ownerAddress: account,
          idoId: parseInt(idoId)
        })
        const { data: { data } } = res
        setState({ listAllocations: data || [] })
    },
    changeLoadDetail: (isReload) => ({ setState }) => {
      setState({ isReloadDetail: isReload })
    },
    changeRefundStatus: (status) => ({ setState }) => {
      setState({ isHideRefundClaiming: status })
    },
  },
  name: "Detail Store",
});

export const useHookDetail = createHook(StoreDetail);
export const Container = createContainer(StoreDetail, {
  onInit:
    () =>
    ({ setState }, props) => {
      setState({ ...props });
    },
});
export const Subscriber = createSubscriber(StoreDetail);