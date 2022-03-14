import { BigNumber } from 'ethers'
import { multicall } from 'utils/multicall'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import erc20ABI from 'config/abi/erc20.json'
import stakeABI from 'config/abi/staking.json'
import { HandlerStakingInfo } from 'types/schema'

export const fetchPoolsAllowances = async (
  account: string,
  pools: HandlerStakingInfo[],
) => {
  const calls = pools.map((pool) => ({
    address: pool.token?.address as string,
    name: 'allowance',
    params: [account, pool.poolAddress],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.poolAddress as string]: (allowances[index] as BigNumber).toString(),
    }),
    {},
  ) as { [key: string]: string }
}

export const fetchUserBalances = async (
  account: string,
  pools: HandlerStakingInfo[],
) => {
  const calls = pools.map((pool) => ({
    address: pool.token?.address as string,
    name: 'balanceOf',
    params: [account],
  }))

  const balances = await multicall(erc20ABI, calls)
  return pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.poolAddress as string]: (balances[index] as BigNumber).toString(),
    }),
    {},
  ) as { [key: string]: string }
}

export const fetchUserStakeBalances = async (
  account: string,
  pools: HandlerStakingInfo[],
) => {
  const calls = pools.map((pool) => ({
    address: pool.poolAddress as string,
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(stakeABI, calls)
  return pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.poolAddress as string]: (
        userInfo[index].amount as BigNumber
      ).toString(),
    }),
    {},
  ) as { [key: string]: string }
}

export const fetchUserPendingRewards = async (
  account: string,
  pools: HandlerStakingInfo[],
) => {
  const calls = pools.map((pool) => ({
    address: pool.poolAddress as string,
    name: 'pendingRewardByToken',
    params: [account, pool.rewardToken?.address],
  }))
  const userRewards = await multicall(stakeABI, calls)
  return pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.poolAddress as string]: (
        userRewards[index] as BigNumber
      ).toString(),
    }),
    {},
  ) as { [key: string]: string }
}

export const fetchUserLastStakingBlock = async (
  account: string,
  pools: HandlerStakingInfo[],
) => {
  const calls = pools.map((pool) => ({
    address: pool.poolAddress as string,
    name: 'getLastStakingBlock',
    params: [account],
  }))
  const userLastStakingBlocks = await multicall(stakeABI, calls)
  return pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.poolAddress as string]: (
        userLastStakingBlocks[index] as BigNumber
      ).toString(),
    }),
    {},
  ) as { [key: string]: string }
}

const FETCH_USER_STAKR_INFO_KEY = 'fetch-user-stake-info'

export const useFetchUserData = (
  account: string,
  pools?: HandlerStakingInfo[],
) => {
  const { data, isLoading, mutate } = useFetchWithCache(
    pools ? [FETCH_USER_STAKR_INFO_KEY, account] : null,
    async (_, account="") => {
      const allowances = await fetchPoolsAllowances(account, pools ?? [])
      const balances = await fetchUserBalances(account, pools ?? [])
      const stakedBalances = await fetchUserStakeBalances(account, pools ?? [])
      const userRewards = await fetchUserPendingRewards(account, pools ?? [])
      const lastStakingBlocks = await fetchUserLastStakingBlock(
        account,
        pools ?? [],
      )

      const userData = (pools ?? []).map((pool) => ({
        poolAddress: pool.poolAddress,
        allowance: allowances[pool.poolAddress as string],
        balance: balances[pool.poolAddress as string],
        stakedBalance: stakedBalances[pool.poolAddress as string],
        pendingReward: userRewards[pool.poolAddress as string],
        lastStakingBlock: lastStakingBlocks[pool.poolAddress as string],
      }))

      return userData
    },
    { refreshInterval: 6 * 1000 },
  )

  return { data, isLoading, refetch: mutate }
}
