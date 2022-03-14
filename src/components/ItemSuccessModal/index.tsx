import React from 'react'
import {
  Modal,
  ModalProps,
  ModalContent,
  ModalCloseButton,
} from 'components/Modal'

interface ItemSuccessModalProps extends ModalProps {
  itemRender?: React.ReactNode
  bottomRender?: React.ReactNode
  disabledCloseButton?: boolean
}

export const ItemSuccessModal = ({
  isOpen,
  onClose,
  bottomRender,
  itemRender,
  disabledCloseButton = false,
  ...rest
}: ItemSuccessModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
      enableFocusTrap={!disabledCloseButton}
    >
      <ModalContent size="max-w-3xl" className="py-10">
        <ModalCloseButton disabled={disabledCloseButton} />
        <div className="flex flex-col items-center text-center space-y-10">
          {itemRender}
          {bottomRender}
        </div>
      </ModalContent>
    </Modal>
  )
}
