/* eslint-disable import/no-cycle, react-hooks/exhaustive-deps */
import React, { memo, useState, useCallback, useEffect, useMemo } from 'react'
import Tabs, { TabPanePropsBSC } from 'components/Tabs'
import { useHookNft, PropertiesArtwork } from 'pages/Nft/Store-Nft'
import { useActiveWeb3React } from 'hooks'
import styled from 'styled-components'

import List, { ArtworkFilter, STATUS_ARTWORK, TYPE_ARTWORK, TYPE_ARTWORK_BOX, TYPE_ARTWORK_CHARACTER  } from 'pages/Nft_new/components/ArtworkList'
import BiddingArtworkList from './BiddingArtworkList'
import GameBoxArtworkList from './MysteryArtworkList'
import GameCharacterArtworkList from './GameCharacterArtworkList'

const WrapperTab = styled.div`
  .ant-tabs-nav-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    .ant-tabs-tab {
      margin: 0;
    }
  }
`;

export const MyArtworkContext = React.createContext<any>({
  tab: null
})

export enum TABS {
  ALL = "artworks-tab-all",
  BIDDING = "artworks-tab-bidding",
  CHARACTERS = "artworks-tab-game_items",
  GAME_BOX = "artworks-tab-collectibles"
}

const MyArtwork = memo((props) => {
  const [state, actions] = useHookNft()
  const [tab, setTab] = useState<string>('artworks-tab-all')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { account } = useActiveWeb3React()

  const getMyArtworks = useCallback(async (otherFilter = {}) => {
    try {
      if (tab === TABS.ALL) {
        setIsLoading(true)
        await actions.getMyArtwork({
          [PropertiesArtwork.PAGE_NUMBER] : 1,
          [PropertiesArtwork.KEYWORK]: null,
          ...otherFilter,
          ownerAddress: account
        })
      }
    } catch (err) {
      console.log({'[Nft -> Artworks] -> initData': err})
    } finally {
      setIsLoading(false)
    }
  }, [actions, account, tab])

  const initData = useCallback(() => {
    getMyArtworks()
  }, [getMyArtworks])

  useEffect(() => {
    initData()
  }, [initData])

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

  const artworkTypeFilter: ArtworkFilter[] = [
    {
      label: "All",
      value: "all"
    },
    {
      label: "Image",
      value: TYPE_ARTWORK.IMAGE
    },
    {
      label: "Video",
      value: TYPE_ARTWORK.VIDEO
    },
    {
      label: "Gif",
      value: TYPE_ARTWORK.GIF
    }
  ]
  const artworkBoxTypeFilter: ArtworkFilter[] = [
    {
      label: "All",
      value: "all"
    },
    {
      label: "Wood",
      value: TYPE_ARTWORK_BOX.WOOD
    },
    {
      label: "Slive",
      value: TYPE_ARTWORK_BOX.SLIVE
    },
    {
      label: "Gold",
      value: TYPE_ARTWORK_BOX.GOLD
    },
    {
      label: "Special",
      value: TYPE_ARTWORK_BOX.SPECIAL
    }
  ]

  const artworkCharacterTypeFilter: ArtworkFilter[] = [
    {
      label: "All",
      value: "all"
    },
    {
      label: "Beast",
      value: TYPE_ARTWORK_CHARACTER.BEAST
    },
    {
      label: "Demon",
      value: TYPE_ARTWORK_CHARACTER.DEMON
    },
    {
      label: "Human",
      value: TYPE_ARTWORK_CHARACTER.HUMAN
    },
    {
      label: "Elf",
      value: TYPE_ARTWORK_CHARACTER.ELF
    },
    {
      label: "Monster",
      value: TYPE_ARTWORK_CHARACTER.MONSTER
    }
  ]

  const statusFilter: ArtworkFilter[] = [
    {
      label: "All",
      value: "all"
    },
    {
      label: "Review",
      value: STATUS_ARTWORK.REVIEWED
    },
    {
      label: "Pending",
      value: STATUS_ARTWORK.PENDING
    },
    {
      label: "Reject",
      value: STATUS_ARTWORK.REJECT
    }
  ]

  const filtersAll = [
    {
      keyFilter: PropertiesArtwork.FILE_TYPE,
      title: "Artwork Type",
      filter: artworkTypeFilter
    },
    {
      keyFilter: PropertiesArtwork.STATUS,
      title: "Status",
      filter: statusFilter
    }
  ]

  const filtersGameBox = [
    {
      keyFilter: PropertiesArtwork.BOX_TYPE,
      title: "Artwork Type",
      filter: artworkBoxTypeFilter
    },
    {
      keyFilter: PropertiesArtwork.STATUS,
      title: "Status",
      filter: statusFilter
    }
  ]

  const filtersGameCharacter = [
    {
      keyFilter: PropertiesArtwork.BOX_TYPE,
      title: "Artwork Type",
      filter: artworkCharacterTypeFilter
    },
    {
      keyFilter: PropertiesArtwork.STATUS,
      title: "Status",
      filter: statusFilter
    }
  ]

  const ListArtwork = (
    <List
      pagination={{
        pageSize: state.objFilter[PropertiesArtwork.PAGE_SIZE],
        totalCount: state.totalCount,
        onPageChange
      }}
      filters={[
        {
          keyFilter: PropertiesArtwork.FILE_TYPE,
          title: "Artwork Type",
          filter: artworkTypeFilter
        },
        {
          keyFilter: PropertiesArtwork.STATUS,
          title: "Status",
          filter: statusFilter
        }
      ]}
      getMore={getMore}
      onFilter={onFilter}
      artworks={state.nftList} 
      isLoading={isLoading}
    />
  )

  const ListArtworkCharacter = (
    <GameCharacterArtworkList />
  )

  const ListArtworkBox = (
    <GameBoxArtworkList />
  )

  const ListArtworkBidding = (
    <BiddingArtworkList />
  )

  const tabs: TabPanePropsBSC[] = [
    {
      tab: "All NFT",
      children: ListArtwork,
      key: TABS.ALL
    },
    {
      tab: "Bidding",
      children: ListArtworkBidding,
      key: TABS.BIDDING
    },
    {
      tab: "Characters",
      children: ListArtworkCharacter,
      key: TABS.CHARACTERS
    },
    {
      tab: "Game Box",
      children: ListArtworkBox,
      key: TABS.GAME_BOX
    }
  ]

  const handleChangTab = useCallback((tabKey) => {
    setTab(tabKey)
  }, [])

  useEffect(() => {
    return () => {
      actions.resetObjFilter()
    }
  }, [])
  const filters = (tab === TABS.GAME_BOX) ? filtersGameBox : tab === TABS.CHARACTERS ? filtersGameCharacter : filtersAll

  return (
    <MyArtworkContext.Provider
      value={{ 
        tab,
        filters
      }}
    >
      <div
        style={{
          width: '100%'
        }}
        // className='p-bsc-myartwork-list'
        className='p-bscs-nft-bottom'
      >
        <WrapperTab className='art-tabs'>
          <Tabs
            onChange={handleChangTab}
            activeKey={tab}
            tabs={tabs}
          />
        </WrapperTab>
      </div>
    </MyArtworkContext.Provider>
  )
})

export default MyArtwork
