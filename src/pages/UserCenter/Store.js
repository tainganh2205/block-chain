import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import axios from 'axios'
import { API_NFT } from '../../constants'

const StoreNft = createStore({
  initialState: {
    objData: {},
    listNFT:[],
    author:0,
    totalCount:0,
    
    params:{
      pageNumber:1,
      author:0
    }
  },
  actions: {
    getUserDetail: (id) => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios(`${API_NFT}/Artists/${id}`).then((res) => {
          const { data } = res.data
          setState({ objData: { ...data, tokenId: '9' } }) // TODO
        })
      })
    },
    getProductsUser: ()=>({getState,setState})=>{ 

      return new Promise((resolve, reject) => {
        axios.post(`${API_NFT}/Artworks/search`,getState().params).then((res) => {
          setState({
            totalCount: res.data.totalCount
          })
          const  data1  = res.data
          setState({ 
            listNFT: data1.data 
          })
          
      },[])
    })
    },
    updateParams: (
      obj
    )=>({setState})=>{ 

      return new Promise((resolve, reject) => {
        setState({ 
          params: obj 
        })
        resolve({})
    })
    }
  },
  name: 'StoreNFt',
})

export const useHookNft = createHook(StoreNft)
export const Container = createContainer(StoreNft, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props })
  },
})
export const Subscriber = createSubscriber(StoreNft)
