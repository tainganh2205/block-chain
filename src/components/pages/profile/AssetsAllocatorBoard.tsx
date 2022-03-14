import { Card } from 'components/Card'
import { Heading } from 'components/Heading'
import cx from 'classnames'
import { Progress } from 'components/Progress'
import { Text } from 'components/Text'
import { Skeleton } from 'components/Skeleton'
import { client, GET_PATHS } from 'libs'
import { useFetchWithCache } from 'hooks/useFetchWithCache'

interface Props {
  className?: string
}

export const AssetsAllocatorBoard = (props: Props) => {
  const { className } = props
  const { data, isFirstLoading } = useFetchWithCache(
    GET_PATHS.profileAssetAllocator,
    () => client.getProfileAssetAllocator(),
  )

  const isEmpty = data?.data.length === 0

  const maxValue = Math.max(
    ...(data?.data.map((item) => item.numOfHeroes || 0) || []),
  )

  if (isFirstLoading) {
    return (
      <Card className={cx('space-y-5 py-15 w-1/2', className)}>
        <Skeleton className="h-6 w-full rounded" />
        <Skeleton className="h-6 w-1/2 rounded" />
      </Card>
    )
  }
  if (isEmpty) {
    return null
  }

  return (
    <div className={cx('space-y-5', className)}>
      <Heading as="h3">Assets Allocator</Heading>
      <Card className="w-full sm:w-2/3 lg:w-1/2 py-5 sm:px-10 px-4">
        {data?.data.map((item) => {
          return (
            <div
              key={item.gameServerId}
              className="flex justify-between items-center space-x-5 my-5"
            >
              <Text
                className="w-16 text-lg sm:w-14 font-semibold"
                color="gray-300"
              >
                LFW {item.gameServerId}
              </Text>
              <div className="max-w-xl flex-grow">
                <Progress
                  color="primary"
                  max={maxValue}
                  min={0}
                  appearance="borderless"
                  value={Number(item.numOfHeroes)}
                />
              </div>
              <Text className="w-4" color="white" as="b">
                {item.numOfHeroes}
              </Text>
            </div>
          )
        })}
      </Card>
    </div>
  )
}
