import React from 'react'
import {
  Modal,
  ModalProps,
  ModalContent,
  ModalCloseButton,
} from 'components/Modal1'

interface BlockchainLoadingModalProps extends ModalProps {
  topRender?: React.ReactNode
  bottomRender?: React.ReactNode
  disabledCloseButton?: boolean
}

export const BlockchainLoadingModal = ({
  isOpen,
  onClose,
  bottomRender,
  topRender,
  disabledCloseButton = false,
  clickOutsideToDismiss,
  ...rest
}: BlockchainLoadingModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
      enableFocusTrap={!disabledCloseButton}
      clickOutsideToDismiss={clickOutsideToDismiss ?? !disabledCloseButton}
    >
      <ModalContent size="max-w-2xl" className="py-10">
        {disabledCloseButton ? null : <ModalCloseButton />}
        <div className="flex flex-col items-center text-center space-y-5">
          {topRender}
          <video
            width={299}
            className="block mx-auto w-[299px] h-[261px]"
            height={261}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video/loading.webm" type="video/webm" />
            <source src="/video/loading.mp4" type="video/mp4" />
          </video>
          {bottomRender}
        </div>
      </ModalContent>
    </Modal>
  )
}
