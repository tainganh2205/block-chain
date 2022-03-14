import { useDisclosure } from '@dwarvesf/react-hooks'
import { BigNumber } from '@ethersproject/bignumber'
import { Button } from 'components/Button'
import { ItemSuccessModal } from 'components/ItemSuccessModal'
import { ConsumableCardDetail } from 'components/ConsumableCardDetail'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { ROUTES } from 'constant/routes'
import Link from 'next/link'
import { useState } from 'react'
import { wait } from 'utils/wait'
import { toast } from 'components/Toast'
import {
  ConsumableStepTransactionModal,
  ConsumableStepTransactionModalProps,
} from 'components/StepTransactionModal'
import { ModelConsumableItemData } from 'types/schema'
import { formatNumber } from 'utils/number'
import { MAX_PRICE, MIN_PRICE } from 'constant/marketplace'
import { useProfileAssetContext } from 'components/pages/profile/profile-asset-context'
import { TrustedItemRarity } from 'components/TrustedItemFrame'
import NumberFormat from 'react-number-format'

import { useAuthContext } from 'context/auth'
import { useTransactionContext } from 'hooks/useTransactions'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import {
  useLFW1155TokenContract,
  useMarketplaceContract,
} from 'hooks/useContract'
import {
  LFW1155_TOKEN_CONTRACT,
  MARKETPLACE_CONTRACT,
} from 'constant/contracts'
import { toEtherUnit } from 'utils/wallet'
import { client } from 'libs'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { handleTransactionError } from 'utils/error'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { IconCurrency } from 'components/IconCurrency'
import { ConsumableType } from 'types/consumable'

interface SellAssetButtonProps {
  consumable: ModelConsumableItemData
  onSuccess: () => void
  isOpeningChest: boolean
}

