import cx from 'classnames'
import { IconClose } from 'components/icons/components/IconClose'
import { useModalContext } from './context'

export const ModalCloseButton: React.FC<{
  className?: string
  disabled?: boolean
}> = ({ className, disabled, ...props }) => {
  const { onClose } = useModalContext()

  return (
    <button
      className={cx(
        'absolute right-6 top-6 hover:text-gray-100 text-gray-300 transition-all duration-200',
        'outline-none focus:ring-4 focus:ring-gray-100 rounded-md focus:ring-opacity-25',
        { 'cursor-not-allowed opacity-25': disabled },
        className,
      )}
      {...props}
      disabled={disabled}
      onClick={onClose}
      aria-label="Close"
    >
      <IconClose aria-hidden />
    </button>
  )
}
