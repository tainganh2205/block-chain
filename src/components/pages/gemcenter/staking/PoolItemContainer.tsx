import React from 'react'
import { useCallback, useMemo } from 'react'
import { useAuthContext } from 'context/auth'
import { PoolGridCard } from 'components/PoolCard'
import { noop } from '@dwarvesf/react-utils'
import { PoolInfo, PoolStatus } from 'types/common'
import { useWeb3React } from "@web3-react/core";
import { ConnectorId, useWalletModal } from "@artechain/uikit";
import { injected, walletconnect } from "../../../../connectors";

interface PoolItemContainerProps {
  poolInfo: PoolInfo
  currentBlock: number
  refetchUserData?: () => void
}

export function PoolItemContainer({
  poolInfo,
  currentBlock,
  refetchUserData = noop,
}: PoolItemContainerProps) {
  const {
    stakedBalance,
    balance,
    isEnabledContract,
    rewardAmount,
    lastStakingBlock,
    startBlock,
    endBlock,
    unstakingBlock,
    isEnded,
  } = poolInfo

  const { account: isWalletConnected, activate, deactivate } = useWeb3React()

  const poolStatus = useMemo(() => {
    let status: PoolStatus = 'UNDETERMINED'
    if (currentBlock === 0 || startBlock === 0 || endBlock === 0) return status
    if (currentBlock < startBlock) {
      status = 'NOT_STARTED'
    } else if (currentBlock > endBlock) {
      status = 'ENDED'
    } else {
      status = 'STAKING'
    }
    return status
  }, [startBlock, endBlock, currentBlock])

  const refreshData = useCallback(() => {
    refetchUserData()
  }, [refetchUserData])

  return (
    <PoolGridCard
      isConnected={!!isWalletConnected}
      // onConnectWallet={openWalletModal}
      poolInfo={poolInfo}
      isEnabledContract={isEnabledContract}
      stakedBalance={stakedBalance}
      tokenBalance={balance}
      rewardAmount={rewardAmount}
      isEnded={isEnded}
      startBlock={startBlock}
      endBlock={endBlock}
      lastStakingBlock={lastStakingBlock}
      unstakingBlock={unstakingBlock}
      currentBlock={currentBlock}
      poolStatus={poolStatus}
      onWithdrawSuccess={refreshData}
      onHarvestSuccess={refreshData}
      onStakeSuccess={refreshData}
      onUnstakeSuccess={refreshData}
      onEnabledContractSuccess={refreshData}
    />
  )
}
