import { useEffect, useReducer, useRef } from 'react'
import { noop } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import { ethers, providers } from 'ethers'

type LoadingState = 'idle' | 'loading' | 'success' | 'fail'

type Action =
  | { type: 'requires_approval' }
  | { type: 'approve_sending' }
  | { type: 'approve_receipt' }
  | { type: 'approve_error' }
  | { type: 'confirm_sending' }
  | { type: 'confirm_receipt' }
  | { type: 'confirm_error' }

interface State {
  approvalState: LoadingState
  confirmState: LoadingState
}

const initialState: State = {
  approvalState: 'idle',
  confirmState: 'idle',
}

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case 'requires_approval':
      return {
        ...state,
        approvalState: 'success',
      }
    case 'approve_sending':
      return {
        ...state,
        approvalState: 'loading',
      }
    case 'approve_receipt':
      return {
        ...state,
        approvalState: 'success',
      }
    case 'approve_error':
      return {
        ...state,
        approvalState: 'fail',
      }
    case 'confirm_sending':
      return {
        ...state,
        confirmState: 'loading',
      }
    case 'confirm_receipt':
      return {
        ...state,
        confirmState: 'success',
      }
    case 'confirm_error':
      return {
        ...state,
        confirmState: 'fail',
      }
    default:
      return state
  }
}

interface OnSuccessProps {
  state: State
  receipt: ethers.providers.TransactionReceipt
}

interface ApproveConfirmTransaction {
  onRequiresApproval?: () => Promise<boolean>
  onApprove: (...args: any[]) => Promise<ethers.providers.TransactionResponse>
  onApproving?: (tx: providers.TransactionResponse) => void
  onApproveFailed: (error: any) => void
  onApproveSuccess?: ({ state, receipt }: OnSuccessProps) => void
  onConfirm: (...args: any[]) => Promise<ethers.providers.TransactionResponse>
  onConfirming?: (tx: providers.TransactionResponse) => void
  onConfirmFailed: (error?: any) => void
  onSuccess: ({ state, receipt }: OnSuccessProps) => void
}

export const useApproveConfirmTransaction = ({
  onRequiresApproval,
  onApprove,
  onApproving = noop,
  onApproveSuccess = noop,
  onApproveFailed,
  onConfirm,
  onConfirming = noop,
  onConfirmFailed,
  onSuccess = noop,
}: ApproveConfirmTransaction) => {
  const { account } = useWeb3React()
  const [state, dispatch] = useReducer(reducer, initialState)
  const handlePreApprove = useRef(onRequiresApproval)

  // Check if approval is necessary, re-check if account changes
  useEffect(() => {
    if (account && handlePreApprove.current) {
      handlePreApprove.current().then((result) => {
        if (result) {
          dispatch({ type: 'requires_approval' })
        }
      })
    }
  }, [account, handlePreApprove, dispatch])

  return {
    isApproving: state.approvalState === 'loading',
    isApproved: state.approvalState === 'success',
    isConfirming: state.confirmState === 'loading',
    isConfirmed: state.confirmState === 'success',
    handleApprove: async (...args: any[]) => {
      try {
        const tx = await onApprove(args)
        onApproving(tx)
        dispatch({ type: 'approve_sending' })
        const receipt = await tx.wait()
        if (receipt.status) {
          dispatch({ type: 'approve_receipt' })
          onApproveSuccess({ state, receipt })
        }
      } catch (error) {
        dispatch({ type: 'approve_error' })
        onApproveFailed(error)
      }
    },
    handleConfirm: async (...args: any[]) => {
      dispatch({ type: 'confirm_sending' })
      try {
        const tx = await onConfirm(args)
        onConfirming(tx)
        const receipt = await tx.wait()
        if (receipt.status) {
          dispatch({ type: 'confirm_receipt' })
          onSuccess({ state, receipt })
        } else {
          dispatch({ type: 'confirm_error' })
          onConfirmFailed()
        }
      } catch (error) {
        console.warn(error)
        dispatch({ type: 'confirm_error' })
        onConfirmFailed(error)
      }
    },
  }
}
