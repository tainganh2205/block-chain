import { useState } from 'react'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useWeb3React } from '@web3-react/core'
import { utils } from 'ethers'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { Button } from 'components/Button'
import { HeroCardProps } from 'components/HeroCard'
import { HeroSuccessModal } from 'components/HeroSuccessModal'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'components/Modal'
import { toast } from 'components/Toast'
import { FormInput } from 'components/FormInput'
import Link from 'next/link'
import { wait } from 'utils/wait'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useLFWNFTContract } from 'hooks/useContract'
import { ROUTES } from 'constant/routes'
import { VALIDATION_MESSAGES } from 'constant/validatorMessages'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { client } from 'libs/apis'
import { Text } from 'components/Text'
import { useAuthContext } from 'context/auth'
import { useTransactionContext } from 'hooks/useTransactions'
import { getScanLink } from 'utils/connector'
import { handleTransactionError } from 'utils/error'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { useProfileAssetContext } from './profile-asset-context'

interface SetAddressFormValues {
  address: string
}

interface SetAddressModalProps extends ModalProps {
  onSubmit: SubmitHandler<SetAddressFormValues>
}

const SetAddressModal = ({ onSubmit, ...props }: SetAddressModalProps) => {
  const formInstance = useForm<SetAddressFormValues>({
    defaultValues: { address: '' },
  })
  const { handleSubmit } = formInstance
  const { walletId } = useAuthContext()

  return (
    <Modal {...props}>
      <ModalContent size="max-w-md">
        <ModalCloseButton />
        <FormProvider {...formInstance}>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center text-center space-y-6">
              <ModalTitle className="text-2xl font-bold mb-1">
                Transfer asset
              </ModalTitle>
              <FormInput
                label="Address"
                placeholder="Fill in the transfer address"
                name="address"
                type="text"
                fullWidth
                rules={{
                  required: VALIDATION_MESSAGES.REQUIRED,
                  validate: (value) => {
                    if (walletId === value) {
                      return VALIDATION_MESSAGES.SAME_OWNER_WALLET_ADDRESS
                    }
                    if (!utils.isAddress(value)) {
                      return VALIDATION_MESSAGES.INVALID_WALLET_ADDRESS
                    }
                  },
                }}
                containerClassName="w-full"
              />
              <Button className="px-4" type="submit">
                Transfer to this address
              </Button>
            </div>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}

interface TransferAssetButtonProps {
  heroData: HeroCardProps
  onSuccess: () => void
  onSuccessModalClose: () => void
}

export const TransferAssetButton = (props: TransferAssetButtonProps) => {
  const { heroData, onSuccess, onSuccessModalClose } = props
  const { processingStatus, setProcessingStatus } = useProfileAssetContext()
  const [approved, setApproved] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)
  const { walletId } = useAuthContext()
  const { chainId } = useWeb3React()
  const {
    isOpen: isSuccessModalOpen,
    onClose: onCloseSuccessModal,
    onOpen: onOpenSuccessModal,
  } = useDisclosure()
  const {
    isOpen: isSetAddressOpen,
    onClose: onSetAddressClose,
    onOpen: onSetAddressOpen,
  } = useDisclosure()
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const { callWithGasPrice } = useCallWithGasPrice()
  const lfwNFTContract = useLFWNFTContract()
  const { addTransaction } = useTransactionContext()
  const assetStatus = heroData?.status

  const handleTransfer = async (value: SetAddressFormValues) => {
    setApproved(false)
    try {
      onSetAddressClose()
      await wait(200)
      onConfirmOpen()
      const tx = await callWithGasPrice(lfwNFTContract!.transferFrom, [
        String(walletId),
        value.address,
        String(heroData.tokenId),
      ])
      setProcessingStatus('transfering')
      setApproved(true)
      const txHash = tx.hash
      setTxHash(txHash)
      addTransaction(txHash, {
        summary: 'Transfer NFT',
      })
      const receipt = await tx.wait()
      if (receipt.status && walletId) {
        await client.postTransferAsset({
          heroId: heroData.id as string,
          walletAddress: walletId,
          txHash: tx.hash,
        })
        onConfirmClose()
        onSuccess()
        await wait(200)
        onOpenSuccessModal()
      } else {
        onConfirmClose()
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      handleTransactionError('Transfer error', error, [
        String(walletId),
        value.address,
        String(heroData.tokenId),
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
          className="w-32"
          onClick={
            processingStatus === 'transfering'
              ? onConfirmOpen
              : onSetAddressOpen
          }
          appearance="border-primary"
          isLoading={processingStatus === 'transfering'}
          disabled={
            assetStatus === 'transfering' ||
            assetStatus === 'listing' ||
            (processingStatus !== 'none' && processingStatus !== 'transfering')
          }
        >
          Transfer
        </Button>
      </RequireSignatureHOC>

      <SetAddressModal
        isOpen={isSetAddressOpen}
        onClose={onSetAddressClose}
        onSubmit={handleTransfer}
      />
      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          approved ? null : (
            <ModalTitle className="text-white text-32 font-semibold">
              Transfer asset
            </ModalTitle>
          )
        }
        bottomRender={
          approved ? (
            <ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
              Transfering your asset...
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
      <HeroSuccessModal
        isOpen={isSuccessModalOpen}
        heroData={heroData}
        onClose={async () => {
          onCloseSuccessModal()
          // Time for the modal to close
          await wait(600)
          onSuccessModalClose()
        }}
        animation="slide-up"
        bottomRender={
          <div className="px-4">
            <ModalTitle className="text-white text-32 font-semibold mb-4">
              Transfer asset successfully!
            </ModalTitle>
            <div className="flex flex-col space-y-1 w-40 mx-auto">
              <Link href={ROUTES.PROFILE_MY_ASSETS_CHARACTERS}>
                <Button as="a">View other assets</Button>
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
    </>
  )
}
