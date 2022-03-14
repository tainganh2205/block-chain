import React, { useEffect, useMemo, useState, useRef } from 'react'
import cx from 'classnames'
import { Card } from 'components/Card'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { IconViewTransaction } from 'components/icons/components/IconViewTransaction'
import { IconCountdown } from 'components/icons/components/IconCountdown'
import { Skeleton } from 'components/Skeleton'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { useAsyncEffect, useDisclosure } from '@dwarvesf/react-hooks'
import { useWeb3React } from '@web3-react/core'
import { formatNumber } from 'utils/number'
import { getScanLink } from 'utils/connector'
import { PoolStatus } from 'types/common'
import { noop } from '@dwarvesf/react-utils'
import { client } from 'libs'
import { MINING_POOL_ADDRESS } from 'constant/contracts'
import dynamic from 'next/dynamic'
import { IconSpinner } from 'components/icons/components/IconSpinner'
import { get } from 'lodash'
import { useMiningContract } from '../../../hooks/useContract'
import useFetch from '../../../hooks/useFetch'

const StakeButtonChest = dynamic(() => import('./staking/StakeButtonChest'), {
  ssr: false,
})

const StakeButtonLFW = dynamic(() => import('./staking/StakeButtonLFW'), {
  ssr: false,
})
const StakeButtonLegend = dynamic(() => import('./staking/StakeButtonLegend'), {
  ssr: false,
})
const AddWhitelistNftButton = dynamic(() => import('./AddWhitelistNftButton'), {
  ssr: false,
})

const EnableContractChestButton = dynamic(
  () => import('./EnableContractChestButton'),
  {
    ssr: false,
  },
)
const EnableContractLfwButton = dynamic(
  () => import('./EnableContractLfwButton'),
  {
    ssr: false,
  },
)
const EnableContractNftButton = dynamic(
  () => import('./EnableContractNFTButton'),
  {
    ssr: false,
  },
)
const hiddenHeroImage = '/img/hero/sample.png'

export interface StakeMainCardProps {
  isEnded?: boolean
  chestBalance: string
  lfwBalance: number
  poolStatus?: PoolStatus
  startBlock: number
  endBlock: number
  currentBlock: number
  onSuccess?: () => void
}

