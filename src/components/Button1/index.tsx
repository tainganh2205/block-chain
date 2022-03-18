import React from 'react'
import cx from 'classnames'
import { BaseButton, BaseButtonProps } from 'components/ButtonBase'
import { IconSpinner } from 'components/icons/components/IconSpinner'
import { forwardRefWithAs, PropsWithAs } from 'components/Box'
import { ButtonAppearance } from '../ButtonBase/types'
import { getappearanceButtonStyles } from '../ButtonBase/utils'

export interface ButtonProps extends BaseButtonProps {
  appearance?: ButtonAppearance
  fullWidth?: boolean
  iconPosition?: 'left' | 'right'
  isLoading?: boolean
  disabled?: boolean
  Icon?: React.FC<{ className?: string }>
}

function getButtonStyles({
  size = 'base',
  fullWidth = false,
  isLoading,
  appearance,
}: ButtonProps) {
  const classNames = ['relative']
  if (appearance !== 'link') {
    classNames.push('font-semibold')
  } else {
    classNames.push('font-medium')
  }

  if (fullWidth) {
    classNames.push('w-full flex')
  }

  if (isLoading) {
    classNames.push('cursor-default')
  }

  if (size === 'lg') {
    classNames.push('text-base h-12 px-8')
  } else if (size === 'base') {
    classNames.push('h-10 leading-6')
  } else {
    classNames.push('text-xs h-7 px-5')
  }

  return classNames
}

const ButtonComponent = (
  {
    size = 'base',
    appearance = 'primary',
    Icon,
    iconPosition = 'left',
    children: originChildren,
    isLoading = false,
    asLabel = false,
    css,
    className,
    fullWidth = false,
    ...props
  }: PropsWithAs<ButtonProps>,
  ref: React.Ref<HTMLButtonElement>,
) => {
  let children = originChildren
  if (Icon) {
    children = (
      <>
        {iconPosition === 'left' && <Icon className="mr-1.5" />}
        <span>{children}</span>
        {iconPosition === 'right' && <Icon className="ml-1.5" />}
      </>
    )
  }

  if (isLoading) {
    children = (
      <>
        <span className="absolute inset-0 flex items-center justify-center">
          <IconSpinner />
        </span>
        <span className="text-transparent">{children}</span>
      </>
    )
  }
  const passedInProps = { ...props, fullWidth, size, appearance, asLabel }

  return (
    <BaseButton
      ref={ref}
      {...props}
      className={cx(
        className,
        getButtonStyles(passedInProps),
        getappearanceButtonStyles(passedInProps),
      )}
    >
      {children}
    </BaseButton>
  )
}

export const Button = forwardRefWithAs<ButtonProps, any>(ButtonComponent)
