import { Skeleton } from 'components/Skeleton'

export function FilterSidebarSkeleton() {
  return (
    <div className="space-y-10 mt-5">
      <div className="space-y-6">
        <Skeleton className="w-20 h-5 rounded" />
        <div className="space-y-3">
          <Skeleton className="w-full h-5 rounded" />
          <Skeleton className="w-2/3 h-5 rounded" />
          <Skeleton className="w-full h-5 rounded" />
          <Skeleton className="w-2/3 h-5 rounded" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="w-20 h-5 rounded" />
        <Skeleton className="w-full h-6 rounded" />
      </div>
      <div className="space-y-3">
        <Skeleton className="w-20 h-5 rounded" />
        <Skeleton className="w-full h-6 rounded" />
      </div>
      <div className="space-y-6">
        <Skeleton className="w-20 h-5 rounded" />
        <div className="grid grid-cols-2 gap-4 ">
          <Skeleton className="w-full h-5 rounded" />
          <Skeleton className="w-2/3 h-5 rounded" />
          <Skeleton className="w-4/5 h-5 rounded" />
          <Skeleton className="w-2/3 h-5 rounded" />
          <Skeleton className="w-2/3 h-5 rounded" />
          <Skeleton className="w-1/2 h-5 rounded" />
        </div>
      </div>
    </div>
  )
}
