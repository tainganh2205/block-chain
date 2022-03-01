import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { ChainId, JSBI, Percent, Token, CurrencyAmount, Currency, ETHER } from '@artechain/sdk'
import bep20Abi from 'config/abi/erc20.json'
import abiZK from 'config/abi/abiZK.json'

import abiJoinPool from 'config/abi/abiJoinPool.json'
import web3NoAccount from 'utils/web3'
import { getSellPublicAddress } from 'utils/addressHelpers'
import sellPublic from 'config/abi/sellPublic.json'

import { ROUTER_ADDRESS } from '../constants'
import { TokenAddressMap } from '../state/lists/hooks'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

const BSCSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  56: '',
  97: 'testnet.',
}

export function getBscScanLink(chainId: ChainId, data: string, type: 'transaction' | 'token' | 'address'): string {
  const prefix = `https://${BSCSCAN_PREFIXES[chainId] || BSCSCAN_PREFIXES[ChainId.MAINNET]}bscscan.com`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(Math.floor(num)), JSBI.BigInt(10000))
}

export function calculateSlippageAmount(value: CurrencyAmount, slippage: number): [JSBI, JSBI] {
  if (slippage < 0 || slippage > 10000) {
    throw Error(`Unexpected slippage value: ${slippage}`)
  }
  return [
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000)),
  ]
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export const getIDOContract = (addressPool: string, web3?: Web3) => {
  return getContractWeb3(abiZK, addressPool, web3)
}
export const getJoinPoolContract = (address: string, web3?: Web3) => {
  return getContractWeb3(abiJoinPool, address, web3)
}


export const getContractWeb3 = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address, {
    from: '0xB4e33AD321A173ce89067904e77413c862Bf41B6',
  })
}

export const getBalanceBNB = async (account: string, web3?: Web3) => {
  return new Promise((resolve, reject) => {
    const _web3 = web3 ?? web3NoAccount
    _web3.eth
      .getBalance(account)
      .then((data) => {

        resolve(data)
      })
      .catch((err) => {
        console.log('err',err)

        reject(err)
      })
  })
}

// account is optional
export function getRouterContract(_: number, library: Web3Provider, account?: string): Contract {
  return getContract(ROUTER_ADDRESS, IUniswapV2Router02ABI, library, account)
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContractWeb3(bep20Abi, address, web3)
}

export const getSellPubliContract = (web3?: Web3) => {
  return getContractWeb3(sellPublic, getSellPublicAddress(), web3)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(defaultTokens: TokenAddressMap, currency?: Currency): boolean {
  if (currency === ETHER) return true
  return Boolean(currency instanceof Token && defaultTokens[currency.chainId]?.[currency.address])
}

export function formatNumber(number: number) {
  return Intl.NumberFormat().format(number)
}

export function formatCurrency(
  amount: string | number,
  currency = 'USD',
): string {
  return new Intl.NumberFormat('en-VN', { style: 'currency', currency }).format(
    Number(amount),
  )
}
