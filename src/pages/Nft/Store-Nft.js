/* eslint-disable object-shorthand */
import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import axios from 'axios'
import { isMobile } from 'react-device-detect'
import {
  API_NFT,
  API_TEST,
  BSCSCAN_API_MAINNET,
  TOKEN_BSCS,
  BSCS_BURNED_ADDRESS,
  BSCSCAN_APIKEY,
  FARM_CONTRACT_BSCS,
} from '../../constants'
//

export const PropertiesArtwork = {
  PAGE_SIZE: "pageSize",
  PAGE_NUMBER: "pageNumber",
  FILE_TYPE: "fileType",
  BOX_TYPE: "boxType",
  KEYWORK: "keywork",
  SORT_BY_PRICE: "sortByPrice",
  TYPE_ARTWORK: "typeArtworks",
  TOTAL_COUNT: 'totalCount',
  STATUS: 'status',
  SORT_TYPE: 'sortType',
  AUTHOR: 'author'
}

const getProducts = (params = {}) => ({ setState, getState }) => {
  return new Promise((resolve, reject) => {
    const { objFilter } = getState()
    axios.post(`${API_NFT}/Artworks/market_place`, { ...objFilter, ...params })
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
}





const nftStake = (params = {}) => ({ setState, getState }) => {
  return new Promise((resolve, reject) => {
    const {objFilter} = getState()
    axios.post(`${API_TEST}/Artworks/nft_stake`, { ...objFilter, ...params })
      .then((res) => {
        console.log("Res-Stake: ", res)
      resolve(true)
    }, []).catch((e) => {
      reject(e)
    })
  })
}
const nftUnStake = (params = {}) => ({ setState, getState }) => {
  return new Promise((resolve, reject) => {
    const {objFilter} = getState()
    axios.post(`${API_TEST}/Artworks/nft_unstake`, { ...objFilter, ...params })
      .then((res) => {
        console.log("Res-UnStake: ", res)
      resolve(true)
    }, []).catch((e) => {
      reject(e)
    })
  })
}


const getMyArtwork = ({ ownerAddress, ...params }) => ({ setState, getState }) => {
  return new Promise((resolve, reject) => {
    const { objFilter } = getState()
    axios.post(`${API_NFT}/Artworks/my_artworks`, { ...objFilter, ownerAddress, ...params })
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
}
const getStakeNFT = ({ ownerAddress, ...params }) => ({ setState, getState }) => {
  return new Promise((resolve, reject) => {
    const { objFilter } = getState()
    axios.post(`${API_TEST}/Artworks/all_nft_stake`, { ...objFilter, ownerAddress, ...params })
      .then((res) => {
      const { data,totalCount, pageSize, pageNumber } = res.data
      setState({
        nftListStake: res.data.data.nfts,
        additionalPoolWeight: res.data.data.additionalPoolWeight,
        stakingBoost: res.data.data.stakingBoost,
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
}
const getListStakeNFT = ({ ownerAddress, ...params }) => ({ setState, getState }) => {
  return new Promise((resolve, reject) => {
    const { objFilter } = getState()
    axios.post(`${API_TEST}/Artworks/all_nft_stake`, { ...objFilter, ownerAddress, ...params })
      .then((res) => {
      const { data,totalCount, pageSize, pageNumber } = res.data
      setState({
        nftListStake: res.data.data.nfts,
        additionalPoolWeight: res.data.data.additionalPoolWeight,
        stakingBoost: res.data.data.stakingBoost,
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
}

const getMyArtworkBiding = ({ownerAddress, ...params}) => ({ setState, getState }) => {
  return new Promise((resolve, reject) => {
    const { objFilter } = getState()
    axios.post(`${API_NFT}/Artworks/Auction`, { ...objFilter, ownerAddress, ...params })
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
      }, [])
      .catch((e) => {
        reject(e)
      })
  })
}

const getMyCharacter = ({ownerAddress, ...params}) => ({ setState, getState }) => {
  return new Promise((resolve, reject) => {
    const { objFilter } = getState()
    setState({
      nftList: [],
      totalCount: 0,
      objFilter: {
        fileType: 0,
        keywork: null,
        pageNumber: 1,
        pageSize: 24,
        sortByPrice: "asc"
      }
    })
    resolve(true)
  })
}

const getMyGameBox = ({ownerAddress, ...params}) => ({ setState, getState }) => {
  return new Promise((resolve, reject) => {
    const { objFilter } = getState()
    setState({
        nftList: [],
        totalCount: 0,
        objFilter: {
          fileType: 0,
          keywork: null,
          pageNumber: 1,
          pageSize: 24,
          sortByPrice: "asc"
        }
      })
      resolve(true)
  })
}


const  setIsFetching = (isFetching) => ({ setState }) => {
  return new Promise((res) => {
    setState({ isFetching })
    res(true)
  })
}

const resetObjFilter = () => ({ setState }) => {
  setState({ objFilter: {
    sortByPrice: 'asc',
    keywork: '',
    fileType: 0,
    pageNumber: 1,
    pageSize: isMobile ? 10 :24,
  } })
}

const StoreNft = createStore({
  initialState: {
    objData: {},
    isFetching: false,
    nftList: [],
    nftCharacter: [],
    nftGameBox: [],
    nftListStake: [],
    additionalPoolWeight: 0,
    stakingBoost: 0,
    amount: '',
    tokenId: '',
    typeButon: '',
    addressReceive: '',
    marketInfo: {},
    totalCount: 0,
    typeNFT: [
      { id: 1, name: 'Picture' },
      { id: 2, name: 'Video' },
      { id: 3, name: 'Gif' },

      // { id: 3, name: 'Audio' },
    ],
    sorts: [
      { id: 'desc', name: 'Descending' },
      { id: 'asc', name: 'Ascending' },
    ],
    objFilter: {
      sortByPrice: 'asc',
      keywork: '',
      fileType: 0,
      pageNumber: 1,
      pageSize: isMobile ? 10 :24,
      sortType: 0
    },
    isWhitelist: true,
    yourBalanceBSCS: {},
    BSCSBurned: {},
    totalValueLock: {},
    totalVL: {},
    isCheckBuy: true,
    isLoadData: false
  },
  actions: {
    getProducts,
    setIsFetching,
    getMyArtwork,
    getMyArtworkBiding,
    getMyCharacter,
    getMyGameBox,
    resetObjFilter,
    getStakeNFT,
    nftStake,
    nftUnStake,
    getListStakeNFT,
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
    submitArtists: (data, account, nftContract) => ({ getState }) => {
       console.log("data-post: ",data)
      const { objData } = getState()
      
      const formData = new FormData()
      formData.append('file', data.fileAvatar)
      console.log("formData: ",formData)

      const formData1 = new FormData()
      
      formData1.append('file', data.fileBanner)
      if(data.fileBanner!==''){
        console.log('yes')

      }else{
        console.log('no')

      }
      
      return new Promise((resolve, reject) => {
        axios
        .post(`${API_NFT}/v1/Media/api/upload_file`, formData).then((res) => {
          formData.append('fileAvatar', res.data.filename)
          console.log('res.>', res)

          if(data.fileBanner!==''){
            axios
            .post(`${API_NFT}/v1/Media/api/upload_file`, formData1).then((res1) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
              formData.append('fileBanner', res1.data.filename)
              console.log('res1.>', res1)

              const newData = {
                ...objData,
                ownerAddress: account,
                artistDescription: data.bio,
                artistName: data.name,
                publicProfileLink: data.social,
                avatarName: res.data.data.filename,
                banner: res1.data.data.filename
              }
              axios.post(`${API_NFT}/Artists`, newData).then((resArtist) => {
                resolve(resArtist)
              })
           })
           .catch((err) => {
            reject(err)
          })
          }
          else{
              const newData = {
                ...objData,
                ownerAddress: account,
                artistDescription: data.bio,
                artistName: data.name,
                publicProfileLink: data.social,
                avatarName: res.data.data.filename,        
              }
              axios.post(`${API_NFT}/Artists`, newData).then((resArtist) => {
                resolve(resArtist)
              })         
           .catch((err) => {
            reject(err)
          })
          }                  
        })
      })
    },
    submitEditArtists: (data, account, idArtist, nftContract) => ({ getState }) => {
      // console.log("data-post: ",data)
      console.log("file: ",data)
      const { objData } = getState()
      
      const formData = new FormData()
      formData.append('file',  data.fileAvatar)
      console.log("fileAvatar: ", data)

      const formData1 = new FormData()
    
      formData1.append('file',  data.fileBanner)
      if(data.fileBanner!==''){
        console.log('yes')

      }else{
        console.log('no')

      }
      
      return new Promise((resolve, reject) => {
        if( data.fileAvatar==='0'){
          const newData = {
            ...objData,
            ownerAddress: account,
            id:idArtist,
            artistDescription: data.bio,
            artistName: data.name,
            publicProfileLink: data.social,      
          }
          axios.post(`${API_NFT}/Artists/update`, newData).then((resArtist) => {
            resolve(resArtist)
          })
      }else {
      axios
        .post(`${API_NFT}/v1/Media/api/upload_file`, formData).then((res) => {
          formData.append('fileAvatar', res.data.filename)
          console.log('res.>', res)

          if(data.fileBanner!==''){
            axios
            .post(`${API_NFT}/v1/Media/api/upload_file`, formData1).then((res1) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
              formData.append('fileBanner', res1.data.filename)
              console.log('res1.>', res1)

              const newData = {
                ...objData,
                ownerAddress: account,
                id: idArtist,
                artistDescription: data.bio,
                artistName:  data.name,
                publicProfileLink:  data.social,
                avatarName:  res.data.data.filename,
                banner: res1.data.data.filename
              }
              axios.post(`${API_NFT}/Artists/update`, newData).then((resArtist) => {
                resolve(resArtist)
              })
           })
           .catch((err) => {
            reject(err)
          })
          }
          else{
              const newData = {
                ...objData,
                ownerAddress: account,
                id:idArtist,
                artistDescription: data.bio,
                artistName: data.name,
                publicProfileLink: data.social,
                avatarName: res.data.data.filename,        
              }
              axios.post(`${API_NFT}/Artists/update`, newData).then((resArtist) => {
                resolve(resArtist)
              })         
           .catch((err) => {
            reject(err)
          })
          }                  
        })
      }
      })
    },
      
    onChangeInput: (obj) => ({ getState, setState }) => {
      setState({objFilter: { ...getState().objFilter, [obj.id]: obj.value }})
    },
    onChangeSelect: (obj) => ({ dispatch }) => {
      dispatch(getProducts({
        [obj.id]: obj.value
      }))
    },
    /* eslint-disable  no-useless-catch, operator-assignment, object-shorthand */
    getMoreProducts: () => async ({ getState, setState, dispatch }) => {
      try {
        const { objFilter, nftList } = getState()
        objFilter[PropertiesArtwork.PAGE_NUMBER] = objFilter[PropertiesArtwork.PAGE_NUMBER] + 1
        const { data: { data, totalCount, pageSize, pageNumber } } = await axios.post(`${API_NFT}/Artworks/market_place`,objFilter)
        setState({
          nftList: nftList.concat(data || []),
          totalCount: totalCount,
          objFilter: {
            ...objFilter,
            [PropertiesArtwork.PAGE_NUMBER]: pageNumber,
            [PropertiesArtwork.PAGE_SIZE]: pageSize
          }
        })
      } catch (e) {
        console.error({ "[Store-Nft] -> getMoreProducts": e })
      }
    },
    
    getMoreMyArtwork: (ownerAddress) => async ({ getState, setState }) => {
      try {
        const { objFilter, nftList } = getState()
        objFilter[PropertiesArtwork.PAGE_NUMBER] = objFilter[PropertiesArtwork.PAGE_NUMBER] + 1
        const { data: { data, totalCount, pageSize, pageNumber } } = await axios.post(`${API_NFT}/Artworks/my_artworks`,{ownerAddress, ...objFilter})
        setState({
          nftList: nftList.concat(data || []),
          totalCount: totalCount,
          objFilter: {
            ...objFilter,
            [PropertiesArtwork.PAGE_NUMBER]: pageNumber,
            [PropertiesArtwork.PAGE_SIZE]: pageSize
          }
        })
      } catch (e) {
        console.error({ "[Store-Nft] -> getMoreProducts": e })
      }
    },

    getMoreMyCharacter: (ownerAddress) => async ({ getState, setState }) => {
      try {
        const { objFilter, nftList } = getState()
        objFilter[PropertiesArtwork.PAGE_NUMBER] = objFilter[PropertiesArtwork.PAGE_NUMBER] + 1
        setState({
          nftList: [],
          totalCount: 0,
          objFilter: {
            fileType: 0,
            keywork: null,
            pageNumber: 1,
            pageSize: 24,
            sortByPrice: "asc"
          }
        })
      } catch (e) {
        console.error({ "[Store-Nft] -> getMoreProducts": e })
      }
    },

    getMoreMyGameBox: (ownerAddress) => async ({ getState, setState }) => {
      try {
        const { objFilter, nftList } = getState()
        objFilter[PropertiesArtwork.PAGE_NUMBER] = objFilter[PropertiesArtwork.PAGE_NUMBER] + 1
        setState({
          nftList: [],
          totalCount: 0,
          objFilter: {
            fileType: 0,
            keywork: null,
            pageNumber: 1,
            pageSize: 24,
            sortByPrice: "asc"
          }
        })
      } catch (e) {
        console.error({ "[Store-Nft] -> getMoreProducts": e })
      }
    },
    
    getMoreStakeNFT: (ownerAddress) => async ({ getState, setState }) => {
      try {
        const { objFilter, nftList } = getState()
        objFilter[PropertiesArtwork.PAGE_NUMBER] = objFilter[PropertiesArtwork.PAGE_NUMBER] + 1
        const { data: { data, totalCount, pageSize, pageNumber } } = await axios.post(`${API_TEST}/Artworks/all_nft_stake`,{ownerAddress, ...objFilter})
        setState({
          nftList: nftList.concat(data || []),
          totalCount: totalCount,
          objFilter: {
            ...objFilter,
            [PropertiesArtwork.PAGE_NUMBER]: pageNumber,
            [PropertiesArtwork.PAGE_SIZE]: pageSize
          }
        })
      } catch (e) {
        console.error({ "[Store-Nft] -> getMoreProducts": e })
      }
    },
    /* eslint-enable  no-useless-catch, operator-assignment, object-shorthand */
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
          setState({ isCheckBuy: res.data.succeeded })
          resolve(res.data.succeeded)
        })
      })
    },
    insertBuyToDB: (obj) => ({getState, setState }) => {
      return new Promise((resolve, reject) => {
        axios.post(`${API_NFT}/Artworks/nft_buy`, obj).then((res) => {
          const { isLoadData } = getState()
          setState({ isLoadData: !isLoadData })
          resolve(res)
        })
      })
    },
    getMarketInfo: () => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios(`${API_NFT}/Market/api/get_market`).then((res) => {
          const { data } = res.data
          setState({ marketInfo: { ...data } }) // TODO
          resolve(data)
        })
      })
    },
    // getTVL: () => ({ setState }) => {
    //   return new Promise((resolve, reject) => {
    //     axios(`${API_NFT}/Market/api/get_tvl`).then((res) => {
    //       const { data } = res.data
    //       setState({ totalVL: { data } }) // TODO
    //       resolve(data)
    //     })
    //   })
    // },
    getBalanceByWallet: (addresswallet) => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios(
          `${BSCSCAN_API_MAINNET}/api?module=account&action=tokenbalance&contractaddress=${TOKEN_BSCS}&address=${addresswallet}&apikey=${BSCSCAN_APIKEY}`
        ).then((res) => {
          const { data } = res
          setState({ yourBalanceBSCS: { ...data } }) // TODO
          resolve(data)
        })
      })
    },
    getBSCSBurned: () => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios(
          `${BSCSCAN_API_MAINNET}/api?module=account&action=tokenbalance&contractaddress=${TOKEN_BSCS}&address=${BSCS_BURNED_ADDRESS}&tag=latest&apikey=${BSCSCAN_APIKEY}`
        ).then((res) => {
          const { data } = res
          setState({ BSCSBurned: { ...data } }) // TODO
          resolve(data)
        })
      })
    },
    getTotalValueLock: () => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios(
          `${BSCSCAN_API_MAINNET}/api?module=account&action=tokenbalance&contractaddress=${TOKEN_BSCS}&address=${FARM_CONTRACT_BSCS}&tag=latest&apikey=${BSCSCAN_APIKEY}`
        ).then((res) => {
          const { data } = res
          setState({ totalValueLock: { ...data } }) // TODO
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
    validateWhitelist: (value) => ({ setState }) => {
      return new Promise((resolve, reject) => {
        axios(`${API_NFT}/Artworks/CheckWhileList/${value}`).then((res) => {
          setState({ isWhitelist: res.data.succeeded })
          resolve('validateWhitelist')
        })
      })
    },
    insertBiding: (obj) => () => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${API_NFT}/Artworks/Create_Auction`, {
            ownerAddress: obj.account,
            productCode: obj.code,
            price: parseFloat(obj.amount),
            txnHash: obj.hash,
          })
          .then((res) => {
            resolve(res)
          })
      })
    },
    updatelBiding: (obj) => () => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${API_NFT}/Artworks/Update_Auction`, {
            ownerAddress: obj.account,
            productCode: obj.code
          })
          .then((res) => {
            resolve(res)
          })
      })
    },
    cancelBiding: (obj) => () => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${API_NFT}/Artworks/Update_Auction`, {
            ownerAddress: obj.account,
            productCode: obj.code,
            status: 0,
          })
          .then((res) => {
            resolve(res)
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
  name: 'StoreNFt',
})

export const useHookNft = createHook(StoreNft)
export const Container = createContainer(StoreNft, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props })
  },
})
export const Subscriber = createSubscriber(StoreNft)
