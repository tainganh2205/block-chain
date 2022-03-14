import cx from 'classnames'
import { Text } from 'components/Text'
import { ReactComponent as EarthIcon } from './svg/earth.svg'
import { ReactComponent as WaterIcon } from './svg/water.svg'
import { ReactComponent as MetalIcon } from './svg/metal.svg'
import { ReactComponent as FireIcon } from './svg/fire.svg'
import { ReactComponent as WoodIcon } from './svg/wood.svg'

export type ElementalType = 'earth' | 'fire' | 'water' | 'metal' | 'wood'
export type ElementalSize = 'xs' | '2sm' | 'sm' | 'md' | 'lg'

interface ElementalBadgeProps {
  type: ElementalType
  showText?: boolean
  className?: string
  size?: ElementalSize
}

const getIcon = (type: ElementalType) => {
  if (type === 'earth') {
    return EarthIcon
  }

  if (type === 'metal') {
    return MetalIcon
  }

  if (type === 'fire') {
    return FireIcon
  }

  if (type === 'wood') {
    return WoodIcon
  }

  return WaterIcon
}

function getSize(size: ElementalSize) {
  if (size === 'lg') {
    return 48
  }

  if (size === 'md') {
    return 32
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

export const ElementalBadge = (props: ElementalBadgeProps) => {
  const { type, showText = false, className, size = 'md' } = props
  const Icon = getIcon(type)
  const iconSize = getSize(size)

  return (
    <div
      className={cx('inline-flex items-center space-x-2', className)}
      aria-label={type}
    >
      <Icon width={iconSize} height={iconSize} aria-hidden />
      {showText ? (
        <Text
          as="span"
          className="capitalize font-semibold tracking-wide"
          size="sm"
          color="white"
          aria-hidden
        >
          {type}
        </Text>
      ) : null}
    </div>
  )
}
