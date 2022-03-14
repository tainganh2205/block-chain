import { Switch } from '@headlessui/react'
import cx from 'classnames'

export type ButtonSize = 'sm' | 'md' | 'lg'
interface SwitchButtonProps {
  className?: string
  value: boolean
  onChange: (value: boolean) => void
  size?: ButtonSize
  label?: string
}

function getButtonSize(size: ButtonSize) {
  if (size === 'lg') {
    return 'w-15 h-8'
  }

  if (size === 'md') {
    return 'w-11 h-6'
  }
  return 'w-7 h-4'
}

function getToggleSize(size: ButtonSize) {
  if (size === 'lg') {
    return 'w-7 h-7'
  }

  if (size === 'md') {
    return 'w-5 h-5'
  }

  return 'w-3 h-3'
}

function getLabelSize(size: ButtonSize) {
  if (size === 'lg') {
    return 'text-lg'
  }

  if (size === 'md') {
    return 'text-md'
  }

  return 'text-sm'
}

export function SwitchButton(props: SwitchButtonProps) {
  const { className, value = false, onChange, size = 'sm', label = '' } = props

  const btnSize = getButtonSize(size)

  const toogleSize = getToggleSize(size)

  const labelSize = getLabelSize(size)

  return (
    <Switch.Group>
      <Switch
        checked={value}
        onChange={onChange}
        className={cx(
          'relative inline-flex items-center rounded-full border border-solid cursor-pointer',
          value ? 'bg-primary border-primary' : 'bg-gray-650 border-gray-350',
          btnSize,
          className,
        )}
        style={
          value
            ? {
                boxSizing: 'border-box',
                boxShadow: 'inset 0px 0px 3px rgba(4,97,107,1.00)',
              }
            : {}
        }
      >
        <span
          className={cx(
            'inline-block w-5 h-5 transform bg-gray-100 rounded-full transition duration-200',
            value ? 'translate-x-full' : 'translate-x-px',
            toogleSize,
          )}
        />
      </Switch>
      <Switch.Label className={cx('ml-2 text-white', labelSize)}>
        {label}
      </Switch.Label>
    </Switch.Group>
  )
}
