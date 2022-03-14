import React from 'react'
import cx from 'classnames'

interface ProgressProps {
  max: number
  min: number
  value: number
  className?: string
  showAria?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'green' | 'primary'
  appearance?: 'default' | 'borderless'
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (props, ref) => {
    const {
      className,
      showAria = true,
      max,
      value,
      min,
      size = 'sm',
      color = 'green',
      appearance = 'default',
    } = props

    const range = max - min
    const now = value - min
    const percent = (now * 100) / range

    const ariaProps = showAria
      ? {
          'aria-valuemax': max,
          'aria-valuemin': min,
          'aria-valuenow': value,
          role: 'progresbar',
        }
      : {}

    return (
      <div
        className={cx(
          'relative rounded-sm  overflow-hidden',
          {
            'h-2.5': size === 'sm',
            'h-4': size === 'md',
            'h-6': size === 'lg',
          },
          {
            'bg-gray-900 border border-gray-500': appearance === 'default',
          },
          className,
        )}
        ref={ref}
      >
        <div
          className={cx(
            'absolute rounded-l-sm left-0 inset-y-0',
            {
              'rounded-r-sm': percent >= 100,
            },
            {
              'bg-green-500': color === 'green',
              'bg-primary': color === 'primary',
            },
          )}
          {...ariaProps}
          style={{ width: `${percent.toFixed(2)}%` }}
        />
      </div>
    )
  },
)
