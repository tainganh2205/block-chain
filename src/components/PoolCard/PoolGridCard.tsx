import React, { useEffect, useMemo, useRef } from 'react'
import cx from 'classnames'
import { BigNumber, constants } from 'ethers'

import { Card } from 'components/Card1'
import { Text } from 'components/Text'
import { Button } from 'components/Button1'
import { BaseButton } from 'components/ButtonBase'
import ROIModal from 'components/pages/gemcenter/ROIModal'
import { IconCalculator } from 'components/icons/components/IconCalculator'
import { IconViewTransaction } from 'components/icons/components/IconViewTransaction'
import { IconCountdown } from 'components/icons/components/IconCountdown'
import { IconHelpCircle } from 'components/icons/components/IconHelpCircle'
import { Skeleton } from 'components/Skeleton'
import { Tooltip } from 'components/Tooltip1'
import { StakeButton } from 'components/pages/gemcenter/staking/StakeButton'
import { UnstakeButton } from 'components/pages/gemcenter/staking/UnstakeButton'
import { HarvestButton } from 'components/pages/gemcenter/staking/HarvestButton'
import { WithdrawAllButton } from 'components/pages/gemcenter/staking/WithdrawAllButton'

import { useDisclosure } from '@dwarvesf/react-hooks'
import { noop } from '@dwarvesf/react-utils'
import { useWeb3React } from '@web3-react/core'
import { roundNumber2D, formatNumber } from 'utils/number'
import { formatPeriod } from 'utils/datetime'
import { addTokenToWallet, TokenProps } from 'utils/token'
import { formatBigNumber } from 'utils/formatBalance'
import { formatCurrency } from 'utils/currency'
import { getScanLink } from 'utils/connector'
import { HandlerStakingInfo, UtilROIResults } from 'types/schema'
import { PoolStatus } from 'types/common'
import { EnableContractButton } from './EnableContractButton'
import { TokenLogo } from './TokenLogo'
import { ReactComponent as IconMetaMask } from './svg/metamask.svg'

export interface PoolGridCardProps {
  isConnected?: boolean
  onConnectWallet?: () => void
  poolInfo: HandlerStakingInfo
  isEnded?: boolean
  isEnabledContract?: boolean
  onEnabledContractSuccess?: () => void
  stakedBalance: BigNumber
  tokenBalance: BigNumber
  rewardAmount?: BigNumber
  onWithdrawSuccess?: () => void
  onHarvestSuccess?: () => void
  onStakeSuccess?: () => void
  onUnstakeSuccess?: () => void
  poolStatus?: PoolStatus
  startBlock: number
  endBlock: number
  lastStakingBlock: number
  unstakingBlock: number
  currentBlock: number
  isCalculatingBlock?: boolean
}

