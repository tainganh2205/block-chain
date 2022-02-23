import React, { useEffect, useMemo, useState } from 'react'
// import Modal from 'react-modal'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Modal, Button } from 'antd'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useNftContract, useNftMarketContract } from '../../hooks/useContract'
import { useActiveWeb3React } from '../../hooks'
import { useTokenAllowanceNFTCustom, useTokenAllowanceCustom } from '../../data/Allowances'
import { useOwnerTokenFT } from '../../data/Nft'
import { API_IMAGE, TOKEN_BSCS, CONTRACT_NFT, CONTRACT_BID, API_VIDEO } from '../../constants'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { useHookNft } from '../Nft/Store-Nft'
import { useHookUpload as useHookNftCenter } from '../Upload/Store-Upload'
import ButtonCustom from '../Nft/ButtonCustom'
import Pagination from '../../components/Pagination'
// import Message from './Message'
import UploadFile from '../Upload/UploadFile'

const statuss = {
  Pending: 0,
  Review: 1,
  Reject: 2,
}

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}
const ItemProduct = ({ isBiding, sortedRecentTransactions, nftContract, bidContract, allowance, item }) => {
  const { account } = useActiveWeb3React()
  // const account = "0xC45E4AE21522aAACF917CEEC69ce2C488151165a"
  const ownerNFT = useOwnerTokenFT(item.tokenId)
  const allowanceNFT = useTokenAllowanceNFTCustom(CONTRACT_NFT, account ?? undefined, item.tokenId)

  const getStatus = (type) => {
    const pending = sortedRecentTransactions
      .filter((tx) => !tx.receipt && tx.attr1 === `${item.tokenId}-${type}`)
      .map((tx) => tx.hash)

    return !!pending.length
  }
  const getStatusAprrove = () => {
    const pending = sortedRecentTransactions
      .filter((tx) => !tx.receipt && tx.attr1 === `${item.tokenId}-approve`)
      .map((tx) => tx.hash)
    return !!pending.length
  }

  return (
    <li key={`my-artwork-${item.id}`} className="c-list__item">
      <button type="button" disabled={allowance && allowance.toString()} className="c-list__label">
        Vote
      </button>
      <div className="c-list__img_usercenter">
        <a href={`/#/nft-megamarket-detail/${item.id}`} className="a-bsc">
          {item.fileType === 2 ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video width="100%" controls>
              <source
                src={`${item.fileName && item.fileName.indexOf('amazonaws') !== -1 ? '' : API_VIDEO}${
                  item.fileName
                }?v=122`}
                type="video/mp4"
              />
            </video>
          ) : (
            <img
              src={`${item.fileName && item.fileName.indexOf('amazonaws') !== -1 ? '' : API_IMAGE}${
                item.fileName
              }?v=122`}
              alt=""
            />
          )}
          {/* <img src={`${API_IMAGE}${item.fileName}?v=0`} alt="" /> */}
        </a>
      </div>
      <div className="c-list__body">
        <h3 className="c-list__ttl">
          <span>{item.name}</span>
          {/* <ButtonCustom
            className="edit-product"
            data={{ ...item, bidContract, type: 'editInfo' }}
            text={item.name}
            type=""
            isLoading={getStatus('editInfo')}
          /> */}
          {/* <a className="edit-product" target="_blank" rel="noreferrer" href={`#/usercenter/${item.author}`}>
            <span>{item.authorName}</span>
          </a> */}
        </h3>
        {item.price > 0 ? (
          <div className="c-list__box">
            <p className="c-list__number">{item.price}</p>
          </div>
        ) : (
          ''
        )}

        <div className="c-list__box">
          {isBiding || item.numberTicket ? (
            ''
          ) : (
            <div className="c-list__btn">
              {(allowanceNFT && allowanceNFT.toString() !== '0x0000000000000000000000000000000000000000') ||
              (allowanceNFT &&
                allowanceNFT.toString() === '0x0000000000000000000000000000000000000000' &&
                ownerNFT &&
                ownerNFT !== account) ? (
                <>
                  {ownerNFT && ownerNFT !== account ? (
                    <ButtonCustom
                      data={{ ...item, bidContract, type: 'update' }}
                      className="w50 js-auction green"
                      text="Update Price"
                      type=""
                      isLoading={getStatus('update')}
                    />
                  ) : (
                    <ButtonCustom
                      data={{ ...item, bidContract, type: 'auction' }}
                      className="w50 js-auction green"
                      text="Auction"
                      type=""
                      isLoading={getStatus('auction')}
                    />
                  )}

                  {ownerNFT && ownerNFT !== account ? (
                    <ButtonCustom
                      data={{ ...item, nftContract, bidContract, type: 'revoke' }}
                      className="w50 js-sell btn-no-border"
                      text="Revoke"
                      type="revoke"
                      isLoading={getStatus('revoke')}
                    />
                  ) : (
                    <ButtonCustom
                      data={{ ...item, nftContract, bidContract, type: 'sell' }}
                      className="w50 js-sell btn-no-border"
                      text="Sell"
                      type=""
                      isLoading={getStatus('sell')}
                    />
                  )}
                </>
              ) : (
                <>
                  {item.status !== 0 ? (
                    <ButtonCustom
                      data={item}
                      text="Approve Stake"
                      type="approveNFT"
                      className="js-transfer btn-no-border"
                      isLoading={getStatusAprrove()}
                    />
                  ) : (
                    ''
                  )}
                </>
              )}
              {ownerNFT && ownerNFT === account && item.status !== 0 ? (
                <ButtonCustom
                  data={{ ...item, bidContract, nftContract, type: 'transfer' }}
                  className="js-transfer btn-no-border"
                  text="Transfer"
                  type=""
                  isLoading={getStatus('transfer')}
                />
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
const List = ({ props }: any): any => {
  const {
    match: { params },
  }: any = props
  const { account } = useActiveWeb3React()
  // const account  = "0xC45E4AE21522aAACF917CEEC69ce2C488151165a"
  const [state, actions]: any = useHookNft()
  const [objData, setObjData]: any = useState()
  const [isBiding, setBidding]: any = useState(false)
  const [status, setStatus]: any = useState(statuss.Review)

  const [stateUseCenter, actionsCenter]: any = useHookNftCenter()

  const bidContract = useNftMarketContract()
  const nftContract = useNftContract()
  const allowance = useTokenAllowanceCustom(TOKEN_BSCS, account ?? undefined, CONTRACT_BID)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const _onChangeFilter = (obj) => {
    actions.onChangeSelect(obj).then((res) => {
      actions.getMyArtwork({ ...res.objFilter, ownerAddress: account, status: status ? 1 : 0 })
    })
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      actions.getMyArtwork({ ...state.objFilter, ownerAddress: account, status: status ? 1 : 0 })
    }
  }
  const handleSeach = () => {
    actions.getMyArtwork({ ...state.objFilter, ownerAddress: account, status: 1 })
  }
  // const handleSeach = (event) => {
  //   if (event.click === 'Seach') {
  //     actions.getMyArtwork({ ...state.objFilter, ownerAddress: account, status: status ? 1 : 0 })
  //   }
  // }
  useEffect(() => {
    actions.getMyArtwork({ ...state.objFilter, ownerAddress: account, status: 1 })
    actionsCenter.getArtistsByWallet(account).then((newData) => {
      setObjData(newData)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, status])

  const _conChangeStatus = (value) => {
    // setStatus(statuss[value])
    setBidding(false)
    actions.getMyArtwork({ ...state.objFilter, ownerAddress: account, status: statuss[value] })
  }

  function handlePageChange(newPage) {
    setFilters({
      ...filters,
      pageNumber: newPage,
    })

    setPagination({
      ...pagination,
      pageNumber: newPage,
      totalCount: state.totalCount,
    })
    actions.getMyArtwork({
      ...state.objFilter,
      pageNumber: newPage,
      ownerAddress: account,
      status: status ? 1 : 0,
    })
  }

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 24,
    totalCount: state.totalCount > 24 ? 25 : 23,
  })

  const [filters, setFilters] = useState({
    pageSize: 24,
    pageNumber: 1,
  })
  const [activeClass, setClass] = useState('1')

  const [EditisModalVisible, EditsetIsModalVisible] = useState(false)
  const [CreateisModalVisible, CreatesetIsModalVisible] = useState(false)

  const showModalCreateProfile = () => {
    CreatesetIsModalVisible(true)
  }

  const handleOk = () => {
    CreatesetIsModalVisible(false)
  }

  const handleCancel = () => {
    CreatesetIsModalVisible(false)
  }
  const showModalEditProfile = () => {
    EditsetIsModalVisible(true)
  }
  const handleOkEditProfile = () => {
    EditsetIsModalVisible(false)
  }

  const handleCancelEditProfile = () => {
    EditsetIsModalVisible(false)
  }

  const idArtist = objData && objData.id
  const formikEdit = useFormik({
    initialValues: {
      fileAvatar: '0',
      name: '',
      social: '',
      bio: '',
      fileBanner: '',
    },
    onSubmit: () => {
        actions.submitEditArtists(formikEdit.values, account, idArtist, nftContract).then(() => {
          formikEdit.resetForm()
          // window.location.href = '#/mint-nft'
          setTimeout(() => {
            window.location.reload()
          }, 200)
        })
    },

  } as any)

  const formik = useFormik({
    initialValues: {
      fileAvatar: '',
      name: '',
      social: '',
      bio: '',
      fileBanner: '',
    },
    validationSchema: Yup.object({
      fileAvatar: Yup.string().required('Required!'),
      name: Yup.string().required('Required!'),
      social: Yup.string().required('Required!'),
      bio: Yup.string().required('Required!'),
      // fileBanner: Yup.string().required('Required!')
    } as any),

    onSubmit: () => {
        actions.submitArtists(formik.values, account, nftContract).then(() => {
          formik.resetForm()
          // window.location.href = '#/mint-nft'
          setTimeout(() => {
            window.location.reload()
          }, 200)
        })
    },
  } as any)

  const upLoadFileAvatar = (event) => {
    formik.setFieldValue('fileAvatar', event.target.files[0])
  }
  const upLoadFileAvatarEdit = (event) => {
    formikEdit.setFieldValue('fileAvatar', event.target.files[0])
  }

  const CreateProfileModal = (
    <form id="frm-create-artist" className="uploadInfo" onSubmit={formik.handleSubmit}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="labelName" htmlFor="nameInput">
        Artist Name
      </label>
      <div className="form-group">
        <input
          placeholder="Enter the artist name"
          type="text"
          className="form-control"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && formik.touched.name && <p style={{ color: 'red' }}>{formik.errors.name}</p>}
      </div>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="labelName" htmlFor="nameInput">
        Social Media link
      </label>
      <div className="form-group">
        <input
          type="url"
          className="form-control"
          name="social"
          value={formik.values.social}
          onChange={formik.handleChange}
        />
        {formik.errors.social && formik.touched.social && <p style={{ color: 'red' }}>{formik.errors.social}</p>}
      </div>

      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="bio" htmlFor="bio">
          Bio
        </label>
        <textarea
          className="form-control"
          name="bio"
          placeholder="Please write something about yourself"
          value={formik.values.bio}
          onChange={formik.handleChange}
        />
        {formik.errors.bio && formik.touched.bio && <p style={{ color: 'red' }}>{formik.errors.bio}</p>}
      </div>
      <hr />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="avatar" htmlFor="avatar">
        Your avatar
      </label>
      <div className="formfile">
        <div className="form-group avatar-upload">
          <UploadFile name="fileName" id="imgFile" accept="image/*" onChange={upLoadFileAvatar} />
          {formik.errors.fileAvatar && formik.touched.fileAvatar && (
            <p style={{ color: 'red' }}>{formik.errors.fileAvatar}</p>
          )}
        </div>
      </div>
      <div className="btn-inf" id="btn-submit-artist">
        <button type="submit" className="btn btn-submit">
          Create profile
        </button>
      </div>
    </form>
  )

  const EditModal = (
    <form id="frm-create-artist" className="uploadInfo" onSubmit={formikEdit.handleSubmit}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="labelName" htmlFor="nameInput">
        Artist Name
      </label>
      <div className="form-group">
        <input
          placeholder="Enter the artist name"
          type="text"
          className="form-control"
          name="name"
          value={formikEdit.values.name}
          onChange={formikEdit.handleChange}
        />
  
      </div>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="labelName" htmlFor="nameInput">
        Social Media link
      </label>
      <div className="form-group">
        <input
          type="url"
          className="form-control"
          name="social"
          value={formikEdit.values.social}
          onChange={formikEdit.handleChange}
        />
       
      </div>

      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="bio" htmlFor="bio">
          Bio
        </label>
        <textarea
          className="form-control"
          name="bio"
          placeholder="Please write something about yourself"
          value={formikEdit.values.bio}
          onChange={formikEdit.handleChange}
        />
       
      </div>
      <hr />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="avatar" htmlFor="avatar">
        Your avatar
      </label>
      <div className="formfile">
        <div className="form-group avatar-upload">
          <UploadFile name="fileName" id="imgFile" accept="image/*" onChange={upLoadFileAvatarEdit} />
         
        </div>
      </div>
      <div className="btn-inf" id="btn-submit-artist">
        <button type="submit" className="btn btn-submit">
          Save profile
        </button>
      </div>
    </form>
  )

  return (
    <>
      <Modal
        className="body-custom"
        title="Create artist"
        visible={CreateisModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {CreateProfileModal}
      </Modal>
      <Modal
        className="body-custom"
        title="Edit profile"
        visible={EditisModalVisible}
        onOk={handleOkEditProfile}
        onCancel={handleCancelEditProfile}
      >
        {EditModal}
      </Modal>
      <div className="info">
        <div className="l-container c-productdetail">
          <div className="c-productdetail__title">
            <div className="c-productdetail__img">
              {objData === undefined ? (
                <img className="img-profile" src="images/logo-defaul.png" alt="default" />
              ) : (
                <img className="img-profile" src={`${API_IMAGE}${objData && objData.avatarName}?v=122`} alt="" />
              )}
            </div>
            <h3 className="text-white">
              <div className="row-flex row-flex-wrap">
                {objData === undefined ? (
                  <h3 className="text-white">Name : N/A</h3>
                ) : (
                  <h3 className="text-white">{objData && objData.artistName}</h3>
                )}
                {objData === undefined ? (
                  ''
                ) : (
                  <button type="button" onClick={showModalEditProfile} className="edit-profile">
                    <i className="fa fa-pencil-square-o pd-right" aria-hidden="true" />
                    Edit profile
                  </button>
                )}
              </div>
              {objData === undefined ? (
                ''
              ) : (
                <span className="decs-info text-white">{objData && objData.artistDescription}</span>
              )}
              {objData === undefined ? (
                <span className="decs-info text-white">Social : N/A</span>
              ) : (
                <span className="decs-info text-white">
                  Social : {objData && objData.publicProfileLink}
                  <a href={`${objData && objData.publicProfileLink}`} target="_blank" rel="noreferrer">
                    <i className="fa fa-external-link btn-copied" aria-hidden="true" />{' '}
                  </a>
                </span>
              )}
              {objData === undefined ? (
                ''
              ) : (
                <span className="decs-info text-white">
                  Referral code : {objData && objData.id}
                  <a href={`#/usercenter/${objData.id}`}>
                    <i className="fa fa-external-link btn-copied" aria-hidden="true" />{' '}
                  </a>
                  <CopyToClipboard
                    text={`https://bscscan.com/`}
                    onCopy={() =>
                      store.addNotification({
                        title: 'Copied referral link',
                        message: (
                          <div className="custom-fontsize">
                            <i className="fa fa-check-square-o icon-success" aria-hidden="true" />
                            Successfully !
                          </div>
                        ),
                        type: 'warning',
                        width: 300,
                        insert: 'center',
                        container: 'top-center',
                        animationIn: ['animate__animated success', 'animate__fadeIn'],
                        animationOut: ['animate__animated success', 'animate__fadeOut'],
                        dismiss: {
                          duration: 1000,
                          onScreen: true,
                          pauseOnHover: true,
                          click: true,
                          touch: true,
                        },
                      })
                    }
                  >
                    <i className="fa fa-clone btn-copied" aria-hidden="true" />
                  </CopyToClipboard>
                </span>
              )}
              {objData === undefined ? (
                <span className="decs-info text-white row-flex">Wallet address : N/A</span>
              ) : (
                <span className="decs-info text-white row-flex">
                  Wallet address :
                  <p className="address-color">
                    {objData &&
                      objData.ownerAddress &&
                      `${objData.ownerAddress.substring(0, 8)}...${objData.ownerAddress.substring(
                        28,
                        objData.ownerAddress.length
                      )}`}
                  </p>
                    <CopyToClipboard
                      // className='dsfsdfas2134567'
                      text={objData && objData.ownerAddress}
                      onCopy={() =>
                        store.addNotification({
                          title: 'Copied',
                          message: (
                            <div className="custom-fontsize">
                              <i className="fa fa-check-square-o icon-success" aria-hidden="true" />
                              Successfully !
                            </div>
                          ),
                          type: 'warning',
                          width: 300,
                          insert: 'center',
                          container: 'top-center',
                          animationIn: ['animate__animated success', 'animate__fadeIn'],
                          animationOut: ['animate__animated success', 'animate__fadeOut'],
                          dismiss: {
                            duration: 1000,
                            onScreen: true,
                            pauseOnHover: true,
                            click: true,
                            touch: true,
                          },
                        })
                      }
                    >
                      <i className="fa fa-clone btn-copied" aria-hidden="true" />
                    </CopyToClipboard>
                </span>
              )}
            </h3>
          </div>
          <div className="row-padding">
            {objData === undefined ? (
              <>
                {account === null ? (
                  <button
                    type="button"
                    onClick={() =>
                      store.addNotification({
                        title: 'Warning !',
                        message: (
                          <div className="custom-fontsize">
                            <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true" /> Please Unlock
                            Wallet!
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
                    className="mint-nft"
                  >
                    Create artist
                  </button>
                ) : (
                  <button type="button" onClick={showModalCreateProfile} className="mint-nft">
                    Create artist
                  </button>
                )}
              </>
            ) : (
              <a href="/#/mint-nft" type="button" className="mint-nft">
                Mint NFT
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="p-home__list">
        <div className="l-container">
          <div className="c-search">
            <div className="c-search__box">
              <button
                onClick={() => {
                  _conChangeStatus('Review')
                  setClass('1')
                }}
                type="button"
                className={activeClass === '1' ? 'c-search__pending button-active' : 'c-search__pending'}
                id="1"
              >
                Reviewed
              </button>
              <button
                onClick={() => {
                  _conChangeStatus('Pending')
                  setClass('2')
                }}
                type="button"
                className={activeClass === '2' ? 'c-search__pending button-active' : 'c-search__pending'}
                id="2"
              >
                Pending
              </button>

              <button
                onClick={() => {
                  _conChangeStatus('Reject')
                  setClass('3')
                }}
                type="button"
                className={activeClass === '3' ? 'c-search__pending button-active' : 'c-search__pending'}
                id="3"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setBidding(true)
                  actions.getMyArtworkBiding(account)
                  setClass('4')
                }}
                type="button"
                className={activeClass === '4' ? 'c-search__pending button-active' : 'c-search__pending'}
                id="4"
              >
                Bidding
              </button>
            </div>
            <div className="c-search__inner">
              <div className="box-input-cus">
                <input
                  onKeyDown={handleKeyDown}
                  onChange={(e) => actions.onChangeSelect({ id: 'keywork', value: e.target.value })}
                  type="text"
                  name=""
                  placeholder="Search"
                />
                <div className="custom-seach">
                  <i
                    className="fa fa-search"
                    onClick={() => {
                      handleSeach()
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <select onChange={(e) => _onChangeFilter({ id: 'fileType', value: parseInt(e.target.value) })}>
                <option>All</option>
                {state.typeNFT.map((item) => {
                  return (
                    <option value={item.id} id={item.id} key={`nftType_${item.id}`}>
                      {item.name}
                    </option>
                  )
                })}
              </select>
              <select onChange={(e) => _onChangeFilter({ id: 'sortByPrice', value: e.target.value })}>
                <option>Price</option>
                {state.sorts.map((item) => {
                  return (
                    <option value={item.id} key={`sort_${item.id}`}>
                      {item.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          {state.totalCount === 0 ? (
            ''
            // <Message />
          ) : (
            <ul className="c-list change-list">
              {state.nftList.map((item) => {
                return (
                  <ItemProduct
                    isBiding={isBiding}
                    sortedRecentTransactions={sortedRecentTransactions}
                    allowance={allowance}
                    bidContract={bidContract}
                    nftContract={nftContract}
                    key={item.id}
                    item={item}
                  />
                )
              })}
            </ul>
          )}
        </div>
      </div>
      {state.totalCount && <Pagination pagination={pagination} onPageChange={handlePageChange} />}
    </>
  )
}

export default List
