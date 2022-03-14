import { useState } from 'react'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { utils } from 'ethers'
import { useForm, FormProvider } from 'react-hook-form'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { Button } from 'components/Button'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'components/Modal'
import { toast } from 'components/Toast'
import { FormInput } from 'components/FormInput'
import { wait } from 'utils/wait'
import { VALIDATION_MESSAGES } from 'constant/validatorMessages'
import { Text } from 'components/Text'
import { useAuthContext } from 'context/auth'
import { ConsumableCardDetail } from 'components/ConsumableCardDetail'
import Link from 'next/link'
import { ItemSuccessModal } from 'components/ItemSuccessModal'
import { Heading } from 'components/Heading'
import { getScanLink } from 'utils/connector'
import { ROUTES } from 'constant/routes'
import { CONSUMABLE_STATUS } from 'constant/consumable'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { useWeb3React } from '@web3-react/core'
import NumberFormat from 'react-number-format'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useLFW1155TokenContract } from 'hooks/useContract'
import { useTransactionContext } from 'hooks/useTransactions'
import { client } from 'libs/apis'
import { ModelConsumableItemData } from 'types/schema'
import { mapConsumableData } from 'utils/data'
import { handleTransactionError } from 'utils/error'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { ConsumableType } from 'types/consumable'
import { useProfileAssetContext } from '../profile/profile-asset-context'

interface SetAddressFormValues {
  address: string
}

interface SetAddressModalProps extends ModalProps {
  onSubmit: (address: string, quantity: number) => void
  maxQuantity: number
}

const SetAddressModal = ({
  onSubmit,
  maxQuantity,
  ...props
}: SetAddressModalProps) => {
  const formInstance = useForm<SetAddressFormValues>({
    defaultValues: { address: '' },
  })
  const [quantity, setQuantity] = useState(0)
  const { handleSubmit } = formInstance
  const { walletId } = useAuthContext()

  const isValidQuantity = quantity <= maxQuantity

  const internalOnSubmit = (values: SetAddressFormValues) => {
    onSubmit(values.address, quantity)
  }

  return (
    <Modal {...props}>
      <ModalContent size="max-w-md">
        <ModalCloseButton />
        <FormProvider {...formInstance}>
          <form className="w-full" onSubmit={handleSubmit(internalOnSubmit)}>
            <div className="flex flex-col items-center text-center space-y-6">
              <ModalTitle className="text-2xl font-bold mb-1">
                Transfer asset
              </ModalTitle>
              <div className="w-full text-left">
                <Text className="mb-3">Address</Text>
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
              </div>
              <div className="w-full text-left">
                <Text className="mb-3">Quantity</Text>
                <div className="bg-gray-600 rounded-md flex h-10 justify-between w-full">
                  <NumberFormat
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(Number(e.target.value.replace(/,/g, '')))
                    }}
                    thousandSeparator
                    className="bg-transparent text-gray-350 font-semibold px-4 outline-none flex-1"
                    inputMode="numeric"
                    decimalScale={0}
                    allowNegative={false}
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
                  className="px-4"
                  type="submit"
                  disabled={!isValidQuantity || quantity <= 0}
                >
                  {!isValidQuantity
                    ? 'Insufficient Quantity'
                    : 'Transfer to this address'}
                </Button>
              </RequireSignatureHOC>
            </div>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}

interface TransferAssetButtonProps {
  consumable?: ModelConsumableItemData
  onSuccess: () => void
  onSuccessModalClose: () => void
  isOpeningChest: boolean
}

export const TransferAssetButton = (props: TransferAssetButtonProps) => {
  const { consumable, onSuccessModalClose, onSuccess, isOpeningChest } = props
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
  const lfw1155Contract = useLFW1155TokenContract()
  const { addTransaction } = useTransactionContext()
  const assetStatus = consumable?.status
  const consumableCardProps = mapConsumableData(consumable || {})

  const handleTransfer = async (
    destinationAddress: string,
    quantity: number,
  ) => {
    setApproved(false)
    try {
      onSetAddressClose()
      await wait(200)
      onConfirmOpen()
      const tx = await callWithGasPrice(lfw1155Contract!.safeTransferFrom, [
        String(walletId),
        destinationAddress,
        String(consumable?.tokenId),
        quantity,
        utils.formatBytes32String(''),
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
        await client.postTransferConsumable(
          consumable?.itemType as ConsumableType,
          {
            tokenId: consumable?.tokenId as number,
            quantity,
            walletAddress: walletId as string,
            receiverAddress: destinationAddress,
            txHash: tx.hash,
          },
        )
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
        destinationAddress,
        String(consumable?.tokenId),
        quantity,
        utils.formatBytes32String(''),
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
        onClick={
          processingStatus === 'transfering' ? onConfirmOpen : onSetAddressOpen
        }
        appearance="border-primary"
        isLoading={processingStatus === 'transfering'}
        disabled={
          assetStatus === CONSUMABLE_STATUS.TRANSFERING ||
          isOpeningChest ||
          assetStatus === CONSUMABLE_STATUS.LISTING ||
          (processingStatus !== 'none' && processingStatus !== 'transfering')
        }
      >
        Transfer
      </Button>

      <SetAddressModal
        isOpen={isSetAddressOpen}
        onClose={onSetAddressClose}
        onSubmit={handleTransfer}
        maxQuantity={consumable?.quantity as number}
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
      <ItemSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={async () => {
          onCloseSuccessModal()
          await wait(600)
          onSuccessModalClose()
        }}
        itemRender={<ConsumableCardDetail {...consumableCardProps} />}
        bottomRender={
          <div className="max-w-xl mx-auto">
            <Heading as="h2" className="mb-4">
              Transfer asset successfully!
            </Heading>
            <div className="flex flex-col space-y-2 w-40 mx-auto">
              <Link
                href={`${ROUTES.PROFILE_MY_ASSETS_CONSUMABLES}?type=${consumable?.itemType}`}
              >
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
