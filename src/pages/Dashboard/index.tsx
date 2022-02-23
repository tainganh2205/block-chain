import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Currency } from '@artechain/sdk'

import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from 'react-twitter-embed'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import MainBanner from './MainBanner'
import MainSlider from './MainSlider'
import MainTeam from './MainTeam'
import MainTopFarm from './MainTopFarm'
import MainLaunchPool from './MainLaunchPool'
import MainOurBenefit from './MainOurBenefit'
import MainOurPartner from './MainOurPartner'
import NftGame from './NftGame'
import './style.less'
// import FiveBoxContent from './FiveBoxContent';
import { useHookNft } from '../Nft/Store-Nft'
import bgFarm from '../../images/bg-farm.png'
import bgTweet from '../../images/bg-tweet.png'
import UnlockButton from '../../components/ConnectWalletButton'

export default function Dashboard() {
  const [state, actions]: any = useHookNft()
  const { marketInfo, yourBalanceBSCS, BSCSBurned, totalValueLock, totalVL } = state
  const { account } = useActiveWeb3React()
  useEffect(() => {
    actions.getMarketInfo()
    actions.getTotalValueLock()
    actions.getBSCSBurned()
    // actions.getTVL()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    actions.getBalanceByWallet(account)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const yourBalance = yourBalanceBSCS && (yourBalanceBSCS.result / 1e18).toLocaleString()

  const totalBurned = BSCSBurned && (BSCSBurned.result / 1e18)
  const BurnedDefaul = 831075
  const SumtotalBurned = (BurnedDefaul + totalBurned).toLocaleString()
  const circulating = marketInfo && marketInfo.circulating_supply
  const totalValue = marketInfo && marketInfo.market_cap
  const TVL = totalVL.data && totalVL.data.toLocaleString()
  return (
    <main className="full-with">
        <MainBanner />
        <NftGame />
        <MainOurBenefit />
        <MainOurPartner />
        <MainTeam />
    </main>
  )
}
