import { useDisclosure } from '@dwarvesf/react-hooks'
import { Button } from 'components/Button'
import { HeroSuccessModal } from 'components/HeroSuccessModal'
import { BigNumber } from 'ethers'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { ROUTES } from 'constant/routes'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useLFWNFTContract, useMarketplaceContract } from 'hooks/useContract'
import Link from 'next/link'
import { useState } from 'react'
import { wait } from 'utils/wait'
import { useAuthContext } from 'context/auth'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { LFW721_TOKEN_CONTRACT, MARKETPLACE_CONTRACT } from 'constant/contracts'
import { toast } from 'components/Toast'
import { client } from 'libs'
import { toEtherUnit } from 'utils/wallet'
import {
  HeroStepTransactionModal,
  HeroStepTransactionModalProps,
} from 'components/StepTransactionModal'
import { mapHeroData } from 'utils/data'
import { ModelHeroDetail } from 'types/schema'
import { useTransactionContext } from 'hooks/useTransactions'
import { formatNumber } from 'utils/number'
import { MAX_PRICE, MIN_PRICE } from 'constant/marketplace'
import { handleTransactionError } from 'utils/error'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { IconCurrency } from 'components/IconCurrency'
import { useProfileAssetContext } from './profile-asset-context'

interface SellAssetButtonProps {
  heroData: ModelHeroDetail
  onSuccess: () => void
}

