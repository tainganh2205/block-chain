/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useCallback, useEffect } from 'react'
import { TabPanePropsBSC } from 'components/Tabs'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { useHookNft, PropertiesArtwork } from 'pages/Nft/Store-Nft'
import { useHookNft as useHookDetail } from 'pages/NftDetail/Store'
import { ButtonArt } from 'components/Art'

import List from '../ArtworkList'

import './index.less'

const WrapperTabs = styled.section`
  margin-bottom: 26px;
  width: 100% !important;
  & > div {
    width: max-content;
  }
  button {
    /* width: ${(props) => (props['data-mobile'] ? '100%' : 'auto')}; */
    font-weight: 500;
    margin-right: 16px;
    width: 110px;

    &:nth-child(5) {
      width: fit-content;
    }
  }
  .boxButtonx {
    ${(props) => (props['data-mobile'] ? `margin: auto; justify-content: center;` : '')}; 
  }
`

const Artworks = memo(() => {
  const [state, actions] = useHookNft()
  const [, actionsDetail]: any = useHookDetail()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getArtworks = useCallback(
    async (otherFilter = {}) => {
      try {
        await actions.getProducts({
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

  const getTypeArtwork = useCallback(async () => {
    try {
      await actionsDetail.getTypeArtworkList()
    } catch (err) {
      console.log({ '[ListArtwork] -> initData': err })
    }
  }, [actionsDetail])

  const initData = useCallback(async () => {
    setIsLoading(true)
    await getArtworks()
    await getTypeArtwork()
    setIsLoading(false)
  }, [getArtworks, getTypeArtwork])

  useEffect(() => {
    initData()
  }, [initData])

  const getMore = useCallback(async () => {
    try {
      if (isLoading) {
        return
      }
      setIsLoading(true)
      await actions.getMoreProducts()
    } catch (err) {
      console.log({ '[Nft -> Artworks] -> initData': err })
    } finally {
      setIsLoading(false)
    }
  }, [actions, isLoading])

  const onFilter = useCallback(
    (filter: { key: string; value: any }[]) => {
      const objFilter = filter.reduce((_filter, cond) => {
        console.log(cond.value, '=====>')
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

  const onPageChange = useCallback(
    (params) => {
      getArtworks({
        [PropertiesArtwork.PAGE_NUMBER]: params[PropertiesArtwork.PAGE_NUMBER],
      })
    },
    [getArtworks]
  )

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
      tab: 'All Box',
      children: ListArtwork,
      key: 'artworks-tab-all',
      value: 'all',
    },
    {
      tab: 'Wood',
      children: ListArtwork,
      key: 'artworks-tab-wood',
      value: 'Wood',
    },
    {
      tab: 'Silve',
      children: ListArtwork,
      key: 'artworks-tab-silve',
      value: 'Silve',
    },
    {
      tab: 'Gold',
      children: ListArtwork,
      key: 'artworks-tab-gold',
      value: 'Gold',
    },

    {
      tab: 'Special',
      children: ListArtwork,
      key: 'artworks-tab-special',
      value: 'Special',
    },
  ]

  const [activedTab, setActivedTab] = useState<TabPanePropsBSC>(tabs[0])
  const changeArtWork = (item) => {
    setActivedTab(item)
    onFilter([
      {
        key: PropertiesArtwork.TYPE_ARTWORK,
        value: item.value,
      },
    ])
  }
  // ckzhckas
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <WrapperTabs className="wrapper-collection" data-mobile={isMobile}>
        <div className="boxButtonx">
          {tabs.map((item) => (
            <ButtonArt
              style={{ height: '40px' }}
              data-variant={activedTab.key === item.key ? 'primary' : 'tertiary'}
              onClick={() => changeArtWork(item)}
            >
              {item.tab}
            </ButtonArt>
          ))}
        </div>
      </WrapperTabs>

      <div>{ListArtwork}</div>
    </div>
  )
})

export default Artworks
