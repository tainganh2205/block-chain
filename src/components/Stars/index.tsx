import { VisuallyHidden } from 'components/VisuallyHidden'
import React from 'react'
import cx from 'classnames'
import { ReactComponent as ActiveStar } from './svg/active-star.svg'
import { ReactComponent as Star } from './svg/star.svg'

interface StarsProps {
  max: number
  value: number
  size?: 'xs' | 'sm' | 'md' | 'lg'
  display?: 'horizontal' | 'vertical'
  className?: string
  onClick?: (index: number) => void
}

function getIconSize(size: StarsProps['size']) {
  if (size === 'xs') {
    return 12
  }

  if (size === 'sm') {
    return 20
  }

  if (size === 'lg') {
    return 30
  }

  return 24
}

export const Stars = React.forwardRef<HTMLDivElement, StarsProps>(
  (props, ref) => {
    const {
      max,
      value,
      size = 'md',
      display = 'horizontal',
      className,
      onClick,
    } = props

    const iconSize = getIconSize(size)

    const activeStarsRender = Array.from({ length: value }).map((_, index) => (
      <ActiveStar key={index} width={iconSize} height={iconSize} />
    ))

    const starsRender = Array.from({ length: max - value }).map((_, index) => (
      <Star key={value + index} width={iconSize} height={iconSize} />
    ))

    const stars = [...activeStarsRender, ...starsRender]

    return (
      <div className={className} ref={ref}>
        <VisuallyHidden>
          {value} out of {max} stars
        </VisuallyHidden>
        <div
          className={cx(
            'flex',
            {
              'flex-col': display === 'vertical',
            },
            display === 'horizontal'
              ? {
                  'space-x-0.5':
                    size === 'sm' || size === 'md' || size === 'xs',
                  'space-x-1.5': size === 'lg',
                }
              : {
                  'space-y-0.5':
                    size === 'sm' || size === 'md' || size === 'xs',
                  'space-y-1.5': size === 'lg',
                },
          )}
          aria-hidden
        >
          {onClick
            ? stars.map((star, i) => (
                <button
                  className="cursor-pointer"
                  onClick={() => onClick(i)}
                  key={i}
                >
                  {star}
                </button>
              ))
            : stars}
        </div>
      </div>
    )
  },
)
