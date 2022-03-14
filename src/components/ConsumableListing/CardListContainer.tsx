import cx from 'classnames'
import { CardListSkeleton } from './CardListSkeleton'

interface CardListContainerProps {
  className?: string
  isLoading?: boolean
  isFirstLoading?: boolean
  column?: '3' | '4' | '5'
  loadingCount?: number
  children?: React.ReactNode
  pagination?: React.ReactNode
}

export const CardListContainer = (props: CardListContainerProps) => {
  const {
    className,
    isLoading = false,
    isFirstLoading = false,
    column = '4',
    loadingCount = 10,
    children,
    pagination,
  } = props

  return (
    <div
      className={cx(
        'space-y-6 transitiona-all duration-200',
        {
          'opacity-50': isLoading,
        },
        className,
      )}
      data-testid="hero-card-list"
    >
      <div
        className={cx(
          'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-5 lg:gap-10',
          {
            'xl:grid-cols-3': column === '3',
            'xl:grid-cols-4': column === '4',
            'xl:grid-cols-5': column === '5',
          },
        )}
      >
        {isFirstLoading ? (
          <CardListSkeleton loadingCount={loadingCount} />
        ) : (
          children
        )}
      </div>
      {pagination}
    </div>
  )
}
