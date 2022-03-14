import React, { useEffect, useMemo, useState, useRef } from 'react'
import cx from 'classnames'
import { Card } from 'components/Card'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { IconViewTransaction } from 'components/icons/components/IconViewTransaction'
import { IconCountdown } from 'components/icons/components/IconCountdown'
import { Skeleton } from 'components/Skeleton'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { useWeb3React } from '@web3-react/core'
import { formatNumber } from 'utils/number'
import { getScanLink } from 'utils/connector'
import { PoolStatus } from 'types/common'
import { noop } from '@dwarvesf/react-utils'

import { SUPERFARM_POOL_ADDRESS } from 'constant/contracts'
import dynamic from 'next/dynamic'
import Badge from 'components/Badge'

const StakeButtonChest = dynamic(() => import('./staking/StakeButtonChest'), {
  ssr: false,
})
const StakeButtonBUSD = dynamic(() => import('./staking/StakeButtonBUSD'), {
  ssr: false,
})
const StakeButtonLFW = dynamic(() => import('./staking/StakeButtonLFW'), {
  ssr: false,
})
const StakeButtonLegend = dynamic(() => import('./staking/StakeButtonLegend'), {
  ssr: false,
})
const EnableContractNftButton = dynamic(
  () => import('./EnableContractNftButton'),
  {
    ssr: false,
  },
)
const EnableContractBusdButton = dynamic(
  () => import('./EnableContractBusdButton'),
  {
    ssr: false,
  },
)
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
const hiddenHeroImage = '/img/hero/sample.png'

export interface StakeMainCardProps {
  isEnded?: boolean
  bUsdBalance: string
  chestBalance: string
  lfwBalance: number
  nftBalance: number
  depositBusdAmount: Number
  depositChestAmount: Number
  depositLfwAmount: Number
  depositNftAmount: Number
  poolStatus?: PoolStatus
  startBlock: number
  endBlock: number
  currentBlock: number
  remaininingSlots: Number
  remaininingSlotsByUser: Number
  onSuccess?: () => void
}