export const SellAssetButton = (props: SellAssetButtonProps) => {
  const [step, setStep] =
    useState<HeroStepTransactionModalProps['step']>('approve')
  const { processingStatus, setProcessingStatus } = useProfileAssetContext()
  const { heroData, onSuccess } = props
  const { walletId } = useAuthContext()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [value, setValue] = useState<string>('')
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const { callWithGasPrice } = useCallWithGasPrice()
  const lfwNFTContract = useLFWNFTContract()
  const marketplaceContract = useMarketplaceContract()
  const { addTransaction } = useTransactionContext()

  const handleApprove = async () => {
    onConfirmOpen()

    if (processingStatus !== 'none') {
      return
    }

    try {
      const address = await lfwNFTContract?.getApproved(
        BigNumber.from(heroData?.heroInfo?.tokenId),
      )

      if (address !== MARKETPLACE_CONTRACT) {
        const approveTx = await callWithGasPrice(lfwNFTContract!.approve, [
          MARKETPLACE_CONTRACT,
          String(heroData?.heroInfo?.tokenId),
        ])
        addTransaction(approveTx.hash, {
          summary: 'Approve asset',
          approval: {
            tokenAddress: LFW721_TOKEN_CONTRACT,
            spender: MARKETPLACE_CONTRACT,
          },
        })
        setProcessingStatus('approving-for-selling')
        const receipt = await approveTx.wait()
        if (receipt.status) {
          setStep('form-input')
        } else {
          toast.error({
            title: 'Approve error',
          })
        }
      } else {
        setStep('form-input')
      }
    } catch (error) {
      onConfirmClose()
      handleTransactionError('Approve error', error, [
        MARKETPLACE_CONTRACT,
        String(heroData?.heroInfo?.tokenId),
      ])
    } finally {
      setProcessingStatus('none')
    }
  }

  const sellAsset = async () => {
    if (Number(value) < MIN_PRICE || Number(value) > MAX_PRICE) {
      toast.info({
        title: 'Out of range',
        message: `The price must be in range of ${MIN_PRICE} and ${formatNumber(
          MAX_PRICE,
        )}`,
      })
      return
    }

    setStep('processing')
    if (processingStatus === 'selling') {
      return
    }

    try {
      const tx = await callWithGasPrice(marketplaceContract!.createListing, [
        LFW721_TOKEN_CONTRACT,
        String(heroData.heroInfo?.tokenId),
        toEtherUnit(value),
      ])
      const txHash = tx.hash
      addTransaction(txHash, {
        summary: 'Listing NFT',
      })
      setProcessingStatus('selling')
      const receipt = await tx.wait()
      if (receipt.status) {
        await client.postSellAsset({
          heroId: heroData.heroInfo?.id as string,
          walletAddress: walletId as string,
          txHash: tx.hash,
        })
        onConfirmClose()
        await wait(200)
        onOpen()
      } else {
        setStep('form-input')
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      setStep('form-input')
      handleTransactionError('Listing NFT error', error)
      onConfirmClose()
    } finally {
      setProcessingStatus('none')
    }
  }

  const assetStatus = heroData.heroInfo?.status

  return (
    <>
      <RequireSignatureHOC>
        <Button
          className="w-32"
          isLoading={
            processingStatus === 'approving-for-selling' ||
            processingStatus === 'selling'
          }
          disabled={
            assetStatus === 'transfering' ||
            assetStatus === 'listing' ||
            (processingStatus !== 'none' && processingStatus !== 'selling')
          }
          onClick={handleApprove}
        >
          Sell
        </Button>
      </RequireSignatureHOC>

      <HeroStepTransactionModal
        hero={heroData}
        isOpen={isConfirmOpen}
        onClose={async () => {
          onConfirmClose()
          await wait(100)
          setValue('')
        }}
        step={step}
        steps={['Approve', 'Sell asset']}
        title="Sell asset"
        approveStepRender={
          processingStatus === 'approving-for-selling' ? (
            <Text
              className="sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5 text-center"
              color="white"
            >
              Approving your asset...
            </Text>
          ) : (
            <Text className="max-w-xs text-center mx-auto my-5">
              To sell your asset, you have to approve for marketplace to sell
              your asset first. Please confirm in your connected wallet.
            </Text>
          )
        }
        formRender={
          <div className="space-y-2">
            <Text>Price</Text>
            <div className="flex sm:flex-row flex-col sm:space-x-2 sm:space-y-0 space-y-2 items-center">
              <div className="bg-gray-600 rounded-md flex h-10 justify-between w-full">
                <input
                  placeholder="Price"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                  }}
                  type="number"
                  className="w-3/4 bg-transparent text-lg font-medium text-white pl-4 outline-none flex-1 placeholder-opacity-25 placeholder-white appearance-none"
                  inputMode="decimal"
                />
                <div className="flex items-center space-x-2 px-4">
                  <IconCurrency
                    className="h-5 w-5 object-scale-down flex-none"
                    symbol={heroData.heroInfo?.symbol ?? 'BNB'}
                  />
                  <Text color="white" as="b">
                    {heroData.heroInfo?.symbol ?? 'BNB'}
                  </Text>
                </div>
              </div>
              <Button
                onClick={sellAsset}
                disabled={!value}
                className="sm:w-auto w-full"
                appearance="gradient"
              >
                Sell asset
              </Button>
            </div>
          </div>
        }
        processingRender={
          processingStatus === 'selling' ? (
            <Text
              className="sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5 text-center"
              color="white"
            >
              Selling your asset...
            </Text>
          ) : (
            <div className="space-y-1.5 max-w-sm text-center mx-auto my-4">
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
        isOpen={isOpen}
        heroData={mapHeroData(heroData.heroInfo || {})}
        onClose={async () => {
          onClose()
          await wait(300)
          onSuccess()
        }}
        animation="slide-up"
        bottomRender={
          <div className="px-4">
            <ModalTitle className="text-white text-32 font-semibold">
              Your asset has been listed on marketplace
            </ModalTitle>
            <Text className="mb-8 mt-2">
              You can unlist your asset or update price later in “On Sale” tab
            </Text>
            <div className="flex flex-col space-y-1 w-40 mx-auto">
              <Link href={ROUTES.PROFILE_MY_ASSETS_CHARACTERS}>
                <Button as="a">View other assets</Button>
              </Link>
              <Link href={ROUTES.PROFILE_ON_SALE_CHARACTERS}>
                <Button as="a" appearance="link">
                  View on-sale assets
                </Button>
              </Link>
            </div>
          </div>
        }
      />
    </>
  )
}
