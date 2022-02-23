import { useTokenNFTContract, useNftMarketContract } from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import { CONTRACT_NFT, CONTRACT_BID } from '../constants'

export function GetMaxTokenId(): any {
  const contract = useTokenNFTContract(CONTRACT_NFT, false)
  const result = useSingleCallResult(contract, 'nextTokenId')?.result?.[0]
  return result
}

export function useOwnerTokenFT(tokenId): any {
  const contract = useTokenNFTContract(CONTRACT_NFT, false)
  const result = useSingleCallResult(contract, 'ownerOf', [tokenId])?.result?.[0]
  return result
}
export function AllowceTokenNFT(tokenId): any {
  const contract = useTokenNFTContract(CONTRACT_NFT, false)
  const result = useSingleCallResult(contract, 'getApproved', [tokenId])?.result?.[0]
  return result
}
export function GetAsksByUser(account): any {
  const contract = useNftMarketContract()
  const result = useSingleCallResult(contract, 'getAsksByUser', [account])?.result?.[0]
  return result
}

export default useOwnerTokenFT
