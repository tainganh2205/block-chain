import React, { useMemo } from 'react'
import { BigNumber, constants } from 'ethers'
import { SwitchTabs } from 'components/SwitchTabs'
import { StakeTab } from 'components/pages/gemcenter/StakeTab'
import { StakeHeader } from 'components/pages/gemcenter/StakeHeader'
import { useWeb3React } from '@web3-react/core'
import { useFetchUserData } from 'hooks/staking/useFetchUserData'
import { useFetchPublicPoolsData } from 'hooks/staking/useFetchPublicPoolData'
import { PoolInfo } from 'types/common'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs'

const InnerRender = () => {
  const { account } = useWeb3React()
  // Fetch pools data from BE
  const {
    data: poolsFromBE,
    isLoading: isLoadingPoolsFromBE,
    error,
  } = useFetchWithCache(
    GET_PATHS.getStakingInfo,
    () => client.getStakingInfo(),
    {
      refreshInterval: 20000,
    },
  )

  const {
    data: usersData,
    isLoading: isLoadingUserData,
    refetch: refetchUserData,
  } = useFetchUserData(account as string, poolsFromBE?.data)
  const { data: poolsData, isLoading: isLoadingPublicData } =
    useFetchPublicPoolsData(poolsFromBE?.data)

  const isLoading =
    isLoadingPoolsFromBE || isLoadingUserData || isLoadingPublicData

  const allPools = useMemo(() => {
    return (poolsFromBE?.data ?? []).map((pool) => {
      const poolAddress = pool.poolAddress as string
      const publicData = poolsData?.find(
        (pool) => pool.poolAddress === poolAddress,
      )
      const userData = usersData?.find(
        (pool) => pool.poolAddress === poolAddress,
      )

      const balance = account
        ? BigNumber.from(userData?.balance ?? 0)
        : constants.Zero
      const allowance = account
        ? BigNumber.from(userData?.allowance ?? 0)
        : constants.Zero
      const stakedBalance = account
        ? BigNumber.from(userData?.stakedBalance ?? 0)
        : constants.Zero
      const rewardAmount = account
        ? BigNumber.from(userData?.pendingReward ?? 0)
        : constants.Zero
      const lastStakingBlock = account
        ? BigNumber.from(userData?.lastStakingBlock ?? 0).toNumber()
        : constants.Zero

      return {
        ...pool,
        balance,
        allowance,
        stakedBalance,
        rewardAmount,
        isEnabledContract: allowance.gt(0),
        isStaked: stakedBalance.gt(0),
        hasReward: rewardAmount.gt(0),
        startBlock: BigNumber.from(publicData?.startBlock ?? 0).toNumber() ?? 0,
        endBlock: BigNumber.from(publicData?.endBlock ?? 0).toNumber() ?? 0,
        unstakingBlock:
          BigNumber.from(publicData?.unstakingBlock ?? 0).toNumber() ?? 0,
        lastStakingBlock,
        isEnded: publicData?.isEnded as boolean,
      } as PoolInfo
    })
  }, [poolsFromBE, usersData, poolsData, account])

  const tabsData = useMemo(() => {
    return [
      {
        label: 'Live',
        content: (
          <StakeTab
            isLoading={isLoading}
            pools={allPools?.filter((pool) => !pool.isEnded)}
            error={error}
            isFinished={false}
            refetchUserData={refetchUserData}
          />
        ),
      },
      {
        label: 'Finished',
        content: (
          <StakeTab
            isLoading={isLoading}
            pools={allPools?.filter((pool) => pool.isEnded)}
            error={error}
            isFinished
            refetchUserData={refetchUserData}
          />
        ),
      },
    ]
  }, [allPools, isLoading, error, refetchUserData])

  const totalValueLocked = useMemo(() => {
    const pools = poolsFromBE?.data ?? []
    if (!pools || pools.length === 0) return 0
    return pools.reduce((prev, pool) => {
      const totalValueLockedUSD =
        (pool.token?.priceUSD ?? 0) * (pool?.totalStaked ?? 0)
      return prev + totalValueLockedUSD
    }, 0)
  }, [poolsFromBE])

  return (
    <div className="max-w-[1160px] mx-auto px-5 sm:py-10 py-6 space-y-6">
      <StakeHeader totalValueLocked={totalValueLocked} isLoading={isLoading} />
      <SwitchTabs tabs={tabsData} />
    </div>
  )
}
const GemCenterStaking = () => {
  return (
    <>
      <InnerRender />
    </>
  )
}

export default GemCenterStaking
