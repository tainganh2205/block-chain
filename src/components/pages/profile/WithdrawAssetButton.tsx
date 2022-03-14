import { useDisclosure } from '@dwarvesf/react-hooks'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { Button } from 'components/Button'
import { BigNumber } from 'ethers'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useTreasuryContract } from 'hooks/useContract'
import { useState } from 'react'
import { wait } from 'utils/wait'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { LFW721_TOKEN_CONTRACT } from 'constant/contracts'
import { toast } from 'components/Toast'
import { client } from 'libs'
import { ModelHeroDetail } from 'types/schema'
import { useAuthContext } from 'context/auth'
import { useTransactionContext } from 'hooks/useTransactions'
import { AssetStatus } from 'types/hero'
import { ApproveNoticeModal } from 'components/ApproveNoticeModal'
import { isSSR } from '@dwarvesf/react-utils'
import { handleTransactionError } from 'utils/error'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { useProfileAssetContext } from './profile-asset-context'

interface WithdrawAssetButtonProps {
  heroData: ModelHeroDetail
  onSuccess: () => void
}

const marketApproveNoticeKey = 'lfw-mk-approve-notice'

export const WithdrawAssetButton = (props: WithdrawAssetButtonProps) => {
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
  const treasuryContract = useTreasuryContract()
  const { addTransaction } = useTransactionContext()

  const [isNoShowAgain, setIsNoShowAgain] = useState(() => {
    if (isSSR()) {
      return false
    }
    return Boolean(window.localStorage.getItem(marketApproveNoticeKey))
  })

  const {
    isOpen: marketApproveIsOpen,
    onOpen: onMarketApproveOpen,
    onClose: onMarketApproveClose,
  } = useDisclosure()

  const assetStatus = heroData.heroInfo?.status as AssetStatus

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

      const tx = await callWithGasPrice(treasuryContract!.withdrawNFT, [
        LFW721_TOKEN_CONTRACT,
        BigNumber.from(heroData.heroInfo?.tokenId),
        BigNumber.from(heroData.heroInfo?.gameServerId),
      ])
      setProcessingStatus('withdrawing')
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
        LFW721_TOKEN_CONTRACT,
        BigNumber.from(heroData.heroInfo?.tokenId),
        BigNumber.from(heroData.heroInfo?.gameServerId),
      ])
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
          disabled={
            assetStatus === 'withdrawing' ||
            (processingStatus !== 'none' && processingStatus !== 'withdrawing')
          }
          isLoading={submitting}
          onClick={() => {
            if (!isNoShowAgain) {
              onMarketApproveOpen()
            } else if (processingStatus === 'withdrawing') {
              onConfirmOpen()
            } else {
              handleApprove()
            }
          }}
        >
          Approve for marketplace
        </Button>
      </RequireSignatureHOC>

      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          approved ? null : (
            <ModalTitle className="text-white text-32 font-semibold">
              Approve for marketplace
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

      <ApproveNoticeModal
        isOpen={marketApproveIsOpen}
        onClose={onMarketApproveClose}
        onOk={(noShowAgain) => {
          if (noShowAgain) {
            setIsNoShowAgain(true)
            window.localStorage.setItem(marketApproveNoticeKey, '1')
          }
          if (processingStatus === 'withdrawing') {
            onConfirmOpen()
          } else {
            handleApprove()
          }
          onMarketApproveClose()
        }}
      />
    </>
  )
}
