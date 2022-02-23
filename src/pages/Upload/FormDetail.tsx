/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo, useRef } from 'react'
import Modal from 'react-modal'
import { store } from 'react-notifications-component'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { ButtonArt, InputArtNew } from 'components/Art'

import { Select } from 'antd'

import { RowBetween } from '../../components/Row'
import { useHookUpload } from './Store-Upload'
import { useNftContract, useNftMarketContract } from '../../hooks/useContract'
import { useActiveWeb3React } from '../../hooks'
import { useTransactionAdder, isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { NavCard } from './CardNav'
import UploadFile from './UploadFile'
import CheckBox from './CheckBox'

import './index.less'


const { Option } = Select
// import _mintToken, { _getMaxTokenId } from '../Nft/utils'

function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

const ListType = ({ item }) => {
  // const [state, actions] = useHookUpload()
  return (
    <Option selected value={item.id}>
      {item.artworksName}
    </Option>
  )
}

export default function Form1() {
  // use state, action from store
  const refUpload = useRef<any>(null)
  const { account } = useActiveWeb3React()
  const [state, actions] = useHookUpload()

  const { objListType } = state

  const nftContract = useNftContract()

  const [isLoading, setLoading] = React.useState(false)

  const [file, setFile] = React.useState('')
  const [fileThum, setFileThum] = React.useState('')
  const [temp, setTemp] = React.useState('image/*')

  const upLoadFile = (event) => {
    // console.log("test file: ", event.target.files[0])
    const obj = event.target.files[0]
    if (obj !== undefined) {
      formik.setFieldValue('fileName', event.target.files[0])
      setFile(event.target.files[0])

      if (event.target.files[0].type !== '' && event.target.files[0].type !== undefined) {
        formik.values.type = event.target.files[0].type.slice(0, 5)
      }

      if (formik.values.type === 'image') {
        formik.setFieldValue('sizeImage', event.target.files[0].size)
      } else if (formik.values.type === 'video') {
        formik.setFieldValue('sizeVideo', event.target.files[0].size)
      }
    } else {
      setFile('')
    }
  }

  const upLoadFileImgVideo = (event) => {
    // setFileThum('')
    const obj = event.target.files[0]
    if (obj !== undefined) {
      formik.setFieldValue('fileNameImgVideo', event.target.files[0])

      formik.setFieldValue('sizeImageVideo', event.target.files[0].size)
      console.log('tesdsds: ', event.target.files[0].size)
      setFileThum(event.target.files[0])
    } else {
      setFileThum('')
      formik.setFieldValue('fileNameImgVideo', '')
    }
  }

  const chosse = (event) => {
    formik.setFieldValue('accept', event.target.value)
  }

  const changeType = (value) => {
    refUpload.current?.reset()
    setFile('')
    const temp1 = `${value}` === '2' ? '1' : '0'
    // console.log("Type: ", event.target.value)
    if (
      temp1 === '0'
      // || temp1 === '2'
    ) {
      setTemp('image/*')
    } else {
      setTemp('video/*')
    }
    formik.setFieldValue('category', temp1)
    formik.setFieldValue('sizeImage', 0)
    formik.setFieldValue('sizeImageVideo', 0)
    formik.setFieldValue('sizeVideo', 0)
    // formik.setFieldValue('fileName', '')
    // @ts-ignore: Object is possibly 'null'.
    document.getElementById('imgFile').value = ''
  }
  const addTransaction = useTransactionAdder()
  // init formit and validate
  const formik = useFormik({
    initialValues: {
      name: '',
      category: '0',
      channel: '0',
      checkbox: '0',
      description: '',
      fileName: '',
      sizeImage: 0,
      sizeVideo: 0,
      type: 'x',
      accept: '',
      sizeImageVideo: 0,
      fileNameImgVideo: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, 'Mininum 2 characters').max(250, 'Maximum 250 characters').required('* Required!'),
      description: Yup.string().required('* Required!').max(251, 'Maximum 250 characters'),
      fileName: Yup.string().required('* Required!'),
      sizeImage: Yup.number().max(10485760),
      sizeVideo: Yup.number().max(31457280),
      // accept: Yup.string().required('* Required!'),
      // sizeImageVideo: Yup.number().max(10485760),

      // fileNameImgVideo: Yup.string().required('Required!') ,
    } as any),

    onSubmit: () => {
      if (formik.values.type === 'video') {
        if (formik.values.fileNameImgVideo === '') {
          alert('Thumbnail not be empty!!')
          return
        }
        if (formik.values.sizeImageVideo > 10485760) {
          alert('Thumbnail not exceed 10M')
          return
        }
      }

      setLoading(true)
      actions
        .submit(formik.values, account, nftContract)
        .then((response) => {
          setLoading(false)
          addTransaction(response, {
            summary: 'mint NFT successfully!',
            attr1: 'upload',
          })
          formik.resetForm()
          window.location.href = '#/collections'
        })
        .catch((err) => {
          setLoading(false)
        })
    },
  } as any)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt && tx.attr1 === `upload`).map((tx) => tx.hash)
  const hasPendingTransactions = !!pending.length
  useEffect(() => {
    actions.getTypeArtworkList()
    actions.getArtistsByWallet(account)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const [activeIndex, setActiveIndex] = React.useState<number>(0)

  const onChangeTab = (value) => {
    setActiveIndex(value)
    changeType(value)
  }

  console.log('objListType: ', objListType)

  return (
    <>
      <form className="upload bsc-upload" id="frm-upload-artwork" onSubmit={formik.handleSubmit}>
        <NavCard activeIndex={activeIndex} setActiveIndex={onChangeTab} />

        <RowBetween className="CustomForm" gap="36px" align="flex-star">
          <div className="formfile">
            {' '}
            <div className="sdfsd">
              <div className="sdgfhd">
                <div className="form-group imagevideo">
                  <UploadFile ref={refUpload} name="fileName" id="imgFile" accept={temp} onChange={upLoadFile} />
                </div>
                {formik.errors.sizeVideo && <p style={{ color: 'red' }}>{formik.errors.sizeVideo}</p>}
                {formik.errors.sizeImage && <p style={{ color: 'red' }}>{formik.errors.sizeImage}</p>}
                {formik.errors.fileName && formik.touched.fileName && (
                  <p style={{ color: 'red' }}>{formik.errors.fileName}</p>
                )}
                <p className="cl-gray sz-14" style={{ textAlign: 'center'}}>
                  *Only accept: JPG/PNG/GIF
                </p>
              </div>
              {formik.values.category === '1' ? (
                <>
                  {' '}
                  <div className="sdgfhd">
                    <label className="labelUpload cl-white" htmlFor="nameInput">
                      Thumbnail
                    </label>
                    <div className="form-group imagevideo">
                      <UploadFile
                        name="fileNameImgVideo"
                        id="imgFileImg"
                        accept="image/*"
                        onChange={upLoadFileImgVideo}
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          </div>
          <div className="formContent">
            <div className="form-group">
              <div>
                <div>
                  <label className="labelCate" htmlFor="Category" color="text">
                    NFT Name *
                  </label>

                  <div className="form-group">
                    <InputArtNew
                      placeholder="Your NFT name"
                      type="text"
                      value={formik.values.name}
                      // className="form-control"
                      name="name"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.name && formik.touched.name && (
                      <p style={{ color: 'red', marginTop: '8px' }}>{formik.errors.name}</p>
                    )}
                  </div>
                </div>
                <div>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="labelChannel" htmlFor="channel" color="text">
                    Select a category *
                  </label>
                  <div className="form-group">
                    <Select
                      className="ant-art"
                      defaultValue="Art"
                      style={{ width: '168px', height: '40px' }}
                      onChange={(item) => {
                        formik.setFieldValue('channel', item)
                      }}
                    >
                      {objListType.map((item: any, i) => (
                        <Option value={item.id}>{item.artworksName}</Option>
                      ))}
                    </Select>
                    {formik.errors.channel && formik.touched.channel && (
                      <p style={{ color: 'red', marginTop: '8px' }}>{formik.errors.channel}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="labelDes" htmlFor="Textarea1" color="text">
                Description *
              </label>
              <div className="form-group">
                <textarea
                  placeholder="NFT description"
                  className="form-control area-art"
                  value={formik.values.description}
                  name="description"
                  onChange={formik.handleChange}
                  rows={3}
                />
                {formik.errors.description && formik.touched.description && (
                  <p style={{ color: 'red', marginTop: '8px' }}>{formik.errors.description}</p>
                )}
                <p style={{marginTop: '10px', fontSize: '12px', textAlign:'right', color:'#808982'}}>Maximum 250 characters</p>
              </div>
            </div>
          </div>
        </RowBetween>

        <div className="btn-wrapper" id="btn-submit-artwork">
          {!hasPendingTransactions ? (
            <>
              {account === null ? (
                <ButtonArt
                  className="noti-mess"
                  type="button"
                  onClick={() =>
                    store.addNotification({
                      title: 'Warning !',
                      message: (
                        <div className="custom-fontsize">
                          <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true" /> Please Activate
                          Profile
                        </div>
                      ),
                      type: 'warning',
                      width: 300,
                      insert: 'center',
                      container: 'top-center',
                      animationIn: ['animate__animated', 'animate__fadeIn'],
                      animationOut: ['animate__animated', 'animate__fadeOut'],
                      dismiss: {
                        duration: 2000,
                        onScreen: true,
                        pauseOnHover: true,
                        click: true,
                        touch: true,
                      },
                    })
                  }
                  primary
                  text="Mint NFT"
                >
                  Mint NFT
                </ButtonArt>
              ) : (
                <>
                  {!state.objData.artistName ? (
                    <ButtonArt
                      className="noti-mess"
                      type="button"
                      primary
                      text="Mint NFT"
                      onClick={() =>
                        store.addNotification({
                          title: 'Warning !',
                          message: (
                            <div className="custom-fontsize">
                              <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true" /> Please create
                              artists!
                            </div>
                          ),
                          type: 'warning',
                          width: 300,
                          insert: 'center',
                          container: 'top-center',
                          animationIn: ['animate__animated', 'animate__fadeIn'],
                          animationOut: ['animate__animated', 'animate__fadeOut'],
                          dismiss: {
                            duration: 2000,
                            onScreen: true,
                            pauseOnHover: true,
                            click: true,
                            touch: true,
                          },
                        })
                      }
                    >
                      Mint NFT
                    </ButtonArt>
                  ) : (
                    <ButtonArt className="submit-form" type="submit" text="Mint NFT" primary loading={isLoading}>
                      Mint NFT
                    </ButtonArt>
                  )}
                </>
              )}
            </>
          ) : (
            <ButtonArt
              disabled={hasPendingTransactions}
              text="Pending"
              primary
              right={<i className="fa fa-spinner fa-spin" />}
            >
              Pending
            </ButtonArt>
          )}
        </div>
        <div className="row-left">
          <label className="note bottom-text cl-yel" htmlFor="nameInput">
            Mint an NFT charges 0.01 BNB, please do not upload any sensitive content. Size Image/Gif: Less than 10M
          </label>
          <br />
        </div>
      </form>
    </>
  )
}
