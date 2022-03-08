import { Token, TokenAmount } from '@lfwfinance/sdk'
import { useMemo } from 'react'
import { useActiveWeb3React } from '../hooks'
import { useTokenContract, useTokenNFTContract } from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import { TOKEN_BSCS_TESTNET } from '../constants'

export function useTokenAllowance(token?: Token, owner?: string, spender?: string): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result

  return useMemo(() => (token && allowance ? new TokenAmount(token, allowance.toString()) : undefined), [
    token,
    allowance,
  ])
}

export function useTokenAllowanceCustom(address?: string, owner?: string, spender?: string): any {
  const contract = useTokenContract(address, false)
  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result
  return allowance
}
export function useTokenAllowanceNFTCustom(address?: string, owner?: string, tokenId?: any): any {
  const contract = useTokenNFTContract(address, false)
  const inputs = useMemo(() => [tokenId], [tokenId])
  const allowance = useSingleCallResult(contract, 'getApproved', inputs).result
  return allowance
}

export function useBalanceBSCS(): any {
  const { account }: any = useActiveWeb3React()
  const contract = useTokenContract(TOKEN_BSCS_TESTNET, false)

  const inputs = useMemo(() => [account], [account])
  const amount = useSingleCallResult(contract, 'balanceOf', [account]).result
  return amount
}

export default useTokenAllowance
