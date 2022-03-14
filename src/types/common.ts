import React from 'react'
import { BigNumber } from 'ethers'
// import BigNumberjs from 'bignumber.js'
import { HandlerStakingInfo } from './schema'

export type WithChildren<T = any> = { children: React.ReactNode } & T

export type UserStakeInfo = {
  amount: BigNumber
  lastStakingBlock: number
}

export type PoolStatus = 'UNDETERMINED' | 'NOT_STARTED' | 'STAKING' | 'ENDED'

export interface PoolInfo extends HandlerStakingInfo {
  allowance: BigNumber
  balance: BigNumber
  stakedBalance: BigNumber
  rewardAmount: BigNumber
  isEnabledContract: boolean
  isStaked: boolean
  isEnded: boolean
  hasReward: boolean
  startBlock: number
  endBlock: number
  lastStakingBlock: number
  unstakingBlock: number
}
