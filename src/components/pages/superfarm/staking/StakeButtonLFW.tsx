import React, { useState } from 'react'
import { BigNumber } from 'ethers'
import { Button } from 'components/Button'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useSuperFarmContract } from 'hooks/useContract'
import { useTransactionContext } from 'hooks/useTransactions'
import { wait } from 'utils/wait'
import { inputNumberToBigNumber } from 'utils/number'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { handleTransactionError } from 'utils/error'
import { useAuthContext } from 'context/auth'
import cx from 'classnames'
import { useIsMobile } from 'hooks/useIsMobile'
import { BaseModal } from './BaseModal'

interface StakeButtonProps {
  onSuccess: () => void
  isDisabled: boolean
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenAddress?: string
  tokenSymbol?: string
  tokenUrl?: string
}

export default function StakeButtonLFW({
  onSuccess,
  isDisabled,
  stakedBalance,
  tokenBalance,
  tokenAddress,
  tokenSymbol,
  tokenUrl,
}: StakeButtonProps) {
  const isMobile = useIsMobile()

  const [spend, setSpend] = useState(1000)
  const [isStaking, setIsStaking] = useState(false)
  const { isOpen, onClose, onOpen } = useDisclosure()

  // stake
  const { callWithGasPrice } = useCallWithGasPrice()
  const poolContract = useSuperFarmContract()
  const { addTransaction } = useTransactionContext()
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const [approved, setApproved] = useState(false)
  const { walletId } = useAuthContext()

  const handleStake = async () => {
    setApproved(false)
    try {
      onClose()
      await wait(200)
      onConfirmOpen()

      const tx = await callWithGasPrice(poolContract!.depositLFW, [
        inputNumberToBigNumber(spend).toString(),
      ])
      setIsStaking(true)
      setApproved(true)
      addTransaction(tx.hash, {
        summary: 'Stake token',
      })
      const receipt = await tx.wait()
      if (receipt.status && walletId) {
        onConfirmClose()
        onSuccess()
        toast.success({
          title: 'Success',
          message: 'Stake successfully',
        })
      } else {
        onConfirmClose()
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      handleTransactionError('Stake error', error, [
        inputNumberToBigNumber(spend).toString(),
      ])
      onConfirmClose()
    } finally {
      setIsStaking(false)
      // setSpend(0)
    }
  }

  const handleStakeClick = () => {
    if (isStaking) {
      onConfirmOpen()
    } else {
      onOpen()
    }
  }

  return (
    <>
      <Button
        className={cx('w-full mt-2 mb-2 mx-auto', {
          'w-[100px]': !isMobile,
          'w-[80px]': isMobile,
        })}
        isLoading={isStaking}
        onClick={handleStakeClick}
        disabled={isDisabled}
      >
        STAKE
      </Button>
      <BaseModal
        title="Stake"
        label="Stake"
        tokenAddress={tokenAddress}
        tokenSymbol={tokenSymbol}
        balance={tokenBalance}
        rightButtonText="Stake"
        staked={stakedBalance}
        url={tokenUrl}
        // rightButtonDisabled={isInvalidAmount}
        isOpen={isOpen}
        onClose={() => {
          onClose()
        }}
        onSubmit={handleStake}
        spend={spend}
        setSpend={setSpend}
        hasBottom
      />
      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          approved ? null : (
            <ModalTitle className="text-white text-32 font-semibold">
              Stake asset
            </ModalTitle>
          )
        }
        bottomRender={
          approved ? (
            <ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
              Staking your asset...
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
