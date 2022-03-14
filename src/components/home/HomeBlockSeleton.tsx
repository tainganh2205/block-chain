import { Skeleton } from 'components/Skeleton'

export const HomeBlockSkeleton = () => {
  return (
    <div className="py-6 sm:px-10 px-3.5">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-20 h-6 rounded" />
        </div>
        <Skeleton className="w-32 h-10 rounded-lg" />
      </div>
      <div className="mt-5 mb-10 flex items-end space-x-3">
        <Skeleton className="w-32 h-14 rounded" />
        <Skeleton className="w-10 h-5 rounded" />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="w-40 h-5 rounded" />
          <Skeleton className="w-20 h-5 rounded" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="w-1/2 h-5 rounded" />
          <Skeleton className="w-24 h-5 rounded" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="w-1/3 h-5 rounded" />
          <Skeleton className="w-20 h-5 rounded" />
        </div>
      </div>
    </div>
  )
}
