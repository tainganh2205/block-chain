/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useCallback, useEffect } from 'react'
import SearchBox from 'components/SearchBox'
import Tabs, { TabPanePropsBSC } from 'components/Tabs'
import { isMobile } from 'react-device-detect'
import { PropertiesArtwork, useHookNft } from 'pages/Nft/Store-Nft'
import { useParams } from 'react-router-dom'

import List from 'pages/Nft_new/components/ArtworkList'

import './index.less'

const Artworks = memo(() => {
  const [state, actions] = useHookNft()
  const [tab, setTab] = useState<string>('artworks-tab-all')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const params = useParams<{id: string}>()

  const getArtworks = useCallback(async (otherFilter = {}) => {
    try {
      await actions.getProducts({
        [PropertiesArtwork.PAGE_NUMBER] : 1,
        [PropertiesArtwork.KEYWORK]: null,
        [PropertiesArtwork.AUTHOR]: params.id,
        ...otherFilter
      })
    } catch (err) {
      console.log({'[Nft -> Artworks] -> initData': err})
    }
  }, [actions, params])

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
        return;
      }
      setIsLoading(true)
      await actions.getMoreProducts()
    } catch (err) {
      console.log({'[Nft -> Artworks] -> initData': err})
    } finally {
      setIsLoading(false)
    }
  }, [actions, isLoading])

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
    getArtworks(objFilter)
  }, [getArtworks])

  const handleSearch = useCallback((keyword: any) => {
    onFilter([{
      key: PropertiesArtwork.KEYWORK,
      value: keyword
    }])
  }, [onFilter])

  const onPageChange = useCallback((_params) => {
    getArtworks({
      [PropertiesArtwork.PAGE_NUMBER]: _params[PropertiesArtwork.PAGE_NUMBER]
    })
  }, [getArtworks])
  
  const ListArtwork = (
    (
      <List
        pagination={{
          pageSize: state.objFilter[PropertiesArtwork.PAGE_SIZE],
          totalCount: state.totalCount,
          onPageChange
        }}
        filters={[]}
        getMore={getMore}
        onFilter={onFilter}
        artworks={state.nftList} 
        isLoading={isLoading} 
      />
    )
  )

  const tabs: TabPanePropsBSC[] = [
    {
      tab: "All",
      children: ListArtwork,
      key: 'artworks-tab-all'
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
        marginTop: '50px'
      }}
      className='p-bscs-nft-bottom'
    >
      {isMobile&&(<SearchBox search={handleSearch} />)}
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