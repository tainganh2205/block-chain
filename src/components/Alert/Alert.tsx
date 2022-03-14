import React, { HTMLAttributes } from 'react'
import cx from 'classnames'
import { IconClose } from 'components/icons/components/IconClose'
import { AlertStatus, AlertProvider } from './context'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  status?: AlertStatus
  className?: string
  onClose?: () => void
}

export const Alert: React.FC<AlertProps> = ({
  status = 'error',
  className,
  children,
  onClose,
  ...rest
}) => {
  return (
    <AlertProvider status={status}>
      <div
        className={cx(
          'text-left px-6 py-4 flex relative pr-10 bg-gray-650 rounded-[5px] border border-gray-500',
          className,
        )}
        {...rest}
      >
        {children}
        {onClose && (
          <button
            className="absolute right-0 top-1 w-12 h-12 flex items-center justify-center text-gray-100 opacity-75 hover:opacity-100 transition-all duration-200"
            onClick={onClose}
          >
            <IconClose className="scale-75" />
          </button>
        )}
      </div>
    </AlertProvider>
  )
}
