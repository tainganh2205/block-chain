/* eslint-disable import/no-cycle */
import React, { memo, useState, useCallback, useEffect, useContext } from 'react'
import { useHookNft, PropertiesArtwork } from 'pages/Nft/Store-Nft'
import { useActiveWeb3React } from 'hooks'
import List from 'pages/Nft_new/components/ArtworkList'

import { MyArtworkContext, TABS } from './MyArtwork'

const BiddingArtworkList = memo(() => {
  const { tab, filters } = useContext(MyArtworkContext)
  const [state, actions] = useHookNft()
  const { account } = useActiveWeb3React()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getMyArtworks = useCallback(async (otherFilter = {}) => {
    try {
      if (tab === TABS.BIDDING){
        setIsLoading(true)
        await actions.getMyArtworkBiding({
          [PropertiesArtwork.PAGE_NUMBER] : 1,
          [PropertiesArtwork.KEYWORK]: null,
          ...otherFilter, 
          ownerAddress: account
        })
      }
    } catch (err) {
      console.log({'[Nft -> BiddingArtworkList] -> getArtworks': err})
    } finally {
      setIsLoading(false)
    }
  }, [actions, account, tab])

  const initData = useCallback(() => {
    getMyArtworks()
  }, [getMyArtworks])

  const getMore = useCallback(async () => {
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true)
      await actions.getMoreMyArtwork(account)
    } catch (err) {
      console.log({'[Nft -> Artworks] -> initData': err})
    } finally {
      setIsLoading(false)
    }
  }, [actions, isLoading, account])

  const onFilter = useCallback((filter: {key: string, value: any}[]) => {
    const objFilter = filter.reduce((_filter, cond) => {
      if (cond.value === "all") {
        _filter[cond.key] = null
      } else {
        _filter[cond.key] = cond.value
      }
      return _filter
    }, {})
    objFilter[PropertiesArtwork.PAGE_NUMBER] = 1
    getMyArtworks(objFilter)
  }, [getMyArtworks])

  const onPageChange = useCallback((params) => {
    getMyArtworks({
      [PropertiesArtwork.PAGE_NUMBER]: params[PropertiesArtwork.PAGE_NUMBER]
    })
  }, [getMyArtworks])

  useEffect(() => {
    initData()
  }, [initData])

  return (
    <List
      pagination={{
        pageSize: state.objFilter[PropertiesArtwork.PAGE_SIZE],
        totalCount: state.totalCount,
        onPageChange
      }}
      filters={filters}
      getMore={getMore}
      onFilter={onFilter}
      artworks={state.nftList} 
      isLoading={isLoading} 
    />
  )
})

export default BiddingArtworkList