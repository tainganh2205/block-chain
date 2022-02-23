import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import axios from 'axios'
import { API_NFT, API_IMAGE } from '../../constants'
import _mintToken from '../Nft/utils'

const StoreUpload = createStore({
  initialState: {
    objData: {
      ownerAddress: '',
      artistDescription: '',
      artistName: '',
      publicProfileLink: '',
      fileAvatar: '',
      fileBanner: '',
    },
  },
  actions: {
    submit: (data, account, nftContract) => ({ getState }) => {
      console.log("data-post: ",data)
      const { objData } = getState()
      
      const formData = new FormData()
      formData.append('file', data.fileAvatar)

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
