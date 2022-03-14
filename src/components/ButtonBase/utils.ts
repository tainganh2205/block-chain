import { ButtonAppearance } from './types'

export interface GetAppearanceButtonStylesTypes {
  appearance?: ButtonAppearance
  disabled?: boolean
}

export function getappearanceButtonStyles({
  appearance = 'primary',
  disabled = false,
}: GetAppearanceButtonStylesTypes) {
  const classNames = ['rounded-lg focus:outline-noen']
  const focusRing = 'focus:ring-4 focus:ring-opacity-25'

  if (appearance === 'primary') {
    if (!disabled) {
      classNames.push(
        'bg-primary hover:bg-opacity-90 focus:ring-primary text-gray-100',
      )
      classNames.push(focusRing)
    } else if (disabled) {
      classNames.push('bg-gray-500 text-gray-300')
    }
  } else if (appearance === 'link') {
    classNames.push('text-primary focus:ring-primary')
    classNames.push(focusRing)
    if (disabled) {
      classNames.push('text-opacity-25')
    }
    classNames.push('bg-transparent')
  } else if (appearance === 'gradient') {
    if (!disabled) {
      classNames.push(
        'text-gray-100 bg-gradient-to-r from-[#20A1B5] to-[#47658C] focus:ring-primary',
      )
      classNames.push(focusRing)
    } else {
      classNames.push('bg-gray-500 text-gray-300')
    }
  } else if (appearance === 'border-white') {
    if (!disabled) {
      classNames.push(
        'border border-gray-100 text-gray-100 focus:ring-gray-400',
      )
      classNames.push(focusRing)
    } else {
      classNames.push('border border-gray-500 text-gray-500')
    }
  } else if (appearance === 'border-primary') {
    classNames.push('border border-primary text-primary focus:ring-primary')
    if (!disabled) {
      classNames.push(focusRing)
    } else {
      classNames.push('border-opacity-25 text-opacity-25')
    }
  } else if (appearance === 'borderless') {
    if (!disabled) {
      classNames.push('text-gray-100 focus:ring-gray-400')
      classNames.push(focusRing)
    } else {
      classNames.push('text-gray-500')
    }
  }

  return classNames
}
