import { Contract } from '@ethersproject/contracts'
import { ChainId, WETH } from '@lfwfinance/sdk'
import Web3 from 'web3'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useCallback, useMemo } from 'react'
import abiBUSD from 'config/abi/abiBUSD.json'
import abiJoinPool from 'config/abi/abiJoinPool.json'

import useWeb3 from 'hooks/useWeb3'

import idoTokenClaimAbi from 'config/abi/idoTokenClaim.json'
import idoTokenClaimDailyAbi from 'config/abi/idoTokenClaimDaily.json'
import { getBep20Contract, getContract, getIDOContract, getJoinPoolContract } from 'utils'
import { useWeb3React } from '@web3-react/core'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
import NFT_ABI from '../constants/abis/nft.json'
import NFTMARKET_ABI from '../constants/abis/nftmarket.json'
import WETH_ABI from '../constants/abis/weth.json'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'
import { useActiveWeb3React } from './index'
import { CONTRACT_NFT, CONTRACT_BID } from '../constants'
// returns null on errors
export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useTokenNFTContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, NFT_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.BSCTESTNET:
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}

export function useNftContract(): Contract | null {
  return useContract(CONTRACT_NFT, NFT_ABI, true)
}

export function useNftMarketContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(CONTRACT_BID, NFTMARKET_ABI, true)
}

export function useBUSDContract(address): any {
  return useContract(address, abiBUSD)
}

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getBep20Contract(address, web3), [address, web3])
}

export function useIDOContract(addressPool): any {
  const web3 = useWeb3()
  return useMemo(() => getIDOContract(addressPool, web3), [web3, addressPool])
}

export function useJoinPoolContract(address): any {
  return useContract(address, abiJoinPool, true)
}

export function useIdoTokenClaimContract(scAddr, item): any {
  return useContract(scAddr, item && item.claimRound === 100 ? idoTokenClaimDailyAbi : idoTokenClaimAbi)
}
