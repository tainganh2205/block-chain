import { Heading } from 'components/Heading'
import { Text } from 'components/Text'
import { Skeleton } from 'components/Skeleton'
import { formatCurrency } from 'utils/currency'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'

interface ValueBoxProps {
  label: string
  value: string
  isLoading?: boolean
}

const ValueBox = ({ label, value, isLoading = false }: ValueBoxProps) => {
  return (
    <div className="w-1/2 md:w-auto min-w-[160px] bg-gray-650 p-3 border border-primary rounded">
      <Text className="font-bold" color="white" size="sm">
        {label}
      </Text>
      {isLoading ? (
        <Skeleton className="w-20 h-4 mt-2 rounded" />
      ) : (
        <Text className="font-bold !text-primary">{value}</Text>
      )}
    </div>
  )
}

interface StakeHeaderProps {
  totalValueLocked: number
  isLoading?: boolean
}

export function StakeHeader({ totalValueLocked, isLoading }: StakeHeaderProps) {
  const { data, isFirstLoading } = useFetchWithCache(GET_PATHS.tokenInfo, () =>
    client.getTokenInfo(),
  )

  return (
    <div className="md:flex md:items-center md:justify-between space-y-4 md:space-y-0">
      <div className="space-y-1">
        <Heading as="h1" className="mb-1">
          LFW Staking Center
        </Heading>
        <Text>Staking your assets and earn juicy rewards</Text>
      </div>
      <div className="flex space-x-3">
        <ValueBox
          label="Total Value Locked:"
          value={formatCurrency(totalValueLocked)}
          isLoading={isLoading || isFirstLoading}
        />
        <ValueBox
          label="$LFW Price:"
          value={formatCurrency(data?.data.price ?? 0)}
          isLoading={isLoading || isFirstLoading}
        />
      </div>
    </div>
  )
}
