import { ethers } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import {
  Web3Provider,
  JsonRpcSigner,
  StaticJsonRpcProvider,
} from '@ethersproject/providers'

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function getSigner(
  library: Web3Provider,
  account: string,
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

export const simpleRpcProvider = new StaticJsonRpcProvider(process.env.RPC_URL)

export function getContract<T extends Contract>(
  abi: any,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
): T {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider) as T
}
