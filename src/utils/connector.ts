/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-shadow */
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { sample } from 'lodash'
import { isSSR } from '@dwarvesf/react-utils'

export enum SupportedChainId {
  MAINNET = 56,
  TESTNET = 97,
}

const chainId = parseInt(process.env.SUPPORTED_CHAIN_ID as string, 10)

export const RPC_URLS = [process.env.RPC_URL]

export const BASE_BSC_SCAN_URLS = {
  [SupportedChainId.MAINNET]: 'https://bscscan.com', // BSC Mainnet
  [SupportedChainId.TESTNET]: 'https://testnet.bscscan.com', // BSC Testnet
}

export const connectorLocalStorageKey = 'lfw-connectorId'
export const walletLocalStorageKey = 'lfw-wallet'

export function clearConnectorStorage() {
  window.localStorage.removeItem(connectorLocalStorageKey)
  window.localStorage.removeItem(walletLocalStorageKey)
}

export function isConnectedWallet() {
  return !isSSR() && localStorage.getItem(walletLocalStorageKey)
}

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [chainId],
})

export const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: sample(RPC_URLS) as string },
  qrcode: true,
})

export const bscConnector = new BscConnector({
  supportedChainIds: [chainId],
})

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
  BscConnector = 'BscConnector',
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injectedConnector,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BscConnector]: bscConnector,
}

export function getScanLink(
  data: string | number,
  type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
  chainId: SupportedChainId = SupportedChainId.MAINNET,
): string {
  switch (type) {
    case 'transaction': {
      return `${BASE_BSC_SCAN_URLS[chainId]}/tx/${data}`
    }
    case 'token': {
      return `${BASE_BSC_SCAN_URLS[chainId]}/token/${data}`
    }
    case 'block': {
      return `${BASE_BSC_SCAN_URLS[chainId]}/block/${data}`
    }
    case 'countdown': {
      return `${BASE_BSC_SCAN_URLS[chainId]}/block/countdown/${data}`
    }
    default: {
      return `${BASE_BSC_SCAN_URLS[chainId]}/address/${data}`
    }
  }
}
