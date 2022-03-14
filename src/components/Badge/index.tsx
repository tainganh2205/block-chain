import { ReactNode } from 'react'
import cx from 'classnames'

export type BadgeType = 'normal' | 'success' | 'error'

interface BadgeProps {
  type?: BadgeType
  children: ReactNode
  className?: string
}

const getColorByType = (type: BadgeType) => {
  switch (type) {
    case 'success':
      return 'bg-green-700 text-green-650'
    case 'error':
      return 'bg-red-700 text-gray-100'
    default:
      return 'bg-gray-400 text-gray-300'
  }
}

export const Badge = (props: BadgeProps) => {
  const { type = 'normal', children, className = 'text-xs' } = props
  return (
    <div
      className={cx(
        ' font-semibold px-3 h-6 inline-flex items-center justify-center rounded-full leading-none whitespace-nowrap',
        className,
        getColorByType(type),
      )}
    >
      {children}
    </div>
  )
}

export default Badge
