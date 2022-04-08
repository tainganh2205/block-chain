import React, { useState } from 'react'
import { BigNumber, constants } from 'ethers'
import { Button } from 'components/Button1'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { ModalTitle } from 'components/Modal1'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'

import { useDisclosure } from '@dwarvesf/react-hooks'
import { useAuthContext } from 'context/auth'
import { useStakeContext } from 'context/stake'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { usePoolContract } from 'hooks/useContract1'
import { useTransactionContext } from 'hooks/useTransactions'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { PoolStatus } from 'types/common'
import { handleTransactionError } from 'utils/error'

interface HarvestButtonProps {
  onSuccess: () => void
  reward: BigNumber
  poolStatus?: PoolStatus
  poolAddress: string
}

export const HarvestButton = ({
  onSuccess,
  reward,
  poolStatus,
  poolAddress,
}: HarvestButtonProps) => {
  // const { walletId } = useAuthContext()
  const { isStaking, isUnstaking, isHarvesting, setIsHarvesting } =
    useStakeContext()
  // harvest
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const [approved, setApproved] = useState(false)
  const { callWithGasPrice } = useCallWithGasPrice()
  const poolContract = usePoolContract(poolAddress)
  const { addTransaction } = useTransactionContext()

  const handleHarvest = async () => {
    setApproved(false)
    try {
      onConfirmOpen()
      const tx = await callWithGasPrice(poolContract!.withdraw, [
        constants.Zero,
      ])
      setIsHarvesting(true)
      setApproved(true)
      addTransaction(tx.hash, {
        summary: 'Harvest token',
      })
      const receipt = await tx.wait()
      if (receipt.status) {
        onConfirmClose()
        onSuccess()
        toast.success({
          title: 'Success',
          message: 'Harvest successfully',
        })
      } else {
        onConfirmClose()
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      handleTransactionError('Harvest error', error, [constants.Zero])
      onConfirmClose()
    } finally {
      setIsHarvesting(false)
    }
  }

  const handleHarvestClick = () => {
    if (isHarvesting) {
      onConfirmOpen()
    } else {
      handleHarvest()
    }
  }

  return (
    <>
      <Button
        className="min-w-[140px]"
        isLoading={isHarvesting}
        onClick={handleHarvestClick}
        disabled={
          isStaking || isUnstaking || reward.eq(0) || poolStatus !== 'STAKING'
        }
      >
        Claim
      </Button>
      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          approved ? null : (
            <ModalTitle className="text-white text-32 font-semibold">
              Harvest asset
            </ModalTitle>
          )
        }
        bottomRender={
          approved ? (
            <ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
              Harvesting your asset...
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
