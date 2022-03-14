import { useState } from 'react'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { Button } from 'components/Button'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { wait } from 'utils/wait'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useProfileAssetContext } from 'components/pages/profile/profile-asset-context'
import { handleTransactionError } from 'utils/error'
import { client } from 'libs'
import { ModelConsumableItemData } from 'types/schema'
import { useAuthContext } from 'context/auth'
import { ConsumableAssetStatus } from 'types/consumable'
import { CONSUMABLE_STATUS } from 'constant/consumable'

interface ApproveForMarketButtonProps {
  onSuccess: () => void
  consumable: ModelConsumableItemData
}

export const ApproveForMarketButton = (props: ApproveForMarketButtonProps) => {
  const { processingStatus, setProcessingStatus } = useProfileAssetContext()
  const [submitting, setSubmitting] = useState(false)
  const { onSuccess, consumable } = props
  const [approved, setApproved] = useState(false)
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const { walletId } = useAuthContext()
  const status = consumable.status as ConsumableAssetStatus

  const handleApprove = async () => {
    if (submitting) {
      return
    }
    setApproved(false)
    try {
      setSubmitting(true)
      await client.postCanWithdrawConsumable('hero_shard', {
        itemId: consumable.id,
        walletAddress: walletId as string,
      })
      onConfirmOpen()
      setProcessingStatus('withdrawing')
      setApproved(true)
      await client.postWithdrawConsumable('hero_shard', {
        tokenId: consumable.tokenId as number,
        walletAddress: walletId as string,
        quantity: consumable.quantity as number,
      })
      onConfirmClose()
      await wait(200)
      onSuccess()
    } catch (error) {
      handleTransactionError('Withdraw error', error)
      onConfirmClose()
    } finally {
      setProcessingStatus('none')
      setSubmitting(false)
    }
  }

  return (
    <>
      <RequireSignatureHOC>
        <Button
          onClick={
            processingStatus === 'minting' ? onConfirmOpen : handleApprove
          }
          disabled={
            status === CONSUMABLE_STATUS.WITHDRAWING ||
            (processingStatus !== 'none' &&
              processingStatus !== 'withdrawing') ||
            consumable.quantity === 0
          }
          isLoading={submitting}
        >
          Approve for marketplace
        </Button>
      </RequireSignatureHOC>
      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          approved ? null : (
            <div className="px-8 space-y-4">
              <ModalTitle className="text-white text-32 font-semibold">
                Mint NFT
              </ModalTitle>
              <Text>
                You have to mint your asset before transferring or listing on
                marketplace
              </Text>
            </div>
          )
        }
        bottomRender={
          approved ? (
            <ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
              Minting your asset...
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
