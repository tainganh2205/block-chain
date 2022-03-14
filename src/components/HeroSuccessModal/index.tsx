import React from 'react'
import {
  Modal,
  ModalProps,
  ModalContent,
  ModalCloseButton,
} from 'components/Modal'
import { HeroCard, HeroCardProps } from 'components/HeroCard'

interface HeroSuccessModalProps extends ModalProps {
  bottomRender?: React.ReactNode
  disabledCloseButton?: boolean
  heroData: HeroCardProps
}

export const HeroSuccessModal = ({
  isOpen,
  onClose,
  bottomRender,
  disabledCloseButton = false,
  heroData,
  ...rest
}: HeroSuccessModalProps) => {
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
          <HeroCard
            className="w-[212px]"
            {...heroData}
            sketchFabId={undefined}
            previewMode
            hideFooter
          />
          {bottomRender}
        </div>
      </ModalContent>
    </Modal>
  )
}
