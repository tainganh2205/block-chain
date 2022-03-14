import { useDisclosure } from '@dwarvesf/react-hooks'
import { noop } from '@dwarvesf/react-utils'
import { Button } from 'components/Button'
import dynamic from 'next/dynamic'
import cx from 'classnames'
import { useIsMobile } from '../../../hooks/useIsMobile'

const ModalSelectHero = dynamic(() => import('./ModalSelectHero'), {
  ssr: false,
})
interface EnableContractButtonProps {
  onSuccess?: (onSuccess: any) => void
  isDisabled: boolean
  buttonTitle: string
}

export default function EnableContractNftButton({
  onSuccess = noop,
  isDisabled,
  buttonTitle = 'Enable Contract',
}: EnableContractButtonProps) {
  const isMobile = useIsMobile()

  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()

  return (
    <>
      <Button
        className={cx('w-full mt-2 mb-2 mx-auto', {
          'w-[100px]': !isMobile,
          'w-[80px]': isMobile,
        })}
        onClick={onConfirmOpen}
        disabled={isDisabled}
      >
        {buttonTitle}
      </Button>
      <ModalSelectHero
        onSuccess={onSuccess}
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
      />
    </>
  )
}
