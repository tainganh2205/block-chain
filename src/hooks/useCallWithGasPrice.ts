import { useCallback } from 'react'
import ethers, { CallOverrides, ContractFunction, utils } from 'ethers'
import { SupportedChainId } from 'utils/connector'

export const GAS_PRICE_GWEI = {
  default: utils.parseUnits('5', 'gwei').toString(),
  testnet: utils.parseUnits('10', 'gwei').toString(),
}

/**
 * Perform a contract call with a gas price returned from useGasPrice
 * @param contractMethod contract method called
 * @param methodArgs An array of arguments to pass to the method
 * @param overrides An overrides object to pass to the method. gasPrice passed in here will take priority over the price returned by useGasPrice
 * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
 */
export function useCallWithGasPrice() {
  const chainId = process.env.REACT_APP_SUPPORTED_CHAIN_ID as string
  const gasPrice =
    parseInt(chainId, 10) === SupportedChainId.MAINNET
      ? GAS_PRICE_GWEI.default
      : GAS_PRICE_GWEI.testnet

  const callWithGasPrice = useCallback(
    async <T extends ContractFunction>(
      contractMethod: T,
      methodArgs: Parameters<T>,
      overrides?: CallOverrides,
    ): Promise<ethers.providers.TransactionResponse> => {
      try {
        const hasManualGasPriceOverride = overrides?.gasPrice
        const tx = await contractMethod(
          ...methodArgs,
          hasManualGasPriceOverride
            ? { ...overrides }
            : { ...overrides, gasPrice },
        )

        return tx
      } catch (error: any) {
        if (error && error?.data?.message) {
          throw new Error(error.data.message)
        }
        throw error
      }
    },
    [gasPrice],
  )

  return { callWithGasPrice }
}
