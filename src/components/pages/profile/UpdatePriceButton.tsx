import { useDisclosure } from '@dwarvesf/react-hooks'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { Button } from 'components/Button'
import { HeroCardProps } from 'components/HeroCard'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'components/Modal'
import { Text } from 'components/Text'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useMarketplaceContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { wait } from 'utils/wait'
import { useAuthContext } from 'context/auth'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { LFW721_TOKEN_CONTRACT } from 'constant/contracts'
import { toast } from 'components/Toast'
import { client } from 'libs'
import { convertEtherToWei, toEtherUnit } from 'utils/wallet'
import { useTransactionContext } from 'hooks/useTransactions'
import { AssetStatus } from 'types/hero'
import { MAX_PRICE, MIN_PRICE } from 'constant/marketplace'
import { formatNumber } from 'utils/number'
import { handleTransactionError } from 'utils/error'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { IconCurrency } from 'components/IconCurrency'
import { useProfileAssetContext } from './profile-asset-context'

interface SetPriceModalProps extends ModalProps {
  currentPrice: number
  symbol: string
  onSubmit: (value: number) => void
}

const SetPriceModal = ({
  currentPrice,
  symbol,
  onSubmit,
  ...props
}: SetPriceModalProps) => {
  const [value, setValue] = useState<number>(currentPrice)

  useEffect(() => {
    if (props.isOpen) {
      setValue(currentPrice)
    }
  }, [props.isOpen, currentPrice])

  return (
    <Modal {...props}>
      <ModalContent size="max-w-md">
        <ModalCloseButton />
        <div className="flex flex-col items-center text-center space-y-6">
          <ModalTitle className="text-2xl font-bold mb-1">
            Update price
          </ModalTitle>

          <div className="bg-gray-600 rounded-md flex h-12 justify-between w-full">
            <NumberFormat
              placeholder="Enter a number"
              onChange={(e) => {
                setValue(Number(e.target.value.replace(/,/g, '')))
              }}
              value={value}
              thousandSeparator
              className="w-2/3 bg-transparent text-lg font-semibold text-white px-4 outline-none flex-1 placeholder-opacity-25 placeholder-white"
              inputMode="numeric"
            />
            <div className="flex items-center space-x-2 px-4">
              <IconCurrency
                className="h-5 w-5 object-scale-down flex-none"
                symbol={symbol}
              />
              <Text color="white" as="b">
                {symbol}
              </Text>
            </div>
          </div>
          <Button
            className="w-44"
            type="submit"
            disabled={value === currentPrice || value <= 0}
            onClick={() => {
              if (value) {
                onSubmit(value)
              }
            }}
          >
            Update
          </Button>
        </div>
      </ModalContent>
    </Modal>
  )
}

interface UpdatePriceButtonProps {
  heroData: HeroCardProps
  onSuccess: () => void
}

export const UpdatePriceButton = (props: UpdatePriceButtonProps) => {
  const { processingStatus, setProcessingStatus } = useProfileAssetContext()
  const { heroData, onSuccess } = props
  const { walletId } = useAuthContext()
  const {
    isOpen: isSetPriceOpen,
    onClose: onSetPriceClose,
    onOpen: onSetPriceOpen,
  } = useDisclosure()
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const { callWithGasPrice } = useCallWithGasPrice()
  const marketplaceContract = useMarketplaceContract()
  const { addTransaction } = useTransactionContext()
  const assetStatus = heroData?.status as AssetStatus

  const handleUpdatePrice = async (price: number) => {
    if (processingStatus !== 'none') {
      return
    }

    if (price < MIN_PRICE || price > MAX_PRICE) {
      toast.info({
        title: 'Out of range',
        message: `The price must be in range of ${formatNumber(
          MIN_PRICE,
        )} and ${formatNumber(MAX_PRICE)}`,
      })
      return
    }

    if (price <= 0) {
      return
    }
    onSetPriceClose()
    await wait(200)
    onConfirmOpen()
    try {
      const tx = await callWithGasPrice(marketplaceContract!.updateListing, [
        LFW721_TOKEN_CONTRACT,
        String(heroData.tokenId),
        toEtherUnit(price),
      ])
      const txHash = tx.hash
      addTransaction(txHash, {
        summary: 'Update Price NFT',
      })
      setProcessingStatus('updating-price')
      const receipt = await tx.wait()
      if (receipt.status) {
        await client.postUpdateAssetPrice({
          heroId: heroData.id as string,
          walletAddress: walletId as string,
          updatedPrice: String(toEtherUnit(price)),
          txHash: tx.hash,
        })
        onConfirmClose()
        await wait(200)
        onSuccess()
      } else {
        onConfirmClose()
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      handleTransactionError('Update price error', error, [
        LFW721_TOKEN_CONTRACT,
        String(heroData.tokenId),
        toEtherUnit(price),
      ])
      onConfirmClose()
    } finally {
      setProcessingStatus('none')
    }
  }

  return (
    <>
      <RequireSignatureHOC>
        <Button
          className="!font-semibold !px-0 ml-4"
          isLoading={processingStatus === 'updating-price'}
          disabled={
            assetStatus === 'unlisting' ||
            assetStatus === 'updating' ||
            (processingStatus !== 'none' &&
              processingStatus !== 'updating-price')
          }
          appearance="link"
          onClick={
            processingStatus === 'updating-price'
              ? onConfirmOpen
              : onSetPriceOpen
          }
        >
          Edit
        </Button>
      </RequireSignatureHOC>

      <SetPriceModal
        isOpen={isSetPriceOpen}
        onClose={onSetPriceClose}
        onSubmit={handleUpdatePrice}
        symbol={heroData.symbol ?? 'BNB'}
        currentPrice={Number(convertEtherToWei(heroData.price || 0))}
      />

      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          processingStatus === 'updating-price' ? null : (
            <ModalTitle className="text-white text-32 font-semibold">
              Update price
            </ModalTitle>
          )
        }
        bottomRender={
          processingStatus === 'updating-price' ? (
            <ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
              Updating price...
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
