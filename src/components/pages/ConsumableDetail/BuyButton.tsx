import React, { useState } from 'react'
import { BigNumber } from 'ethers'
import BigNumberjs from 'bignumber.js'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'
import { useAuthContext } from 'context/auth'
import { ModelConsumableItemData } from 'types/schema'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { CONSUMABLE_STATUS } from 'constant/consumable'
import { wait } from 'utils/wait'
import Link from 'next/link'
import { ROUTES } from 'constant/routes'
import { ItemSuccessModal } from 'components/ItemSuccessModal'
import { ConsumableCardDetail } from 'components/ConsumableCardDetail'
import { Heading } from 'components/Heading'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { getScanLink } from 'utils/connector'
import { useWeb3React } from '@web3-react/core'
import { TrustedItemRarity } from 'components/TrustedItemFrame'
import { useGetBnbBalance, useGetTokenBalance } from 'hooks/useTokenBalance'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useTransactionContext } from 'hooks/useTransactions'
import { useLFWTokenContract, useMarketplaceContract } from 'hooks/useContract'
import {
  LFW1155_TOKEN_CONTRACT,
  MARKETPLACE_CONTRACT,
  LFW_TOKEN_CONTRACT,
} from 'constant/contracts'
import { client } from 'libs'
import { ConsumableAssetStatus, ConsumableType } from 'types/consumable'
import { handleTransactionError } from 'utils/error'
import {
  BuyStepTransactionModal,
  BuyStepTransactionModalProps,
} from 'components/BuyStepTransactionModal'
import { useProfileAssetContext } from '../profile/profile-asset-context'

export interface BuyButtonProps {
  consumable: ModelConsumableItemData
  refreshData?: () => void
}

