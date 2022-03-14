import { Skeleton } from 'components/Skeleton'
import { HeroCardSkeleton } from 'components/Skeleton/HeroCardSkeleton'

export const SimilarNFTSectionSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Skeleton className="h-6 w-24 rounded" />
        <Skeleton className="h-4 w-36 rounded self-end" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5 lg:gap-10 xl:grid-cols-4">
        <HeroCardSkeleton />
        <HeroCardSkeleton />
        <HeroCardSkeleton />
        <HeroCardSkeleton />
      </div>
    </div>
  )
}
