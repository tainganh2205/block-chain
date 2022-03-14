import { BigNumber } from 'ethers'
import { useAuthContext } from 'context/auth'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { BinanceBatch2Claim } from 'types/contracts'
import { useBinanceBatch2ClaimContract } from './useContract'

export type ApolloPool = {
  name: string
  label: string
}

export const apolloPools: ApolloPool[] = [
  { name: 'apollox-pool1', label: 'Beginner Box' },
  { name: 'apollox-pool2', label: 'Advance Box' },
  { name: 'apollox-pool3', label: 'Miracle Box' },
]

const FETCH_APOLLO_POOLS = 'fetch-apollo-pools'

const getTokenInPool = async (
  contract: BinanceBatch2Claim,
  pool: ApolloPool,
  address: string,
) => {
  try {
    const numOfToken = await contract.getPoolSlotSize(address, pool.name)
    if (numOfToken && BigNumber.isBigNumber(numOfToken)) {
      return {
        ...pool,
        token: numOfToken.toNumber(),
      }
    }
    return {
      ...pool,
      token: 0,
    }
  } catch (error) {
    console.error(error)
    return {
      ...pool,
      token: 0,
    }
  }
}

export const useGetApolloPools = () => {
  const { walletId } = useAuthContext()
  const claimContract = useBinanceBatch2ClaimContract()

  const { data, isLoading, mutate } = useFetchWithCache(
    walletId ? [FETCH_APOLLO_POOLS, walletId] : null,
    async (_, walletId) => {
      const pools = await Promise.all(
        apolloPools.map((pool) =>
          getTokenInPool(claimContract as BinanceBatch2Claim, pool, walletId),
        ),
      )

      return pools
    },
  )

  return { pools: data, isLoading, refetch: mutate }
}