export const PoolGridCard = (props: PoolGridCardProps) => {
  const {
    poolInfo,
    poolStatus = 'UNDETERMINED',
    isConnected,
    onConnectWallet = noop,
    isEnded = false,
    isEnabledContract = false,
    onEnabledContractSuccess = noop,
    stakedBalance,
    tokenBalance,
    rewardAmount = constants.Zero,
    onWithdrawSuccess = noop,
    onHarvestSuccess = noop,
    onStakeSuccess = noop,
    onUnstakeSuccess = noop,
    currentBlock,
    startBlock,
    unstakingBlock,
    lastStakingBlock,
    endBlock,
  } = props

  const {
    token,
    name,
    apr,
    roi = [],
    rewardToken,
    poolAddress = '',
    totalStaked = 0,
    dailyRewards = 0,
    unstakingFeePercentage,
    feePeriodSeconds = 0,
    feePeriod = 0,
    poolName,
    getTokenUrl = '',
  } = poolInfo

  const { isOpen, onClose, onOpen } = useDisclosure()

  const { chainId } = useWeb3React()

  const isStaking = poolStatus === 'STAKING'

  const startIn = useMemo(() => {
    if (startBlock && currentBlock) {
      return Math.abs(startBlock - currentBlock)
    }
    return 0
  }, [startBlock, currentBlock])

  const endIn = useMemo(() => {
    if (endBlock && currentBlock) {
      return Math.abs(endBlock - currentBlock)
    }
    return 0
  }, [endBlock, currentBlock])

  // determine weather user need to pay fee for unstake or not
  const isInPenaltyPeriod = useMemo(() => {
    if (lastStakingBlock > 0 && currentBlock > 0) {
      return lastStakingBlock + feePeriod > currentBlock
    }
    return false
  }, [lastStakingBlock, feePeriod, currentBlock])

  const unstakeFeePeriodBlock = useMemo(() => {
    return feePeriod - (currentBlock - lastStakingBlock)
  }, [lastStakingBlock, feePeriod, currentBlock])

  // unstaking block
  const remainingUnlock = useMemo(() => {
    return unstakingBlock - currentBlock
  }, [unstakingBlock, currentBlock])

  const formatedRewardToken: TokenProps = {
    image: rewardToken?.image ?? '',
    address: rewardToken?.address ?? '',
    symbol: rewardToken?.symbol ?? '',
    decimals: rewardToken?.decimals ?? 18,
  }

  const totalStakedUSD = totalStaked * (token?.priceUSD ?? 0)

  const buttonsSection = useMemo(() => {
    if (!isConnected) {
      return (
        <Button
          className="w-full max-w-[185px] mt-10 mb-6 mx-auto"
          onClick={onConnectWallet}
        >
          Connect wallet
        </Button>
      )
    }
    if (!isEnabledContract) {
      return (
        <EnableContractButton
          tokenAddress={token?.address as string}
          poolAddress={poolAddress}
          onSuccess={onEnabledContractSuccess}
        />
      )
    }
    return (
      <div className="flex flex-col space-y-6 py-6">
        <div className="flex justify-between items-center space-x-4">
          <div>
            <Text color="white">
              <Text as="span" className="text-primary">
                {rewardToken?.symbol}
              </Text>{' '}
              earned
            </Text>
            <Text>{formatBigNumber(rewardAmount, 3)}</Text>
          </div>
          {isEnded && (
            <WithdrawAllButton
              stakedBalance={stakedBalance}
              onSuccess={onWithdrawSuccess}
              poolAddress={poolAddress}
              reward={rewardAmount}
              currentBlock={currentBlock}
              unstakingBlock={unstakingBlock}
            />
          )}
          {isStaking && (
            <HarvestButton
              reward={rewardAmount}
              onSuccess={onHarvestSuccess}
              poolStatus={poolStatus}
              poolAddress={poolAddress}
            />
          )}
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div>
            <Text color="white">
              <Text as="span" className="text-primary">
                {token?.symbol}
              </Text>{' '}
              staked
            </Text>
            <Text>{formatBigNumber(stakedBalance, 3)}</Text>
          </div>
          <div className="flex w-[140px]">
            {isStaking && (
              <StakeButton
                onSuccess={onStakeSuccess}
                stakedBalance={stakedBalance}
                tokenBalance={tokenBalance}
                poolStatus={poolStatus}
                poolAddress={poolAddress}
                tokenAddress={token?.address ?? ''}
                tokenSymbol={token?.symbol ?? ''}
                tokenUrl={getTokenUrl}
              />
            )}
            {isStaking && stakedBalance.gt(0) && remainingUnlock <= 0 && (
              <UnstakeButton
                stakedBalance={stakedBalance}
                tokenBalance={tokenBalance}
                poolStatus={poolStatus}
                onSuccess={onUnstakeSuccess}
                poolAddress={poolAddress}
                tokenAddress={token?.address ?? ''}
                tokenSymbol={token?.symbol ?? ''}
                tokenUrl={getTokenUrl}
              />
            )}
          </div>
        </div>
      </div>
    )
  }, [
    isConnected,
    onConnectWallet,
    isEnabledContract,
    token,
    poolAddress,
    onEnabledContractSuccess,
    rewardToken,
    rewardAmount,
    isEnded,
    isStaking,
    onHarvestSuccess,
    onStakeSuccess,
    onUnstakeSuccess,
    onWithdrawSuccess,
    poolStatus,
    stakedBalance,
    tokenBalance,
    remainingUnlock,
    currentBlock,
    unstakingBlock,
    getTokenUrl,
  ])

  const countdownText = useMemo(() => {
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
    <Card className="relative mb-4 w-full max-w-[520px] overflow-hidden">
      <div className="absolute top-0 left-0 w-full rounded-t-[10px] h-14 p-6 bg-gray-500 flex items-center justify-between text-white">
        <div className="flex items-center">
          <TokenLogo image={token?.image} imagePair={token?.imagePair} />
          <Text
            as="b"
            color="white"
            className="ml-2 sm:ml-4 text-md sm:text-xl"
          >
            {name}
          </Text>
        </div>
        {countdownText}
      </div>
      <div className="w-full flex flex-col mt-10">
        <div className="flex justify-between">
          <Text>APR</Text>
          <div className="flex justify-between items-center space-x-2">
            <Text as="span" className="text-primary text-2xl">
              {isStaking && totalStaked > 0
                ? `${formatNumber(roundNumber2D(apr ?? 0))}%`
                : '--'}
            </Text>
            <Button
              appearance="borderless"
              className="!p-0 h-auto"
              aria-label="Open calculator"
              onClick={() => {
                if (recoveredClick.current) {
                  onOpen()
                }
              }}
              disabled={!isStaking || totalStaked === 0}
            >
              <IconCalculator
                aria-hidden
                className={cx('text-gray-300', {
                  'bg-gray-900': isOpen,
                })}
              />
            </Button>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Text>Earn in</Text>
          <div className="flex justify-between items-center">
            <img
              className="bg-white rounded-full h-6 w-6 p-0.5"
              src={rewardToken?.image}
              alt=""
              aria-hidden
            />
            <Text color="white" className="ml-2">
              {rewardToken?.symbol}
            </Text>
          </div>
        </div>
        <div className="flex justify-end">
          <BaseButton
            className="flex items-center mt-2 space-x-1.5"
            onClick={() => addTokenToWallet(formatedRewardToken)}
          >
            <IconMetaMask />
            <Text as="span" size="sm" className="text-primary ml-1">
              Add to MetaMask
            </Text>
          </BaseButton>
        </div>
        {buttonsSection}
        <div className="border-t-2 border-gray-550">
          <div className="w-full flex flex-col mt-6 space-y-4">
            <div className="flex justify-between">
              <Text>Total Staked</Text>
              <div className="flex flex-col sm:flex-row items-baseline sm:items-center">
                <Text color="white">
                  {isStaking || isEnded
                    ? `${formatNumber(roundNumber2D(totalStaked))} ${
                        token?.symbol
                      }`
                    : `-- ${token?.symbol}`}
                </Text>
                <Text size="sm" color="gray-300" className="ml-0 sm:ml-1">
                  {isStaking || isEnded
                    ? `(${formatCurrency(roundNumber2D(totalStakedUSD))})`
                    : `($0)`}
                </Text>
              </div>
            </div>

            <div className="flex justify-between">
              <Text>Daily rewards</Text>
              <Text color="white">
                {formatNumber(roundNumber2D(dailyRewards ?? 0))}{' '}
                {rewardToken?.symbol}
              </Text>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Text>Unstaking fee period</Text>
                <Tooltip
                  className="max-w-[212px]"
                  label={
                    <div>
                      <Text className="!text-gray-900 mb-4">
                        Unstaking fee: <b>{unstakingFeePercentage}%</b>
                      </Text>
                      <Text className="!text-gray-900">
                        Applies within <b>{formatPeriod(feePeriodSeconds)}</b>{' '}
                        of staking. Unstaking after{' '}
                        <b>{formatPeriod(feePeriodSeconds)}</b> will not include
                        a fee. Timer resets every time you stake in the pool.
                      </Text>
                    </div>
                  }
                >
                  <IconHelpCircle className="text-gray-300" />
                </Tooltip>
              </div>
              {isStaking && isInPenaltyPeriod && stakedBalance.gt(0) && (
                <div className="flex items-center space-x-2">
                  <Text as="b" size="sm" color="gray-300">
                    {formatNumber(unstakeFeePeriodBlock)}{' '}
                    {unstakeFeePeriodBlock <= 1 ? 'block' : 'blocks'}
                  </Text>
                  <Button
                    as="a"
                    appearance="borderless"
                    className="px-0 font-medium"
                    target="_blank"
                    href={`${process.env.BLOCK_EXPLORER_URL}/block/countdown/${
                      lastStakingBlock + feePeriod
                    }`}
                  >
                    <IconCountdown />
                  </Button>
                </div>
              )}
            </div>

            {remainingUnlock > 0 && (
              <div className="flex justify-between">
                <Text>Remaining unlock</Text>
                <div className="flex items-center space-x-2">
                  <Text as="b" size="sm" color="gray-300">
                    {formatNumber(remainingUnlock)}{' '}
                    {remainingUnlock <= 1 ? 'block' : 'blocks'}
                  </Text>
                  <Button
                    as="a"
                    appearance="borderless"
                    className="px-0 font-medium"
                    target="_blank"
                    href={`${process.env.BLOCK_EXPLORER_URL}/block/countdown/${unstakingBlock}`}
                  >
                    <IconCountdown />
                  </Button>
                </div>
              </div>
            )}

            <div className="flex flex-col items-start">
              <Button
                as="a"
                appearance="borderless"
                className="px-0 font-medium"
                target="_blank"
                href={getScanLink(poolAddress as string, 'address', chainId)}
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
                href={getTokenUrl}
              >
                <Text as="span" className="text-primary">
                  Get {name}
                </Text>
                <IconViewTransaction className="ml-1 text-primary" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ROIModal
        onClose={onClose}
        isOpen={isOpen}
        rewardToken={String(poolInfo.rewardToken?.symbol)}
        data={roi as UtilROIResults[]}
      />
      <div className="absolute right-0 bottom-0 bg-black px-4 md:px-9 py-4 rounded-tl-[10px]">
        <Text color="white" className="font-semibold">
          {poolName}
        </Text>
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
