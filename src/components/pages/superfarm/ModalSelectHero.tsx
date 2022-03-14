import React from 'react'
import {
  Modal,
  ModalProps,
  ModalContent,
  ModalCloseButton,
} from 'components/Modal'
import { useIsMobile } from 'hooks/useIsMobile'
import cx from 'classnames'
import { ListHero } from './ListHero'

interface ModalSelectHeroProps extends ModalProps {
  disabledCloseButton?: boolean
  onSuccess?: (onSuccess: any) => void
}

export default function ModalSelectHero({
  isOpen,
  onClose,
  disabledCloseButton = false,
  clickOutsideToDismiss,
  onSuccess,
  ...rest
}: ModalSelectHeroProps) {
  const isMobile = useIsMobile()
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
      enableFocusTrap={!disabledCloseButton}
      clickOutsideToDismiss={clickOutsideToDismiss ?? !disabledCloseButton}
    >
      <ModalContent
        size="max-w-full"
        className={cx('py-10 h-5/6 overflow-auto', {
          'w-10/12': !isMobile,
        })}
      >
        <ModalCloseButton />
        <ListHero
          type="profile"
          onSuccess={onSuccess}
          onCloseModalSelect={onClose}
        />
      </ModalContent>
    </Modal>
  )
}
