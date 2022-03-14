import { HeroCardSkeleton } from 'components/Skeleton/HeroCardSkeleton'

interface CardListSkeletonProps {
  loadingCount?: number
}

export const CardListSkeleton = (props: CardListSkeletonProps) => {
  const { loadingCount = 10 } = props

  return (
    <>
      {Array.from({ length: loadingCount }).map((_, i) => (
        <div style={{ opacity: 1 - 0.07 * i }} key={i}>
          <HeroCardSkeleton />
        </div>
      ))}
    </>
  )
}
