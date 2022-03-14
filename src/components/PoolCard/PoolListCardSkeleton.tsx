import { Card } from 'components/Card1'
import { Skeleton } from 'components/Skeleton'

export const PoolListCardSkelenton = () => {
  return (
    <Card spacing={false}>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return (
          <div
            key={item}
            className="flex justify-between items-center lg:space-x-24 h-[115px] border-b-[1px] border-gray-550 px-2 lg:px-9"
          >
            <div className="flex flex-row space-x-2 w-1/4 xl:w-1/6">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="w-1/2 flex flex-col justify-between">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-2 w-1/4 lg:w-1/6">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-full" />
            </div>
            <div className="flex flex-col justify-between space-y-2 w-1/4 lg:w-1/6">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-full" />
            </div>
            <div className="lg:flex flex-col justify-between space-y-2 w-1/6 hidden">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-full" />
            </div>
            <div className="lg:flex flex-col justify-between space-y-2 w-1/6 hidden">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-full" />
            </div>
            <div className="flex flex-col space-y-2 w-1/12 justify-between">
              <Skeleton className="h-3 w-full" />
              <div className="h-3 hidden sm:block" />
            </div>
          </div>
        )
      })}
      <div className="h-14 flex justify-center items-center">
        <Skeleton className="h-3 w-1/12" />
      </div>
    </Card>
  )
}
