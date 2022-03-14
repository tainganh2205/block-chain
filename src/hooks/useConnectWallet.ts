import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import {
  ConnectorNames,
  connectorsByName,
  connectorLocalStorageKey,
} from 'utils/connector'
import { setupNetwork } from 'utils/wallet'
import { toast } from 'components/Toast'

export const useConnectWallet = () => {
  const { activate, deactivate, setError } = useWeb3React()

  const connect = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID]
      if (connector) {
        window.localStorage.setItem(connectorLocalStorageKey, connectorID)
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork(connectorID)
            if (hasSetup) {
              activate(connector)
            } else {
              setError(error)
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey)
            if (
              error instanceof NoEthereumProviderError ||
              error instanceof NoBscProviderError
            ) {
              toast.error({
                title:
                  'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.',
              })
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              toast.error({
                title:
                  'Please authorize this website to access your Ethereum account.',
              })
            } else {
              toast.error({ title: error.message })
            }
          }
        })
      } else {
        toast.error({ title: 'The connector config is wrong' })
      }
    },
    [activate, setError],
  )

  const disconnect = useCallback(() => {
    deactivate()
    localStorage.removeItem('lfw-signature')
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.WalletConnect.close()
      connectorsByName.WalletConnect.walletConnectProvider = null
    }
  }, [deactivate])

  return { connect, disconnect }
}
