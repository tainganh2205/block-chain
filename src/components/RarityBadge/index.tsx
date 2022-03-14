import cx from 'classnames'
import { ImageWithFallback } from 'components/ImageWithFallback'

export type RarityType = 'N' | 'NR' | 'R' | 'SR' | 'UR' | 'SSR'
export type RaritySize = 'xs' | '2sm' | 'sm' | 'md' | 'lg'

interface RarityBadgeProps {
  type: RarityType
  className?: string
  size?: RaritySize
}

const getIcon = (type: RarityType) => {
  if (type === 'NR') {
    return 'NR'
  }
  if (type === 'R') {
    return 'R'
  }
  if (type === 'SR') {
    return 'SR'
  }
  if (type === 'UR') {
    return 'UR'
  }
  if (type === 'SSR') {
    return 'SSR'
  }
  return 'N'
}

function getSize(size: RaritySize) {
  if (size === 'lg') {
    return 40
  }

  if (size === 'md') {
    return 30
  }

  if (size === 'sm') {
    return 28
  }

  if (size === '2sm') {
    return 24
  }

  if (size === 'xs') {
    return 18
  }
}

export const RarityBadge = (props: RarityBadgeProps) => {
  const { type, className, size = 'lg' } = props
  const Icon = getIcon(type)
  const iconSize = getSize(size)

  return (
    <div
      className={cx('inline-flex items-center space-x-2', className)}
      aria-label={type}
    >
      <ImageWithFallback
        width={iconSize}
        height={iconSize}
        src={`/img/icon/rarity/${Icon}.webp`}
        fallback={`/img/icon/rarity/${Icon}.png`}
      />
    </div>
  )
}
