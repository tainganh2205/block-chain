/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useCallback, useEffect } from 'react'
import SearchBox from 'components/SearchBox'
import Tabs, { TabPanePropsBSC } from 'components/Tabs'
import { isMobile } from 'react-device-detect'
import { PropertiesArtwork } from 'pages/Nft/Store-Nft'

import List, { ArtworkFilter, TYPE_ARTWORK, SORT_ARTWORK } from 'pages/Nft_new/components/ArtworkList'

import { useHookNftWhitelist } from '../../Store-Nft'

import './index.less'

const Artworks = memo(() => {
  const [state, actions] = useHookNftWhitelist()
  const [tab, setTab] = useState<string>('artworks-tab-all')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getArtworks = useCallback(
    async (otherFilter = {}) => {
      try {
        await actions.getGenesis({
          [PropertiesArtwork.PAGE_NUMBER]: 1,
          [PropertiesArtwork.KEYWORK]: null,
          ...otherFilter,
        })
      } catch (err) {
        console.log({ '[Nft -> Artworks] -> initData': err })
      }
    },
    [actions]
  )

  const initData = useCallback(async () => {
    setIsLoading(true)
    await getArtworks()
    setIsLoading(false)
  }, [getArtworks])

  useEffect(() => {
    initData()
  }, [initData])

  const getMore = useCallback(async () => {
    try {
      if (isLoading) {
        return
      }
      setIsLoading(true)
      await actions.getMoreGenesis()
    } catch (err) {
      console.log({ '[Nft -> Artworks] -> initData': err })
    } finally {
      setIsLoading(false)
    }
  }, [actions, isLoading])

  const onFilter = useCallback(
    (filter: { key: string; value: any }[]) => {
      const objFilter = filter.reduce((_filter, cond) => {
        if (cond.value === 'all') {
          _filter[cond.key] = null
        } else {
          _filter[cond.key] = cond.value
        }
        return _filter
      }, {})
      objFilter[PropertiesArtwork.PAGE_NUMBER] = 1
      getArtworks(objFilter)
    },
    [getArtworks]
  )

  const handleSearch = useCallback(
    (keyword: any) => {
      onFilter([
        {
          key: PropertiesArtwork.KEYWORK,
          value: keyword,
        },
      ])
    },
    [onFilter]
  )

  const onPageChange = useCallback(
    (params) => {
      getArtworks({
        [PropertiesArtwork.PAGE_NUMBER]: params[PropertiesArtwork.PAGE_NUMBER],
      })
    },
    [getArtworks]
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
  const ListArtwork = (
    <List
      pagination={{
        pageSize: state.objFilter[PropertiesArtwork.PAGE_SIZE],
        totalCount: state.totalCount,
        onPageChange,
      }}
      filters={[]}
      getMore={getMore}
      onFilter={onFilter}
      artworks={state.nftList}
      isLoading={isLoading}
    />
  )

  const tabs: TabPanePropsBSC[] = [
    {
      tab: 'All',
      children: ListArtwork,
      key: 'artworks-tab-all',
    },
    // {
    //   tab: "Digital Art",
    //   children: ListArtwork,
    //   key: 'artworks-tab-digital_art'
    // },
    // {
    //   tab: "Game Items",
    //   children: ListArtwork,
    //   key: 'artworks-tab-game_items'
    // },
    // {
    //   tab: "Collectibles",
    //   children: ListArtwork,
    //   key: 'artworks-tab-collectibles'
    // }
  ]

  const handleChangTab = useCallback((tabKey) => {
    setTab(tabKey)
  }, [])

  useEffect(() => {
    return () => {
      // actions.resetObjFilter()
    }
  }, [])

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {isMobile && <SearchBox search={handleSearch} />}
      <Tabs
        tabBarExtraContent={!isMobile ? <SearchBox search={handleSearch} /> : null}
        onChange={handleChangTab}
        activeKey={tab}
        tabs={tabs}
      />
    </div>
  )
})

export default Artworks
