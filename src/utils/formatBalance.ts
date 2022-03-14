import { BigNumber, utils } from 'ethers'

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  const balanceStr = utils.formatUnits(amount, decimals)
  return parseFloat(balanceStr)
}

export const getFormatedAmount = (amount: BigNumber, decimals = 18) => {
  return new Intl.NumberFormat().format(getBalanceAmount(amount, decimals))
}

export const formatBigNumber = (
  number: BigNumber,
  displayDecimals = 18,
  decimals = 18,
) => {
  const remainder = number.mod(
    BigNumber.from(10).pow(decimals - displayDecimals),
  )
  return utils.formatUnits(number.sub(remainder), decimals)
}
