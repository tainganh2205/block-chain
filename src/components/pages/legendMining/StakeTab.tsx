import { noop } from '@dwarvesf/react-utils'
import dynamic from 'next/dynamic'
import { LegendMiningContextProvider } from 'context/legendMining'

import { HistoryBlock } from './HistoryBlock'
import { StakeMainCard } from './StakeMainCard'

const IntroductionBlock = dynamic(() => import('./IntroductionBlock'), {
  ssr: false,
})
const YourAssetBlock = dynamic(() => import('./YourAssetBlock'), {
  ssr: false,
})
export interface LegendMiningProps {
  chestBalance: string
  lfwBalance: number
  noUserClaimRemaining?: string
  blockInfo?: any
  remainingSlot?: any
  depositAmount?: any
  refetchGetLockedChest?: () => void
  refetchLfwBalance?: () => void
  refetchBUsdBalance?: () => void
  refetchChestBalance?: () => void
}
export const StakeTab = ({
  chestBalance,
  lfwBalance,
  noUserClaimRemaining,
  blockInfo,
  remainingSlot,
  depositAmount,
  refetchGetLockedChest = noop,
  refetchLfwBalance = noop,
  refetchBUsdBalance = noop,
  refetchChestBalance = noop,
}: LegendMiningProps) => {
  const onSuccessDeposit = () => {
    remainingSlot.refetchData()
    depositAmount.refetchData()
    refetchGetLockedChest()
    refetchLfwBalance()
    refetchBUsdBalance()
    refetchChestBalance()
  }
  return (
    <LegendMiningContextProvider>
      <div className="max-w-[520px] lg:max-w-none mx-auto ">
        <img src="/img/mining-poster.png" alt="" className="object-contain" />
        <IntroductionBlock />
        <YourAssetBlock
          chestBalance={chestBalance}
          lfwBalance={lfwBalance || 0}
        />
        <StakeMainCard
          lfwBalance={lfwBalance || 0}
          chestBalance={chestBalance}
          isEnded
          startBlock={blockInfo.startBlock}
          endBlock={blockInfo.endBlock}
          currentBlock={blockInfo.currentBlock}
          poolStatus="NOT_STARTED"
          onSuccess={onSuccessDeposit}
        />
        <HistoryBlock noUserClaimRemaining={noUserClaimRemaining} />
      </div>
    </LegendMiningContextProvider>
  )
}
