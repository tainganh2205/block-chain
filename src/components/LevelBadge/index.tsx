import { ReactNode } from 'react'
import cx from 'classnames'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { Text } from 'components/Text'

export type LevelBadgeColor =
  | 'green'
  | 'violet'
  | 'yellow'
  | 'blue'
  | 'white'
  | 'red'
  | 'orange'

export type LevelBadgeSize = 'xs' | 'sm' | 'md' | 'lg'

interface LevelBadgeProps {
  color?: LevelBadgeColor
  size?: LevelBadgeSize
  children: ReactNode
  className?: string
}

const getBackgroundColor = (color: LevelBadgeColor) => {
  switch (color) {
    case 'green':
      return 'green'
    case 'violet':
      return 'violet'
    case 'yellow':
      return 'yellow'
    case 'blue':
      return 'blue'
    case 'red':
      return 'red'
    case 'orange':
      return 'orange'
    default:
      return 'gray'
  }
}

const getFontBySize = (size: LevelBadgeSize) => {
  switch (size) {
    case 'lg':
      return 'text-[22px]'
    case 'sm':
      return 'text-xs'
    case 'xs':
      return 'text-8'
    default:
      return 'text-sm'
  }
}

const getBoxHeight = (size: LevelBadgeSize) => {
  switch (size) {
    case 'lg':
      return '52px'
    case 'xs':
      return '19px'
    default:
      return '34px'
  }
}

const getBoxWidth = (size: LevelBadgeSize) => {
  switch (size) {
    case 'lg':
      return '133px'
    case 'xs':
      return '50px'
    default:
      return '87px'
  }
}

export const LevelBadge = (props: LevelBadgeProps) => {
  const { color = 'white', size = 'md', children, className } = props
  return (
    <div className="absolute right-[0.5%] top-[0.5%]">
      <ImageWithFallback
        height={getBoxHeight(size)}
        width={getBoxWidth(size)}
        src={`/img/hero/level/level-${getBackgroundColor(color)}.webp`}
        fallback={`/img/hero/level-${getBackgroundColor(color)}.png`}
        className={cx('rounded-tr-xl', className)}
      />
      <Text
        as="span"
        className={cx(
          'leading-snug text-gray-100 pl-3 font-bold italic absolute inset-0 flex items-center justify-center',
          getFontBySize(size),
        )}
      >
        {children}
      </Text>
    </div>
  )
}

export default LevelBadge
