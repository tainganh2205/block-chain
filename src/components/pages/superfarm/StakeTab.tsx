import { noop } from '@dwarvesf/react-utils'
import dynamic from 'next/dynamic'
import { SuperFarmContextProvider } from 'context/superFarm'

import { HistoryBlock } from './HistoryBlock'
import { StakeMainCard } from './StakeMainCard'

const IntroductionBlock = dynamic(() => import('./IntroductionBlock'), {
  ssr: false,
})
const YourAssetBlock = dynamic(() => import('./YourAssetBlock'), {
  ssr: false,
})
export interface SuperFarmProps {
  chestBalance: string
  bUsdBalance: string
  lfwBalance: number
  nftBalance: number
  noUserClaimRemaining?: string
  blockInfo?: any
  remainingSlot?: any
  depositAmount?: any
  refetchGetLockedChest?: () => void
  refetchLfwBalance?: () => void
  refetchBUsdBalance?: () => void
  refetchChestBalance?: () => void
  refetchNftBalance?: () => void
}
export const StakeTab = ({
  chestBalance,
  bUsdBalance,
  lfwBalance,
  nftBalance,
  noUserClaimRemaining,
  blockInfo,
  remainingSlot,
  depositAmount,
  refetchGetLockedChest = noop,
  refetchLfwBalance = noop,
  refetchBUsdBalance = noop,
  refetchChestBalance = noop,
  refetchNftBalance = noop,
}: SuperFarmProps) => {
  const onSuccessDeposit = () => {
    remainingSlot.refetchData()
    depositAmount.refetchData()
    refetchGetLockedChest()
    refetchLfwBalance()
    refetchBUsdBalance()
    refetchChestBalance()
    refetchNftBalance()
  }
  return (
    <SuperFarmContextProvider>
      <div className="max-w-[520px] lg:max-w-none mx-auto ">
        <img
          src="/img/super-farm/banner.jpg"
          alt=""
          className="object-contain"
        />
        <IntroductionBlock />
        <YourAssetBlock
          bUsdBalance={bUsdBalance}
          chestBalance={chestBalance}
          lfwBalance={lfwBalance || 0}
        />
        <StakeMainCard
          bUsdBalance={bUsdBalance}
          lfwBalance={lfwBalance || 0}
          nftBalance={nftBalance || 0}
          chestBalance={chestBalance}
          depositBusdAmount={depositAmount.depositBusdAmount}
          depositChestAmount={depositAmount.depositChestAmount}
          depositLfwAmount={depositAmount.depositLfwAmount}
          depositNftAmount={depositAmount.depositNftAmount}
          isEnded
          startBlock={blockInfo.startBlock}
          endBlock={blockInfo.endBlock}
          currentBlock={blockInfo.currentBlock}
          remaininingSlots={remainingSlot.totalRemainingSlot}
          remaininingSlotsByUser={remainingSlot.remainingSlotForUser}
          poolStatus="NOT_STARTED"
          onSuccess={onSuccessDeposit}
        />
        <HistoryBlock
          onSuccess={onSuccessDeposit}
          noUserClaimRemaining={noUserClaimRemaining}
        />
      </div>
    </SuperFarmContextProvider>
  )
}
