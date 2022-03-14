import React, { useState } from 'react'
import { BigNumber } from 'ethers'
import { Button } from 'components/Button'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useMiningContract } from 'hooks/useContract'
import { useTransactionContext } from 'hooks/useTransactions'
import { wait } from 'utils/wait'
import { client } from 'libs/apis'
import { inputNumberToBigNumber } from 'utils/number'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { handleTransactionError } from 'utils/error'
import { CHEST_TOKEN_CONTRACT, CHEST_TOKEN_ID } from 'constant/contracts'
import { useAuthContext } from 'context/auth'
import { useIsMobile } from 'hooks/useIsMobile'
import cx from 'classnames'
import { ModalSelectChest } from './ModalSelectChest'
import { useLegendMiningContext } from '../../../../context/legendMining'

interface StakeButtonProps {
  onSuccess: () => void
  isDisabled: boolean
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenAddress?: string
  tokenSymbol?: string
  tokenUrl?: string
  chestBalance?: number
}

export default function StakeButtonChest({
  onSuccess,
  isDisabled,
  stakedBalance,
  tokenBalance,
  tokenAddress,
  tokenSymbol,
  tokenUrl,
  chestBalance = 0,
}: StakeButtonProps) {
  const isMobile = useIsMobile()
  const { numberChest, setNumberChest } = useLegendMiningContext()
  const [isStaking, setIsStaking] = useState(false)
  const { isOpen, onClose, onOpen } = useDisclosure()

  // stake
  const { callWithGasPrice } = useCallWithGasPrice()
  const poolContract = useMiningContract()
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

      const tx = await callWithGasPrice(poolContract!.depositChest, [
        CHEST_TOKEN_CONTRACT,
        [CHEST_TOKEN_ID],
        [numberChest],
      ])
      setIsStaking(true)
      setApproved(true)
      addTransaction(tx.hash, {
        summary: 'Stake token',
      })
      const receipt = await tx.wait()
      if (receipt.status && walletId) {
        if (chestBalance - numberChest > 0) {
          await client.postSuperFarmUpdate({
            chestBalance: chestBalance - numberChest,
          })
        }
        setNumberChest(5)
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
        inputNumberToBigNumber(numberChest).toString(),
      ])
      onConfirmClose()
    } finally {
      setIsStaking(false)
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
          'w-[170px]': !isMobile,
          'w-[80px]': isMobile,
        })}
        isLoading={isStaking}
        onClick={handleStakeClick}
        disabled={isDisabled}
      >
        ADD
      </Button>
      <ModalSelectChest
        title="Add"
        label="Amount"
        tokenAddress={tokenAddress}
        tokenSymbol={tokenSymbol}
        balance={tokenBalance}
        rightButtonText="Add"
        staked={stakedBalance}
        url={tokenUrl}
        isOpen={isOpen}
        onClose={() => {
          onClose()
        }}
        onSubmit={handleStake}
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
