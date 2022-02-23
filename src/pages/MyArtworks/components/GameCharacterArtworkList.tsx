/* eslint-disable import/no-cycle */
import React, { memo, useState, useCallback, useEffect, useContext } from 'react'
import { useHookNft, PropertiesArtwork } from 'pages/Nft/Store-Nft'
import { useActiveWeb3React } from 'hooks'
import List from 'pages/GameMysteryBox/components/ArtworkList'

import { MyArtworkContext, TABS } from './MyArtwork'

const GameBoxArtworkList = memo(() => {
  const { tab, filters } = useContext(MyArtworkContext)
  const [state, actions] = useHookNft()
  const { account } = useActiveWeb3React()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getMyCharacter = useCallback(async (otherFilter = {}) => {
    try {
      if (tab === TABS.CHARACTERS){
        setIsLoading(true)
        await actions.getMoreMyArtwork({
          [PropertiesArtwork.PAGE_NUMBER] : 1,
          [PropertiesArtwork.KEYWORK]: null,
          ...otherFilter, 
          ownerAddress: account
        })
      }
    } catch (err) {
      console.log({'[Nft -> GameBoxArtworkList] -> getArtworks': err})
    } finally {
      setIsLoading(false)
    }
  }, [actions, account, tab])

  const initData = useCallback(() => {
    getMyCharacter()
  }, [getMyCharacter])

  const getMore = useCallback(async () => {
    try {
      if (isLoading) {
        return;
      }
      setIsLoading(true)
      await actions.getMoreMyCharacter(account)
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
    getMyCharacter(objFilter)
  }, [getMyCharacter])

  const onPageChange = useCallback((params) => {
    getMyCharacter({
      [PropertiesArtwork.PAGE_NUMBER]: params[PropertiesArtwork.PAGE_NUMBER]
    })
  }, [getMyCharacter])

  useEffect(() => {
    initData()
  }, [initData])

  return (
    <>
        <List
        pagination={{
            pageSize: state.objFilter[PropertiesArtwork.PAGE_SIZE],
            totalCount: state.totalCount,
            onPageChange
        }}
        filters={filters}
        isGameCharacter={!false}
        getMore={getMore}
        onFilter={onFilter}
        artworks={state.nftCharacter} 
        isLoading={isLoading} 
        />
    </>
  )
})

export default GameBoxArtworkList