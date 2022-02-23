/* eslint-disable react/no-array-index-key, import/no-cycle, react-hooks/exhaustive-deps */

import React, { memo, useCallback, useEffect, useRef, useState, useMemo } from 'react'
import Button from 'components/Button'
import PaginationBSC from 'components/Pagination2'
import { Popover, Select } from 'antd'
import { isMobile } from 'react-device-detect'
import Loader from 'components/Loader'
import { useBalanceBSCS, useTokenAllowanceCustom } from 'data/Allowances'
import { useAllTransactions, isTransactionRecent, useTransactionAdder } from 'state/transactions/hooks'
import { store } from 'react-notifications-component'
import _mintToken, {
  _cancelTokenTo,
  _getOwnerToken,
  _sellTokenTo,
  _getBids,
  _bidToken,
  _buyToken,
  _readyToSellToken,
  _transferNFT,
  _setCurrentPrice,
} from 'pages/Nft/utils'
import { TOKEN_BSCS_TESTNET, CONTRACT_BID, FILE_TYPE_LIST } from 'constants/index'
import { useActiveWeb3React } from 'hooks'
import styled from 'styled-components'
import { Flex, Text } from '@artechain/uikit'
import { useNftContract, useNftMarketContract } from 'hooks/useContract'
import { TransactionDetails } from 'state/transactions/reducer'
import { useHookNft as useHookDetail } from 'pages/NftDetail/Store'
import { useHookUpload } from 'pages/Upload/Store-Upload'
import { useHookNft, PropertiesArtwork } from 'pages/Nft/Store-Nft'

import { useHistory, useLocation } from 'react-router-dom'
import SearchBox from 'components/SearchBox'
import Modal from '../ArtworkItemActions/Modal'
import Filter, { ArtworkFilter } from './Filter'
import ArtworkItem from '../ArtworkItem'
import { ArtworkListProps, TYPE_ARTWORK, STATUS_ARTWORK, SORT_ARTWORK } from './index.d'

import './index.less'

const { Option } = Select

const WrapperWidget = styled.section``

const WrapperCardArt = styled.section`
  width: 100%;
  padding-right: ${(props) => (props['data-mobile'] ? '0' : '20px')};
  position: relative;
`

export const ListArtworkContext = React.createContext<any>({
  balance: null,
  bidContract: null,
  nftContract: null,
  convertedBalance: null,
  allowanceApplyBSCS: null,
  sortedRecentTransactions: [],

  biding: null,
  approveSell: null,
  cancelTokenTo: null,
  buyToken: null,
  gotoDetail: null,
})

function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

