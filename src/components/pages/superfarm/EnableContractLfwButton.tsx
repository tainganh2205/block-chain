import { useDisclosure } from '@dwarvesf/react-hooks'
import { constants } from 'ethers'
import { noop } from '@dwarvesf/react-utils'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { Button } from 'components/Button'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { useState } from 'react'
import { wait } from 'utils/wait'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { toast } from 'components/Toast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useLFWTokenContract } from 'hooks/useContract'
import { useTransactionContext } from 'hooks/useTransactions'
import { handleTransactionError } from 'utils/error'
import cx from 'classnames'
import { SUPERFARM_POOL_ADDRESS } from '../../../constant/contracts'
import { useIsMobile } from '../../../hooks/useIsMobile'

interface EnableContractButtonProps {
  onSuccess?: (onSuccess: any) => void
  isDisabled: boolean
  poolAddress: string
  buttonTitle: string
}

export default function EnableContractLfwButton({
  onSuccess = noop,
  isDisabled,
  poolAddress,
  buttonTitle = 'Enable Contract',
}: EnableContractButtonProps) {
  const isMobile = useIsMobile()
  const [submitting, setSubmitting] = useState(false)
  const [approved, setApproved] = useState(false)
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const { callWithGasPrice } = useCallWithGasPrice()
  const lfwTokenContract = useLFWTokenContract()
  const { addTransaction } = useTransactionContext()

  const handleEnableContract = async () => {
    if (submitting) {
      return
    }
    setApproved(false)
    try {
      onConfirmOpen()
      const tx = await callWithGasPrice(lfwTokenContract!.approve, [
        SUPERFARM_POOL_ADDRESS,
        constants.MaxUint256,
      ])
      setApproved(true)
      setSubmitting(true)
      addTransaction(tx.hash, {
        summary: 'Approve staking',
        approval: {
          spender: poolAddress,
        },
      })
      const receipt = await tx.wait()
      if (receipt.status) {
        onConfirmClose()
        await wait(200)
        onSuccess(true)
        toast.success({
          title: 'Success',
          message: 'Enable successfully',
        })
      } else {
        onConfirmClose()
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      handleTransactionError('Approve Staking error', error, [
        poolAddress,
        constants.MaxUint256,
      ])
      onConfirmClose()
    } finally {
      setSubmitting(false)
    }
  }

  const handleEnableContractClick = () => {
    if (submitting) {
      onConfirmOpen()
    } else {
      handleEnableContract()
    }
  }

  return (
    <>
      <Button
        className={cx('w-full mt-2 mb-2 mx-auto', {
          'w-[100px]': !isMobile,
          'w-[80px]': isMobile,
        })}
        onClick={handleEnableContractClick}
        isLoading={submitting}
        disabled={isDisabled}
      >
        {buttonTitle}
      </Button>
      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          approved ? null : (
            <div className="px-8 space-y-4">
              <ModalTitle className="text-white text-32 font-semibold">
                {buttonTitle}
              </ModalTitle>
              <Text>You have to enable contract before staking</Text>
            </div>
          )
        }
        bottomRender={
          approved ? (
            <ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
              Enabling Contract
            </ModalTitle>
          ) : (
            <div className="space-y-1.5">
              <Text color="white" className="text-2xl">
                Waiting for Blockchain Confirmation
              </Text>
              <Text size="sm">
                Confirm this transaction in your connected wallet.
              </Text>
            </div>
          )
        }
      />
    </>
  )
}
