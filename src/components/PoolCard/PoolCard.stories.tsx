import { storiesOf } from '@storybook/react'
import { BigNumber } from 'ethers'
import React from 'react'
import { TransactionProvider } from 'hooks/useTransactions'
import { StakeContextProvider } from 'context/stake'
import { AuthContextProvider } from 'context/auth'
import { PoolGridCard } from './PoolGridCard'
import { PoolListCard } from './PoolListCard'

const stories = storiesOf('components/StakingCard', module)

stories.add('GridCard', () => {
  const data = [
    {
      name: 'LFW Token',
      apr: 251.53072744236613,
      totalStaked: 7114.13893989278,
      dailyRewards: 6652.8,
      contractAddress: '0x5a5A4F6E025F7896c7801b0b378495a513f49cD2',
      viewContractURL:
        'https://bscscan.com/address/0x5a5A4F6E025F7896c7801b0b378495a513f49cD2',
      getTokenURL:
        'https://pancakeswap.finance/add/0x5a5A4F6E025F7896c7801b0b378495a513f49cD2',
      rewardToken: {
        address: '0xbcb24afb019be7e93ea9c43b7e22bb55d5b7f45d',
        symbol: 'BSCS',
        decimals: 0,
        image:
          'https://assets.coingecko.com/coins/images/14963/small/BSCS_LOGO.png',
        priceUSD: 0.44403375646452337,
      },
      token: {
        address: '0x5a5A4F6E025F7896c7801b0b378495a513f49cD2',
        symbol: 'LFW',
        decimals: 0,
        image: 'https://assets.coingecko.com/coins/images/19570/small/lfw.png',
        priceUSD: 2.2890690138772687,
      },
      duration: 'Flexible',
    },
    {
      name: 'LFW-BNB LP Token',
      apr: 7.037766996773982,
      totalStaked: 7114.13893989278,
      dailyRewards: 6652.8,
      contractAddress: '0x9d1933c1b85ff8bcde9febbc0562f7342d0b42d6',
      viewContractURL:
        'https://bscscan.com/address/0x9d1933c1b85ff8bcde9febbc0562f7342d0b42d6',
      getTokenURL:
        'https://pancakeswap.finance/add/0x9d1933c1b85ff8bcde9febbc0562f7342d0b42d6',
      rewardToken: {
        address: '0xbcb24afb019be7e93ea9c43b7e22bb55d5b7f45d',
        symbol: 'BSCS',
        decimals: 0,
        image:
          'https://assets.coingecko.com/coins/images/14963/small/BSCS_LOGO.png',
        priceUSD: 0.44403375646452337,
      },
      token: {
        address: '0x9d1933c1b85ff8bcde9febbc0562f7342d0b42d6',
        symbol: 'LFW-BNB-LP',
        decimals: 0,
        image: '',
        priceUSD: 81.81163066214823,
      },
    },
  ]

  return (
    <AuthContextProvider>
      <TransactionProvider>
        <StakeContextProvider>
          <div className="flex justify-center space-x-8">
            <PoolGridCard
              poolInfo={data[0]}
              isConnected
              isEnabledContract={false}
              poolStatus="ENDED"
              startBlock={1}
              endBlock={1000}
              currentBlock={100}
              lastStakingBlock={10}
              stakedBalance={BigNumber.from('0')}
              tokenBalance={BigNumber.from('0')}
              unstakingBlock={0}
            />
          </div>
        </StakeContextProvider>
      </TransactionProvider>
    </AuthContextProvider>
  )
})

stories.add('ListCard', () => {
  return (
    <div className="flex justify-center space-x-8">
      <PoolListCard />
    </div>
  )
})