const ListArtwork = memo<ArtworkListProps>((props) => {
  const [state, actions] = useHookNft()
  const [state1, actions1] = useHookUpload()

  const [stateDetail, actionsDetail]: any = useHookDetail()
  const { account } = useActiveWeb3React()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const refFilter = useRef<any>(null)
  const refSort = useRef<any>(null)
  const refModal = useRef<any>(null)
  const history = useHistory()
  const location = useLocation()

  const bidContract = useNftMarketContract()
  const nftContract = useNftContract()

  const addTransaction = useTransactionAdder()
  const allTransactions = useAllTransactions()

  const handleGetArtistsByWallet = useCallback(() => {
    if (account) {
      actions1.getArtistsByWallet(account)
    }
  }, [account, actions1.getArtistsByWallet])

  useEffect(() => {
    handleGetArtistsByWallet()
  }, [handleGetArtistsByWallet])

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const balance = useBalanceBSCS()
  const convertedBalance = useMemo(() => parseFloat((balance && balance.toString() / 1e18) || 0), [balance])
  const allowanceApplyBSCS = useTokenAllowanceCustom(TOKEN_BSCS_TESTNET, account ?? undefined, CONTRACT_BID)

  const closeFilter = useCallback(() => {
    refFilter.current?.onClick()
  }, [refFilter])

  const closeSort = useCallback(() => {
    refSort.current?.onClick()
  }, [refFilter])

  const toggleModal = useCallback(
    ({ typeModal, artwork }) => {
      if (refModal.current) {
        refModal.current.open({
          visible: true,
          loading: false,
          type: typeModal,
          artwork,
        })
      }
    },
    [refModal]
  )

  const updateInfoData = (id, amount, ownerAddress = '') => {
    let obj: any = { id, price: parseFloat(amount) }
    if (ownerAddress) {
      obj = { ...obj, ownerAddress }
    }
    actions.updateInfo(obj).then(() => {
      actionsDetail.getProductsDetail(id)
    })
  }

  const cancelTokenTo = async (artwork: any) => {
    _cancelTokenTo(bidContract, artwork?.tokenId).then((response: any) => {
      addTransaction(response, {
        summary: 'Revoke NFT successfully!',
        attr1: `${state.tokenId}-revoke`,
      })
      updateInfoData(artwork.id, 0, account || '')
    })
  }

  const buyToken = async (artwork: any) => {
    actions.checkNftAvailable({ id: artwork?.id, account }).then((res) => {
      if (res.data.data) {
        _buyToken(bidContract, artwork?.tokenId).then((response: any) => {
          addTransaction(response, {
            summary: 'Buy NFT successfully!',
            attr1: `${artwork?.tokenId}-buy`,
          })
          if (account) {
            // TODO: update buy
            // updateInfoData(data.id, 0, account)
            //
            // insert BUY log
            actions.insertBuyToDB({
              artworkId: artwork?.id,
              ownerAddress: account,
              totalSold: 1,
              transactionHash: response.hash,
            })
          }
        })
      }
    })
  }

  const handleApproveSell = useCallback(async (approvalSell) => {
    try {
      const onAttemptToApproveSell = approvalSell()
      await onAttemptToApproveSell()
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const biding = (_type, artwork) => {
    if (convertedBalance <= 0) {
      store.addNotification({
        title: 'Warning !',
        message: (
          <div className="custom-fontsize">
            <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true" /> Not enough amount ATF
          </div>
        ),
        type: 'warning',
        width: 300,
        insert: 'center',
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
      return
    }
    toggleModal({
      typeModal: _type,
      artwork,
    })
  }

  const gotoDetail = useCallback(
    (artwork) => {
      if (location.pathname.indexOf('/MysteryBoxDetail') > -1) {
        history.replace(`/MysteryBoxDetail/${artwork?.id}`)
      } else {
        history.push(`/MysteryBoxDetail/${artwork?.id}`)
      }
    },
    [history, location]
  )

  const sorts: ArtworkFilter[] = [
    {
      label: 'Latest first',
      value: SORT_ARTWORK.LASTEST,
    },
    {
      label: 'Price low - high',
      value: SORT_ARTWORK.PRICE_ASC,
    },
    {
      label: 'Price high - low',
      value: SORT_ARTWORK.PRICE_DESC,
    },
  ]

  const artworkTypeFilter: ArtworkFilter[] = props.filters[0]
    ? props.filters[0].filter
    : [
        {
          label: 'All',
          value: 'all',
        },
        {
          label: 'Image',
          value: TYPE_ARTWORK.IMAGE,
        },
        {
          label: 'Video',
          value: TYPE_ARTWORK.VIDEO,
        },
        {
          label: 'Gif',
          value: TYPE_ARTWORK.GIF,
        },
      ]

  return (
    <ListArtworkContext.Provider
      value={{
        balance,
        convertedBalance,
        allowanceApplyBSCS,
        nftContract,
        bidContract,
        sortedRecentTransactions,

        approveSell: handleApproveSell,
        biding,
        cancelTokenTo,
        buyToken,
        gotoDetail,
      }}
    >
      <div className="bsc-list-artwork-wrapper">
        <Modal ref={refModal} />
        <WrapperWidget className="bsc-list-artwork-actions">
          <div className="widget-left" />
          <div className="widget-right">
            {props.isGameBox === true || props.isGameCharacter ? (
              <Select
                className="ant-art ant-art-select"
                defaultValue={artworkTypeFilter[0].value}
                style={{ minWidth: isMobile ? '100px' : '200px', width: '100%', height: '50px !important' }}
                onChange={(value) => {
                  if (props.onFilter) {
                    props.onFilter([{ key: PropertiesArtwork.FILE_TYPE, value }])
                  }
                }}
              >
                {artworkTypeFilter.map((item: any, i) => (
                  <Option value={item.value}>{item.label}</Option>
                ))}
              </Select>
            ) : (
              <div className="btn-refresh">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.437 2.30311C16.437 1.9824 16.4333 1.66983 16.4376 1.35789C16.4458 0.792261 16.868 0.367568 17.4315 0.352535C17.9788 0.337502 18.4229 0.739644 18.4323 1.31216C18.453 2.54678 18.458 3.78139 18.4498 5.01601C18.4461 5.53153 18.0158 5.95183 17.4947 5.9581C16.2594 5.97376 15.024 5.97877 13.7881 5.97C13.252 5.96624 12.8348 5.50585 12.8398 4.97341C12.8448 4.4485 13.2527 4.01253 13.7793 3.99061C14.1853 3.9737 14.5925 3.97996 14.999 3.97495C15.0591 3.97432 15.1191 3.96743 15.2355 3.95991C15.1279 3.86784 15.0616 3.80833 14.9921 3.75195C10.316 -0.0126502 3.23984 2.5925 2.11959 8.49122C1.27268 12.9542 4.26001 17.2005 8.74977 17.9146C13.1057 18.6074 17.2789 15.56 17.8913 11.2098C17.9839 10.5508 17.9657 9.87116 17.9444 9.2028C17.9251 8.5833 18.2697 8.08344 18.8345 8.02957C19.4275 7.97257 19.8891 8.37659 19.951 9.00611C20.452 14.0924 17.0462 18.7339 12.0405 19.7863C6.62999 20.9244 1.2758 17.3947 0.196837 11.979C-0.882131 6.56256 2.58057 1.30152 7.98917 0.215356C11.0072 -0.390363 13.7568 0.286764 16.2025 2.16531C16.2644 2.21291 16.3263 2.25989 16.3889 2.30562C16.3939 2.30938 16.4032 2.30562 16.437 2.30311Z"
                    fill="#B8BDB9"
                  />
                </svg>
              </div>
            )}
            <Select
              className="ant-art ant-art-select"
              defaultValue={sorts[0].value}
              style={{ minWidth: isMobile ? '100px' : '200px', height: '50px', width: '100%' }}
              onChange={(value) => {
                if (props.onFilter) {
                  props.onFilter([{ key: PropertiesArtwork.SORT_TYPE, value }])
                }
              }}
            >
              {sorts.map((item: any, i) => (
                <Option value={item.value}>{item.label}</Option>
              ))}
            </Select>
          </div>
        </WrapperWidget>

        {(props.isLoading || isLoading) && !isMobile ? (
          <Loader />
        ) : props.artworks.length ? (
          <ul onTouchEnd={() => isMobile && props.getMore()} key="key-bsc-list-artwork" id="bsc-list-artwork">
            {props.artworks?.map((artwork) => (
              <WrapperCardArt className="wrapper-card-art-item" data-mobile={isMobile}>
                <ArtworkItem
                  toggleModal={toggleModal}
                  artwork={{ ...artwork, isGameBox: props.isGameBox }}
                  key={artwork.id}
                />
              </WrapperCardArt>
            ))}
          </ul>
        ) : (
          <>
            {account ? (
              state1.objData.author === '' || state1.objData.artistName === '' ? (
                <Flex flexDirection="column" alignItems="center">
                  <img alt="" className="swap-icon" src="/images/defaultNew2.png" width={120} height={105} />
                  <Text className="cl-gray" textAlign="center" mb="20px">
                    <div className="box-not-found">
                      <span className="text-v1" style={{ paddingTop: '25px' }}>
                        You don&apos;t have account ArtInfinity
                      </span>
                      <span style={{ fontSize: '14px' }}>Please, connect wallet to create artwork!</span>
                    </div>
                  </Text>
                </Flex>
              ) : (
                <Flex flexDirection="column" alignItems="center">
                  <img alt="" className="swap-icon" src="/images/imgDefault1.png.png" width={120} height={105} />
                  <Text className="cl-gray" textAlign="center" mb="20px">
                    <div className="box-not-found">
                      <span className="text-v1" style={{ paddingTop: '25px' }}>
                        No NFTs found
                      </span>
                      {/* <span style={{fontSize:'14px'}}>Please, connect wallet to create artwork!</span> */}
                    </div>
                  </Text>
                </Flex>
              )
            ) : (
              <Flex flexDirection="column" alignItems="center">
                <img alt="" className="swap-icon" src="/images/defaultNew2.png" width={120} height={105} />
                <Text className="cl-gray" textAlign="center" mb="20px">
                  <div className="box-not-found">
                    <span className="text-v1" style={{ paddingTop: '25px' }}>
                      You don&apos;t have account ArtInfinity
                    </span>
                    <span style={{ fontSize: '14px' }}>Please, connect wallet to create artwork!</span>
                  </div>
                </Text>
              </Flex>
            )}
          </>
        )}

        {(props.isLoading || isLoading) && isMobile && (
          <div className="bsc-list-artwork-loading">
            <Loader />
          </div>
        )}
        <div className="bsc-list-artwork-pagination">
          <PaginationBSC {...props.pagination} />
        </div>
      </div>
    </ListArtworkContext.Provider>
  )
})

// {!props.artworks.length ? (
// <Flex flexDirection="column" alignItems="center">
//   <img alt="" className="swap-icon" src="/images/imagesSwap/not-found-token.png" width={120} height={105} />
//   <Text className="cl-gray" textAlign="center" mb="20px">
//     No results found.
//   </Text>
// </Flex>

export * from './index.d'
export * from './Filter/index.d'
export default ListArtwork
