import { Card } from 'components/Card'
import { Skeleton } from 'components/Skeleton'

export const StatsSectionSkeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-24 rounded" />
      <Card className="space-y-6 lg:space-y-10 lg:px-10 py-8">
        <Skeleton className="h-6 w-1/3 rounded" />
        <Skeleton className="h-6 w-1/2 rounded" />
      </Card>
    </div>
  )
}
