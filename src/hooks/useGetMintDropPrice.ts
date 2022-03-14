import { useEffect, useState } from 'react'
import { Zero } from '@ethersproject/constants'
import { BigNumber, Contract } from 'ethers'
import { FetchStatus } from 'constant/commons'
import { useLFWNFTContract } from './useContract'

export const useGetMintDropPrice = () => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
  const [price, setPrice] = useState(Zero)

  const lfwNftContract = useLFWNFTContract()

  useEffect(() => {
    const fetchBalance = async (contract: Contract) => {
      try {
        const dropPrice = await contract?.dropPrice()
        setPrice(BigNumber.from(dropPrice.toString()))
        setFetchStatus(FetchStatus.SUCCESS)
      } catch (e) {
        console.error(e)
        setFetchStatus(FetchStatus.FAILED)
      }
    }

    if (lfwNftContract) {
      fetchBalance(lfwNftContract)
    }
  }, [lfwNftContract, setPrice, setFetchStatus])

  return { price, fetchStatus }
}
