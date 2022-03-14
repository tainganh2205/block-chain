import React, { useState } from 'react'
import { constants } from 'ethers'
import { Button } from 'components/Button'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'

import { useDisclosure } from '@dwarvesf/react-hooks'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useSuperFarmContract } from 'hooks/useContract'
import { useTransactionContext } from 'hooks/useTransactions'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { handleTransactionError } from 'utils/error'

interface ClaimLfwButtonProps {
  onSuccess: () => void
  isDisabled: boolean
}

export const ClaimLfwButton = ({
  onSuccess,
  isDisabled,
}: ClaimLfwButtonProps) => {
  // lfw
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const [approved, setApproved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { callWithGasPrice } = useCallWithGasPrice()
  const superFarmContract = useSuperFarmContract()
  const { addTransaction } = useTransactionContext()

  const handleHarvest = async () => {
    setApproved(false)
    try {
      onConfirmOpen()
      const tx = await callWithGasPrice(superFarmContract!.claimLFW, [])
      setIsLoading(true)
      setApproved(true)
      addTransaction(tx.hash, {
        summary: 'Claim LFW super farm nft token',
      })
      const receipt = await tx.wait()
      if (receipt.status) {
        onConfirmClose()
        onSuccess()
        toast.success({
          title: 'Success',
          message: 'Claim LFW successfully',
        })
      } else {
        onConfirmClose()
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      handleTransactionError('Claim LFW error', error, [constants.Zero])
      onConfirmClose()
    } finally {
      setIsLoading(false)
    }
  }

  const handleHarvestClick = () => {
    if (isLoading) {
      onConfirmOpen()
    } else {
      handleHarvest()
    }
  }

  return (
    <>
      <Button
        className="text-center mx-auto"
        isLoading={isLoading}
        onClick={handleHarvestClick}
        disabled={isLoading || isDisabled}
      >
        Claim
      </Button>
      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          approved ? null : (
            <ModalTitle className="text-white text-32 font-semibold">
              Claim LFW asset
            </ModalTitle>
          )
        }
        bottomRender={
          approved ? (
            <ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
              Claim LFW your asset...
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
