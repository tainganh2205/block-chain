import { BigNumber } from 'ethers'
import { multicall } from 'utils/multicall'
import { simpleRpcProvider } from 'utils/contract'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import stakeABI from 'config/abi/staking.json'
import { HandlerStakingInfo } from 'types/schema'

export const fetchPoolBlockLimits = async (pools: HandlerStakingInfo[]) => {
  const callsStartBlock = pools.map((pool) => {
    return {
      address: pool.poolAddress as string,
      name: 'startBlock',
    }
  })
  const callsEndBlock = pools.map((pool) => {
    return {
      address: pool.poolAddress as string,
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(stakeABI, callsStartBlock)
  const ends = await multicall(stakeABI, callsEndBlock)

  return pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.poolAddress as string]: {
        startBlock: (starts[index] as BigNumber).toString(),
        endBlock: (ends[index] as BigNumber).toString(),
      },
    }),
    {},
  ) as { [key: string]: { startBlock: string; endBlock: string } }
}

export const fetchPoolUnstakingBlock = async (pools: HandlerStakingInfo[]) => {
  const callsBlock = pools.map((pool) => {
    return {
      address: pool.poolAddress as string,
      name: 'unStakingBlock',
    }
  })

  const blocks = await multicall(stakeABI, callsBlock)

  return pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.poolAddress as string]: (blocks[index] as BigNumber).toString(),
    }),
    {},
  ) as { [key: string]: string }
}

const FETCH_PUBLIC_POOLS_DATA_KEY = 'fetch-public-pools-data'

export const useFetchPublicPoolsData = (pools?: HandlerStakingInfo[]) => {
  const { data, isLoading } = useFetchWithCache(
    pools ? FETCH_PUBLIC_POOLS_DATA_KEY : null,
    async () => {
      const blockLimits = await fetchPoolBlockLimits(pools ?? [])
      const unstakingBlocks = await fetchPoolUnstakingBlock(pools ?? [])
      const curBlock = await simpleRpcProvider.getBlockNumber()

      const poolData = (pools ?? []).map((pool) => {
        const blockLimit = blockLimits[pool.poolAddress as string]
        return {
          poolAddress: pool.poolAddress,
          ...blockLimit,
          isEnded:
            curBlock > 0 && blockLimit
              ? curBlock > Number(blockLimit.endBlock)
              : false,
          unstakingBlock: unstakingBlocks[pool.poolAddress as string],
        }
      })

      return poolData
    },
    { refreshInterval: 6 * 1000 },
  )

  return { data, isLoading }
}
