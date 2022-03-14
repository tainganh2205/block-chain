import { storiesOf } from '@storybook/react'
import { Skeleton } from '.'
import { HeroCardSkeleton } from './HeroCardSkeleton'

storiesOf('components/Skeleton', module).add('basic', () => {
  return (
    <div className="space-y-10">
      <div className="space-x-4 flex items-center">
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <div className="space-y-3 p-5 rounded-lg bg-gray-700 max-w-xl">
        <Skeleton className="h-5 w-1/3 rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-1/2 rounded" />
      </div>
    </div>
  )
})

storiesOf('components/Skeleton', module).add('heroCard', () => {
  return (
    <div className="space-x-4 flex items-center max-w-[300px]">
      <HeroCardSkeleton />
    </div>
  )
})
