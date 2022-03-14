import { useMemo, useState } from 'react'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { BigNumber } from 'ethers'
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
import { wait } from 'utils/wait'
import { Text } from 'components/Text'
import { useAuthContext } from 'context/auth'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import NumberFormat from 'react-number-format'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useLFW1155TokenContract } from 'hooks/useContract'
import { useTransactionContext } from 'hooks/useTransactions'
import { client } from 'libs/apis'
import { ModelChestResultData, ModelConsumableItemData } from 'types/schema'
import { handleTransactionError } from 'utils/error'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { useIsChestLocked } from 'hooks/consumables/useIsChestLocked'
import { Tooltip } from 'components/Tooltip'
import { IconHelpCircle } from 'components/icons/components/IconHelpCircle'
import { FetchStatus } from 'constant/commons'
import { Skeleton } from 'components/Skeleton'
import { CONSUMABLE_STATUS } from 'constant/consumable'
import { OpenChestSuccess } from './OpenChestSuccess'

interface SetQuantityModalProps extends ModalProps {
  onSubmit: (quantity: number) => void
  maxQuantity: number
}

const MAX_CHEST_CAN_OPEN = 10

const SetQuantityModal = ({
  onSubmit,
  maxQuantity,
  ...props
}: SetQuantityModalProps) => {
  const [quantity, setQuantity] = useState(0)

  const isInsufficient = quantity > maxQuantity
  const isExceedMaxQuantity = quantity > MAX_CHEST_CAN_OPEN

  const buttonLabel = useMemo(() => {
    if (isInsufficient) {
      return 'Insufficient Quantity'
    } if (isExceedMaxQuantity) {
      return `You can only open ${MAX_CHEST_CAN_OPEN} chests at a time`
    }
    return 'Open'
  }, [isInsufficient, isExceedMaxQuantity])

  return (
    <Modal {...props}>
      <ModalContent size="max-w-md">
        <ModalCloseButton />
        <form
          className="w-full"
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit(quantity)
            setQuantity(0)
          }}
        >
          <div className="flex flex-col items-center text-center">
            <ModalTitle className="text-2xl font-bold mb-6">
              Open Chest
            </ModalTitle>
            <div className="w-full text-left mb-8">
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
                  onClick={() =>
                    setQuantity(Math.min(maxQuantity, MAX_CHEST_CAN_OPEN))
                  }
                >
                  Max
                </button>
              </div>
            </div>
            <RequireSignatureHOC>
              <Button
                className="px-4 w-full"
                type="submit"
                disabled={
                  isInsufficient || isExceedMaxQuantity || quantity <= 0
                }
              >
                {buttonLabel}
              </Button>
            </RequireSignatureHOC>
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}

export interface OpenChestButtonProps {
  data?: ModelConsumableItemData
  onSuccessModalClose: () => void
  isOpeningChest: boolean
  setIsOpeningChest: (isOpeningChest: boolean) => void
}

export const OpenChestButton = ({
  data,
  onSuccessModalClose,
  isOpeningChest,
  setIsOpeningChest,
}: OpenChestButtonProps) => {
  const [assets, setAssets] = useState<ModelChestResultData[] | null>(null)
  const [approved, setApproved] = useState(false)
  const { walletId } = useAuthContext()
  const { callWithGasPrice } = useCallWithGasPrice()
  const lfw1155Contract = useLFW1155TokenContract()
  const { addTransaction } = useTransactionContext()
  const { locked, status } = useIsChestLocked()

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

  const {
    isOpen: isSuccessModalOpen,
    onClose: onCloseSuccessModal,
    onOpen: onOpenSuccessModal,
  } = useDisclosure()

  const handleOpenChest = async (quantity: number) => {
    setApproved(false)
    try {
      onSetQuantityClose()
      await wait(200)
      onConfirmOpen()
      const fee = await lfw1155Contract?.openChestFee()
      if (!fee || !BigNumber.isBigNumber(fee)) {
        onConfirmClose()
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
        return
      }
      const tx = await callWithGasPrice(
        lfw1155Contract!.openChest,
        [data?.tokenId as number, quantity],
        {
          value: fee.mul(BigNumber.from(quantity)),
        },
      )
      setIsOpeningChest(true)
      setApproved(true)
      const txHash = tx.hash
      addTransaction(txHash, {
        summary: 'Open Chest',
      })
      const receipt = await tx.wait()
      if (receipt.status && walletId) {
        // @ts-ignore
        const eventLogs = receipt.events.find(
          (log: any) =>
            log.address === lfw1155Contract?.address &&
            log.event === 'OpenTreasuryChest',
        )
        if (!eventLogs) {
          onConfirmClose()
          toast.error({
            title: 'Error',
            message: ERROR_MESSAGES.TRANSACTION_ERROR,
          })
          return
        }
        const parsedLog = lfw1155Contract?.interface.parseLog(eventLogs)
        if (!parsedLog || !parsedLog.args.chest_id) {
          onConfirmClose()
          toast.error({
            title: 'Error',
            message: ERROR_MESSAGES.TRANSACTION_ERROR,
          })
          return
        }
        const response = await client.postOpenChest(data?.id as string, {
          amount: quantity,
          walletAddress: walletId,
          txHash,
          chestId: (parsedLog?.args.chest_id as BigNumber).toNumber(),
        })
        if (response && Array.isArray(response.data)) {
          setAssets(response.data)
          onConfirmClose()
          await wait(200)
          onOpenSuccessModal()
        } else {
          onConfirmClose()
          toast.error({
            title: 'Error',
            message: ERROR_MESSAGES.TRANSACTION_ERROR,
          })
        }
      } else {
        onConfirmClose()
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      handleTransactionError('Open chests error', error, [
        data?.tokenId as number,
        quantity,
      ])
      onConfirmClose()
    } finally {
      setIsOpeningChest(false)
    }
  }

  return (
    <div className="flex justify-center items-center space-x-4 lg:justify-end mb-10 lg:mb-0">
      {locked && (
        <Tooltip
          label={
            <div>
              <Text className="text-gray-900">
                This function is not available now
              </Text>
            </div>
          }
        >
          <IconHelpCircle className="text-gray-300" />
        </Tooltip>
      )}
      {status === FetchStatus.SUCCESS ? (
        <Button
          onClick={isOpeningChest ? onConfirmOpen : onSetQuantityOpen}
          isLoading={isOpeningChest}
          disabled={locked || data?.status === CONSUMABLE_STATUS.OPENING}
        >
          Open chest
        </Button>
      ) : (
        <Skeleton className="w-32 h-10 rounded-md" />
      )}
      <SetQuantityModal
        isOpen={isSetQuantityOpen}
        onSubmit={handleOpenChest}
        onClose={onSetQuantityClose}
        maxQuantity={data?.quantity as number}
      />
      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={
          approved ? null : (
            <ModalTitle className="text-white text-32 font-semibold">
              Open chest
            </ModalTitle>
          )
        }
        bottomRender={
          approved ? (
            <ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
              Opening chest...
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
      {assets && (
        <OpenChestSuccess
          isOpen={isSuccessModalOpen}
          onClose={async () => {
            onCloseSuccessModal()
            await wait(300)
            setAssets(null)
            onSuccessModalClose()
          }}
          assets={assets}
        />
      )}
    </div>
  )
}
