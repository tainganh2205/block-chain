import React from 'react'
import { noop } from '@dwarvesf/react-utils'
import cx from 'classnames'

interface PaginationItemProps {
  page: number
  label: string | number
  selected?: boolean
  onClick?: (index: number) => void
  isDot?: boolean
}

export const PaginationItem = ({
  page,
  label,
  selected = false,
  onClick = noop,
  isDot = false,
}: PaginationItemProps) => {
  return (
    <li className="flex items-center justify-center min-w-[30px]">
      {isDot ? (
        <span className="text-primary">{label}</span>
      ) : (
        <button
          className={cx(
            'text-sm font-semibold w-full cursor-pointer',
            `${selected ? 'text-primary' : 'text-gray-300'}`,
          )}
          onClick={() => onClick(page)}
        >
          {label}
        </button>
      )}
    </li>
  )
}
