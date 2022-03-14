import { Pagination } from 'components/Pagination'
import { HeroCardSkeleton } from 'components/Skeleton/HeroCardSkeleton'
import cx from 'classnames'
import { mapHeroData } from 'utils/data'
import { ModelHeroData } from 'types/schema'
import { useIsMobile } from 'hooks/useIsMobile'
import { HeroSource } from 'types/hero'
import { HeroCard } from '../HeroCard'

interface HeroCardListProps {
  limit: number
  page: number
  onPageChange?: (page: number) => void
  count: number
  className?: string
  isLoading?: boolean
  column?: '3' | '4' | '5'
  data: ModelHeroData[]
  loadingCount?: number
  getUrl?: (id: string) => string
  onClick?: (id: string) => void
  useGif?: boolean
  hoverShowGif?: boolean
  hideFooter?: boolean
}

export const HeroCardList = (props: HeroCardListProps) => {
  const {
    limit,
    onPageChange,
    page,
    count,
    className,
    isLoading = false,
    column = '4',
    data,
    loadingCount = 10,
    getUrl,
    onClick,
    useGif = false,
    hoverShowGif = false,
    hideFooter = false,
  } = props

  const isMobile = useIsMobile()

  return (
    <div className={cx('space-y-6', className)} data-testid="hero-card-list">
      <div
        className={cx(
          'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5 lg:gap-10',
          {
            'xl:grid-cols-3': column === '3',
            'xl:grid-cols-4': column === '4',
            'xl:grid-cols-5': column === '5',
          },
        )}
      >
        {isLoading
          ? Array.from({ length: loadingCount }).map((_, i) => (
              <div style={{ opacity: 1 - 0.07 * i }} key={i}>
                <HeroCardSkeleton />
              </div>
            ))
          : data.map((hero) => {
              const heroData = mapHeroData(hero, { useGif })
              return (
                <HeroCard
                  size={isMobile ? 'xs' : 'md'}
                  {...heroData}
                  onClick={
                    onClick
                      ? () => {
                          onClick(heroData.id as string)
                        }
                      : undefined
                  }
                  href={getUrl && heroData.id ? getUrl(heroData.id) : undefined}
                  source={heroData.source as HeroSource}
                  key={heroData.id}
                  hoverShowGif={hoverShowGif}
                  hideFooter={hideFooter}
                />
              )
            })}
      </div>
      <div className="flex justify-center sm:justify-end">
        <Pagination
          count={count}
          limit={limit}
          page={page}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}
