import { useDisclosure } from '@dwarvesf/react-hooks'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { Button } from 'components/Button'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useMarketplaceContract } from 'hooks/useContract'
import { useState } from 'react'
import { wait } from 'utils/wait'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { toast } from 'components/Toast'
import { client } from 'libs'
import { ModelHeroDetail } from 'types/schema'
import { LFW721_TOKEN_CONTRACT } from 'constant/contracts'
import { useAuthContext } from 'context/auth'
import { useTransactionContext } from 'hooks/useTransactions'
import { AssetStatus } from 'types/hero'
import { handleTransactionError } from 'utils/error'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { useProfileAssetContext } from './profile-asset-context'

interface StopSellingAssetButtonProps {
  heroData: ModelHeroDetail
  onSuccess: () => void
}

export const StopSellingAssetButton = (props: StopSellingAssetButtonProps) => {
  const { processingStatus, setProcessingStatus } = useProfileAssetContext()
  const { heroData, onSuccess } = props
  const { walletId } = useAuthContext()
  const [approved, setApproved] = useState(false)
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const { callWithGasPrice } = useCallWithGasPrice()
  const marketplaceContract = useMarketplaceContract()
  const { addTransaction } = useTransactionContext()
  const assetStatus = heroData.heroInfo?.status as AssetStatus

  const handleStopSelling = async () => {
    onConfirmOpen()
    if (processingStatus === 'unlisting') {
      return
    }
    setApproved(false)
    try {
      const tx = await callWithGasPrice(marketplaceContract!.cancelListing, [
        LFW721_TOKEN_CONTRACT,
        String(heroData.heroInfo?.tokenId),
      ])
      setProcessingStatus('unlisting')
      setApproved(true)
      const txHash = tx.hash
      addTransaction(txHash, {
        summary: 'Stop selling NFT',
      })
      const receipt = await tx.wait()
      if (receipt.status) {
        await client.postUnlistAsset({
          heroId: heroData.heroInfo?.id as string,
          walletAddress: walletId as string,
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
      handleTransactionError('Stop selling error', error, [
        LFW721_TOKEN_CONTRACT,
        String(heroData.heroInfo?.tokenId),
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
            assetStatus === 'unlisting' ||
            assetStatus === 'updating' ||
            assetStatus === 'unlisted' ||
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
