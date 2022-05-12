import BigNumberjs from 'bignumber.js'
import { BigNumber } from "@ethersproject/bignumber";

export function formatNumber(number: number) {
  return Intl.NumberFormat().format(number)
}

export function roundNumber2D(number: number) {
  return Math.round((number + Number.EPSILON) * 100) / 100
}

// https://gist.github.com/tobyjsullivan/96d37ca0216adee20fa95fe1c3eb56ac
// https://idlechampions.fandom.com/wiki/Large_number_abbreviations
export function abbreviateNumber(value: number) {
  let newValue = value
  const suffixes = ['', 'K', 'M', 'B', 't', 'q', 'Q', 's', 'S', 'o', 'n', 'd']
  let suffixNum = 0
  while (newValue >= 1000) {
    newValue /= 1000
    suffixNum++
  }

  let strValue = newValue.toPrecision(4)
  strValue += suffixes[suffixNum]

  return removeZeroFloatingPoint(strValue)
}

export function removeZeroFloatingPoint(value: string) {
  return value.replace(/\.0$/, '')
}

/**
 * Convert input number in FE side to compatible number in Blockchain
 *
 * @param value input number
 * @returns BigNumber
 */
export function inputNumberToBigNumber(value: number | string) {
  return new BigNumberjs(value).times(new BigNumberjs(10).pow(18))
}

export function bigNumberToFloat(value: number | string | BigNumber|undefined) {
  return new BigNumberjs((value || "").toString()).div(new BigNumberjs(10).pow(18)).toNumber()
}
