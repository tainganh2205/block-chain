import web3 from 'web3'

export const claimTokens = async (idoTkenClaimSC, item) => {
  const amount = web3.utils.toWei(item.claimToken.toString(), 'ether')
  let args = [amount, item.claimRound, item.signToken]
  if(item.claimRound === 100) {
    args= []
  }
  const estimatedGas = await idoTkenClaimSC.estimateGas.claimTokens(...args)
  return idoTkenClaimSC.claimTokens(...args, {
    gasLimit: estimatedGas,
  })
}

export const isClaimed = async (idoTkenClaimSC, account, item) => {
  if(item.claimRound === 100) {
    const result = await idoTkenClaimSC.claimAble(account.toLowerCase())
    return  (result.toString() / 1e18) > 0
  }
  return idoTkenClaimSC.userClaim(...[account.toLowerCase(), item.claimRound])
}

export const isRefundedRC = async (idoTkenClaimSC, account) => {
  return idoTkenClaimSC.userRefund(account.toLowerCase())
}

export const totalClaimAble = async (idoTkenClaimSC, account) => {
  const result = await idoTkenClaimSC.claimAble(account.toLowerCase())
  return result / 1e18
}