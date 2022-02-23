import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { useTokenContract } from './useContract'
import useRefresh from './useRefresh'

const useAllowance = (addressAllow) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWeb3React()
  const bscsContract: any = useTokenContract('0xE1068958C357e84f2C065D8C9b9f15C70028B546')
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchAllowance = async () => {
      const res = await bscsContract.allowance(account, addressAllow)
      setAllowance(new BigNumber(res))
    }

    if (account) {
      fetchAllowance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, bscsContract, fastRefresh])

  return allowance
}

export default useAllowance