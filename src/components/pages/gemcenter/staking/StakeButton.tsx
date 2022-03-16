import React, { useState, useMemo } from 'react'
import { BigNumber, utils } from 'ethers'
import { Button } from 'components/Button1'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { ModalTitle } from 'components/Modal1'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'

import { useDisclosure } from '@dwarvesf/react-hooks'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { usePoolContract } from 'hooks/useContract1'
import { useTransactionContext } from 'hooks/useTransactions'
import { useStakeContext } from 'context/stake'
import { wait } from 'utils/wait'
import { inputNumberToBigNumber } from 'utils/number'
import { formatBigNumber } from 'utils/formatBalance'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { PoolStatus } from 'types/common'
import { handleTransactionError } from 'utils/error'
import { BaseModal } from './BaseModal'

interface StakeButtonProps {
  onSuccess: () => void
  stakedBalance: BigNumber
  tokenBalance: BigNumber
  poolStatus?: PoolStatus
  poolAddress: string
  tokenAddress: string
  tokenSymbol: string
  tokenUrl: string
}

export const StakeButton = ({
  onSuccess,
  stakedBalance,
  tokenBalance,
  poolStatus = 'UNDETERMINED',
  poolAddress,
  tokenAddress,
  tokenSymbol,
  tokenUrl,
}: StakeButtonProps) => {
  const [spend, setSpend] = useState(0)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { isStaking, isUnstaking, isWithdrawing, isHarvesting, setIsStaking } =
    useStakeContext()
  // stake
  const { callWithGasPrice } = useCallWithGasPrice()
  const poolContract = usePoolContract("0xAC6F29565AE098aBEeda221C6B09ae957656E450")
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
        .lte(tokenBalance),
    [spend, tokenBalance],
  )

  const isInvalidAmount = useMemo(
    () => !isSufficientAmount || spend <= 0 || Number.isNaN(spend),
    [isSufficientAmount, spend],
  )

  const handleMaxClick = () => {
    setSpend(parseFloat(formatBigNumber(tokenBalance, 3)))
  }

  const handleStake = async () => {
    setApproved(false)
    try {
      // onClose()
      // await wait(200)
      // onConfirmOpen()
      console.log('zooo',inputNumberToBigNumber(spend).toString());
      const tx = await callWithGasPrice(poolContract!.deposit, [
        inputNumberToBigNumber(spend).toString(),
      ])
      console.log('tx',tx);
      setIsStaking(true)
      setApproved(true)
      addTransaction(tx.hash, {
        summary: 'Stake token',
      })
      const receipt = await tx.wait()
      if (receipt.status) {
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
      console.log('error',error);
      handleTransactionError('Stake error', error, [
        inputNumberToBigNumber(spend).toString(),
      ])
      onConfirmClose()
    } finally {
      setIsStaking(false)
      setSpend(0)
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
      {!stakedBalance.gt(0) ? (
        <Button
          className="flex-1 mr-2"
          isLoading={isStaking}
          onClick={handleStakeClick}
          // disabled={
          //   isUnstaking ||
          //   isHarvesting ||
          //   isWithdrawing ||
          //   poolStatus !== 'STAKING'
          // }
        >
          Stake
        </Button>
      ) : (
        <Button
          className="w-full max-w-[140px]"
          isLoading={isStaking}
          onClick={handleStakeClick}
          // disabled={
          //   isUnstaking ||
          //   isHarvesting ||
          //   isWithdrawing ||
          //   poolStatus !== 'STAKING'
          // }
        >
          Stake
        </Button>
      )}
      <BaseModal
        title="Stake"
        label="Stake"
        tokenAddress={tokenAddress}
        tokenSymbol={tokenSymbol}
        balance={tokenBalance}
        rightButtonText={isSufficientAmount ? 'Stake' : 'Insufficient funds'}
        staked={stakedBalance}
        url={tokenUrl}
        rightButtonDisabled={isInvalidAmount}
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setSpend(0)
        }}
        onSubmit={handleStake}
        spend={spend}
        setSpend={setSpend}
        onMaxClick={handleMaxClick}
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
