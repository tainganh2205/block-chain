/* eslint-disable import/no-cycle, react-hooks/exhaustive-deps */
import React, { memo, useState, useCallback, useEffect, useMemo } from 'react'
import Tabs, { TabPanePropsBSC } from 'components/Tabs'
import { useHookNft, PropertiesArtwork } from 'pages/Nft/Store-Nft'
import { useActiveWeb3React } from 'hooks'

import List, { ArtworkFilter, STATUS_ARTWORK, TYPE_ARTWORK } from 'pages/StakeNFT/components/ArtworkList'

export const ListStakeContext = React.createContext<any>({
  tab: null,
})

export enum TABS {
  ALL = 'artworks-tab-all',
  STAKING = 'stake-tab-staking',
}

const MyListStake = memo((props) => {
  const [state, actions] = useHookNft()
  const [tab, setTab] = useState<string>('artworks-tab-all')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { account } = useActiveWeb3React()

  const getStakeNFT = useCallback(
    async (otherFilter = {}) => {
      try {
        if (tab === TABS.ALL) {
          setIsLoading(true)
          await actions.getStakeNFT({
            [PropertiesArtwork.PAGE_NUMBER]: 1,
            [PropertiesArtwork.KEYWORK]: null,
            ...otherFilter,
            ownerAddress: account,
          })
        } else if (tab === TABS.STAKING) {
          setIsLoading(true)
          await actions.getStakeNFT({
            [PropertiesArtwork.PAGE_NUMBER]: 1,
            [PropertiesArtwork.KEYWORK]: null,
            ...otherFilter,
            ownerAddress: account
          })
        }
      } catch (err) {
        console.log({ '[Nft -> Artworks] -> initData': err })
      } finally {
        setIsLoading(false)
      }
    },
    [actions, account, tab]
  )

  const initData = useCallback(() => {
    getStakeNFT()
  }, [getStakeNFT])

  useEffect(() => {
    initData()
  }, [initData])
  const getMore = useCallback(async () => {
    try {
      if (isLoading) {
        return
      }
      setIsLoading(true)
      await actions.getMoreStakeNFT(account)
    } catch (err) {
      console.log({ '[Nft -> Artworks] -> initData': err })
    } finally {
      setIsLoading(false)
    }
  }, [actions, isLoading, account])

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
      getStakeNFT(objFilter)
    },
    [getStakeNFT]
  )
  const onPageChange = useCallback(
    (params) => {
      getStakeNFT({
        [PropertiesArtwork.PAGE_NUMBER]: params[PropertiesArtwork.PAGE_NUMBER],
      })
    },
    [getStakeNFT]
  )
  const filters = [
    {
      keyFilter: PropertiesArtwork.FILE_TYPE,
      title: 'Artwork Type',
      // filter: artworkTypeFilter
    },
    {
      keyFilter: PropertiesArtwork.STATUS,
      title: 'Status',
      // filter: statusFilter
    },
  ]
  const ListStakeAll = (
    <List
      pagination={{
        pageSize: state.objFilter[PropertiesArtwork.PAGE_SIZE],
        totalCount: state.totalCount,
        onPageChange,
      }}
      filters={[]}
      getMore={getMore}
      onFilter={onFilter}
      artworks={state.nftListStake}
      isLoading={isLoading}
    />
  )
  
  const ListStake = (
    <List
      pagination={{
        pageSize: state.objFilter[PropertiesArtwork.PAGE_SIZE],
        totalCount: state.totalCount,
        onPageChange,
      }}
      filters={[]}
      getMore={getMore}
      onFilter={onFilter}
      artworks={state.nftListStake.filter((x:any) => x.stakeStatus === 1)}
      isLoading={isLoading}
    />
    
  )
  const tabs: TabPanePropsBSC[] = [
    {
      tab: 'All NFT',
      children: ListStakeAll,
      key: TABS.ALL,
    },
    {
      tab: 'Staking',
      children: ListStake,
      key: TABS.STAKING,
    },
    {
      tab: 'Boost',
    },
  ]

  const handleChangTab = useCallback((tabKey) => {
    setTab(tabKey)
  }, [])

  useEffect(() => {
    return () => {
      actions.resetObjFilter()
    }
  }, [])

  return (
    <ListStakeContext.Provider
      value={{
        tab,
        filters,
      }}
    >
      {/* <div className="">
        <div className="box-content">
          <div className="info-content">NFT Boost</div>
          <div className="row-flex info-profit">
            <span className="text-white desc-profit">
              Additional Pool Weight: <span className="color-main"> {state.additionalPoolWeight}</span>
            </span>
          </div>
        </div>
      </div> */}
      <div
        style={{
          width: '100%',
        }}
        className="p-bsc-myartwork-list h__art-myartwork-list"
      >
        <Tabs onChange={handleChangTab} activeKey={tab} tabs={tabs} />
      </div>
    </ListStakeContext.Provider>
  )
})

export default MyListStake
