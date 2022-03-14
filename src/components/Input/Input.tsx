import React from 'react'
import cx from 'classnames'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { IconEyeVisible } from 'components/icons/components/IconEyeVisible'
import { IconEyeInvisible } from 'components/icons/components/IconEyeInvisible'
import { Button } from 'components/Button'

export type InputProps = {
  fullWidth?: boolean
  filled?: boolean
  readOnly?: boolean
  value?: string
  invalid?: boolean
  type?: 'text' | 'date' | 'time' | 'email' | 'number' | 'tel' | 'password'
  endAdornment?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      fullWidth = false,
      disabled = false,
      invalid = false,
      endAdornment,
      onFocus,
      onBlur,
      type,
      className,
      ...rest
    } = props
    const { isOpen, onToggle } = useDisclosure({
      defaultIsOpen: false,
    })

    const renderPasswordAdornment = (
      <Button
        appearance="borderless"
        type="button"
        onClick={onToggle}
        className="!h-full !p-0 w-12"
      >
        {isOpen ? <IconEyeVisible /> : <IconEyeInvisible />}
      </Button>
    )

    return (
      <div
        className={cx('relative inline-flex', {
          'w-full': fullWidth,
        })}
      >
        <input
          className={cx(
            'h-10 outline-none bg-transparent rounded-lg pl-4 m-0',
            endAdornment || type === 'password' ? 'pr-16' : 'pr-4',
            'text-gray-100 bg-gray-600 placeholder-gray-350 placeholder-opacity-100',
            'text-sm font-medium tracking-wide appearance-none w-full leading-snug block',
            {
              'border border-red-600': invalid,
              'focus:border-primary border border-transparent': !invalid,
            },
            className,
          )}
          {...rest}
          type={isOpen ? 'text' : type}
          ref={ref}
          disabled={disabled}
        />
        {(endAdornment || type === 'password') && (
          <div className="flex items-center ml-2 justify-center text-gray-300 absolute top-0 right-0 h-full w-14">
            {type === 'password' ? renderPasswordAdornment : endAdornment}
          </div>
        )}
      </div>
    )
  },
)

export default Input
