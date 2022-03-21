import { ImageWithFallback } from 'components/ImageWithFallback1'
import { Text } from 'components/Text'
import cx from 'classnames'

interface EmptyProps {
  title?: string
  message?: string
  type?: 'search-results' | 'data'
  image?: React.ReactNode
  appearance?: 'default' | 'circular'
  children?: React.ReactNode
  className?: string
}

export const Empty = (props: EmptyProps) => {
  const {
    type = 'search-results',
    appearance = type === 'search-results' ? 'circular' : 'default',
    image,
    message = props.message || type === 'search-results'
      ? 'Try adjusting your search or filter to find what you’re looking for'
      : 'No data',
    title = type === 'search-results' ? 'No results found' : '',
    children,
    className,
  } = props

  let renderImage = image
  if (!renderImage) {
    renderImage = (
      <ImageWithFallback
        src={
          type === 'search-results'
            ? '/img/icon/empty-search.webp'
            : '/images/icon/empty-data.webp'
        }
        fallback={
          type === 'search-results'
            ? '/img/icon/empty-search.png'
            : '/images/icon/empty-data.png'
        }
        width={type === 'search-results' ? 140 : 80}
        height={type === 'search-results' ? 140 : 80}
      />
    )
  }

  return (
    <div
      className={cx(
        'flex flex-col items-center',
        {
          'space-y-6': appearance === 'circular',
          'space-y-2': appearance === 'default',
        },
        className,
      )}
    >
      {appearance === 'circular' ? (
        <div className="w-[200px] h-[200px] rounded-full bg-gray-650 flex items-center justify-center">
          {renderImage}
        </div>
      ) : (
        renderImage
      )}

      <div className="space-y-2 text-center">
        {title && (
          <Text as="b" color="white" className="text-2xl">
            {title}
          </Text>
        )}
        {message && <Text color="gray-300">{message}</Text>}
      </div>
      {children}
    </div>
  )
}
