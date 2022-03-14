import React from 'react'
import cx from 'classnames'
import { IconError } from 'components/icons/components/IconError'
import { IconCheck } from 'components/icons/components/IconCheck'
import { IconWarning } from 'components/icons/components/IconWarning'
import { IconInformation } from 'components/icons/components/IconInformation'
import { useAlertContext, AlertStatus } from './context'

function getBackground(status: AlertStatus) {
  if (status === 'error') {
    return 'bg-red-600'
  }

  if (status === 'success') {
    return 'bg-green-500'
  }

  if (status === 'warning') {
    return 'bg-yellow-600'
  }

  return 'bg-primary'
}

function getIcon(status: AlertStatus) {
  if (status === 'error') {
    return IconError
  }

  if (status === 'success') {
    return IconCheck
  }

  if (status === 'warning') {
    return IconWarning
  }

  return IconInformation
}

export const AlertIcon = () => {
  const { status } = useAlertContext()

  const iconClassName = cx(
    'w-6 h-6 flex-none inline-flex justify-center items-center rounded-full text-gray-100 mr-4 flex-none leading-none',
    getBackground(status),
  )

  const Icon = getIcon(status)

  return (
    <div className={iconClassName}>
      <Icon />
    </div>
  )
}
