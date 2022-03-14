import { Card } from 'components/Card1'
import { Skeleton } from 'components/Skeleton'

export const AboutSectionSkeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-24 rounded" />
      <Card className="space-y-6 lg:space-y-10 sm:px-8 px-4 lg:px-10 py-8">
        <Skeleton className="h-6 w-1/4 rounded" />
        <Skeleton className="h-6 w-1/2 rounded" />
        <Skeleton className="h-6 w-1/3 rounded" />
      </Card>
    </div>
  )
}