export const StakeMainCard = (props: StakeMainCardProps) => {
  const {
    poolStatus = 'UNDETERMINED',
    isEnded = false,
    bUsdBalance,
    chestBalance,
    lfwBalance,
    nftBalance,
    depositBusdAmount,
    depositChestAmount,
    depositNftAmount,
    depositLfwAmount,
    currentBlock,
    startBlock,
    remaininingSlots,
    remaininingSlotsByUser,
    endBlock,
    onSuccess = noop,
  } = props

  const [chestApproved, setChestApproved] = useState(false)
  const [busdApproved, setBusdApproved] = useState(false)
  const [lfwApproved, setLfwApproved] = useState(false)
  const [isStaked, setIsStaked] = useState(false)
  const [legendNFTApproved, setLegendNFTApproved] = useState(false)

  const isDisabled = React.useCallback(() => {
    return true
    const isNotEnoughBalance =
      lfwBalance < 1000 ||
      nftBalance < 1 ||
      parseFloat((chestBalance || '0').replace(/,/g, '')) < 5 ||
      parseFloat((bUsdBalance || '0').replace(/,/g, '')) < 100
    if (remaininingSlots <= 0 || remaininingSlotsByUser <= 0) {
      return true
    }
    if (remaininingSlots > 0 && remaininingSlotsByUser > 0) {
      return !isStaked && isNotEnoughBalance
    }
    return true
  }, [
    bUsdBalance,
    chestBalance,
    isStaked,
    lfwBalance,
    nftBalance,
    remaininingSlots,
    remaininingSlotsByUser,
  ])

  const onSuccessDeposit = React.useCallback(() => {
    setIsStaked(true)
    onSuccess()
  }, [onSuccess])

  const onEnabledChestContractSuccess = (approve: any) => {
    setChestApproved(approve)
  }

  const onEnabledBusdContractSuccess = (approve: any) => {
    setBusdApproved(approve)
  }

  const onEnabledLfwContractSuccess = (approve: any) => {
    setLfwApproved(approve)
  }

  const onEnabledLegendContractSuccess = (approve: any) => {
    setLegendNFTApproved(approve)
  }

  useEffect(() => {
    if (
      depositBusdAmount ||
      depositChestAmount ||
      depositLfwAmount ||
      depositNftAmount
    ) {
      setIsStaked(true)
    }
  }, [
    depositBusdAmount,
    depositChestAmount,
    depositLfwAmount,
    depositNftAmount,
  ])

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

  const busdContractButton = useMemo(() => {
    return busdApproved ? (
      <StakeButtonBUSD isDisabled={isDisabled()} onSuccess={onSuccessDeposit} />
    ) : (
      <EnableContractBusdButton
        isDisabled={isDisabled() || isDisableStake}
        buttonTitle="ENABLE"
        poolAddress={SUPERFARM_POOL_ADDRESS}
        onSuccess={onEnabledBusdContractSuccess}
      />
    )
  }, [busdApproved, isDisabled, onSuccessDeposit, isDisableStake])

  const lfwContractButton = useMemo(() => {
    return lfwApproved ? (
      <StakeButtonLFW isDisabled={isDisabled()} onSuccess={onSuccessDeposit} />
    ) : (
      <EnableContractLfwButton
        isDisabled={isDisabled() || isDisableStake}
        buttonTitle="ENABLE"
        poolAddress={SUPERFARM_POOL_ADDRESS}
        onSuccess={onEnabledLfwContractSuccess}
      />
    )
  }, [lfwApproved, isDisabled, onSuccessDeposit, isDisableStake])

  const legendContractButton = useMemo(() => {
    return legendNFTApproved ? (
      <StakeButtonLegend
        isDisabled={isDisabled()}
        onSuccess={onSuccessDeposit}
      />
    ) : (
      <EnableContractNftButton
        isDisabled={isDisabled() || isDisableStake}
        buttonTitle="ENABLE"
        onSuccess={onEnabledLegendContractSuccess}
      />
    )
  }, [legendNFTApproved, onSuccessDeposit, isDisabled, isDisableStake])

  const chestContractButton = useMemo(() => {
    return chestApproved ? (
      <StakeButtonChest
        isDisabled={isDisabled()}
        onSuccess={onSuccessDeposit}
        chestBalance={parseFloat(chestBalance)}
      />
    ) : (
      <EnableContractChestButton
        isDisabled={isDisabled() || isDisableStake}
        buttonTitle="ENABLE"
        poolAddress={SUPERFARM_POOL_ADDRESS}
        onSuccess={onEnabledChestContractSuccess}
      />
    )
  }, [
    chestApproved,
    isDisabled,
    onSuccessDeposit,
    isDisableStake,
    chestBalance,
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
            Stake BUSD-Legendary Chest
          </Text>
        </div>
        {countdownText}
        <Badge type="error">POOL CLOSED!</Badge>
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
                    Staking Period Required
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
              <div className="flex mt-2">
                <div className="mt-2">
                  <div>
                    <Text
                      color="white"
                      className="ml-2 sm:ml-4 text-md sm:text-lg"
                    >
                      Remaining slot(s)
                    </Text>
                  </div>
                  <div>
                    <Text
                      as="b"
                      color="white"
                      className="ml-2 sm:ml-4 text-md sm:text-lg"
                    >
                      0
                    </Text>
                  </div>
                </div>

                <div className="mt-2">
                  <div>
                    <Text
                      color="white"
                      className="ml-2 sm:ml-4 text-md sm:text-lg"
                    >
                      Remaining slot(s) for you
                    </Text>
                  </div>
                  <div>
                    <Text
                      as="b"
                      color="white"
                      className="ml-2 sm:ml-4 text-md sm:text-lg"
                    >
                      0
                    </Text>
                  </div>
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <Text
                    color="white"
                    className="ml-2 sm:ml-4 text-md sm:text-lg"
                  >
                    Staked / Required amount
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
                            {depositBusdAmount === 0 ? '_' : depositBusdAmount}
                            /100
                          </Text>
                        </td>
                        <td className="ml-2">
                          <span className="flex">
                            <img
                              src="/img/icon/busd.png"
                              alt=""
                              className="h-8 object-contain"
                            />
                            <Text
                              as="b"
                              color="white"
                              className="ml-2 sm:ml-4 text-md sm:text-lg"
                            >
                              BUSD
                            </Text>
                          </span>
                        </td>
                        <td className="float-right pr-4 min-w">
                          {depositBusdAmount === 100 ? (
                            <Button
                              className="w-full w-[100px] mt-2 mb-2 mx-auto"
                              disabled
                            >
                              STAKED
                            </Button>
                          ) : (
                            busdContractButton
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
                            {depositChestAmount === 0
                              ? '_'
                              : depositChestAmount}
                            /5
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
                                Legendary Chest
                              </Text>
                            </span>
                          </div>
                        </td>
                        <td className="float-right pr-4">
                          {depositChestAmount === 5 ? (
                            <Button
                              className="w-full w-[100px] mt-2 mb-2 mx-auto"
                              disabled
                            >
                              STAKED
                            </Button>
                          ) : (
                            chestContractButton
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
                            {depositLfwAmount === 0 ? '_' : depositLfwAmount}
                            /1000
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
                                LFW
                              </Text>
                            </span>
                          </div>
                        </td>
                        <td className="float-right pr-4">
                          {depositLfwAmount === 1000 ? (
                            <Button
                              className="w-full w-[100px] mt-2 mb-2 mx-auto"
                              disabled
                            >
                              STAKED
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
                            {depositNftAmount === 0 ? '_' : depositNftAmount}
                            /1
                          </Text>
                        </td>
                        <td>
                          <div>
                            <span className="flex">
                              <img
                                src="/img/icon/rarity/N.png"
                                alt=""
                                className="h-10 object-contain"
                              />
                              <Text
                                as="b"
                                color="white"
                                className="ml-2 sm:ml-4 text-md sm:text-lg"
                              >
                                NFT
                              </Text>
                            </span>
                          </div>
                        </td>
                        <td className="float-right pr-4">
                          {depositNftAmount === 1 ? (
                            <Button
                              className="w-full w-[100px] mt-2 mb-2 mx-auto"
                              disabled
                            >
                              STAKED
                            </Button>
                          ) : (
                            legendContractButton
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
                      SUPERFARM_POOL_ADDRESS as string,
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
