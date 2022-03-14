import { Skeleton } from '.'

export const HeroCardSkeleton = () => {
  return (
    <div className="relative pb-[145%] w-full">
      <div className="absolute inset-0 opacity-50">
        <Skeleton className="absolute inset-0 rounded-2xl" />
      </div>
      <div className="absolute inset-0">
        <Skeleton className="w-1/5 rounded h-5 m-4" />
        <Skeleton className="w-20 rounded m-3 h-6 opacity-50" />
      </div>
    </div>
  )
}
