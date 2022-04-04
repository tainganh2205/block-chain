import { Card } from 'components/Card1'
import { Skeleton } from 'components/Skeleton'

export const PoolGridCardSkeleton = () => {
  return (
    <div className="relative">
      <div className="flex justify-start space-x-1 max-w-[520px] lg:max-w-none mx-auto">
        <Skeleton className="h-4 w-8 mb-5 rounded-md" />
        <Skeleton className="h-4 w-16 mb-5 rounded-md" />
      </div>
      <div className="flex flex-col lg:flex-row justify-between space-x-0 lg:space-x-20">
        {[1, 2].map((item) => {
          return (
            <Card
              key={item}
              className="relative flex flex-col space-y-2 mb-4 w-full max-w-[520px] h-[598px] overflow-hidden left-0 md:left-[14%] lg:left-0"
            >
              <div className="absolute top-0 left-0 w-full rounded-t-[10px] h-14 p-6 bg-gray-500 flex items-center justify-between text-white">
                <div className="flex items-center w-1/3 space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-2/3 rounded" />
                </div>
                <Skeleton className="h-5 w-1/3 rounded" />
              </div>
              <div className="bt-[10%]" />
              <div className="pt-5 space-y-4">
                <Skeleton className="h-5 w-1/3 rounded" />
                <Skeleton className="h-5 w-1/2 rounded" />
              </div>
              <div className="absolute right-0 bottom-0 bg-black px-4 md:px-9 py-4 rounded-tl-[10px] w-1/3">
                <Skeleton className="h-5 w-full rounded" />
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
