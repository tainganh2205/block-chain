import { useAsyncEffect } from '@dwarvesf/react-hooks'
import { useAuthContext } from 'context/auth'
import { useEffect } from 'react'
import { connectorLocalStorageKey, ConnectorNames } from 'utils/connector'
import { useConnectWallet } from './useConnectWallet'

const binanceChainListener = async () =>
  new Promise<void>((resolve) => {
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    })
  })

export function useEagerConnect() {
  const { connect, disconnect } = useConnectWallet()
  const { walletId, getSignature, challenge, storeSignature, token } =
    useAuthContext()

  useAsyncEffect(async () => {
    if (walletId && challenge && !token.signature) {
      try {
        const signature = await getSignature()
        if (signature) {
          storeSignature(signature)
        }
      } catch (error: any) {
        disconnect()
      }
    }
  }, [walletId, challenge, getSignature])

  useEffect(() => {
    const connectorId = window.localStorage.getItem(
      connectorLocalStorageKey,
    ) as ConnectorNames

    if (connectorId) {
      const isConnectorBinanceChain =
        connectorId === ConnectorNames.BscConnector
      const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')
      // Currently BSC extension doesn't always inject in time.
      // We must check to see if it exists, and if not, wait for it before proceeding.
      if (isConnectorBinanceChain && !isBinanceChainDefined) {
        binanceChainListener().then(() => connect(connectorId))

        return
      }

      setTimeout(() => {
        connect(connectorId)
      }, 100)
    }
  }, [connect])
}
