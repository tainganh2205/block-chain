import React, {useCallback, useEffect, useState, useMemo} from 'react'
// import { useHookNft as useHookNftDetail } from './Store'
import Modal from 'react-modal'
import {Store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {ButtonArt} from 'components/Art'
import {useHistory} from 'react-router'
import styled from 'styled-components'
import {Collapse} from 'antd'
import {isMobile} from 'react-device-detect'
import Button from 'components/Button'
import {STATUS_ARTWORK} from 'pages/Nft_new/components/ArtworkList'
import {
  NFT_CONTRACTID,
  TOKEN_BSCS_TESTNET,
  API_IMAGE,
  TOKEN_BSCS,
  CONTRACT_NFT,
  CONTRACT_BID,
  API_VIDEO,
} from '../../constants'
import {useNftContract, useNftMarketContract} from '../../hooks/useContract'
import {useActiveWeb3React} from '../../hooks'
import {useApproveCallbackCustom} from '../../hooks/useApproveCallback'
import {useTokenAllowanceCustom, useBalanceBSCS, useTokenAllowanceNFTCustom} from '../../data/Allowances'
import {useOwnerTokenFT} from '../../data/Nft'
import {isTransactionRecent, useAllTransactions} from '../../state/transactions/hooks'
import {TransactionDetails} from '../../state/transactions/reducer'
import {useHookNft} from './Store'
import {useHookNft as useHookNftMain} from '../Nft/Store-Nft'

import ButtonCustom from '../Nft/ButtonCustom'
import {_getBids, _cancelTokenTo} from '../Nft/utils'
import BidTrad from './Bin-trad'

const Wrapper = styled.div`
  /* data-mobile */

  .cl-white {
    color: white !important;
  }

  .fw-500 {
    font-weight: 500 !important;
  }

  .fz-14 {
    font-size: 14px !important;
  }

  .flex {
    display: flex;
  }

  .f-center {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .f-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .f-wrap {
    flex-wrap: nowrap;
  }

  .dl-inline-block {
    display: inline-block !important;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .art-id {
    margin-left: ${(props) => (props['data-mobile'] ? '0' : '1rem')};
  }

  .back-market {
    img {
      margin-right: 10px;
    }
  }

  .btn-bidding {
    height: 30px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .author {
    display: flex;

    .file-type {
      margin: 0;
      padding: 0;
    }
  }

  .reward-panel {
    width: 100%;
    background: #20242e;
    height: auto;
    padding: 22px;
    border-radius: 10px;

    .list-reward {
      line-height: 1.5rem;

      li {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }

  .file-type {
    font-weight: 600;
    font-size: 14px;
    line-height: 15px;
    /* identical to box height */

    letter-spacing: 0.01em;
    padding: 12px 0 0 0;
      /* padding-left: ${(props) => (props['data-mobile'] ? '0' : '27px')}; */
    margin-bottom: 18px;
    color: #05D8F5;

    .title {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 0;
    }
  }

  .c-detail__image {
    width: ${(props) => (props['data-mobile'] ? 'auto' : '365px')};
      /* height: ${(props) => (props['data-mobie'] ? '361px' : '361px')}; */

    .c-detail__img {
      padding: 0px;
      border-radius: 10px;
      background: #20242e;
      border: 1px solid #169CE7;
      box-shadow: 0px 0px 20px rgba(22, 185, 121, 0.44);

      img {
        border-radius: 8px;
        width: 365px;
        height: 361px;
      }
    }
  }

  .detail-action {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 20px 10px;
    align-items: center;

    .c-detail__box {
      margin-bottom: 0;
    }
  }

  .c-detail__cont {
    width: ${(props) => (props['data-mobile'] ? 'auto' : '100%')};

    .item-detail {
      width: 100%;
      padding: 0px;
      background-color: transparent;
    }

    .c-detail__artist {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.01em;
      color: #169CE7;
    }

    .c-detail__ttl {
      width: ${(props) => (props['data-mobile'] ? 'auto' : 'auto')};
      font-weight: bold;
      font-size: ${(props) => (props['data-mobile'] ? '18px' : '30px')};
      line-height: 37px;
      letter-spacing: 0.01em;
      color: #ffffff;
    }

    .c-detail__text {
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    .price-art {
      font-weight: 500;
      font-size: 20px;
      line-height: 17px;
      /* identical to box height */
      letter-spacing: 0.01em;
      color: #ffffff;
      margin-left: 8px;
      width: auto !important;
      min-width: 100px !important;
    }

    .c-detail__price {
      display: inline-block;
    }

    .label-detail {
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.01em;
      font-weight: 600;

      color: #05D8F5;
      margin-bottom: 8px;
    }

    // .detail-action {
    //   display: flex;
    //   justify-content: space-between;
    //   align-items: center;
    // }
    .c-productdetail__title {
      align-items: unset;
    }

    .c-productdetail__img {
      width: 70px;
      height: 70px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .ant-collapse-header {
      padding-top: 16px;
      padding-left: 21px;
      padding-right: 21px;
      border-radius: 10px 10px 0px 0px !important;
      background: #20242e;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.01em;
      cursor: unset;
      color: #ffffff;

      .header-collapse {
        padding-bottom: 16px;
        border-bottom: 1px solid #575757;
      }
    }

    .ant-collapse-content {
      border-radius: 0px 0px 10px 10px !important;
      background: #20242e;
    }
  }

  .p-market__table {
    padding-top: 10px;
  }

  .bidding-title {
    display: flex;
    padding-top: 16px;
    padding-bottom: 6px;
    margin-bottom: 0px;
    font-weight: 500;
    font-size: 20px;

    img {
      margin-right: 10px;
    }
  }

  .c-table {
    table th {
      background: #20242e;

      .table-reponse,
      table,
      thead {
        border-radius: 10px;
      }
    }

    .custom-row-table {
      background: #20242e;
    }
  }

  .btn-flex-row {
    text-align: ${(props) => (props['data-mobile'] ? 'left' : 'right')};
      // justify-content: ${(props) => (props['data-mobile'] ? 'left' : 'right')};
  }

  .table-biding {
    .under-title {
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;

      color: #808982;
    }

    tr:hover {
      background: #1e1f28;
      border-radius: 10px;
    }

    td {
      font-size: 14px;
      padding: 10px 12px !important;
    }

    .bid-price {
      text-align: end;
    }
  }

  .c-detail__box {
    width: ${(props) => (props['data-mobile'] ? '100%' : 'auto')};
  }

  .table-reponse-biding {
    /* width */

    ::-webkit-scrollbar,
    ::-webkit-scrollbar:horizontal {
      width: 7px !important;
    }

    /* Track */

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey !important;
      border-radius: 4px !important;
    }

    /* Handle */

    ::-webkit-scrollbar-thumb,
    ::-webkit-scrollbar-thumb:horizontal {
      background: linear-gradient(0deg, #272c35, #272c35), #000000 !important;
      border-radius: 4px !important;
    }

    /* Handle on hover */

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(0deg, #272c35, #272c35), #000000 !important;
    }

    max-height: ${(props) => (props['data-mobile'] ? '350px' : '200px')} !important;
  }

  /* .c-detail__cont-right {
    flex: 51%;
  } */

  .text-custom2 {
    display: block;
    height: 55px;
    overflow: auto;
  }
`

function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const ListType = ({item}) => {
  const [state, actions] = useHookNft()

  return (
    <a className="a-bsc" href="#!">
      {item.artworksName}
    </a>
  )
}

const InfoDetail = ({props}: any): any => {
  const [state, actions]: any = useHookNft()
  const [stateNFT, actionsNFT] = useHookNftMain()

  const history = useHistory()

  const {objData, objListType} = state
  // console.log('🚀 ~ file: InfoDetail.tsx ~ line 171 ~ InfoDetail ~ objData', objData)
  const {objDataBid, objListBid} = state

  const {
    match: {params},
  }: any = props
  const {account} = useActiveWeb3React()
  useEffect(() => {
    actions.getTypeArtworkList()
    actions.getProductsDetail(params && params.id)
    window.scrollTo({top: 0})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const [dataBids, setDataBids] = useState([])

  Modal.setAppElement('#root')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const closeModal = (): boolean => {
    setModalIsOpen(false)

    return true
  }
  const submit = () => {
    alert('Coming soon!')
  }
  const biding = () => {
    setModalIsOpen(true)
  }

  const bidContract = useNftMarketContract()
  const nftContract = useNftContract()
  const allowance = useTokenAllowanceCustom(TOKEN_BSCS, account ?? undefined, CONTRACT_BID)
  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const ownerNFT = useOwnerTokenFT(objData && objData.tokenId)
  const allowanceNFT = useTokenAllowanceNFTCustom(CONTRACT_NFT, account ?? undefined, objData.tokenId ?? undefined)

  const getStatus = (type) => {
    const pending = sortedRecentTransactions
      .filter((tx) => !tx.receipt && tx.attr1 === `${objData.tokenId}-${type}`)
      .map((tx) => tx.hash)
    return !!pending.length
  }
  const getStatusAprrove = () => {
    const pending = sortedRecentTransactions
      .filter((tx) => !tx.receipt && tx.attr1 === `${objData.tokenId}-approve`)
      .map((tx) => tx.hash)
    return !!pending.length
  }

  useEffect(() => {
    if (objData.tokenId) {
      _getBids(bidContract, objData.tokenId).then((res: any) => {
        const listBid = res.map((item) => {
          return {
            bidder: item.bidder,
            price: item.price,
          }
        })
        actions.updateListBid(listBid)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidContract, objData.tokenId, account])
  useEffect(() => {
    actions.getArtworkMenu()
    actions.getTypeArtworkMenu()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let balance = useBalanceBSCS()
  balance = parseFloat((balance && balance.toString() / 1e18) || 0)

  const allowanceApplyBSCS = useTokenAllowanceCustom(TOKEN_BSCS_TESTNET, account ?? undefined, CONTRACT_BID)

  const [approval] = useApproveCallbackCustom(TOKEN_BSCS_TESTNET, CONTRACT_BID, objData.tokenId ?? undefined)

  async function onAttemptToApprove() {
    return approval()
  }

  const handleClickTypeArtworks = (typeArtworks) => {
    history.push(`/nft-megamarket?typeArtworks=${typeArtworks}`)
  }
  const handleClickTypeArtists = (id) => {
    history.push(`/usercenter/${id}`)
  }

  const handleApprove = useCallback(async () => {
    try {
      await onAttemptToApprove()
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approval])

  const {Panel} = Collapse

  function callback(key) {
    console.log(key)
  }

  const text = (
    <div className="c-detail__info">
      <ul>
        <li>
          <p className="cl-gray fz-14">Token ID : </p>
          <span>
            <a className="a-bsc cl-white fw-500" rel="noreferrer" target="_blank" href="https://bscscan.com">
              {objData && objData.tokenId}
            </a>
          </span>
        </li>
        <li>
          <p className="cl-gray fz-14">NFT Name : </p>

          <span className="cl-white fw-500">{objData && objData.name}</span>
        </li>
        <li>
          <p className="cl-gray fz-14">Create By : </p>

          <span className="cl-white fw-500 f-center">
            {objData && objData.authorName}
            <a href={`#/usercenter/${objData.author}`} className="f-center">
              <img className="ml-2 cursor-pointer" src="/images/link-direct.svg" alt="..."/>
            </a>
          </span>
        </li>

        <li className="customCopies">
          <p className="cl-gray fz-14">{` Contract Address : `}</p>
          <span className="cl-white fw-500 f-center">
            {objData &&
              objData.creatorAddress &&
              `${objData.creatorAddress.substring(0, 5)}...${
                objData.creatorAddress && objData.creatorAddress.substring(37, objData.creatorAddress.length)
              }`}
            <CopyToClipboard
              text={objData && objData.creatorAddress}
              onCopy={() =>
                Store.addNotification({
                  title: 'Copied',
                  message: (
                    <div className="custom-fontsize">
                      {/* <i className="fa fa-check-square-o icon-success" aria-hidden="true" /> */}
                      <i className="fa fa-check-circle icon-success" aria-hidden="true"/>
                      Successfully !
                    </div>
                  ),
                  type: 'warning',
                  width: 300,
                  insert: 'top',
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
              <img className="ml-2 cursor-pointer" src="/images/coppy.svg" alt="..."/>
            </CopyToClipboard>
          </span>
        </li>
        <li>
          <p className="cl-gray fz-14">{` Owner Address : `}</p>
          <span className="cl-white fw-500 f-center">
            {objData &&
              objData.ownerAddress &&
              `${objData.ownerAddress.substring(0, 5)}...${
                objData.ownerAddress && objData.ownerAddress.substring(37, objData.ownerAddress.length)
              }`}
            <CopyToClipboard
              text={objData && objData.ownerAddress}
              onCopy={() =>
                Store.addNotification({
                  title: 'Copied',
                  message: (
                    <div className="custom-fontsize">
                      {/* <i className="fa fa-check-square-o icon-success" aria-hidden="true" /> */}
                      <i className="fa fa-check-circle icon-success" aria-hidden="true"/>
                      Successfully !
                    </div>
                  ),
                  type: 'warning',
                  width: 300,
                  insert: 'top',
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
              <img className="ml-2 cursor-pointer" src="/images/coppy.svg" alt="..."/>
            </CopyToClipboard>
          </span>
        </li>
      </ul>
    </div>
  )

  return (
    <Wrapper data-mobile={isMobile}>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <div className="c-popup__box">
          <div className="c-popup__inner">
            <h3 className="c-popup__ttl custom">auction</h3>
            <div className="c-popup__input">
              <input type="text" name="" value="" className="custom" placeholder="0.0"/>
              <a className="a-bsc" href="#!">
                Bake
              </a>
            </div>
            <br/>
            <div className="c-popup__btn">
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
              <button type="button" onClick={submit} disabled>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="p-market__detail">
        <div className="l-container">
          <a href="#/NFTmarket" className="">
            <div className="cl-primary f-center cursor-pointer back-market">
              <img src="/images/imagesDashboard/arrow-left.svg" alt=".."/>
              Back to Market
            </div>
          </a>
          <div className="c-detail no-mg gap">
            <div className="c-detail__image">
              {/* <span>On Sale</span> */}
              <div className="c-detail__img">
                {objData && objData.fileType === 2 ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video width="100%" autoPlay loop playsInline>
                    <source
                      src={`${objData.fileName && objData.fileName.indexOf('amazonaws') !== -1 ? '' : API_VIDEO}${
                        objData.fileName
                      }`}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <img
                    src={`${objData.fileName && objData.fileName.indexOf('amazonaws') !== -1 ? '' : API_IMAGE}${
                      objData.fileName
                    }?v=122`}
                    alt=""
                  />
                )}
              </div>
              <p className={`detail-action ${isMobile ? 'f-wrap' : ''}`}>
                <div className="c-detail__box">
                  <p className="c-detail__price detail-font-custom">
                    <span
                      className="f-center"
                      style={{
                        width: 'auto',
                      }}
                    >
                      <img src="/images/Logo-art.png" alt="..."/>
                      <span
                        className="price-art"
                        style={{
                          width: 'auto',
                        }}
                      >
                        {parseInt(objData?.price).toLocaleString() || 0.0}
                      </span>
                    </span>
                  </p>
                </div>
                <div className="btn-flex-row">
                  {ownerNFT === account && objData.status !== 0 ? (
                    <>
                      {(allowanceNFT && allowanceNFT.toString() !== '0x0000000000000000000000000000000000000000') ||
                      (allowanceNFT &&
                        allowanceNFT.toString() === '0x0000000000000000000000000000000000000000' &&
                        ownerNFT &&
                        ownerNFT !== account) ? (
                        <>
                          {balance && balance >= 0 ? (
                            <>
                              {balance && balance >= objData.price ? (
                                <>
                                  <ButtonCustom
                                    data={{...objData, bidContract, type: 'auction'}}
                                    className="c-detail__btn"
                                    text="Auction"
                                    type=""
                                    isLoading={getStatus('auction')}
                                  />
                                  <ButtonCustom
                                    data={{...objData, bidContract, type: 'sell'}}
                                    className="c-detail__btn"
                                    text="Sell"
                                    type="sell"
                                    isLoading={getStatus('sell')}
                                  />
                                </>
                              ) : (
                                <ButtonCustom
                                  data={{...objData, bidContract, type: 'auction'}}
                                  className="c-detail__btn"
                                  text="Auction"
                                  type=""
                                  isLoading={getStatus('auction')}
                                />
                              )}
                            </>
                          ) : (
                            <>
                              <Button disabled className="not-enough" type="button" text="Buy"/>
                            </>
                          )}
                        </>
                      ) : (
                        objData.tokenId && (
                          <ButtonCustom
                            data={objData}
                            text="Approve NFT Megamarket"
                            type="approveNFT"
                            className="c-detail__btn"
                            isLoading={getStatusAprrove()}
                          />
                        )
                      )}
                    </>
                  ) : (
                    <>
                      {balance && balance >= 0 && objData.status !== 0 ? (
                        <>
                          {allowanceApplyBSCS && allowanceApplyBSCS.toString() !== '0' ? (
                            <>
                              {balance && balance >= objData.price ? (
                                <>
                                  {state.bids.find((x) => x.bidder === account) ? (
                                    <ButtonArt
                                      type="button"
                                      onClick={() =>
                                        Store.addNotification({
                                          title: 'Warning !',
                                          message: (
                                            <div className="custom-fontsize">
                                              <i
                                                className="fa fa-exclamation-triangle icon-warning"
                                                aria-hidden="true"
                                              />{' '}
                                              Auction is in existence !
                                            </div>
                                          ),
                                          type: 'warning',
                                          width: 300,
                                          insert: 'top',
                                          container: 'top-center',
                                          animationIn: ['animate__animated', 'animate__fadeIn'],
                                          animationOut: ['animate__animated', 'animate__fadeOut'],
                                          dismiss: {
                                            duration: 3000,
                                            onScreen: true,
                                            pauseOnHover: true,
                                            click: true,
                                            touch: true,
                                          },
                                        })
                                      }
                                      className="c-detail__btn"
                                    >
                                      Place Bid
                                    </ButtonArt>
                                  ) : (
                                    <ButtonCustom
                                      data={{...objData, bidContract, type: 'bid'}}
                                      className="c-detail__btn"
                                      text="Place Bid"
                                      type="bidding"
                                      isLoading={getStatus('bid')}
                                    />
                                  )}
                                  {state.bids.find((x) => x.bidder === account) ? (
                                    <ButtonArt
                                      type="button"
                                      onClick={() =>
                                        Store.addNotification({
                                          title: 'Warning !',
                                          message: (
                                            <div className="custom-fontsize">
                                              <i
                                                className="fa fa-exclamation-triangle icon-warning"
                                                aria-hidden="true"
                                              />{' '}
                                              Please cancel auction !
                                            </div>
                                          ),
                                          type: 'warning',
                                          width: 300,
                                          insert: 'top',
                                          container: 'top-center',
                                          animationIn: ['animate__animated', 'animate__fadeIn'],
                                          animationOut: ['animate__animated', 'animate__fadeOut'],
                                          dismiss: {
                                            duration: 3000,
                                            onScreen: true,
                                            pauseOnHover: true,
                                            click: true,
                                            touch: true,
                                          },
                                        })
                                      }
                                      className="c-detail__btn"
                                    >
                                      Buy
                                    </ButtonArt>
                                  ) : (
                                    <ButtonCustom
                                      data={{...objData, bidContract, type: 'buy'}}
                                      className="c-detail__btn"
                                      text="Buy"
                                      type="buy"
                                      isLoading={getStatus('buy')}
                                    />
                                  )}
                                </>
                              ) : (
                                <>
                                  {state.bids.find((x) => x.bidder === account) ? (
                                    <ButtonArt
                                      type="button"
                                      onClick={() =>
                                        Store.addNotification({
                                          title: 'Warning !',
                                          message: (
                                            <div className="custom-fontsize">
                                              <i
                                                className="fa fa-exclamation-triangle icon-warning"
                                                aria-hidden="true"
                                              />{' '}
                                              Auction is in existence !
                                            </div>
                                          ),
                                          type: 'warning',
                                          width: 300,
                                          insert: 'top',
                                          container: 'top-center',
                                          animationIn: ['animate__animated', 'animate__fadeIn'],
                                          animationOut: ['animate__animated', 'animate__fadeOut'],
                                          dismiss: {
                                            duration: 3000,
                                            onScreen: true,
                                            pauseOnHover: true,
                                            click: true,
                                            touch: true,
                                          },
                                        })
                                      }
                                      className="c-detail__btn"
                                    >
                                      Place Bid
                                    </ButtonArt>
                                  ) : (
                                    <ButtonCustom
                                      data={{...objData, bidContract, type: 'bid'}}
                                      className="c-detail__btn"
                                      text="Place Bid"
                                      type="bidding"
                                      isLoading={getStatus('bid')}
                                    />
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <ButtonArt
                              primary
                              disabled={getStatusAprrove()}
                              click={() => handleApprove()}
                              type="button"
                              right={getStatusAprrove() && <i className="fa fa-spinner fa-spin"/>}
                            >
                              Approve NFT
                            </ButtonArt>
                          )}
                        </>
                      ) : (
                        <ButtonArt disabled type="button">
                          {objData.status === 0 ? 'Pending' : 'Buy'}
                        </ButtonArt>
                      )}
                    </>
                  )}
                </div>
              </p>
            </div>
            <div className="c-detail__cont">
              <div className="c-detail__cont item-detail">
                {/* <p className="c-detail__artist">Name Artist</p>
                <p className="f-center f-wrap detail-name">
                  <h3 className="c-detail__ttl">{objData && objData.name}</h3>
                  <span className="fw-bold cl-white art-id">#{objData.id}</span>
                  <div className="status-art">
                    <>
                      {(() => {
                        switch (objData?.status) {
                          case STATUS_ARTWORK.REVIEWED:
                            return <img className="ml-2" src="/images/checked.png" alt="..." />
                          case STATUS_ARTWORK.PENDING:
                            return <img className="ml-2" src="/images/peding.svg" alt="..." />
                          case STATUS_ARTWORK.REJECT:
                            return <img className="ml-2" src="/images/reject.svg" alt="..." />
                          default:
                            return false
                        }
                      })()}
                    </>
                  </div>
                </p> */}
                {/* <p className="c-detail__artist">Name Artist</p> */}
                <p className="f-space f-wrap detail-name">
                  <h3 className="c-detail__ttl">{objData && objData.name}</h3>
                  <div className="f-center">
                    <span className="fw-bold cl-white art-id">#{objData.id}</span>
                    <span className="status-art">
                      <>
                        {(() => {
                          switch (objData?.status) {
                            case STATUS_ARTWORK.REVIEWED:
                              return <img className="ml-2" src="/images/checked.png" alt="..."/>
                            case STATUS_ARTWORK.PENDING:
                              return <img className="ml-2" src="/images/peding.svg" alt="..."/>
                            case STATUS_ARTWORK.REJECT:
                              return <img className="ml-2" src="/images/reject.svg" alt="..."/>
                            default:
                              return false
                          }
                        })()}
                      </>
                    </span>
                  </div>
                </p>
                <div className="author">
                  <span className="file-type">
                    <span className="title">
                      <img src="/images/icon-user-octagon.svg" alt=""/>
                      &nbsp;Owner:&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </span>
                  <span className="cl-white fz-14" style={{overflow: 'hidden', flex: '1'}}>
                    {objData &&
                      objData.creatorAddress &&
                      `${objData.creatorAddress.substring(0, 5)}...${
                        objData.creatorAddress && objData.creatorAddress.substring(28, objData.creatorAddress.length)
                      }`}
                    <CopyToClipboard
                      text={objData && objData.creatorAddress}
                      onCopy={() =>
                        Store.addNotification({
                          title: 'Copied',
                          message: (
                            <div className="custom-fontsize">
                              <i className="fa fa-check-circle icon-success" aria-hidden="true"/>
                              Successfully !
                            </div>
                          ),
                          type: 'warning',
                          width: 300,
                          insert: 'top',
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
                      <img className="ml-2 cursor-pointer" src="/images/coppy.svg" alt="..."/>
                    </CopyToClipboard>
                  </span>
                </div>
                <p className="file-type">
                  <p className="title">
                    <img src="/images/icon-note-octagon.svg" alt=""/>
                    &nbsp;
                    {objData?.fileType === 2 ? 'Video' : 'Description'}
                  </p>
                </p>
                <p className="c-detail__text">{objData && objData.descriptions}</p>
                <p className="file-type">
                  <p className="title">
                    <img src="/images/icon-rewards.svg" alt=""/>
                    &nbsp; Rewards
                  </p>
                </p>
                <div className="reward-panel">
                  <ul className="list-reward">
                    <li>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0 1C0 0.447716 0.447715 0 1 0H9C9.55228 0 10 0.447715 10 1V9C10 9.55228 9.55228 10 9 10H1C0.447716 10 0 9.55228 0 9V1Z"
                          fill="#81FF76"
                        />
                      </svg>
                      <span style={{color: '#fff'}}>Nhận ATFx</span>
                    </li>
                    <li>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="10" height="10" rx="1" fill="#FFA776"/>
                      </svg>
                      <span style={{color: '#fff'}}>Nhận ATF</span>
                    </li>
                    <li>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="10" height="10" rx="1" fill="#76CEFF"/>
                      </svg>
                      <span style={{color: '#fff'}}>Equipment upgrade items</span>
                    </li>
                    <li>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="10" height="10" rx="1" fill="white"/>
                      </svg>
                      <span style={{color: '#fff'}}>White card</span>
                    </li>
                    <li>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="10" height="10" rx="1" fill="#55C595"/>
                      </svg>
                      <span style={{color: '#55C595'}}>Green card</span>
                    </li>
                    <li>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="10" height="10" rx="1" fill="#2613FF"/>
                      </svg>
                      <span style={{color: "#2613ff"}}>Blue card</span>
                    </li>
                    <li>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="10" height="10" rx="1" fill="#05D8F5"/>
                      </svg>
                      <span style={{color: '#05D8F5'}}>Gold card</span>
                    </li>
                    <li>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="10" height="10" rx="1" fill="#F249E1"/>
                      </svg>
                      <span style={{color: '#f249e1'}}>Special card</span>
                    </li>
                  </ul>
                </div>
                {/* <div className="c-detail no-mg  detail-info customChain">
                  <div className="full-with">
                    <Collapse collapsible="disabled" defaultActiveKey={['1']} onChange={callback}>
                      <Panel
                        header={
                          <div className="header-collapse">
                            <img src="/images/detail-market.svg" alt="..." />
                            <span>Details</span>
                          </div>
                        }
                        key="1"
                        showArrow={false}
                      >
                        {text}
                      </Panel>
                    </Collapse>
                  </div>
                  <div className="c-detail__cont-right">
                    <div className="c-detail__cont item-detail">
                      <Collapse collapsible="disabled" defaultActiveKey={['1']} onChange={callback}>
                        <Panel
                          header={
                            <div className="header-collapse">
                              <img src="/images/author-infomation.svg" alt="..." />
                              <span>Author Information</span>
                            </div>
                          }
                          key="1"
                          showArrow={false}
                        >
                          <div className="c-productdetail__title custom">
                            <div className="c-productdetail__img custom">
                              <img
                                className="img-profile custom"
                                src={`${API_IMAGE}${objData && objData.artistAvatar}?v=122`}
                                alt=""
                              />
                            </div>
                            <h3 className="text-custom bsc-artist-info">
                              <p className="flex">
                                <span className="cl-gray fz-14 dl-inline-block mr-2">{`Author : `}</span>
                                <span className="cl-white fz-14 dl-inline-block">{objData.authorName}</span>
                                <a href={`#/usercenter/${objData.author}`} className="f-center">
                                  <img className="ml-2 cursor-pointer" src="/images/link-direct.svg" alt="..." />
                                </a>
                              </p>
                              <span className="decs-info text-custom row-flex custom text-grey d-flex">
                                {objData && objData.publicProfileLink === undefined ? (
                                  []
                                ) : (
                                  <>
                                    Social :{' '}
                                    <p
                                      className="address-color text-white"
                                      style={{ display: 'inline-flex', alignItems: 'center' }}
                                    >
                                      {objData && objData.publicProfileLink}
                                      <a href={`${objData.publicProfileLink}`} target="_blank" rel="noreferrer">
                                        <img src="/images/link-direct.svg" alt="edit" />{' '}
                                      </a>{' '}
                                    </p>
                                  </>
                                )}
                              </span>
                              <p className="f-center">
                                <span className="cl-gray fz-14 mr-2">{`Wallet address : `}</span>
                                <span className="cl-white fz-14" style={{ overflow: 'hidden', flex: '1' }}>
                                  {objData &&
                                    objData.creatorAddress &&
                                    `${objData.creatorAddress.substring(0, 5)}...${
                                      objData.creatorAddress &&
                                      objData.creatorAddress.substring(28, objData.creatorAddress.length)
                                    }`}
                                  <CopyToClipboard
                                    text={objData && objData.creatorAddress}
                                    onCopy={() =>
                                      store.addNotification({
                                        title: 'Copied',
                                        message: (
                                          <div className="custom-fontsize">
                                            <i className="fa fa-check-circle icon-success" aria-hidden="true" />
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
                                    <img className="ml-2 cursor-pointer" src="/images/coppy.svg" alt="..." />
                                  </CopyToClipboard>
                                </span>
                              </p>
                            </h3>
                          </div>
                          <span className="decs-info text-custom custom cl-white text-custom2">
                            {objData.artistDescription}
                          </span>
                        </Panel>
                      </Collapse>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="c-detail no-mg">
            {isMobile ? (
              <>
                <div className="c-detail__cont" style={{display: 'none'}}>
                  <div className="c-detail__cont item-detail">
                    <Collapse collapsible="disabled" defaultActiveKey={['1']} onChange={callback}>
                      <Panel
                        header={
                          <div className="header-collapse">
                            <img src="/images/author-infomation.svg" alt="..."/>
                            <span>Author Information</span>
                          </div>
                        }
                        key="1"
                        showArrow={false}
                      >
                        <div className="c-productdetail__title custom">
                          <div className="c-productdetail__img custom">
                            <img
                              className="img-profile custom"
                              src={`${API_IMAGE}${objData && objData.artistAvatar}?v=122`}
                              alt=""
                            />
                            {/* <div>
                        <span className="decs-info text-custom row-flex custom">
                          Social :{' '}
                          <p className="address-color">
                            {objData && objData.publicProfileLink}
                            <a href={`${objData.publicProfileLink}`} target="_blank" rel="noreferrer">
                              <i className="fa fa-external-link btn-copied" aria-hidden="true" />{' '}
                            </a>{' '}
                          </p>
                        </span>
                          </div> */}
                          </div>
                          <h3 className="text-custom bsc-artist-info">
                            <p className="flex">
                              <span className="cl-gray fz-14 dl-inline-block mr-2">{`Author : `}</span>
                              <span className="cl-white fz-14 dl-inline-block">{objData.authorName}</span>
                              <a href={`#/usercenter/${objData.author}`} className="f-center">
                                <img className="ml-2 cursor-pointer" src="/images/link-direct.svg" alt="..."/>
                              </a>
                            </p>
                            <p>
                              <span className="cl-gray fz-14 mr-2 dl-inline-block">{`Wallet address : `}</span>
                              <span className="cl-white fz-14 dl-inline-block">
                                {objData &&
                                  objData.creatorAddress &&
                                  `${objData.creatorAddress.substring(0, 5)}...${
                                    objData.creatorAddress &&
                                    objData.creatorAddress.substring(28, objData.creatorAddress.length)
                                  }`}
                                <CopyToClipboard
                                  text={objData && objData.creatorAddress}
                                  onCopy={() =>
                                    Store.addNotification({
                                      title: 'Copied',
                                      message: (
                                        <div className="custom-fontsize">
                                          {/* <i className="fa fa-check-square-o icon-success" aria-hidden="true" /> */}
                                          <i className="fa fa-check-circle icon-success" aria-hidden="true"/>
                                          Successfully !
                                        </div>
                                      ),
                                      type: 'warning',
                                      width: 300,
                                      insert: 'top',
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
                                  <img className="ml-2 cursor-pointer" src="/images/coppy.svg" alt="..."/>
                                </CopyToClipboard>
                              </span>
                            </p>
                            <span className="decs-info text-custom custom cl-white">{objData.artistDescription}</span>
                          </h3>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
                {/* <div style={{ width: '100%' }}>
                  <BidTrad />
                </div> */}
              </>
            ) : (
              <>
                {/* <div style={{ width: '100%' }}>
                  <BidTrad />
                </div> */}
                <div className="c-detail__cont" style={{display: 'none'}}>
                  <div className="c-detail__cont item-detail">
                    <Collapse collapsible="disabled" defaultActiveKey={['1']} onChange={callback}>
                      <Panel
                        header={
                          <div className="header-collapse">
                            <img src="/images/author-infomation.svg" alt="..."/>
                            <span>Author Information</span>
                          </div>
                        }
                        key="1"
                        showArrow={false}
                      >
                        <div className="c-productdetail__title custom">
                          <div className="c-productdetail__img custom">
                            <img
                              className="img-profile custom"
                              src={`${API_IMAGE}${objData && objData.artistAvatar}?v=122`}
                              alt=""
                            />
                            {/* <div>
                        <span className="decs-info text-custom row-flex custom">
                          Social :{' '}
                          <p className="address-color">
                            {objData && objData.publicProfileLink}
                            <a href={`${objData.publicProfileLink}`} target="_blank" rel="noreferrer">
                              <i className="fa fa-external-link btn-copied" aria-hidden="true" />{' '}
                            </a>{' '}
                          </p>
                        </span>
                          </div> */}
                          </div>
                          <h3 className="text-custom bsc-artist-info">
                            <p className="flex">
                              <span className="cl-gray fz-14 dl-inline-block mr-2">{`Author : `}</span>
                              <span className="cl-white fz-14 dl-inline-block">{objData.authorName}</span>
                              <a href={`#/usercenter/${objData.author}`} className="f-center">
                                <img className="ml-2 cursor-pointer" src="/images/link-direct.svg" alt="..."/>
                              </a>
                            </p>
                            <p>
                              <span className="cl-gray fz-14 dl-inline-block mr-2">{`Wallet address : `}</span>
                              <span className="cl-white fz-14 dl-inline-block">
                                {objData &&
                                  objData.creatorAddress &&
                                  `${objData.creatorAddress.substring(0, 5)}...${
                                    objData.creatorAddress &&
                                    objData.creatorAddress.substring(28, objData.creatorAddress.length)
                                  }`}
                                <CopyToClipboard
                                  text={objData && objData.creatorAddress}
                                  onCopy={() =>
                                    Store.addNotification({
                                      title: 'Copied',
                                      message: (
                                        <div className="custom-fontsize">
                                          {/* <i className="fa fa-check-square-o icon-success" aria-hidden="true" /> */}
                                          <i className="fa fa-check-circle icon-success" aria-hidden="true"/>
                                          Successfully !
                                        </div>
                                      ),
                                      type: 'warning',
                                      width: 300,
                                      insert: 'top',
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
                                  <img className="ml-2 cursor-pointer" src="/images/coppy.svg" alt="..."/>
                                </CopyToClipboard>
                              </span>
                            </p>
                            <span className="decs-info text-custom custom cl-white">{objData.artistDescription}</span>
                          </h3>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default InfoDetail
