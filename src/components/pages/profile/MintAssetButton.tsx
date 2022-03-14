import { useDisclosure } from '@dwarvesf/react-hooks'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { Button } from 'components/Button'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useLFWNFTContract } from 'hooks/useContract'
import { useState } from 'react'
import { wait } from 'utils/wait'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { toast } from 'components/Toast'
import { client } from 'libs'
import { ModelHeroDetail } from 'types/schema'
import { useAuthContext } from 'context/auth'
import { useTransactionContext } from 'hooks/useTransactions'
import { AssetStatus } from 'types/hero'
import { handleTransactionError } from 'utils/error'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { useProfileAssetContext } from './profile-asset-context'

interface MintAssetButtonProps {
  heroData: ModelHeroDetail
  onSuccess: () => void
}

export const MintAssetButton = (props: MintAssetButtonProps) => {
  const { processingStatus, setProcessingStatus } = useProfileAssetContext()
  const [submitting, setSubmitting] = useState(false)
  const { heroData, onSuccess } = props
  const [approved, setApproved] = useState(false)
  const { walletId } = useAuthContext()
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const { callWithGasPrice } = useCallWithGasPrice()
  const lfwNFTContract = useLFWNFTContract()
  const { addTransaction } = useTransactionContext()

  const handleApprove = async () => {
    if (submitting) {
      return
    }
    setApproved(false)
    try {
      setSubmitting(true)
      await client.postCanWithdraw({
        heroId: heroData.heroInfo?.id,
        walletAddress: walletId as string,
      })
      setSubmitting(false)
      onConfirmOpen()

      const tx = await callWithGasPrice(lfwNFTContract!.mintWhitelist, [
        String(heroData.heroInfo?.tokenId),
      ])
      setProcessingStatus('minting')
      setApproved(true)
      const txHash = tx.hash
      addTransaction(txHash, {
        summary: 'Withdraw NFT',
      })
      const receipt = await tx.wait()
      if (receipt.status && walletId) {
        await client.postWithdrawAsset({
          heroId: heroData.heroInfo?.id as string,
          walletAddress: walletId,
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
      handleTransactionError('Withdraw error', error, [
        String(heroData.heroInfo?.tokenId),
      ])
      onConfirmClose()
    } finally {
      setProcessingStatus('none')
      setSubmitting(false)
    }
  }

  const assetStatus = heroData.heroInfo?.status as AssetStatus

  return (
    <>
      <RequireSignatureHOC>
        <Button
          onClick={
            processingStatus === 'minting' ? onConfirmOpen : handleApprove
          }
          isLoading={submitting}
          disabled={
            assetStatus === 'minting' ||
            (processingStatus !== 'none' && processingStatus !== 'minting')
          }
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