export const BuyButton = ({ consumable, refreshData }: BuyButtonProps) => {
  const [txHash, setTxHash] = useState<String>()
  const { openWalletModal, isWalletConnected, walletId } = useAuthContext()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { chainId } = useWeb3React()
  const {
    isOpen: isSuccessModalOpen,
    onClose: onSuccessModalClose,
    onOpen: onOpenSuccessModal,
  } = useDisclosure()
  const { balance: bnbBalance } = useGetBnbBalance()
  const { balance: lfwBalance } = useGetTokenBalance(LFW_TOKEN_CONTRACT)
  const { callWithGasPrice } = useCallWithGasPrice()
  const { addTransaction } = useTransactionContext()
  const marketplaceContract = useMarketplaceContract()
  const lfwTokenContract = useLFWTokenContract()
  const useBnb = consumable.symbol === 'BNB'
  const [step, setStep] = useState<BuyStepTransactionModalProps['step']>(
    useBnb ? 'processing' : 'approve',
  )
  const { processingStatus, setProcessingStatus } = useProfileAssetContext()

  const hasOwner = Boolean(consumable?.ownerAddress)
  const isYourAsset = walletId === consumable.ownerAddress
  const status = consumable.status as ConsumableAssetStatus
  const consumableType = consumable.itemType as ConsumableType

  const checkCanBuy = async () => {
    try {
      await client.postCanBuyConsumable(consumableType, {
        listingId: consumable.listingId as number,
      })
      return true
    } catch (error: any) {
      toast.error({
        title: 'Purchase error',
        message: error?.message,
      })
      return false
    }
  }

  const stopBuy = async () => {
    try {
      await client.postStopBuyConsumable(consumableType, {
        listingId: consumable.listingId as number,
      })
    } catch (error: any) {
      console.error(error)
    }
  }

  const handleApprove = async () => {
    if (processingStatus !== 'none') {
      return
    }
    try {
      const allowance = await lfwTokenContract?.allowance(
        walletId as string,
        MARKETPLACE_CONTRACT,
      )
      if (!(allowance as BigNumber).gte(BigNumber.from(consumable.price))) {
        const approveTx = await callWithGasPrice(lfwTokenContract!.approve, [
          MARKETPLACE_CONTRACT,
          BigNumber.from(consumable.price),
        ])
        addTransaction(approveTx.hash, {
          summary: 'Approve LFW',
          approval: {
            tokenAddress: LFW_TOKEN_CONTRACT,
            spender: MARKETPLACE_CONTRACT,
          },
        })
        setProcessingStatus('approving-for-buying')
        const receipt = await approveTx.wait()
        if (receipt.status) {
          setStep('processing')
          handleBuy()
        } else {
          toast.error({
            title: 'Approve error',
          })
        }
      } else {
        setStep('processing')
        handleBuy()
      }
    } catch (error) {
      onClose()
      stopBuy()
      handleTransactionError('Approve error', error, [
        MARKETPLACE_CONTRACT,
        String(consumable.id),
      ])
    } finally {
      setProcessingStatus('none')
    }
  }

  const handleBuy = async () => {
    setStep('processing')
    if (processingStatus === 'buying') {
      return
    }
    try {
      const tx = await callWithGasPrice(marketplaceContract!.buyItems, [
        LFW1155_TOKEN_CONTRACT,
        String(consumable.listingId),
        String(consumable.price),
      ])
      addTransaction(tx.hash, {
        summary: 'Buy NFT',
      })
      setProcessingStatus('buying')
      const receipt = await tx.wait()
      if (receipt.status) {
        setTxHash(tx.hash)
        await client.postBuyConsumable(consumableType, {
          listingId: consumable.listingId as number,
          tokenId: consumable.tokenId as number,
          txHash: tx.hash,
          walletAddress: walletId as string,
        })
        onClose()
        await wait(300)
        onOpenSuccessModal()
      } else {
        onClose()
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      setStep('processing')
      stopBuy()
      handleTransactionError('Purchase error', error, [
        LFW1155_TOKEN_CONTRACT,
        String(consumable.listingId),
      ])
      onClose()
    } finally {
      setProcessingStatus('none')
    }
  }

  const validate = () => {
    if (!consumable.price) {
      return false
    }
    if (
      useBnb &&
      new BigNumberjs(bnbBalance.toString()).lt(
        new BigNumberjs(consumable.price),
      )
    ) {
      toast.error({
        title: ERROR_MESSAGES.INSUFFICIENT_BALANCE_ERROR,
      })
      return false
    }
    if (
      !useBnb &&
      new BigNumberjs(lfwBalance.toString()).lt(
        new BigNumberjs(consumable.price),
      )
    ) {
      toast.error({
        title: ERROR_MESSAGES.INSUFFICIENT_BALANCE_ERROR,
      })
      return false
    }
    return true
  }

  const handleBuyButtonClick = async () => {
    if (isWalletConnected) {
      if (
        processingStatus === 'approving-for-buying' ||
        processingStatus === 'buying'
      ) {
        onOpen()
        return
      }
      if (!validate()) return
      if (!checkCanBuy()) return
      onOpen()
      if (useBnb) {
        handleBuy()
      } else {
        handleApprove()
      }
    } else {
      openWalletModal()
    }
  }

  return (
    <>
      {isYourAsset ? (
        <Link
          href={
            status === CONSUMABLE_STATUS.LISTED
              ? ROUTES.PROFILE_ON_SALE_CONSUMABLE_DETAIL.getUrl(
                  consumable.id as string,
                  consumable.itemType as ConsumableType,
                )
              : ROUTES.PROFILE_MY_ASSETS_CONSUMABLE_DETAIL.getUrl(
                  consumable.id as string,
                  consumable.itemType as ConsumableType,
                )
          }
        >
          <Button className="min-w-[112px]">
            {status === CONSUMABLE_STATUS.LISTED ? 'Update' : 'View your asset'}
          </Button>
        </Link>
      ) : (
        <RequireSignatureHOC>
          <Button
            isLoading={
              processingStatus === 'approving-for-buying' ||
              processingStatus === 'buying'
            }
            onClick={handleBuyButtonClick}
            disabled={
              (status !== CONSUMABLE_STATUS.IDLE &&
                status !== CONSUMABLE_STATUS.LISTED) ||
              (hasOwner && status === CONSUMABLE_STATUS.IDLE)
            }
          >
            {hasOwner && status === CONSUMABLE_STATUS.IDLE
              ? 'Sold Out'
              : 'Buy now'}
          </Button>
        </RequireSignatureHOC>
      )}
      <ItemSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={async () => {
          onSuccessModalClose()
          await wait(300)
          if (refreshData) {
            refreshData()
          }
        }}
        itemRender={
          <ConsumableCardDetail
            className="w-[200px] h-[280px]"
            name={consumable?.name ?? ''}
            size="sm"
            rarity={consumable?.rarity as TrustedItemRarity}
            imageUrl={consumable?.avatar as string}
            quantity={consumable.quantity as number}
            itemType={consumableType}
          />
        }
        bottomRender={
          <div className="max-w-xl mx-auto">
            <Heading as="h2" className="mt-1">
              Buy Consumable Successfully!
            </Heading>
            <Text color="gray-300" className="mb-6 mt-4">
              It might take about a few minutes to process your purchase. You
              can continue to buy more assets and view your purchase in Your
              Profile later.
            </Text>
            <div className="flex flex-col space-y-2 w-40 mx-auto">
              <Link href={ROUTES.MARKETPLACE_CONSUMABLES}>
                <Button as="a">Buy more asset</Button>
              </Link>
              <Button
                as="a"
                target="_blank"
                appearance="link"
                href={getScanLink(txHash as string, 'transaction', chainId)}
              >
                View on BSCScan
              </Button>
            </div>
          </div>
        }
      />
      <BuyStepTransactionModal
        isOpen={isOpen}
        onClose={onClose}
        step={step}
        steps={useBnb ? ['Buy asset'] : ['Approve', 'Buy asset']}
        title="Buy asset"
        approveStepRender={
          processingStatus === 'approving-for-buying' ? (
            <Text
              className="sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5 text-center"
              color="white"
            >
              Approving your asset...
            </Text>
          ) : (
            <Text className="max-w-xs text-center mx-auto my-5">
              To sell your asset, you have to approve for marketplace to sell
              your asset first. Please confirm in your connected wallet.
            </Text>
          )
        }
        processingRender={
          processingStatus === 'buying' ? (
            <Text
              className="sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5 text-center"
              color="white"
            >
              Purchasing your asset...
            </Text>
          ) : (
            <div className="space-y-1.5 max-w-sm text-center mx-auto my-4">
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
