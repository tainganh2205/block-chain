import React, { useState, useEffect, useMemo } from 'react'
import { StakeContextProvider } from 'context/stake'
import { PoolInfo } from 'types/common'
import { usePollBlockNumber } from 'hooks/usePollBlockNumber'
import { PoolGridCardSkeleton } from 'components/PoolCard/PoolGridCardSkeleton'
import { isSSR } from '@dwarvesf/react-utils'
import { PoolItemContainer } from './staking/PoolItemContainer'
import { FinishedPoolsNotice } from 'components/pages/gemcenter/FinishedPoolsNotice'

interface StakeTabProps {
  pools?: PoolInfo[]
  isLoading?: boolean
  error?: any
  isFinished?: boolean
  refetchUserData?: () => void
}

const poolStaked = 'lfw-pool-staked'

export const StakeTab = ({
  pools = [],
  isLoading = false,
  error,
  isFinished = false,
  refetchUserData,
}: StakeTabProps) => {
  const [stakedOnly, setStakedOnly] = useState(() => {
    if (isSSR()) {
      return false
    }
    return Boolean(window.localStorage.getItem(poolStaked))
  })
  const { currentBlock, isLoading: isLoadingCurrentBlock } =
    usePollBlockNumber()

  const stakingInfo = useMemo(
    () => pools.filter((pool) => (stakedOnly ? pool.isStaked : true)),
    [stakedOnly, pools],
  )

  useEffect(() => {
    if (error) {
      // Sometimes we get RPC error because we call to many contract API.
      console.error(error)
    }
  }, [error])

  if (isLoading || isLoadingCurrentBlock) {
    return <PoolGridCardSkeleton />
  }

  return (
    <>
      {isFinished && <FinishedPoolsNotice />}
      <div className="max-w-[520px] lg:max-w-none mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-20">
          {stakingInfo.map((item, index) => (
            <StakeContextProvider key={`pool-${index}`}>
              <PoolItemContainer
                currentBlock={currentBlock}
                poolInfo={item}
                refetchUserData={refetchUserData}
              />
            </StakeContextProvider>
          ))}
        </div>
      </div>
    </>
  )
}
