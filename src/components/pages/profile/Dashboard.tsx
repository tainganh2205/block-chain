import { Heading } from 'components/Heading'
import { client, GET_PATHS } from 'libs/apis'
import { Skeleton } from 'components/Skeleton'
import { Text } from 'components/Text'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { formatNumber } from 'utils/number'
import { Card } from 'components/Card'
import { useTokenBalance } from 'hooks/useTokenBalance'
import { getBalanceAmount } from 'utils/formatBalance'
import { AssetsAllocatorBoard } from './AssetsAllocatorBoard'

const SkeletonLoader = () => {
  return (
    <div className="flex flex-wrap -mx-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="w-full sm:w-1/3 px-5 mb-5 sm:mb-10" key={index}>
          <div className="rounded-lg bg-gray-700 h-[100px] px-10 flex items-center">
            <div className="flex items-center space-x-10">
              <Skeleton className="w-8 h-12 rounded-md" />
              <div className="space-x-1 flex items-end">
                <Skeleton className="w-32 h-8 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProfileDashboardContent() {
  const { data, isFirstLoading } = useFetchWithCache(
    GET_PATHS.userBalance,
    () => client.getUserBalance(),
  )

  const { balance } = useTokenBalance()

  const items = [
    {
      value: formatNumber(getBalanceAmount(balance) || 0),
      label: 'LFW',
      image: '/img/profile/icon-nft',
      width: 31,
      height: 55,
    },
    {
      value: formatNumber(data?.data.NFT || 0),
      label: 'NFT',
      image: '',
      width: 28,
      height: 56,
    },
    {
      value: formatNumber(data?.data.gem || 0),
      label: 'Gem',
      image: '/img/profile/icon-gem',
      width: 21,
      height: 47,
    },
  ]

  return (
    <>
      <div className="sm:pt-10 pt-6">
        <Heading className="mb-5">Your Balance</Heading>
        {isFirstLoading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex flex-wrap -mx-5">
            {items.map(({ label, value, image, height, width }) => (
              <div className="w-full sm:w-1/3 px-5 mb-5 sm:mb-10" key={label}>
                <Card className="rounded-lg h-[100px] sm:px-10 px-4 flex items-center">
                  {image ? (
                    <div className="w-14">
                      <ImageWithFallback
                        src={`${image}.webp`}
                        fallback={`${image}.png`}
                        width={width}
                        height={height}
                      />
                    </div>
                  ) : null}
                  <div className="flex items-end space-x-2 leading-none">
                    <Text
                      as="b"
                      className="text-30 tracking-wide"
                      color="white"
                    >
                      {value}
                    </Text>
                    <Text
                      color="gray-300"
                      className="mb-0.5"
                      size="base"
                      as="span"
                    >
                      {label}
                    </Text>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
      <AssetsAllocatorBoard />
    </>
  )
}
