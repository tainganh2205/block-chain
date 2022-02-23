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

const WrapperWidget = styled.section`
  ${(props) => (props['data-is-mobile'] ? `
  display: block!important;
  .input-art {
    width: 100%;
  }
  .widget-right {
    padding-top: 10px;
    .ant-select {
      margin: 0;
    }
  }
  ` : '')};
`;

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
      if (location.pathname.indexOf('/NFTdetail') > -1) {
        history.replace(`/NFTdetail/${artwork?.id}`)
      } else {
        history.push(`/NFTdetail/${artwork?.id}`)
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

  const artworkTypeFilter: ArtworkFilter[] = props.filters[0] ? props.filters[0].filter : [
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
        <WrapperWidget className="bsc-list-artwork-actions" data-is-mobile={isMobile}>
          <div className="widget-left">
            <SearchBox search={props.handleSearch} />
          </div>
          <div className="widget-right h__Gap">
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
                <ArtworkItem toggleModal={toggleModal} artwork={artwork} key={artwork.id} />
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
                      <span className="text-v1" style={{ paddingTop: '25px' }}>You don&apos;t have account ArtInfinity</span>
                      <span style={{ fontSize: '14px' }}>Please, connect wallet to create artwork!</span>

                    </div>
                  </Text>
                </Flex>
              ) : (
                <Flex flexDirection="column" alignItems="center">
                  <img alt="" className="swap-icon" src="/images/imgDefault1.png.png" width={120} height={105} />
                  <Text className="cl-gray" textAlign="center" mb="20px">
                    <div className="box-not-found">
                      <span className="text-v1" style={{ paddingTop: '25px' }}>No NFTs found</span>
                      {/* <span style={{fontSize:'14px'}}>Please, connect wallet to create artwork!</span> */}

                    </div>
                  </Text>
                </Flex>
              )) : (
              <Flex flexDirection="column" alignItems="center">
                <img alt="" className="swap-icon" src="/images/defaultNew2.png" width={120} height={105} />
                <Text className="cl-gray" textAlign="center" mb="20px">
                  <div className="box-not-found">
                    <span className="text-v1" style={{ paddingTop: '25px' }}>You don&apos;t have account ArtInfinity</span>
                    <span style={{ fontSize: '14px' }}>Please, connect wallet to create artwork!</span>

                  </div>
                </Text>
              </Flex>
            )}
          </>)
        }

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
