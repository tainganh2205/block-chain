import web3 from 'web3'

export const refund = async (idoTkenClaimSC, amountBusd, item) => {
  const amount = web3.utils.toWei(amountBusd.toString(), 'ether')
  const args = [amount, item.signBusd]
  const estimatedGas = await idoTkenClaimSC.estimateGas.refund(...args)
  return idoTkenClaimSC.refund(...args, {
    gasLimit: estimatedGas,
  })
}

export const isRefundedRC = async (idoTkenClaimSC, account) => {
  return idoTkenClaimSC.userRefund(account.toLowerCase())
}

export const checkIsClaimed = async (idoTkenClaimSC, account) => {
  return idoTkenClaimSC.isClaimed(account)
}

export const totalClaimed = async (idoTkenClaimSC, account) => {
  return idoTkenClaimSC.totalClaimed(account)
}

export const totalDailyClaimed = async (idoTkenClaimSC, account) => {
  return idoTkenClaimSC.userInfo(account)
}

export const totalRefunded = async (idoTkenClaimSC, account) => {
  return idoTkenClaimSC.totalRefunded(account)
}
