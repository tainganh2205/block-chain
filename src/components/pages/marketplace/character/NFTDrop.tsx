import React, { useState, useRef } from 'react'
import { utils, BigNumber } from 'ethers'
import { Heading } from 'components/Heading'
import Link from 'next/link'
import { NFTDropHeroCard } from 'components/NFTDropHeroCard'
import { Card } from 'components/Card'
import { Text } from 'components/Text'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { Button } from 'components/Button'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs'
import { ROUTES } from 'constant/routes'
import { Skeleton } from 'components/Skeleton'
import { BlockchainLoadingModal } from 'components/BlockchainLoadingModal'
import { ModalTitle } from 'components/Modal'
import { toast } from 'components/Toast'
import { HeroSuccessModal } from 'components/HeroSuccessModal'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useLFWNFTContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useTransactionContext } from 'hooks/useTransactions'
import { useGetMintDropPrice } from 'hooks/useGetMintDropPrice'
import { ERROR_MESSAGES } from 'constant/errorMessages'
import { wait } from 'utils/wait'
import { mapHeroData } from 'utils/data'
import { getScanLink } from 'utils/connector'
import { useAuthContext } from 'context/auth'
import { ModelHeroData } from 'types/schema'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import CountUp from 'react-countup'
import { formatNumber } from 'utils/number'
import { ElementalType } from 'components/ElementalBadge'
import { handleTransactionError } from 'utils/error'

