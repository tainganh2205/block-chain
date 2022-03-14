import { ethers } from 'ethers'
import { getContract } from 'utils/contract'
import muticallAbi from 'config/abi/muticall.json'
import { MULTICALL_CONTRACT } from 'constant/contracts'

export type MultiCallResponse<T> = T | null

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

interface MulticallOptions {
  requireSuccess?: boolean
}

export const multicall = async <T = any>(
  abi: any[],
  calls: Call[],
): Promise<T> => {
  try {
    const multi = getContract(muticallAbi, MULTICALL_CONTRACT)
    const itf = new ethers.utils.Interface(abi)

    const calldata = calls.map((call) => [
      call.address.toLowerCase(),
      itf.encodeFunctionData(call.name, call.params),
    ])
    const { returnData } = await multi.aggregate(calldata)
    // @ts-ignore
    const res = returnData.map((call, i) =>
      itf.decodeFunctionResult(calls[i].name, call),
    )
    return res
  } catch (error: any) {
    throw new Error(error)
  }
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
export const multicallv2 = async <T = any>(
  abi: any[],
  calls: Call[],
  options: MulticallOptions = { requireSuccess: true },
): Promise<MultiCallResponse<T>> => {
  const { requireSuccess } = options
  const multi = getContract(muticallAbi, MULTICALL_CONTRACT)
  const itf = new ethers.utils.Interface(abi)

  const calldata = calls.map((call) => [
    call.address.toLowerCase(),
    itf.encodeFunctionData(call.name, call.params),
  ])
  const returnData = await multi.tryAggregate(requireSuccess, calldata)
  // @ts-ignore
  const res = returnData.map((call, i) => {
    const [result, data] = call
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  })

  return res
}

export default multicall