export const SellAssetButton = (props: SellAssetButtonProps) => {
  const [step, setStep] =
    useState<ConsumableStepTransactionModalProps['step']>('approve')
  const { processingStatus, setProcessingStatus } = useProfileAssetContext()
  const { consumable, onSuccess, isOpeningChest } = props
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [value, setValue] = useState<string>('')
  const [quantity, setQuantity] = useState(0)
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()

  const { walletId } = useAuthContext()
  const { callWithGasPrice } = useCallWithGasPrice()
  const lfw1155Contract = useLFW1155TokenContract()
  const marketplaceContract = useMarketplaceContract()
  const { addTransaction } = useTransactionContext()

  const assetStatus = consumable?.status
  const maxQuantity = consumable?.quantity ?? 0
  const isInsufficient = quantity > maxQuantity
  const consumableType = consumable.itemType as ConsumableType

  const handleApprove = async () => {
    onConfirmOpen()

    if (processingStatus !== 'none') {
      return
    }

    try {
      const isApproved = await lfw1155Contract?.isApprovedForAll(
        walletId as string,
        MARKETPLACE_CONTRACT,
      )
      if (!isApproved) {
        const approveTx = await callWithGasPrice(
          lfw1155Contract!.setApprovalForAll,
          [MARKETPLACE_CONTRACT, true],
        )
        addTransaction(approveTx.hash, {
          summary: 'Approve asset',
          approval: {
            tokenAddress: LFW1155_TOKEN_CONTRACT,
            spender: MARKETPLACE_CONTRACT,
          },
        })
        setProcessingStatus('approving-for-selling')
        const receipt = await approveTx.wait()
        if (receipt.status) {
          setStep('form-input')
        } else {
          toast.error({
            title: 'Approve error',
          })
        }
      } else {
        setStep('form-input')
      }
    } catch (error) {
      onConfirmClose()
      handleTransactionError('Approve error', error, [
        MARKETPLACE_CONTRACT,
        true,
      ])
    } finally {
      setProcessingStatus('none')
    }
  }

  const sellAsset = async () => {
    if (Number(value) < MIN_PRICE || Number(value) > MAX_PRICE) {
      toast.info({
        title: 'Out of range',
        message: `The price must be in range of ${formatNumber(
          MIN_PRICE,
        )} and ${formatNumber(MAX_PRICE)}`,
      })
      return
    }
    if (quantity === 0) return

    setStep('processing')
    if (processingStatus === 'selling') {
      return
    }

    try {
      const tx = await callWithGasPrice(
        marketplaceContract!.createItemsListing,
        [
          LFW1155_TOKEN_CONTRACT,
          [String(consumable?.tokenId)],
          [quantity],
          [toEtherUnit(value).toString()],
        ],
        { gasLimit: '750000' },
      )
      const txHash = tx.hash
      addTransaction(txHash, {
        summary: 'Sell Consumable',
      })
      setProcessingStatus('selling')
      const receipt = await tx.wait()
      const marketplaceLog = receipt.logs.find(
        (log) => log.address === MARKETPLACE_CONTRACT,
      )
      if (receipt.status && marketplaceLog) {
        const parsedLog =
          marketplaceContract?.interface.parseLog(marketplaceLog)
        await client.postSellConsumableAsset(
          consumable.itemType as ConsumableType,
          {
            /* eslint-disable no-underscore-dangle */
            listingId: (parsedLog?.args._listingId as BigNumber).toNumber(),
            price: (parsedLog?.args.price as BigNumber).toString(),
            quantity: (parsedLog?.args.amount as BigNumber).toNumber(),
            tokenId: (parsedLog?.args.tokenId as BigNumber).toNumber(),
            txHash,
            walletAddress: walletId as string,
          },
        )
        onConfirmClose()
        await wait(200)
        onOpen()
      } else {
        setStep('form-input')
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      setStep('form-input')
      handleTransactionError('Selling error', error, [
        LFW1155_TOKEN_CONTRACT,
        [String(consumable?.tokenId)],
        [quantity],
        [toEtherUnit(value).toString()],
      ])
      onConfirmClose()
    } finally {
      setProcessingStatus('none')
    }
  }

  return (
    <>
      <Button
        className="w-32"
        isLoading={
          processingStatus === 'approving-for-selling' ||
          processingStatus === 'selling'
        }
        disabled={
          assetStatus === 'transfering' ||
          isOpeningChest ||
          assetStatus === 'listing' ||
          !consumable?.quantity ||
          (processingStatus !== 'none' && processingStatus !== 'selling')
        }
        onClick={handleApprove}
      >
        Sell
      </Button>

      <ConsumableStepTransactionModal
        consumable={consumable}
        isOpen={isConfirmOpen}
        onClose={async () => {
          onConfirmClose()
          await wait(100)
          setQuantity(0)
          setValue('')
        }}
        step={step}
        steps={['Approve', 'Sell asset']}
        title="Sell asset"
        approveStepRender={
          processingStatus === 'approving-for-selling' ? (
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
        formRender={
          <div className="space-y-5">
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
              <div className="flex-1 space-y-2">
                <Text>Quantity</Text>
                <div className="bg-gray-600 rounded-md flex h-10">
                  <NumberFormat
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(Number(e.target.value.replace(/,/g, '')))
                    }}
                    thousandSeparator
                    className="w-full bg-transparent text-gray-350 font-semibold px-4 outline-none flex-1"
                    inputMode="numeric"
                    allowNegative={false}
                    decimalScale={0}
                  />
                  <button
                    type="button"
                    className="text-primary font-semibold tracking-wide px-4 cursor-pointer"
                    onClick={() => setQuantity(maxQuantity)}
                  >
                    Max
                  </button>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <Text>Price</Text>
                <div className="bg-gray-600 rounded-md flex h-10 justify-between w-full">
                  <input
                    placeholder="Price"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value)
                    }}
                    type="number"
                    className="w-3/4 bg-transparent text-lg font-medium text-white pl-4 outline-none flex-1 placeholder-opacity-25 placeholder-white appearance-none"
                    inputMode="decimal"
                  />
                  <div className="flex items-center space-x-2 px-4">
                    <IconCurrency
                      className="h-5 w-5 object-scale-down flex-none"
                      symbol={consumable.symbol}
                    />
                    <Text color="white" as="b">
                      {consumable.symbol}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <RequireSignatureHOC>
              <Button
                onClick={sellAsset}
                disabled={!value || isInsufficient || quantity === 0}
                className="w-full"
              >
                {isInsufficient ? 'Insufficient Quantity' : 'Sell'}
              </Button>
            </RequireSignatureHOC>
          </div>
        }
        processingRender={
          processingStatus === 'selling' ? (
            <Text
              className="sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5 text-center"
              color="white"
            >
              Selling your asset...
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

      <ItemSuccessModal
        isOpen={isOpen}
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
        onClose={async () => {
          onClose()
          await wait(300)
          onSuccess()
        }}
        animation="slide-up"
        bottomRender={
          <div className="px-4">
            <ModalTitle className="text-white text-32 font-semibold">
              Your asset has been listed on marketplace
            </ModalTitle>
            <Text className="mb-8 mt-2">
              You can unlist your asset or update price later in “On Sale” tab
            </Text>
            <div className="flex flex-col space-y-1 w-40 mx-auto">
              <Link href={ROUTES.PROFILE_MY_ASSETS_CONSUMABLES}>
                <Button as="a">View other assets</Button>
              </Link>
              <Link
                href={`${ROUTES.PROFILE_ON_SALE_CONSUMABLES}?type=${consumableType}`}
              >
                <Button as="a" appearance="link">
                  View on-sale assets
                </Button>
              </Link>
            </div>
          </div>
        }
      />
    </>
  )
}
