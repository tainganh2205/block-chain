/* eslint-disable react/no-array-index-key, import/no-cycle, react-hooks/exhaustive-deps */
import React, { memo, useCallback, useRef, useState, useMemo } from 'react'
import Button from 'components/Button'
import PaginationBSC from 'components/Pagination2'
import { Popover } from 'antd'
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
import { TOKEN_BSCS_TESTNET, CONTRACT_BID } from 'constants/index'
import { useActiveWeb3React } from 'hooks'
import { useNftContract, useNftMarketContract } from 'hooks/useContract'
import { TransactionDetails } from 'state/transactions/reducer'
import { useHookNft as useHookDetail } from 'pages/NftDetail/Store'
import { useHookNft } from 'pages/Nft/Store-Nft'
import { useHistory, useLocation } from 'react-router-dom'

import Filter, { ArtworkFilter } from './Filter'
import ArtworkItem from '../ArtworkItem'
import { ArtworkListProps, SORT_ARTWORK } from './index.d'

import './index.less'

export const ListStakeContext = React.createContext<any>({
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

const ListArtwork = (props:any) => {
  const {artworks,onFilter, pagination,filters }:any = props
  const [state, actions] = useHookNft()
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
    refFilter.current?.onClick()
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
  const handleApproveSell = useCallback(async (approvalSell) => {
    try {
      const onAttemptToApproveSell = approvalSell()
      await onAttemptToApproveSell()
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const gotoDetail = useCallback(
    (artwork) => {
      if (location.pathname.indexOf('/nft-megamarket-detail') > -1) {
        history.replace(`/nft-megamarket-detail/${artwork?.id}`)
      } else {
        history.push(`/nft-megamarket-detail/${artwork?.id}`)
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
  return (
    <ListStakeContext.Provider
      value={{
        balance,
        convertedBalance,
        allowanceApplyBSCS,
        nftContract,
        bidContract,
        sortedRecentTransactions,

        approveSell: handleApproveSell,
        cancelTokenTo,
        // buyToken,
        gotoDetail,
      }}
    >
      <div className="bsc-list-artwork-wrapper">
        <div className="bsc-list-artwork-actions">
          {filters.length > 0 ? (
            <Popover
              ref={refFilter}
              trigger="click"
              placement="bottomLeft"
              content={
                <Filter
                  onCancle={closeFilter}
                  onFilter={onFilter}
                  title={isMobile ? 'Filter Items' : null}
                  filters={filters}
                />
              }
            >
              <div>
                <Button
                  className="bsc-list-artwork-btn-filter"
                  left={<img className="bsc-list-artwork-btn-icon" src="/images/filter.svg" alt="..." />}
                  key="bsc-list-artwork-filter"
                  text={isMobile ? null : 'Filter Items'}
                />
              </div>
            </Popover>
          ) : (
            <div />
          )}
        </div>
        {(isLoading || isLoading) && !isMobile ? (
          <Loader />
        ) : (
          <>
            <ul onTouchEnd={() => isMobile && props.getMore()} key="key-bsc-list-artwork" id="bsc-list-artwork">
              {artworks?.map((artwork) => (
                <ArtworkItem toggleModal={toggleModal} artwork={artwork} key={artwork.id} />
              ))}
            </ul>
          </>
        )}
        {(isLoading || isLoading) && isMobile && (
          <div className="bsc-list-artwork-loading">
            <Loader />
          </div>
        )}
        {!isMobile && (
          <div className="bsc-list-artwork-pagination">
            <PaginationBSC {...pagination} />
          </div>
        )}
      </div>
    </ListStakeContext.Provider>
  )
}

export * from './index.d'
export * from './Filter/index.d'
export default ListArtwork
