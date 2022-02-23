import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import axios from 'axios'
import { API_NFT, API_TEST } from '../../constants'

const StoreNft = createStore({
  initialState: {
    objData: {},
    bids: [],
    asks: [],
    artworkMenu: [],
    typeArtworkMenu: [],
    totalCount:0,
    objListType: [],
    
  },
  actions: {
    getArtworkMenu: () => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios(`${API_NFT}/Artists/artists_menu`).then((res) => {
          setState({ artworkMenu: res.data.data })
        })
      })
    },  
    getTypeArtworkMenu: () => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios(`${API_NFT}/TypeArtworks/typeArtwork_menu`).then((res) => {
          setState({ typeArtworkMenu: res.data.data })
        })
      })
    },
    getProductsDetail: (id) => ({ setState }) => {
      setState({ objData: {
        
      } });
      return new Promise((resolve, reject) => {
        axios(`${API_NFT}/Artworks/${id}`).then((res) => {
          const { data } = res.data
          setState({ objData: { ...data } }) // TODO
          resolve(data)
        })
      })
    },
    updateListBid: (data) => ({ setState }) => {
      setState({ bids: data })
    },
    updateListAsk: (data) => ({ setState }) => {
      setState({ asks: data })
    },
    getTypeArtworkList: (params = {"pageNumber": 1,"pageSize": 24}) => ({ setState, getState }) => {
      return new Promise((resolve, reject) => {
        axios.post(`${API_NFT}/TypeArtworks/search`, params).then((res) => {
          let { data } = res.data
          data = data.map((item, i) => {
            return item
          })
          setState({ objListType:  data  })
          resolve(true)
        },[])
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
