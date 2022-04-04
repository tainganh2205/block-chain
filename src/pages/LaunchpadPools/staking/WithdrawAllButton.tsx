import React, { useState } from 'react'
import { BigNumber } from 'ethers'
import { Button } from 'components/Button1'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { ModalTitle } from 'components/Modal1'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'

import { useDisclosure } from '@dwarvesf/react-hooks'
import { useStakeContext } from 'context/stake'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { usePoolContract } from 'hooks/useContract1'
import { useTransactionContext } from 'hooks/useTransactions'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { handleTransactionError } from 'utils/error'

interface WithdrawAllButtonProps {
  onSuccess: () => void
  stakedBalance: BigNumber
  poolAddress: string
  reward: BigNumber
  currentBlock: number
  unstakingBlock: number
}

export const WithdrawAllButton = ({
  stakedBalance,
  onSuccess,
  poolAddress,
  reward,
  currentBlock,
  unstakingBlock,
}: WithdrawAllButtonProps) => {
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const [approved, setApproved] = useState(false)
  const { callWithGasPrice } = useCallWithGasPrice()
  const poolContract = usePoolContract(poolAddress)
  const { addTransaction } = useTransactionContext()
  const {
    isStaking,
    isUnstaking,
    isHarvesting,
    isWithdrawing,
    setIsWithdrawing,
  } = useStakeContext()

  const handleWithdrawAll = async () => {
    setApproved(false)
    try {
      onConfirmOpen()

      let tx
      if (unstakingBlock > currentBlock) {
        tx = await callWithGasPrice(poolContract!.emergencyWithdraw, [])
      } else {
        tx = await callWithGasPrice(poolContract!.withdraw, [
          stakedBalance.toString() ?? '0',
        ])
      }
      setIsWithdrawing(true)
      setApproved(true)
      addTransaction(tx.hash, {
        summary: 'Withdraw token',
      })
      const receipt = await tx.wait()
      if (receipt.status) {
        onConfirmClose()
        onSuccess()
        toast.success({
          title: 'Success',
          message: 'Withdraw successfully',
        })
      } else {
        onConfirmClose()
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      handleTransactionError('Withdraw error', error)
      onConfirmClose()
    } finally {
      setIsWithdrawing(false)
    }
  }

  const handleWithdrawAllClick = () => {
    if (isWithdrawing) {
      onConfirmOpen()
    } else {
      handleWithdrawAll()
    }
  }

  return (
    <>
      <Button
        className="w-full max-w-[124px]"
        isLoading={isWithdrawing}
        onClick={handleWithdrawAllClick}
        disabled={
          isStaking ||
          isUnstaking ||
          isHarvesting ||
          (reward.eq(0) && stakedBalance.eq(0))
        }
      >
        Withdraw all
      </Button>
      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          approved ? null : (
            <ModalTitle className="text-white text-32 font-semibold">
              Withdraw asset
            </ModalTitle>
          )
        }
        bottomRender={
          approved ? (
            <ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
              Withdrawing your asset...
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
