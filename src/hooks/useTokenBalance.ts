import { useEffect, useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Zero } from '@ethersproject/constants'
import { BigNumber } from 'ethers'
import { FetchStatus } from 'constant/commons'
import { LfwToken } from 'types/contracts'
import {
  useLFWTokenContract,
} from './useContract1'

export const useTokenBalance = () => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
  const [balance, setBalance] = useState(Zero)

  const { account } = useWeb3React()
  const contract = useLFWTokenContract()

  const fetchBalance = useCallback(
    async (account: string, contract: LfwToken) => {
      try {
        const walletBalance = await contract.balanceOf(account)
        setBalance(BigNumber.from(walletBalance.toString()))
        setFetchStatus(FetchStatus.SUCCESS)
      } catch (e) {
        console.error(e)
        setFetchStatus(FetchStatus.FAILED)
      }
    },
    [setBalance, setFetchStatus],
  )

  const refetch = useCallback(() => {
    if (account && contract) {
      fetchBalance(account, contract)
    }
  }, [account, contract, fetchBalance])

  useEffect(() => {
    if (account && contract) {
      fetchBalance(account, contract)
    }
  }, [account, contract, fetchBalance])

  return { balance, fetchStatus, refetch }
}

