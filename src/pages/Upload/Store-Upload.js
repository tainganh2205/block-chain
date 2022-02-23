import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import axios from 'axios'
import { API_NFT, API_IMAGE } from '../../constants'
import _mintToken, { _getMaxTokenId } from '../Nft/utils'

const StoreUpload = createStore({
  initialState: {
    objData: {
      ownerAddress: '',
      creatorAddress: '',
      tokenId: '',
      txHash: '',
      name: '',
      descriptions: '',
      author: '',
      nftType: '',
      fileType: '',
      fileName: '',
      fileNameImgVideo: '',
    },
    objData2: {
      ownerAddress: '',
      creatorAddress: '',
      tokenId: '',
      txHash: '',
      name: '',
      descriptions: '',
      author: '',
      nftType: '',
      fileType: '',
      fileName: '',
      fileNameImgVideo: '',
    },
    objListType: [],
    objData1: {},
  },
  actions: {
    submitEditArtists: (data, account) => ({ getState, setState }) => {
      const { objData } = getState()
      const formData = new FormData()
      formData.append('file',  data.fileAvatar)

      const formData1 = new FormData()
    
      formData1.append('file',  data.fileBanner)
      
      return new Promise((resolve, reject) => {
        if( data.fileAvatar==='0'){
          const newData = {
            ...objData,
            ownerAddress: account,
            artistDescription: data.bio,
            artistName: data.name,
            publicProfileLink: data.social,      
          }
          axios.post(`${API_NFT}/Artists/update`, newData).then(({data: dataRes}) => {
            if (dataRes?.data === objData.id) {
              setState({ objData: newData })
            }
            resolve(true)
          })
      }else {
      axios
        .post(`${API_NFT}/v1/Media/api/upload_file`, formData).then((res) => {
          formData.append('fileAvatar', res.data.filename)
          if(data.fileBanner!==''){
            axios
            .post(`${API_NFT}/v1/Media/api/upload_file`, formData1).then((res1) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
              formData.append('fileBanner', res1.data.filename)
              
              const newData = {
                ...objData,
                ownerAddress: account,
                artistDescription: data.bio,
                artistName:  data.name,
                publicProfileLink:  data.social,
                avatarName:  res.data.data.filename,
                banner: res1.data.data.filename
              }
              axios.post(`${API_NFT}/Artists/update`, newData).then(({data: dataRes}) => {
                if (dataRes?.data === objData.id) {
                  setState({ objData: newData })
                }
                resolve(true)
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
              axios.post(`${API_NFT}/Artists/update`, newData).then(({data: dataRes}) => {
                if (dataRes?.data === objData.id) {
                  setState({ objData: newData })
                }
                resolve(true)
              })         
           .catch((err) => {
            reject(err)
          })
          }                  
        })
      }
      })
    },
    submit: (data, account, nftContract) => ({ getState }) => {
      // console.log('ata.fileType>>', data, data.category)
      const { objData2 } = getState()
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('descriptions', data.description)
      formData.append('ownerAddress', data.name)
      formData.append('creatorAddress', data.name)
      formData.append('txHash', data.name)
      formData.append('artistId', 0)
      formData.append('file', data.fileName)
      // formData.append('fileImgVideo', data.fileNameImgVideo)

      // console.log("summit data: ", data)
      const formData1 = new FormData()
      formData1.append('file', data.fileNameImgVideo)

      return new Promise((resolve, reject) => {
        axios
          .post(`${API_NFT}/v1/Media/api/upload_file`, formData)
          .then(async (res) => {
           // console.log('upload1 res.>', res)

            // upload video
            if (data.category === '1') {
              // tesst
              axios
                .post(`${API_NFT}/v1/Media/api/upload_file`, formData1)
                // eslint-disable-next-line @typescript-eslint/no-shadow
                .then((res1) => {
                 // console.log('upload2 res1.>', res1)
                  // formData1.append('fileNameImgVideo', res1.data.fileNameImgVideo)

                  // const newTokenIdTemp = await GetMaxTokenId()
                  // console.log('newTokenIdTemp.>', newTokenIdTemp)
                  // b2 continue insert NFT info

                   _mintToken(nftContract, account, `${res.data.data.filename}`).then((resToken) => {
                     _getMaxTokenId(nftContract).then((tokenId) => {
                      const newData = {
                        ...objData2,
                         tokenId: parseInt(tokenId.toString()),
                         txHash: resToken.hash,
                        nftType: parseInt(data.channel),
                        descriptions: data.description,
                        name: data.name,
                        fileType: parseInt(data.category), 
                        fileName: res.data.data.filename,
                        ownerAddress: account,
                        creatorAddress: account,
                        thumbnail: res1.data.data.filename,
                      }
                    //  console.log('newData>>',newData)
                      try {
                        axios.post(`${API_NFT}/Artworks`, newData).then((resArtist) => {
                        //  console.log('uploadfull resArtist.>', resArtist)
                          resolve(resArtist)
                        })
                      } catch (error) {
                        console.log('error', error)
                      }
                     resolve(resToken)
                    })
                  })

                })
                .catch((err) => {
                  reject(err)
                })

              // upload image/gif
            } else {
             _mintToken(nftContract, account, `${res.data.data.filename}`)
                .then((resToken) => {
                  _getMaxTokenId(nftContract).then((tokenId) => {
                    const newData = {
                      ...objData2,
                      tokenId: parseInt(tokenId.toString()),
                      txHash: resToken.hash,
                      nftType: parseInt(data.channel),
                      descriptions: data.description,
                      name: data.name,
                      fileType: parseInt(data.category), 
                      fileName: res.data.data.filename,
                      ownerAddress: account,
                      creatorAddress: account,
                    }
                   // console.log('newDataFull.>', newData)
                    try {
                      axios.post(`${API_NFT}/Artworks`, newData).then((resArtist) => {
                        
                      //  console.log('uploadfull resArtist.>', resArtist)
                        resolve(resArtist)
                      })
                    } catch (error) {
                      console.log('error', error)
                    }
                   resolve(resToken)
                  })
                })

                .catch((err) => {
                  reject(err)
                })
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getArtistsByWallet: (account) => ({ getState, setState }) => {
      return new Promise((resolve, reject) => {
        axios.post(`${API_NFT}/Artists/getbyOwnerwallet`, { ownerAddress: account }).then((res) => {
          const { data } = res.data
          const { objData } = getState()
          const { objData2 } = getState()
          if (data.length > 0) {
            const newData = {
              ...objData,
              ...data[0],
              author: data[0].id,
              artistName: data[0].artistName,
            }
            const newData2 = {
              author: data[0].id,
            }
            setState({ objData: newData })
            setState({ objData2: newData2 })
            resolve(data[0])
          }
        })
      })
    },
    getTypeArtworkList: (params = { pageNumber: 1, pageSize: 20 }) => ({ setState, getState }) => {
      return new Promise((resolve, reject) => {
        axios.post(`${API_NFT}/TypeArtworks/search`, params).then((res) => {
          let { data } = res.data
          data = data.map((item, i) => {
            return item
          })
          setState({ objListType: data }) // TODO
          console.log('test', getState.objListType)
        }, [])
      })
    },
  },

  name: 'StoreUpload',
})
export const useHookUpload = createHook(StoreUpload)
export const Container = createContainer(StoreUpload, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props })
  },
})
export const Subscriber = createSubscriber(StoreUpload)
