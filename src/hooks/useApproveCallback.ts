import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { Trade, TokenAmount, CurrencyAmount, ETHER } from '@artechain/sdk'
import { useCallback, useMemo, useEffect, useState } from 'react'
import { ROUTER_ADDRESS } from '../constants'
import { useTokenAllowance, useTokenAllowanceCustom } from '../data/Allowances'
import { Field } from '../state/swap/actions'
import { useTransactionAdder, useHasPendingApproval } from '../state/transactions/hooks'
import { computeSlippageAdjustedAmounts } from '../utils/prices'
import { calculateGasMargin } from '../utils'
import { useTokenContract, useTokenNFTContract } from './useContract'
import { useActiveWeb3React } from './index'

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// const useAllowance = async (addressAllow) => {
//   const { account } = useActiveWeb3React()
//   const [allowance, setAllowance] = useState(new BigNumber(0))
//   useEffect(() => {
//     if (account) {
//       const currentAllowance = useTokenAllowanceCustom('0xE1068958C357e84f2C065D8C9b9f15C70028B546', account ?? undefined, addressAllow)
//       setAllowance(currentAllowance)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [account, allowance])
//   return allowance
// }

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove?: CurrencyAmount,
  spender?: string
): [ApprovalState, () => Promise<void>] {
  const { account } = useActiveWeb3React()
  const token = amountToApprove instanceof TokenAmount ? amountToApprove.token : undefined
  const currentAllowance = useTokenAllowance(token, account ?? undefined, spender)
  const pendingApproval = useHasPendingApproval(token?.address, spender)

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
    if (amountToApprove.currency === ETHER) return ApprovalState.APPROVED
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amountToApprove, currentAllowance, pendingApproval, spender])

  const tokenContract = useTokenContract(token?.address)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!amountToApprove) {
      console.error('missing amount to approve')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    let useExact = false
    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens who restrict approval amounts
      useExact = true
      return tokenContract.estimateGas.approve(spender, amountToApprove.raw.toString())
    })

    // eslint-disable-next-line consistent-return
    return tokenContract
      .approve(spender, useExact ? amountToApprove.raw.toString() : MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas),
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Approve ${amountToApprove.currency.symbol}`,
          approval: { tokenAddress: token.address, spender },
        })
      })
      .catch((error: Error) => {
        console.error('Failed to approve token', error)
        throw error
      })
  }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction])

  return [approvalState, approve]
}

// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromTrade(trade?: Trade, allowedSlippage = 0) {
  const amountToApprove = useMemo(
    () => (trade ? computeSlippageAdjustedAmounts(trade, allowedSlippage)[Field.INPUT] : undefined),
    [trade, allowedSlippage]
  )
  return useApproveCallback(amountToApprove, ROUTER_ADDRESS)
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallbackCustom(
  token?: string,
  addressNeedApprove?: string,
  tokenId?: string
): [() => Promise<void>] {
  const tokenContract: any = useTokenContract(token, true)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    const estimatedGas = await tokenContract.estimateGas.approve(addressNeedApprove, MaxUint256).catch(() => {
      return tokenContract.estimateGas.approve(addressNeedApprove, MaxUint256)
    })
    return tokenContract
      .approve(addressNeedApprove, MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas),
      })
      .then((response: TransactionResponse) => {
        let reuslt: any = {
          summary: `Aprrove  successfully!`,
        }
        if (tokenId) {
          reuslt = {
            ...reuslt,
            attr1: `${tokenId}-approve`,
          }
        }
        addTransaction(response, reuslt)
        return response
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenContract, addressNeedApprove])

  return [approve]
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveNFTCallbackCustom(
  token?: string,
  addressNeedApprove?: string,
  tokenId?: string,
  attr1?: string
): [() => Promise<void>] {
  const tokenContract: any = useTokenNFTContract(token)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    const estimatedGas = await tokenContract.estimateGas.approve(addressNeedApprove, tokenId).catch(() => {
      return tokenContract.estimateGas.approve(addressNeedApprove, tokenId)
    })
    return tokenContract
      .approve(addressNeedApprove, tokenId, {
        gasLimit: calculateGasMargin(estimatedGas),
      })
      .then((response: TransactionResponse) => {
        let reuslt: any = {
          summary: `Aprrove  successfully!`,
        }
        if (tokenId) {
          reuslt = {
            ...reuslt,
            attr1: `${tokenId}-approve`,
          }
        }
        addTransaction(response, reuslt)
        return response
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenContract, tokenId, addressNeedApprove])

  return [approve]
}
