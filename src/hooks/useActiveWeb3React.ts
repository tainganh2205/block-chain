import { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
export const useActiveWeb3React =
  (): Web3ReactContextInterface<Web3Provider> => {
    const { library, chainId, ...web3React } = useWeb3React()
    const refEth = useRef(library)
    const [provider, setprovider] = useState(library)

    useEffect(() => {
      if (library !== refEth.current) {
        setprovider(library)
        refEth.current = library
      }
    }, [library])

    return {
      library: provider,
      chainId: chainId ?? parseInt(process.env.REACT_APP_CHAIN_ID as any, 10),
      ...web3React,
    }
  }
