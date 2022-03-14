import { Skeleton } from 'components/Skeleton'

export const BuySectionSkeleton = () => {
  return (
    <div className="flex justify-center lg:justify-end mb-10 lg:mb-0">
      <div className="flex lg:flex-row flex-col justify-center space-y-6 lg:space-y-0 items-center lg:space-x-5">
        <div className="flex flex-col items-center sm:items-end">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-24 rounded" />
          </div>
          <Skeleton className="h-6 w-16 rounded" />
        </div>
        <Skeleton className="h-9 w-24 rounded" />
      </div>
    </div>
  )
}
