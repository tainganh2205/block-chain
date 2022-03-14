/* eslint-disable jsx-a11y/label-has-associated-control */
import { useId } from 'hooks/useId'
import React from 'react'
import cx from 'classnames'
import { IconCheckBold } from 'components/icons/components/IconCheckBold'

type HtmlAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  keyof Props
>

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  /** The state when entering an invalid input */
  invalid?: boolean
}

function getCheckboxStyles({
  invalid,
  readOnly,
  disabled,
  checked,
}: CheckboxProps) {
  const styles: string[] = [
    'focus:border-primary inset-0 absolute rounded flex items-center justify-center border border-gray-350',
  ]

  if (!invalid && !disabled) {
    if (checked) {
      styles.push('bg-primary text-white')
    } else {
      styles.push('bg-gray-650')
    }
  }

  if (disabled || readOnly) {
    styles.push('cursor-not-allowed')
  } else {
    styles.push('cursor-pointer')
  }

  if (disabled) {
    styles.push(
      'bg-gray-350 border-gray-400 focus:border-gray-500 checked:border-gray-400 checked:border-gray-400 text-gray-100',
    )
  }

  if (invalid) {
    styles.push('!border-red-600 text-red-600')
    if (checked) {
      styles.push('bg-red-600')
    }
  }

  return styles.join(' ')
}

export interface CheckboxProps extends Props, HtmlAttributes {}

export const Checkbox = React.forwardRef(
  (props: CheckboxProps, ref?: React.Ref<HTMLInputElement>) => {
    const {
      id,
      name,
      value,
      defaultChecked,
      checked,
      disabled,
      invalid,
      readOnly,
      onChange,
      onBlur,
      onFocus,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
      ...rest
    } = props

    const uqId = useId(id, 'checkbox')

    const comp = (
      <div
        {...(!children ? (rest as React.HTMLAttributes<HTMLDivElement>) : {})}
        className="relative inline-flex h-6 w-6"
      >
        <input
          className="absolute w-0 h-0 custom-checkbox"
          ref={ref}
          type="checkbox"
          id={uqId}
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-invalid={invalid}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        />
        <label htmlFor={uqId} className={getCheckboxStyles(props)}>
          <IconCheckBold className="hidden" />
        </label>
      </div>
    )

    if (!children) {
      return comp
    }

    return (
      <div
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
        className="flex items-center space-x-2"
      >
        <div className="h-6 w-6">{comp}</div>

        <label
          htmlFor={uqId}
          className={cx('`ml-2 text-sm font-semibold text-gray-100', {
            'text-red-500': invalid,
            'text-gray-350': disabled,
          })}
        >
          {children}
        </label>
      </div>
    )
  },
)
