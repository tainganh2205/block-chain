import { useDisclosure } from '@dwarvesf/react-hooks'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { Button } from 'components/Button'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'components/Modal'
import { Text } from 'components/Text'
import { useState } from 'react'
import NumberFormat from 'react-number-format'
import { wait } from 'utils/wait'
import { toast } from 'components/Toast'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { useProfileAssetContext } from 'components/pages/profile/profile-asset-context'
import { ModelConsumableItemData } from 'types/schema'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useTransactionContext } from 'hooks/useTransactions'
import { useLFW1155TokenContract } from 'hooks/useContract'
import { client } from 'libs'
import { useAuthContext } from 'context/auth'
import { ConsumableAssetStatus } from 'types/consumable'
import { handleTransactionError } from 'utils/error'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'

interface SetQuantityModalProps extends ModalProps {
  maxQuantity: number
  onSubmit: (value: number) => void
}

const SetQuantityModal = ({
  maxQuantity,
  onSubmit,
  ...props
}: SetQuantityModalProps) => {
  const [quantity, setQuantity] = useState(0)
  const isInsufficient = quantity > maxQuantity

  return (
    <Modal {...props}>
      <ModalContent size="max-w-md">
        <ModalCloseButton />
        <div className="flex flex-col items-center text-center space-y-6">
          <ModalTitle className="text-2xl font-bold mb-1">
            Import asset to game
          </ModalTitle>
          <div className="space-y-2">
            <Text className="text-left">Quantity</Text>
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
          <RequireSignatureHOC>
            <Button
              className="w-44"
              type="submit"
              disabled={isInsufficient || quantity <= 0}
              onClick={() => onSubmit(quantity)}
            >
              {isInsufficient ? 'Insufficient Quantity' : 'Import assets'}
            </Button>
          </RequireSignatureHOC>
        </div>
      </ModalContent>
    </Modal>
  )
}

interface ImportAssetButtonProps {
  consumable: ModelConsumableItemData
  onSuccess: () => void
}

export const ImportAssetButton = (props: ImportAssetButtonProps) => {
  const { processingStatus, setProcessingStatus } = useProfileAssetContext()
  const { consumable, onSuccess } = props
  const [validating, setValidating] = useState(false)
  const {
    isOpen: isSetQuantityOpen,
    onClose: onSetQuantityClose,
    onOpen: onSetQuantityOpen,
  } = useDisclosure()
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { addTransaction } = useTransactionContext()
  const lfw1155TokenContract = useLFW1155TokenContract()
  const { walletId } = useAuthContext()
  const assetStatus = consumable.status as ConsumableAssetStatus
  const maxQuantity = consumable.quantity ?? 0

  const handleImportConsumable = async (quantity: number) => {
    if (processingStatus === 'importing' || !walletId || validating) {
      return
    }
    if (quantity <= 0 || quantity > maxQuantity) {
      return
    }
    onSetQuantityClose()
    await wait(200)
    onConfirmOpen()
    try {
      setValidating(true)
      await client.postCanImportConsumable('hero_shard', {
        itemId: consumable.id,
        serverId: Number(consumable.gameServerId),
        quantity,
        walletAddress: walletId,
      })
      setValidating(false)
      const tx = await callWithGasPrice(lfw1155TokenContract!.burnItem, [
        String(consumable.tokenId),
        quantity,
      ])
      const txHash = tx.hash
      addTransaction(txHash, {
        summary: 'Import consumable',
      })
      setProcessingStatus('importing')
      const receipt = await tx.wait()
      if (receipt.status) {
        await client.postImportConsumable('hero_shard', {
          currentQuantity: consumable.quantity ?? 0,
          importQuantity: quantity,
          tokenId: consumable.tokenId as number,
          txHash,
          walletAddress: walletId as string,
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
    } catch (error: any) {
      handleTransactionError('Import error', error, [consumable.id, quantity])
      onConfirmClose()
    } finally {
      setValidating(false)
      setProcessingStatus('none')
    }
  }

  return (
    <>
      <Button
        appearance="border-primary"
        onClick={
          processingStatus === 'importing' ? onConfirmOpen : onSetQuantityOpen
        }
        isLoading={processingStatus === 'importing'}
        disabled={
          assetStatus === 'importing' ||
          (processingStatus !== 'none' && processingStatus !== 'importing')
        }
      >
        Import asset
      </Button>

      <SetQuantityModal
        isOpen={isSetQuantityOpen}
        onClose={onSetQuantityClose}
        onSubmit={handleImportConsumable}
        maxQuantity={maxQuantity}
      />

      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          processingStatus === 'importing' ? null : (
            <ModalTitle className="text-white text-32 font-semibold">
              Import asset to game
            </ModalTitle>
          )
        }
        bottomRender={
          processingStatus === 'importing' ? (
            <ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
              Importing your asset...
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
