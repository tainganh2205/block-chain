import React, { useState } from 'react'
import BigNumberjs from 'bignumber.js'
import { BigNumber } from 'ethers'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'
import { useAuthContext } from 'context/auth'
import { useMarketplaceContract, useLFWTokenContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import {
  LFW721_TOKEN_CONTRACT,
  LFW_TOKEN_CONTRACT,
  MARKETPLACE_CONTRACT,
} from 'constant/contracts'
import { ModelHeroData } from 'types/schema'
import { client } from 'libs'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { ASSET_STATUS } from 'constant/hero'
import { formatCurrency } from 'utils/currency'
import { Alert, AlertIcon, AlertTitle } from 'components/Alert'
import { AlertBody } from 'components/Alert/AlertBody'
import { wait } from 'utils/wait'
import Link from 'next/link'
import { ROUTES } from 'constant/routes'
import { convertEtherToWei } from 'utils/wallet'
import { HeroSuccessModal } from 'components/HeroSuccessModal'
import { mapHeroData } from 'utils/data'
import { Heading } from 'components/Heading'
import { useTransactionContext } from 'hooks/useTransactions'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { getScanLink } from 'utils/connector'
import { useWeb3React } from '@web3-react/core'
import { useGetBnbBalance, useGetTokenBalance } from 'hooks/useTokenBalance'
import { handleTransactionError } from 'utils/error'
import { IconCurrency } from 'components/IconCurrency'
import {
  BuyStepTransactionModal,
  BuyStepTransactionModalProps,
} from 'components/BuyStepTransactionModal'
import { useProfileAssetContext } from 'components/pages/profile/profile-asset-context'
import { formatNumber } from 'utils/number'

export interface BuySectionProps {
  hero: ModelHeroData
  refreshData?: () => void
}

export const BuySection = ({ hero, refreshData }: BuySectionProps) => {
  const [txHash, setTxHash] = useState<String>()
  const { openWalletModal, isWalletConnected, walletId } = useAuthContext()
  const lfwTokenContract = useLFWTokenContract()
  const marketplaceContract = useMarketplaceContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { chainId } = useWeb3React()
  const {
    isOpen: isSuccessModalOpen,
    onClose: onSuccessModalClose,
    onOpen: onOpenSuccessModal,
  } = useDisclosure()
  const { addTransaction } = useTransactionContext()
  const { balance: bnbBalance } = useGetBnbBalance()
  const { balance: lfwBalance } = useGetTokenBalance(LFW_TOKEN_CONTRACT)
  const useBnb = hero.symbol === 'BNB'

  const [step, setStep] = useState<BuyStepTransactionModalProps['step']>(
    useBnb ? 'processing' : 'approve',
  )
  const { processingStatus, setProcessingStatus } = useProfileAssetContext()

  const hasOwner = Boolean(hero?.ownerAddress)

  const isYourAsset = walletId === hero.ownerAddress

  const handleApprove = async () => {
    if (processingStatus !== 'none') {
      return
    }
    try {
      const allowance = await lfwTokenContract?.allowance(
        walletId as string,
        MARKETPLACE_CONTRACT,
      )
      if (!(allowance as BigNumber).gte(BigNumber.from(hero.price))) {
        const approveTx = await callWithGasPrice(lfwTokenContract!.approve, [
          MARKETPLACE_CONTRACT,
          BigNumber.from(hero.price),
        ])
        addTransaction(approveTx.hash, {
          summary: 'Approve LFW',
          approval: {
            tokenAddress: LFW_TOKEN_CONTRACT,
            spender: MARKETPLACE_CONTRACT,
          },
        })
        setProcessingStatus('approving-for-buying')
        const receipt = await approveTx.wait()
        if (receipt.status) {
          setStep('processing')
          handleBuyOnFleaMarket()
        } else {
          onClose()
          toast.error({
            title: 'Approve error',
          })
        }
      } else {
        setStep('processing')
        handleBuyOnFleaMarket()
      }
    } catch (error) {
      stopBuy()
      onClose()
      handleTransactionError('Approve error', error, [
        MARKETPLACE_CONTRACT,
        String(hero.tokenId),
      ])
    } finally {
      setProcessingStatus('none')
    }
  }

  const handleBuyOnFleaMarket = async () => {
    setStep('processing')
    if (processingStatus === 'buying') {
      return
    }
    try {
      const tx = await callWithGasPrice(
        marketplaceContract!.buy,
        [LFW721_TOKEN_CONTRACT, String(hero.tokenId), String(hero.price)],
        useBnb ? { value: hero.price } : {},
      )
      addTransaction(tx.hash, {
        summary: 'Buy asset',
      })
      setProcessingStatus('buying')
      const receipt = await tx.wait()
      if (receipt.status) {
        setTxHash(tx.hash)
        await client.postBuyHero({
          heroId: hero.id as string,
          price: hero.priceUSD as number,
          txHash: tx.hash,
          walletAddress: walletId as string,
          buyType: hero.marketplaceType as string,
        })
        onClose()
        await wait(300)
        onOpenSuccessModal()
      } else {
        onClose()
        setStep('processing')
        toast.error({
          title: 'Error',
          message: ERROR_MESSAGES.TRANSACTION_ERROR,
        })
      }
    } catch (error) {
      setStep('processing')
      stopBuy()
      handleTransactionError('Buy NFT error', error)
      onClose()
    } finally {
      setProcessingStatus('none')
    }
  }

  const checkCanBuy = async () => {
    try {
      await client.postCanBuyHero({
        heroId: hero.id as string,
        source: hero.marketplaceType as string,
      })
      return true
    } catch (error: any) {
      toast.error({
        title: 'Purchase error',
        message: error?.message,
      })
      return false
    }
  }

  const stopBuy = async () => {
    try {
      await client.postStopBuyHero({
        heroId: hero.id as string,
      })
    } catch (error: any) {
      console.error(error)
    }
  }

  const validate = () => {
    if (!hero.price) {
      return false
    }
    if (
      useBnb &&
      new BigNumberjs(bnbBalance.toString()).lt(new BigNumberjs(hero.price))
    ) {
      toast.error({
        title: ERROR_MESSAGES.INSUFFICIENT_BALANCE_ERROR,
      })
      return false
    }
    if (
      !useBnb &&
      new BigNumberjs(lfwBalance.toString()).lt(new BigNumberjs(hero.price))
    ) {
      toast.error({
        title: ERROR_MESSAGES.INSUFFICIENT_BALANCE_ERROR,
      })
      return false
    }
    return true
  }

  const handleBuyButtonClick = async () => {
    if (isWalletConnected) {
      if (
        processingStatus === 'approving-for-buying' ||
        processingStatus === 'buying'
      ) {
        onOpen()
        return
      }
      if (!validate()) return
      if (!checkCanBuy()) return
      onOpen()
      if (useBnb) {
        handleBuyOnFleaMarket()
      } else {
        handleApprove()
      }
    } else {
      openWalletModal()
    }
  }

  if (
    hero.status === ASSET_STATUS.BUYING ||
    hero.status === ASSET_STATUS.MINTING
  ) {
    return (
      <Alert status="info" className="mb-6 bg-gray-650">
        <AlertIcon />
        <AlertBody>
          <AlertTitle>This asset is pending for a purchase!</AlertTitle>
        </AlertBody>
      </Alert>
    )
  }

  return (
    <div className="flex justify-center lg:justify-end mb-10 lg:mb-0">
      <div className="flex lg:flex-row flex-col justify-center space-y-6 lg:space-y-0 items-center lg:space-x-5">
        <div className="text-center lg:text-right">
          <div className="flex items-center space-x-2">
            <IconCurrency
              className="h-8 w-8 object-scale-down"
              symbol={hero.symbol}
            />
            <Text
              as="span"
              className="text-2xl sm:text-32 font-bold"
              color="white"
            >
              {formatNumber(Number(convertEtherToWei(hero.price || 0)))}{' '}
              {hero.symbol}
            </Text>
          </div>
          <Text className="font-bold" color="gray-300">
            (~ {formatCurrency(hero.priceUSD || 0)})
          </Text>
        </div>
        {isYourAsset ? (
          <Link
            href={
              hero.status === ASSET_STATUS.LISTED
                ? ROUTES.PROFILE_ON_SALE_CHARACTERS_DETAIL.getUrl(
                    hero.id as string,
                  )
                : ROUTES.PROFILE_CHARACTERS_DETAIL.getUrl(hero.id as string)
            }
          >
            <Button className="min-w-[112px]">
              {hero.status === ASSET_STATUS.LISTED
                ? 'Update'
                : 'View your asset'}
            </Button>
          </Link>
        ) : (
          <RequireSignatureHOC>
            <Button
              isLoading={
                processingStatus === 'approving-for-buying' ||
                processingStatus === 'buying'
              }
              onClick={handleBuyButtonClick}
              disabled={
                (hero.status !== ASSET_STATUS.INIT &&
                  hero.status !== ASSET_STATUS.LISTED) ||
                (hasOwner && hero.status === ASSET_STATUS.MINTED)
              }
            >
              {hasOwner && hero.status === ASSET_STATUS.MINTED
                ? 'Sold Out'
                : 'Buy now'}
            </Button>
          </RequireSignatureHOC>
        )}
      </div>
      <HeroSuccessModal
        heroData={mapHeroData(hero || {})}
        isOpen={isSuccessModalOpen}
        onClose={async () => {
          onSuccessModalClose()
          await wait(300)
          if (refreshData) {
            refreshData()
          }
        }}
        bottomRender={
          <div className="max-w-xl mx-auto">
            <Heading as="h2" className="mt-1">
              Buy Character Successfully!
            </Heading>
            <Text color="gray-300" className="mb-6 mt-4">
              It might take about a few minutes to process your purchase. You
              can continue to buy more assets and view your purchase in Your
              Profile later.
            </Text>
            <div className="flex flex-col space-y-2 w-40 mx-auto">
              <Link href={ROUTES.MARKETPLACE_CHARACTERS.getUrl()}>
                <Button as="a">Buy more asset</Button>
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
      <BuyStepTransactionModal
        isOpen={isOpen}
        onClose={onClose}
        step={step}
        steps={useBnb ? ['Buy asset'] : ['Approve', 'Buy asset']}
        title="Buy asset"
        approveStepRender={
          processingStatus === 'approving-for-buying' ? (
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
        processingRender={
          processingStatus === 'buying' ? (
            <Text
              className="sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5 text-center"
              color="white"
            >
              Purchasing your asset...
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
    </div>
  )
}