export const StakeMainCard = (props: StakeMainCardProps) => {
  const {
    poolStatus = 'UNDETERMINED',
    isEnded = false,
    chestBalance,
    lfwBalance,
    currentBlock,
    startBlock,
    endBlock,
    onSuccess = noop,
  } = props

  const [chestApproved, setChestApproved] = useState(false)
  const [lfwApproved, setLfwApproved] = useState(false)
  const [isStaked, setIsStaked] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false)
  const [nftApproved, setNftApproved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nftDeposit, setNftDeposit] = useState(0)
  const [lfwDeposit, setLfwDeposit] = useState(0)
  const [tokenId, setTokenId] = useState(0)
  const [statusWhitelist, setStatusWhitelist] = useState('')
  const [chestDeposit, setChestDeposit] = useState(0)
  const debouncedFilterBody = {
    element: [],
    growthFrom: 1,
    growthTo: 15,
    name: '',
    pageNumber: 1,
    pageSize: 16,
    quality: [],
    rank: 0,
    rarity: [],
  }

  let token: { address: any } | null = null
  if (typeof window !== 'undefined') {
    // @ts-ignore
    token = JSON.parse(localStorage.getItem('lfw-signature'))
  }
  const { data: responseHeros }: any = useFetch(() => {
    return client.getProfileAssets(debouncedFilterBody, token?.address)
  }, [JSON.stringify(debouncedFilterBody)])

  const isDisabled = React.useMemo(() => {
    let heros = []
    if (get(responseHeros, 'data', []).length) {
      heros = responseHeros.data.filter(
        (hero: { power: number }) => hero.power >= 15000,
      )
    }
    const isNotEnoughBalance =
      lfwBalance < 100 ||
      !heros.length ||
      parseFloat((chestBalance || '0').replace(/,/g, '')) < 5
    return !isStaked && isNotEnoughBalance
  }, [responseHeros, chestBalance, isStaked, lfwBalance])

  const contract = useMiningContract()

  const onSuccessDeposit = React.useCallback(() => {
    setIsStaked(true)
    setIsRefresh(!isRefresh)
    onSuccess()
    setLfwApproved(false)
    setChestApproved(false)
    setNftApproved(false)
  }, [isRefresh, onSuccess])

  const onEnabledChestContractSuccess = (approve: any) => {
    setChestApproved(approve)
  }

  const onEnabledLfwContractSuccess = (approve: any) => {
    setLfwApproved(approve)
  }

  const onEnabledNftContractSuccess = (approve: any) => {
    setNftApproved(approve)
  }

  const onEnabledLegendContractSuccess = React.useCallback(() => {
    setIsRefresh(!isRefresh)
  }, [isRefresh])

  useAsyncEffect(async () => {
    setLoading(true)
    const statusWhitelist: any = await client.getStatusAddWhitelistMining(
      token?.address,
    )
    const history: any = await contract?.getNumberDeposit(token?.address)
    const number = +history.toString() + 1
    const tokenId: any = await contract?.getWhitelistedTokenID(
      token?.address,
      number,
    )
    const nft: any = await contract?.getStatusNFT(token?.address, number)
    const lfw: any = await contract?.getStatusLFW(token?.address, number)
    const chest: any = await contract?.getStatusChest(token?.address, number)
    setStatusWhitelist(statusWhitelist.data.status)
    setTokenId(+tokenId.toString())
    setChestDeposit(+chest.toString())
    setLfwDeposit(+lfw.toString())
    setNftDeposit(+nft.toString())
    setLoading(false)
  }, [isRefresh])

  useEffect(() => {
    if (chestDeposit || lfwDeposit || nftDeposit) {
      setIsStaked(true)
    }
  }, [chestDeposit, lfwDeposit, nftDeposit])

  const { isOpen } = useDisclosure()

  const { chainId } = useWeb3React()

  const startIn = useMemo(() => {
    if (startBlock && currentBlock) {
      return Math.abs(currentBlock - startBlock)
    }
    return 0
  }, [startBlock, currentBlock])

  const isDisableStake = useMemo(() => {
    return startBlock > currentBlock
  }, [startBlock, currentBlock])

  const endIn = useMemo(() => {
    if (endBlock && currentBlock) {
      return Math.abs(endBlock - currentBlock)
    }
    return 0
  }, [endBlock, currentBlock])

  const lfwContractButton = useMemo(() => {
    return lfwApproved ? (
      <StakeButtonLFW
        isDisabled={loading || isDisabled}
        onSuccess={onSuccessDeposit}
        tokenUrl="https://pancakeswap.finance/swap?outputCurrency=0xd71239a33c8542bd42130c1b4aca0673b4e4f48b"
      />
    ) : (
      <EnableContractLfwButton
        isDisabled={loading || isDisabled || isDisableStake}
        buttonTitle={loading ? <IconSpinner /> : 'ENABLE'}
        onSuccess={onEnabledLfwContractSuccess}
      />
    )
  }, [lfwApproved, loading, isDisabled, onSuccessDeposit, isDisableStake])

  const legendContractButton = useMemo(() => {
    if (nftApproved) {
      return (
        <StakeButtonLegend
          tokenId={tokenId}
          isDisabled={loading || isDisabled}
          onSuccess={onSuccessDeposit}
          tokenSymbol="NFTs"
          tokenUrl="https://hq.legendfantasywar.com/marketplace/characters?marketType=flea-market"
        />
      )
    }
    if (tokenId) {
      return (
        <EnableContractNftButton
          isDisabled={loading || isDisabled || isDisableStake}
          buttonTitle={loading ? <IconSpinner /> : 'ENABLE'}
          tokenId={tokenId}
          onSuccess={onEnabledNftContractSuccess}
        />
      )
    }
    let buttonName: any = ''
    switch (true) {
      case loading:
        buttonName = <IconSpinner />
        break
      case statusWhitelist === 'processing':
        buttonName = 'Processing'
        break
      default:
        buttonName = 'ADD WHITELIST'
    }
    return (
      <AddWhitelistNftButton
        isDisabled={
          loading ||
          isDisabled ||
          isDisableStake ||
          statusWhitelist === 'processing'
        }
        buttonTitle={buttonName}
        onSuccess={onEnabledLegendContractSuccess}
      />
    )
  }, [
    nftApproved,
    tokenId,
    loading,
    isDisabled,
    isDisableStake,
    statusWhitelist,
    onEnabledLegendContractSuccess,
    onSuccessDeposit,
  ])

  const chestContractButton = useMemo(() => {
    return chestApproved ? (
      <StakeButtonChest
        isDisabled={loading || isDisabled}
        onSuccess={onSuccessDeposit}
        chestBalance={parseFloat(chestBalance)}
      />
    ) : (
      <EnableContractChestButton
        isDisabled={loading || isDisabled || isDisableStake}
        buttonTitle={loading ? <IconSpinner /> : 'ENABLE'}
        poolAddress={MINING_POOL_ADDRESS}
        onSuccess={onEnabledChestContractSuccess}
      />
    )
  }, [
    chestApproved,
    loading,
    isDisabled,
    onSuccessDeposit,
    chestBalance,
    isDisableStake,
  ])

  const countdownText = useMemo(() => {
    return null
    if (poolStatus === 'UNDETERMINED') {
      return <Skeleton className="w-48 h-6 rounded-md" />
    }
    if (poolStatus === 'NOT_STARTED') {
      return (
        <BlockLabel
          label="Starts in"
          block={startBlock}
          blockPeriod={startIn}
        />
      )
    }
    if (isEnded) {
      return <Text className="!text-gray-350">Ended</Text>
    }
    return <BlockLabel label="Ends in" block={endBlock} blockPeriod={endIn} />
  }, [poolStatus, isEnded, startIn, endIn, startBlock, endBlock])

  // This is to prevent inteference between onClick and onOutsideClick
  const recoveredClick = useRef(true)
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        recoveredClick.current = !isOpen
      },
      isOpen ? 0 : 500,
    )

    return () => clearTimeout(timeout)
  }, [isOpen])

  return (
    <Card className="relative mb-4 w-full overflow-hidden mt-4">
      <div className="absolute top-0 left-0 w-full rounded-t-[10px] h-14 p-6 bg-gray-500 flex items-center justify-between text-white">
        <div className="flex items-center">
          <Text
            as="b"
            color="white"
            className="ml-2 sm:ml-4 text-md sm:text-2xl"
          >
            Start Mining
          </Text>
        </div>
        {countdownText}
      </div>

      <div className="w-full mt-10">
        <div className="max-w-md mx-auto rounded-xl overflow-hidden md:max-w-6xl">
          <div className="lg:flex">
            <div className="md:ml-4">
              <div>
                <ImageWithFallback
                  src={hiddenHeroImage}
                  fallback={hiddenHeroImage}
                  width="230%"
                />
              </div>
            </div>

            <div className="md:ml-4 w-[100%]">
              <div className="mt-2">
                <div>
                  <Text
                    color="white"
                    className="ml-2 sm:ml-4 text-md sm:text-lg"
                  >
                    Mining Period
                  </Text>
                </div>
                <div>
                  <Text
                    as="b"
                    color="white"
                    className="ml-2 sm:ml-4 text-md sm:text-lg"
                  >
                    30 Days
                  </Text>
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <Text
                    color="white"
                    className="ml-2 sm:ml-4 text-md sm:text-lg"
                  >
                    Input
                  </Text>
                </div>
                <div
                  className={cx('flex  rounded-xl border border-gray-550 mt-4')}
                >
                  <table className="table-auto w-full">
                    <tbody>
                      <tr className="border-b-2 border-gray-550">
                        <td>
                          <Text
                            as="b"
                            color="white"
                            className="ml-2 sm:ml-4 text-md sm:text-lg"
                          >
                            {nftDeposit === 0 ? '_' : nftDeposit}
                          </Text>
                        </td>
                        <td>
                          <div>
                            <span className="flex">
                              <img
                                src="/img/icon/NFT.png"
                                alt=""
                                className="h-10 object-contain"
                              />
                              <Text
                                as="b"
                                color="white"
                                className="ml-2 sm:ml-4 text-md sm:text-lg"
                              >
                                1 NFT 15000PB minimum
                              </Text>
                            </span>
                          </div>
                        </td>
                        <td className="float-right pr-4">
                          {nftDeposit === 1 ? (
                            <Button
                              className="w-full w-[170px] mt-2 mb-2 mx-auto"
                              disabled
                            >
                              ADDED
                            </Button>
                          ) : (
                            legendContractButton
                          )}
                        </td>
                      </tr>

                      <tr className="border-b-2 border-gray-550">
                        <td>
                          <Text
                            as="b"
                            color="white"
                            className="ml-2 sm:ml-4 text-md sm:text-lg"
                          >
                            {lfwDeposit === 0 ? '_' : lfwDeposit}
                          </Text>
                        </td>
                        <td>
                          <div>
                            <span className="flex">
                              <img
                                src="/img/icon/lfw-logo.png"
                                alt=""
                                className="h-10 object-contain"
                              />
                              <Text
                                as="b"
                                color="white"
                                className="ml-2 sm:ml-4 text-md sm:text-lg"
                              >
                                100 LFW
                              </Text>
                            </span>
                          </div>
                        </td>
                        <td className="float-right pr-4">
                          {lfwDeposit === 100 ? (
                            <Button
                              className="w-full w-[170px] mt-2 mb-2 mx-auto"
                              disabled
                            >
                              ADDED
                            </Button>
                          ) : (
                            lfwContractButton
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <Text
                            as="b"
                            color="white"
                            className="ml-2 sm:ml-4 text-md sm:text-lg"
                          >
                            {chestDeposit === 0 ? '_' : chestDeposit}
                          </Text>
                        </td>
                        <td>
                          <div>
                            <span className="flex">
                              <img
                                src="/img/marketplace/chest.png"
                                alt=""
                                className="h-10 object-contain"
                              />
                              <Text
                                as="b"
                                color="white"
                                className="ml-2 sm:ml-4 text-md sm:text-lg"
                              >
                                5 Legendary Chests minimum
                              </Text>
                            </span>
                          </div>
                        </td>
                        <td className="float-right pr-4">
                          {chestDeposit >= 5 ? (
                            <Button
                              className="w-full w-[170px] mt-2 mb-2 mx-auto"
                              disabled
                            >
                              ADDED
                            </Button>
                          ) : (
                            chestContractButton
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex flex-col items-start">
                  <Button
                    as="a"
                    appearance="borderless"
                    className="px-0 font-medium"
                    target="_blank"
                    href={getScanLink(
                      MINING_POOL_ADDRESS as string,
                      'address',
                      chainId,
                    )}
                  >
                    <Text as="span" className="text-primary">
                      View contract
                    </Text>
                    <IconViewTransaction className="ml-1 text-primary" />
                  </Button>
                  <Button
                    as="a"
                    appearance="borderless"
                    className="px-0 font-medium"
                    target="_blank"
                    href="/marketplace/consumables?type=chest"
                  >
                    <Text as="span" className="text-primary">
                      Get Chest
                    </Text>
                    <IconViewTransaction className="ml-1 text-primary" />
                  </Button>
                  <Button
                    as="a"
                    appearance="borderless"
                    className="px-0 font-medium"
                    target="_blank"
                    href="/marketplace/characters?marketType=flea-market"
                  >
                    <Text as="span" className="text-primary">
                      Get NFT
                    </Text>
                    <IconViewTransaction className="ml-1 text-primary" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between" />
      </div>
    </Card>
  )
}

const BlockLabel = ({
  label,
  block,
  blockPeriod,
}: {
  label: string
  block: number
  blockPeriod: number
}) => {
  return (
    <div className="flex flex-col md:flex-row items-baseline md:items-center space-x-0 md:space-x-2">
      <div className="w-full md:w-auto flex items-center justify-between">
        <Text className="text-xs md:text-sm" as="b" color="gray-300">
          {label}
        </Text>
        <Button
          as="a"
          appearance="borderless"
          className="h-auto !p-0 font-medium md:hidden"
          target="_blank"
          href={`${process.env.BLOCK_EXPLORER_URL}/block/countdown/${block}`}
        >
          <IconCountdown />
        </Button>
      </div>
      <Text as="b" className="text-xs md:text-sm ml-2">
        {formatNumber(blockPeriod)} {blockPeriod <= 1 ? 'block' : 'blocks'}
      </Text>
      <Button
        as="a"
        appearance="borderless"
        className="px-0 font-medium hidden md:inline"
        target="_blank"
        href={`${process.env.BLOCK_EXPLORER_URL}/block/countdown/${block}`}
      >
        <IconCountdown />
      </Button>
    </div>
  )
}
