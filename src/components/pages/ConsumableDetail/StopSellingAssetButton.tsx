import { useDisclosure } from '@dwarvesf/react-hooks'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { Button } from 'components/Button'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'
import { useState } from 'react'
import { wait } from 'utils/wait'
import { ModelConsumableItemData } from 'types/schema'
import { ConsumableAssetStatus, ConsumableType } from 'types/consumable'
import { CONSUMABLE_STATUS } from 'constant/consumable'
import { handleTransactionError } from 'utils/error'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useMarketplaceContract } from 'hooks/useContract'
import { useAuthContext } from 'context/auth'
import { useTransactionContext } from 'hooks/useTransactions'
import { LFW1155_TOKEN_CONTRACT } from 'constant/contracts'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { client } from 'libs'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { useProfileAssetContext } from '../profile/profile-asset-context'

interface StopSellingAssetButtonProps {
  consumable: ModelConsumableItemData
  onSuccess: () => void
}

export const StopSellingAssetButton = (props: StopSellingAssetButtonProps) => {
  const { processingStatus, setProcessingStatus } = useProfileAssetContext()
  const { consumable, onSuccess } = props
  const [approved, setApproved] = useState(false)
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const { callWithGasPrice } = useCallWithGasPrice()
  const marketplaceContract = useMarketplaceContract()
  const { addTransaction } = useTransactionContext()
  const { walletId } = useAuthContext()

  const assetStatus = consumable.status as ConsumableAssetStatus

  const handleStopSelling = async () => {
    onConfirmOpen()
    if (processingStatus === 'unlisting') {
      return
    }
    setApproved(false)
    try {
      const tx = await callWithGasPrice(
        marketplaceContract!.cancelItemsListing,
        [LFW1155_TOKEN_CONTRACT, String(consumable.listingId)],
      )
      setProcessingStatus('unlisting')
      setApproved(true)
      const txHash = tx.hash
      addTransaction(txHash, {
        summary: 'Stop selling NFT',
      })
      const receipt = await tx.wait()
      if (receipt.status) {
        await client.postUnlistConsumable(
          consumable.itemType as ConsumableType,
          {
            listingId: consumable.listingId as number,
            tokenId: consumable.tokenId as number,
            walletAddress: walletId as string,
            txHash: tx.hash,
          },
        )
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
      handleTransactionError('Stop selling error', error, [
        LFW1155_TOKEN_CONTRACT,
        String(consumable.listingId),
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
          isLoading={processingStatus === 'unlisting'}
          disabled={
            assetStatus === CONSUMABLE_STATUS.UNLISTING ||
            assetStatus === CONSUMABLE_STATUS.UPDATING ||
            assetStatus === CONSUMABLE_STATUS.UNLISTED ||
            (processingStatus !== 'none' && processingStatus !== 'unlisting')
          }
          onClick={handleStopSelling}
        >
          Stop selling
        </Button>
      </RequireSignatureHOC>
      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          approved ? null : (
            <ModalTitle className="text-white text-32 font-semibold">
              Stop selling on marketplace
            </ModalTitle>
          )
        }
        bottomRender={
          approved ? (
            <ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
              Withdrawing your asset...
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
