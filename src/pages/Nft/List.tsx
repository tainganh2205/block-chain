/* eslint-disable jsx-a11y/media-has-caption */
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router'
import { isMobile } from 'react-device-detect'

import { useActiveWeb3React } from '../../hooks'
import { useApproveCallbackCustom } from '../../hooks/useApproveCallback'
import { useTokenAllowanceCustom, useBalanceBSCS } from '../../data/Allowances'
import {
  TOKEN_BSCS_TESTNET,
  CONTRACT_BID,
  FILE_TYPE_LIST,
} from '../../constants'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { useHookNft, PropertiesArtwork } from './Store-Nft'
import Pagination from '../../components/Pagination'
import Loader from '../../components/Loader'
import ItemProduct from './ItemProduct'
import ModalPreview from './ModalPreview'

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

let bodyWrapper

const List = memo((prop: any) => {
  const [state, actions] = useHookNft()
  const refModalReview = useRef<any>(null)
  const { account } = useActiveWeb3React()
  const allowanceApplyBSCS = useTokenAllowanceCustom(TOKEN_BSCS_TESTNET, account ?? undefined, CONTRACT_BID)
  const { search: searchRouter } = useLocation()
  const filterRouter = useMemo(() => searchRouter
    .replace("?", "")
    .split("&")
    .map(query => query.split("="))
    .reduce((obj, query) => {
      if (query.length === 2) {
        obj[query[0]] = query[1]
      }
      return obj
    }, {}), [searchRouter])

  function handlePageChange(_newPage, _pageSize) {
    handleGetProducts({
      [PropertiesArtwork.PAGE_NUMBER]: _newPage,
      [PropertiesArtwork.PAGE_SIZE]: _pageSize
    })
  }

  const { isFetching } = state

  let balance = useBalanceBSCS()
  balance = parseFloat((balance && balance.toString() / 1e18) || 0)

  const submit = () => {
    alert('Coming soon!')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleGetProducts()
    }
  }

  const handleGetProducts = useCallback(async (otherFilter = {}) => {
    try {
      await actions.setIsFetching(true)
      if (Object.values(filterRouter).some(param => param)) {
        await actions.getProducts({
          ...otherFilter,
          [PropertiesArtwork.TYPE_ARTWORK]: filterRouter[PropertiesArtwork.TYPE_ARTWORK],
          [PropertiesArtwork.PAGE_NUMBER]: 1
        })
      } else {
        await actions.getProducts({
          ...otherFilter,
          [PropertiesArtwork.TYPE_ARTWORK]: null
        })
      }
    } catch (e) {
      console.log({ "[Ntf] -> handleGetProducts: ": e })
    } finally {
      await actions.setIsFetching(false)
    }
  }, [filterRouter, actions])

  useEffect(() => {
    handleGetProducts()
  }, [handleGetProducts])

  const _onChangeFilter = (obj) => {
    handleGetProducts({
      [obj.id]: obj.value,
      [PropertiesArtwork.PAGE_NUMBER]: 1
    })
  }

  const [approval] = useApproveCallbackCustom(TOKEN_BSCS_TESTNET, CONTRACT_BID)

  const onAttemptToApprove = useCallback(() => {
    return approval()
  }, [approval])

  const onScrollToBottom = useCallback(() => {
    if (isFetching || !bodyWrapper) {
      return;
    }

    if (window.innerHeight + window.scrollY >= bodyWrapper.clientHeight) {
      actions.getMoreProducts()
    }
  }, [actions, isFetching])

  /* eslint-disable react-hooks/exhaustive-deps, consistent-return */
  useEffect(() => {
    if (isMobile) {
      window.addEventListener('scroll', onScrollToBottom)
      return () => {
        window.removeEventListener('scroll', onScrollToBottom)
      }
    }
    return undefined
  }, [isMobile, onScrollToBottom])

  useEffect(() => {
    bodyWrapper = document.getElementById("body-wrapper-bsc")
  }, [])

  /* eslint-enable react-hooks/exhaustive-deps, consistent-return */

  const onApprove = useCallback(async () => {
    try {
      await onAttemptToApprove()
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onAttemptToApprove])

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])
  
  const getStatus = (type, item) => {
    // TODO: check item undefined
    if(!item){
      return false
    }
    const pending = sortedRecentTransactions
      .filter((tx) => !tx.receipt && tx.attr1 === `${item && item.tokenId}-${type}`)
      .map((tx) => tx.hash)

    return !!pending.length
  }
  const getStatusAprrove = () => {
    const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
    return !!pending.length
  }

  const toggleModal = useCallback((item = {}) => {
    if (refModalReview.current) {
      refModalReview.current.toggle(item)
    }
  }, [refModalReview])

  const _onChangeInput = useCallback((value) => {
    actions.onChangeInput(value)
  }, [actions])


  return (
    <>
      <ModalPreview
        ref={refModalReview}
        getStatus={getStatus}
        getStatusAprrove={getStatusAprrove}
        onApprove={onApprove}
        balance={balance}
        allowanceApplyBSCS={allowanceApplyBSCS}
      // setModalIsOpen={setModalIsOpen}
      />
      <div
        className="p-home__list"
      >
        <div className="l-container l-container-flex">
          <div className="c-search filter dark_light">
            <div className="c-search__box">
              <a href="/#/collections" className="btn-upload a-bsc">
                My Collections
              </a>
              <a href="/#/mintNFT" className="btn-upload a-bsc">
                Mint Artworks
              </a>
            </div>
            <div className="c-search__inner">
              <div className="box-input-cus">
                <input
                  value={state.objFilter.keywork}
                  onChange={(e) => _onChangeInput({ id: PropertiesArtwork.KEYWORK, value: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(e)}
                  type="text"
                  name=""
                  placeholder="Search"
                />
                <div className="custom-seach">
                <i
                  className="fa fa-search"
                  onClick={handleGetProducts}
                  aria-hidden="true"
                />
              </div>
              </div>
              <select value={state.objFilter.fileType} onChange={(e) => _onChangeFilter({ id: PropertiesArtwork.FILE_TYPE, value: parseInt(e.target.value) })}>
                {FILE_TYPE_LIST.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
              <select value={state.objFilter.sortByPrice} onChange={(e) => _onChangeFilter({ id: PropertiesArtwork.SORT_BY_PRICE, value: e.target.value })}>
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

          {(isMobile || !state.isFetching) && (<ul
            className="c-list c-list-flex"
          >
            {state.nftList
              .filter((x: any) => x.price > 0)
              .map((item: any, i) => (
                <ItemProduct
                  toggleModal={toggleModal}
                  getStatus={getStatus}
                  getStatusAprrove={getStatusAprrove}
                  onApprove={onApprove}
                  balance={balance}
                  allowanceApplyBSCS={allowanceApplyBSCS}
                  // setModalIsOpen={setModalIsOpen}
                  key={item.id}
                  item={item}
                />
              ))}
          </ul>)}

          {state.isFetching
            ? (
              <>
                <Loader />
                <br />
              </>
            )
            : null}

          {!isMobile && state.totalCount && (<Pagination
            pagination={{
              pageNumber: state.objFilter[PropertiesArtwork.PAGE_NUMBER],
              pageSize: state.objFilter[PropertiesArtwork.PAGE_SIZE],
              totalCount: state.totalCount
            }}
            onPageChange={handlePageChange}
          />)}
        </div>
      </div>
    </>
  )
})

export default List
