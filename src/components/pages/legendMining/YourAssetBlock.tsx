import { Heading } from 'components/Heading'
import { Text } from '../../Text'
import { formatNumber } from '../../../utils/number'

export interface AssetProps {
  chestBalance?: string
  lfwBalance: number
}
export default function YourAssetBlock({
  chestBalance,
  lfwBalance,
}: AssetProps) {
  return (
    <div className="flex items-center gap-6 flex-wrap justify-between sm:px-10 px-3.5 mt-4 relative h-full rounded-lg bg-gray-700 sm:h-[150px]">
      <Heading className="mb-3">Your Assets</Heading>
      <div className="flex items-center gap-3">
        <img
          src="/img/icon/lfw-logo.png"
          alt=""
          className="h-14 object-contain"
        />
        <Text className="text-sm" as="b" color="white">
          {formatNumber(lfwBalance)} LFW
        </Text>
      </div>
      <div className="flex items-center gap-3">
        <img
          src="/img/marketplace/chest.png"
          alt=""
          className="h-16 object-contain"
        />
        <Text className="text-sm" as="b" color="white">
          {chestBalance} Chest
        </Text>
      </div>
    </div>
  )
}
