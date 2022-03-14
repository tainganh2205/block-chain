import React, { useState, useMemo } from 'react'
import { BigNumber, utils } from 'ethers'
import { Button } from 'components/Button'
import { IconUnstake } from 'components/icons/components/IconUnstake'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'

import { useDisclosure } from '@dwarvesf/react-hooks'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { usePoolContract } from 'hooks/useContract'
import { useTransactionContext } from 'hooks/useTransactions'
import { useStakeContext } from 'context/stake'
import { wait } from 'utils/wait'
import { inputNumberToBigNumber } from 'utils/number'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { PoolStatus } from 'types/common'
import { handleTransactionError } from 'utils/error'
import { BaseModal } from './BaseModal'

interface UnstakeButtonProps {
  onSuccess: () => void
  stakedBalance: BigNumber
  tokenBalance: BigNumber
  poolStatus: PoolStatus
  poolAddress: string
  tokenAddress: string
  tokenSymbol: string
  tokenUrl: string
}

export const UnstakeButton = ({
  onSuccess,
  stakedBalance,
  tokenBalance,
  poolStatus,
  poolAddress,
  tokenAddress,
  tokenSymbol,
  tokenUrl,
}: UnstakeButtonProps) => {
  const [spend, setSpend] = useState(0)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    isStaking,
    isHarvesting,
    isUnstaking,
    isWithdrawing,
    setIsUnstaking,
  } = useStakeContext()
  //unstake
  const { callWithGasPrice } = useCallWithGasPrice()
  const poolContract = usePoolContract(poolAddress)
  const { addTransaction } = useTransactionContext()
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const [approved, setApproved] = useState(false)

  const isSufficientAmount = useMemo(
    () =>
      utils
        .parseUnits(String(Number.isNaN(spend) ? 0 : spend))
        .lte(stakedBalance),
    [spend, stakedBalance],
  )

  const isInvalidAmount = useMemo(
    () => !isSufficientAmount || spend <= 0 || Number.isNaN(spend),
    [isSufficientAmount, spend],
  )

  const handleUnstake = async () => {
    setApproved(false)
    try {
      onClose()
      await wait(200)
      onConfirmOpen()
      const tx = await callWithGasPrice(poolContract!.withdraw, [
        inputNumberToBigNumber(spend).toString(),
      ])
      setIsUnstaking(true)
      setApproved(true)
      addTransaction(tx.hash, {
        summary: 'Unstake Token',
      })
      const receipt = await tx.wait()
      if (receipt.status) {
        onConfirmClose()
        onSuccess()
        toast.success({
          title: 'Success',
          message: 'Unstake successfully',
        })
      } else {
        onConfirmClose()
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      handleTransactionError('Unstake error', error, [
        inputNumberToBigNumber(spend).toString(),
      ])
      onConfirmClose()
    } finally {
      setIsUnstaking(false)
      setSpend(0)
    }
  }

  const handleUnstakeClick = () => {
    if (isUnstaking) {
      onConfirmOpen()
    } else {
      onOpen()
    }
  }

  return (
    <>
      <Button
        className="w-10 h-10 border border-gray-100 disabled:border-gray-500 px-0"
        appearance="link"
        onClick={handleUnstakeClick}
        isLoading={isUnstaking}
        aria-label="Unstake"
        disabled={
          isStaking || isHarvesting || isWithdrawing || poolStatus !== 'STAKING'
        }
      >
        {!isUnstaking && <IconUnstake aria-hidden />}
      </Button>
      <BaseModal
        title="Unstake"
        label="Unstake"
        tokenAddress={tokenAddress}
        tokenSymbol={tokenSymbol}
        balance={tokenBalance}
        staked={stakedBalance}
        url={tokenUrl}
        rightButtonText={isSufficientAmount ? 'Unstake' : 'Insufficient funds'}
        rightButtonDisabled={isInvalidAmount}
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setSpend(0)
        }}
        spend={spend}
        setSpend={setSpend}
        onSubmit={handleUnstake}
        hasBottom={false}
      />
      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          approved ? null : (
            <ModalTitle className="text-white text-32 font-semibold">
              Unstake asset
            </ModalTitle>
          )
        }
        bottomRender={
          approved ? (
            <ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
              Unstaking your asset...
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
