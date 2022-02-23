import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import axios from 'axios'
import { PropertiesArtwork } from 'pages/Nft/Store-Nft'

import { API_NFT, API_TEST } from '../../constants'

//
const StoreNFtWhitelist = createStore({
  initialState: {
    nftList: [],
    amount: '',
    tokenId: '',
    typeButon: '',
    addressReceive: '',
    marketInfo: {},
    totalCount: 0,

    typeNFT: [
      { id: 0, name: 'Picture' },
      { id: 2, name: 'Gif' },
      { id: 1, name: 'Video' },
      // { id: 3, name: 'Audio' },
    ],
    sorts: [
      { id: 'desc', name: 'Descending' },
      { id: 'asc', name: 'Ascending' },
    ],
    objFilter: {
      sortByPrice: 'desc',
      keywork: '',
      fileType: 0,
      pageNumber: 1,
      pageSize: 24,
    },
    isWhitelist: true,
    isLoadData: false,
  },
  actions: {
    submit: (data) => () => {
      // console.log('data: ', data)
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('category', data.category)
      formData.append('channel', data.channel)
      formData.append('checkbox', data.checkbox)
      formData.append('description', data.description)
      formData.append('fileName', data.fileName)
      return new Promise((resolve, reject) => {
        axios
          .post(`${API_NFT}/Artworks`, formData)
          .then((res) => {
            resolve(res.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    setLoadingData: () => ({ getState, setState }) => {
      const { isLoadData } = getState()
      setState({ isLoadData: !isLoadData })
    },
    onChangeSelect: (obj) => ({ getState, setState }) => {
      let { objFilter } = getState()
      objFilter = { objFilter: { ...objFilter, [obj.id]: obj.value } }
      setState(objFilter)
      return new Promise((resolve, reject) => {
        resolve(objFilter)
      })
    },
    getMoreGenesis: () => async ({ getState, setState, dispatch }) => {
      try {
        const { objFilter, nftList } = getState()
        objFilter[PropertiesArtwork.PAGE_NUMBER] += 1
        const { data: { data, totalCount, pageSize, pageNumber } } = await axios.post(`${API_NFT}/Artworks/company_artworks`,objFilter)
        setState({
          nftList: nftList.concat(data || []),
          totalCount,
          objFilter: {
            ...objFilter,
            [PropertiesArtwork.PAGE_NUMBER]: pageNumber,
            [PropertiesArtwork.PAGE_SIZE]: pageSize
          }
        })
      } catch (e) {
        console.error({ "[Store-Nft] -> getMoreGenesis": e })
      }
    },
    getGenesis: (params = {}) => ({ setState, getState }) => {
      return new Promise((resolve, reject) => {
        const { objFilter } = getState()
        axios.post(`${API_NFT}/Artworks/company_artworks`, { ...objFilter, ...params })
          .then((res) => {
          const { data,totalCount, pageSize, pageNumber } = res.data
          setState({
            nftList: data,
            totalCount,
            objFilter: {
              ...objFilter,
              ...params,
              pageSize,
              pageNumber
            }
          })
          resolve(true)
        }, []).catch((e) => {
          reject(e)
        })
      })
    },
    getMyArtwork: (params = {}) => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios.post(`${API_NFT}/Artworks/my_artworks`, params).then((res) => {
          setState({
            totalCount: res.data.totalCount,
          })
          let { data } = res.data
          data = data.map((item, i) => {
            return item
          })
          setState({ nftList: data })
        }, [])
      })
    },
    updateInfo: (obj) => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios.post(`${API_NFT}/Artworks/update`, obj).then((res) => {
          resolve(res)
        })
      })
    },
    checkBuy: (account) => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios(`${API_NFT}/Artworks/check_nft_buy/${account}`).then((res) => {
          resolve(res.data.succeeded)
        })
      })
    },
    insertBuyToDB: (obj) => ({ getState, setState }) => {
      return new Promise((resolve, reject) => {
        axios.post(`${API_NFT}/Artworks/nft_buy`, obj).then((resBuy) => {
          resolve({})
        })
      })
    },
    getMarketInfo: () => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios(`${API_NFT}/Market/api/get_market`).then((res) => {
          const { data } = res.data
          setState({ marketInfo: { ...data } }) // TODO
          console.log(data)
          resolve(data)
        })
      })
    },
    onChangeAmount: (value) => ({ setState }) => {
      if (value < 0) {
        setState({ amount: '' })
      } else {
        setState({ amount: value })
      }
    },
    onChangeAddess: (value) => ({ setState }) => {
      setState({ addressReceive: value })
    },
    updateTokenId: (value) => ({ setState }) => {
      setState({ tokenId: value })
    },
    // validateWhitelist: (value) => ({ setState }) => {
    //   return new Promise((resolve, reject) => {
    //     axios(`${API_NFT}/Artworks/CheckWhileList/${value}`).then((res) => {
    //       setState({ isWhitelist: res.data.succeeded })
    //       resolve('validateWhitelist')
    //     })
    //   })
    // },
    insertBiding: (obj) => () => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${API_NFT}/Artworks/Create_Auction`, {
            ownerAddress: obj.account,
            productCode: obj.code,
            price: obj.amount,
            txnHash: obj.hash,
          })
          .then((res) => {
            resolve(res)
            //
          })
      })
    },
    checkNftAvailable: (obj) => () => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${API_NFT}/Artworks/nft_available`, {
            ownerAddress: obj.account,
            id: obj.id,
          })
          .then((res) => {
            resolve(res)
          })
      })
    },
  },
  name: 'StoreNFtWhitelistWhitelist',
})

export const useHookNftWhitelist = createHook(StoreNFtWhitelist)
export const Container = createContainer(StoreNFtWhitelist, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props })
  },
})
export const Subscriber = createSubscriber(StoreNFtWhitelist)
