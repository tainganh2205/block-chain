import { HeroCardSkeleton } from 'components/Skeleton/HeroCardSkeleton'
import { AboutSectionSkeleton } from './AboutSectionSkeleton'
import { BuySectionSkeleton } from './BuySectionSkeleton'
import { SimilarNFTSectionSkeleton } from './SimilarNFTSectionSkeleton'
import { StatsSectionSkeleton } from './StatsSectionSkeleton'

export interface DetailPageSkeletonProps {
  showAboutSection?: boolean
  showStatsSection?: boolean
  showSimilarNFTSection?: boolean
}

export const DetailPageSkeleton = (props: DetailPageSkeletonProps) => {
  const {
    showAboutSection = true,
    showStatsSection = true,
    showSimilarNFTSection = true,
  } = props

  return (
    <div className="container mx-auto px-5 py-6">
      <div className="lg:flex mt-6 space-y-6 lg:space-y-0">
        <div className="w-full max-w-[260px] mx-auto md:max-w-full md:w-[496px] lg:w-1/3 xl:px-12">
          <HeroCardSkeleton />
        </div>
        <div className="xl:flex-1 lg:w-2/3 lg:pl-10">
          <BuySectionSkeleton />
          <div className="space-y-10">
            <div className={showAboutSection ? 'block' : 'hidden'}>
              <AboutSectionSkeleton />
            </div>
            <div className={showStatsSection ? 'block' : 'hidden'}>
              <StatsSectionSkeleton />
            </div>
            <div className={showSimilarNFTSection ? 'block' : 'hidden'}>
              <SimilarNFTSectionSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