const MarketplaceNFTDrop = () => {
  const { data, isFirstLoading } = useFetchWithCache(
    GET_PATHS.nftDrop,
    () => client.getNFTDrop(),
    // check new minted number every 20s
    { refreshInterval: 20000 },
  )

  const { walletId, isWalletConnected, openWalletModal } = useAuthContext()
  const lfwNftContract = useLFWNFTContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { addTransaction } = useTransactionContext()
  const { price } = useGetMintDropPrice()
  const { chainId } = useWeb3React()
  const [submitting, setSubmitting] = useState(false)
  const [approved, setApproved] = useState(false)
  const [txHash, setTxHash] = useState<String>()
  const [hero, setHero] = useState<ModelHeroData | null>(null)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    isOpen: isSuccessModalOpen,
    onClose: onSuccessModalClose,
    onOpen: onOpenSuccessModal,
  } = useDisclosure()
  const locked = useRef(false)

  const heroes = data?.data || []

  const totalNFT = heroes.reduce(
    (previousValue, item) => Number(previousValue) + Number(item.quantity),
    0,
  )

  const previousTotalMintedNFT = useRef(0)
  const totalMintedNFT = heroes.reduce(
    (previousValue, item) => Number(previousValue) + Number(item.mintedAmount),
    0,
  )

  const handleMint = async () => {
    if (!submitting && !locked.current && price) {
      try {
        locked.current = true
        onOpen()
        setApproved(false)
        const tx = await callWithGasPrice(lfwNftContract!.mintDrop, [], {
          value: utils.formatUnits(price, 'wei'),
        })
        setSubmitting(true)
        setApproved(true)
        addTransaction(tx.hash, {
          summary: 'Mint hero',
        })
        const { status, logs } = await tx.wait()
        if (status && logs.length > 0) {
          setTxHash(tx.hash)
          const { topics } = logs[0]
          if (topics.length > 0) {
            const topic = topics[topics.length - 1]
            const response = await client.dropNFT({
              txHash: tx.hash,
              walletAddress: walletId as string,
              tokenId: BigNumber.from(topic).toNumber(),
            })
            setHero(response.data)
            onClose()
            await wait(300)
            onOpenSuccessModal()
          } else {
            onClose()
            toast.error({
              title: 'Error',
              message: ERROR_MESSAGES.TRANSACTION_ERROR,
            })
          }
        } else {
          onClose()
          toast.error({
            title: 'Error',
            message: ERROR_MESSAGES.TRANSACTION_ERROR,
          })
        }
      } catch (error) {
        handleTransactionError('Mint error', error)
        onClose()
      } finally {
        setSubmitting(false)
        if (locked.current) {
          locked.current = false
        }
      }
    }
  }

  const handleMintButtonClick = () => {
    if (isWalletConnected) {
      if (submitting) {
        onOpen()
      } else {
        handleMint()
      }
    } else {
      openWalletModal()
    }
  }

  let bodyRender: React.ReactNode = null

  if (isFirstLoading) {
    bodyRender = (
      <Card
        className="px-6 xl:px-80 py-10 text-center flex flex-col justify-center items-center max-h-[741px]"
        color="gray-900"
        shadow
        spacing={false}
      >
        <Skeleton className="h-8 w-1/5 rounded max-w-sm" />
        <Skeleton className="h-5 w-1/5 rounded mt-3 mb-8 max-w-sm" />
        <Skeleton className="h-5 w-full rounded my-2" />
        <Skeleton className="h-5 w-1/2 rounded mb-6 max-w-sm" />
        <div className="w-[231px] h-[335px] mb-6">
          <div className="relative pb-[145%]">
            <div className="absolute inset-0 opacity-50">
              <Skeleton className="absolute inset-0 rounded-2xl" />
            </div>
            <div className="w-44 p-2 absolute top-[40%] right-[12%]">
              <Skeleton className="rounded h-8 opacity-50" />
            </div>
          </div>
        </div>
        <Skeleton className="h-10 mb-4 w-44 rounded" />
        <Skeleton className="h-5 w-36 rounded" />
      </Card>
    )
  } else if (totalMintedNFT === totalNFT) {
    bodyRender = (
      <Card
        className="py-16 px-6 xl:px-96 text-center flex flex-col justify-center items-center"
        color="gray-900"
        shadow
        spacing={false}
      >
        <Heading as="h2" className="uppercase">
          Sold out
        </Heading>
        <Text className="mt-2 mb-5 max-w-md">
          We’ve temporarily sold out all Legend NFT Hero. You can view Flea
          Market to purchase NFT from other owners.
        </Text>
        <ImageWithFallback
          className="max-h-[282px] mb-16 mt-10"
          src="/img/marketplace/nftdrop/nft-characters.webp"
          fallback="/img/marketplace/nftdrop/nft-characters.png"
          alt=""
        />
        <Button
          as="a"
          href="/marketplace/characters?marketType=flea-market"
          className="w-44"
        >
          View flea market
        </Button>
      </Card>
    )
  } else {
    bodyRender = (
      <>
        <Card
          className="px-6 xl:px-80 py-10 text-center flex flex-col justify-center items-center max-h-[741px]"
          color="gray-900"
          shadow
          spacing={false}
        >
          <div className="flex text-30 sm:text-32 text-white tabular-nums font-bold">
            <div className="relative">
              <CountUp
                className="absolute inset-0"
                start={previousTotalMintedNFT.current}
                end={totalMintedNFT}
                onEnd={() => {
                  previousTotalMintedNFT.current = totalMintedNFT
                }}
                duration={Math.min(totalMintedNFT / 100, 2)}
                separator=","
              />
              <div className="opacity-0 pr-2" aria-hidden>
                {formatNumber(totalMintedNFT)}
              </div>
            </div>
            /{formatNumber(totalNFT)}
          </div>
          <Text className="mt-3 mb-8">Total Legends minted</Text>
          <Text className="mb-6">
            Get your chance to own a Legend NFT Hero with proof of ownership
            stored on the Binance Smart Chain. Total 9,000 Legend NFTs will be
            dropped. Grab your ticket to the multiverse now.
          </Text>
          <div className="relative w-[231px] h-[335px] mb-6">
            <ImageWithFallback
              src="/img/marketplace/nftdrop/unknowhero.webp"
              fallback="/img/marketplace/nftdrop/unknowhero.png"
              alt=""
            />
            <Card
              className="w-44 p-2 absolute top-[40%] right-[12%]"
              color="gray-900"
              shadow
              spacing={false}
            >
              <Text as="b" color="white">
                ???
              </Text>
            </Card>
          </div>
          <MintButton
            className="mb-4 w-44"
            isLoading={submitting}
            onClick={handleMintButtonClick}
          >
            {isWalletConnected
              ? `Mint now (${utils.formatEther(price)} BNB)`
              : 'Connect Wallet'}
          </MintButton>
          <a href="#nft-drop">
            <Text as="span" className="text-primary text-base cursor-pointer">
              What you could have?
            </Text>
          </a>
        </Card>
        <div className="px-5 xl:px-44 sm:pt-14 pt-6" id="nft-drop">
          <Heading as="h2" className="text-center">
            N-Rarity Legends
          </Heading>
          {heroes.map((hero, index) => (
            <NFTDropHeroCard
              key={index}
              name={hero.name}
              quantity={hero.quantity}
              growth={hero.growth}
              maxGrowth={hero.maxGrowth}
              strength={hero.strength}
              vitality={hero.vitality}
              dexterity={hero.dexterity}
              intelligence={hero.intelligence}
              heroAvatar={hero.heroAvatar}
              element={hero.element?.toLowerCase() as ElementalType}
              skill={hero.skill}
              reversed={index % 2 !== 0}
            />
          ))}
        </div>
        <div className="flex flex-col justify-center items-center mb-52">
          <Heading as="h2" className="text-center my-2">
            Start to mint
          </Heading>
          <Text className="text-center max-w-lg">
            Get your chance to own a Legend NFT Hero, with proof of ownership
            stored on the Binance Smart Chain. Total 9,000 Legend NFTs will be
            dropped. Grab your ticket to the multiverse now.
          </Text>
          <MintButton
            className="mt-36 w-44"
            isLoading={submitting}
            onClick={handleMintButtonClick}
          >
            {isWalletConnected
              ? `Mint now (${utils.formatEther(price)} BNB)`
              : 'Connect Wallet'}
          </MintButton>
        </div>
        <BlockchainLoadingModal
          isOpen={isOpen}
          onClose={onClose}
          topRender={
            approved ? null : (
              <ModalTitle className="text-white text-32 font-semibold">
                Mint NFT
              </ModalTitle>
            )
          }
          bottomRender={
            approved ? (
              <ModalTitle className="text-white text-30 font-semibold pb-10 pt-5">
                Processing your transaction...
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
          heroData={mapHeroData(hero || {})}
          isOpen={isSuccessModalOpen}
          onClose={async () => {
            onSuccessModalClose()
            await wait(300)
            setHero(null)
          }}
          bottomRender={
            <div className="max-w-xl mx-auto">
              <Heading as="h2" className="mt-1">
                Mint asset successfully
              </Heading>
              <Text color="gray-300" className="mb-6 mt-4">
                It might take about a few minutes to process your purchase. You
                can continue to buy more assets and view your purchase in Your
                Profile later.
              </Text>
              <div className="flex flex-col space-y-2 w-40 mx-auto">
                <Link href={ROUTES.PROFILE_MY_ASSETS_CHARACTERS}>
                  <Button>View assets</Button>
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

  return <div className="">{bodyRender}</div>
}

interface MintButtonProps {
  isLoading?: boolean
  onClick: () => void
  className?: string
  children?: React.ReactNode
}

const MintButton = ({
  className,
  isLoading = false,
  onClick,
  children,
}: MintButtonProps) => {
  const { isWalletConnected } = useAuthContext()

  const buttonRender = (
    <Button className={className} isLoading={isLoading} onClick={onClick}>
      {children}
    </Button>
  )

  if (!isWalletConnected) {
    return buttonRender
  }

  return <RequireSignatureHOC>{buttonRender}</RequireSignatureHOC>
}

export default MarketplaceNFTDrop
