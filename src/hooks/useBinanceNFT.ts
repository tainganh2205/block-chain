import { BigNumber, Contract } from 'ethers'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { multicall } from 'utils/multicall'
import { client } from 'libs/apis'
import { useAuthContext } from 'context/auth'
import binanceNFTBatch1Abi from 'config/abi/binanceNFT1.json'
import binanceNFTBatch2Abi from 'config/abi/binanceNFT2.json'
import binanceNFTBatch3Abi from 'config/abi/binanceNFT3.json'
import {
  useBinanceNFTContractBatch1,
  useBinanceNFTContractBatch2,
  useBinanceNFTContractBatch3,
} from './useContract'

export const fetchTokenIds = async (
  contract: Contract,
  abi: any,
  account: string,
) => {
  const balance = await contract?.balanceOf(account)
  if (!balance || !BigNumber.isBigNumber(balance)) return []

  const arrayIndex = Array.from({ length: balance.toNumber() }).map(
    (_, index) => index,
  )
  const calls = arrayIndex.map((idx) => ({
    address: contract.address,
    name: 'tokenOfOwnerByIndex',
    params: [account, idx],
  }))

  const tokens = await multicall(abi, calls)

  return (tokens as Array<Array<BigNumber>>).reduce(
    (acc, tokens) => [...acc, ...tokens.map((token) => token.toNumber())],
    [] as number[],
  )
}

const FETCH_BINANCE_TOKENS = 'fetch-binance-tokens'

export const useGetBinanceNFT = () => {
  const { walletId } = useAuthContext()
  const binanceNFTContractBatch1 = useBinanceNFTContractBatch1()
  const binanceNFTContractBatch2 = useBinanceNFTContractBatch2()
  const binanceNFTContractBatch3 = useBinanceNFTContractBatch3()

  const { data: session, mutate: mutateSession } = useFetchWithCache(
    walletId ? [FETCH_BINANCE_TOKENS, walletId] : null,
    async (_, account) => {
      const [batch1TokenIds, batch2TokenIds, batch3TokenIds] =
        await Promise.all([
          fetchTokenIds(
            binanceNFTContractBatch1 as Contract,
            binanceNFTBatch1Abi,
            account,
          ),
          fetchTokenIds(
            binanceNFTContractBatch2 as Contract,
            binanceNFTBatch2Abi,
            account,
          ),
          fetchTokenIds(
            binanceNFTContractBatch3 as Contract,
            binanceNFTBatch3Abi,
            account,
          ),
        ])

      const session = [
        {
          contractAddress: binanceNFTContractBatch1?.address,
          tokenIdList: batch1TokenIds,
        },
        {
          contractAddress: binanceNFTContractBatch2?.address,
          tokenIdList: batch2TokenIds,
        },
        {
          contractAddress: binanceNFTContractBatch3?.address,
          tokenIdList: batch3TokenIds,
        },
      ]
      return session
    },
  )

  const { data, isLoading, mutate } = useFetchWithCache(
    walletId && session ? [FETCH_BINANCE_TOKENS, walletId, session] : null,
    async (_, account, session) => {
      return client.getBinanceNFTs({
        ownerAddress: account,
        session,
      })
    },
  )

  return {
    heroes: data?.data,
    isLoading,
    // when claimed successfully, we try to refetch the BE first then refetch the contract for better UX
    refetchApi: mutate,
    refetch: mutateSession,
  }
}
