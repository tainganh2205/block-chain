import React from 'react'
import { BigNumber } from 'ethers'
import NumberFormat from 'react-number-format'
import { Button } from 'components/Button1'
import {
  Modal,
  ModalProps,
  ModalCloseButton,
  ModalContent,
  ModalTitle,
} from 'components/Modal1'
import { noop } from '@dwarvesf/react-utils'

interface JoinModalProps extends ModalProps {
  title: string
  label: string
  leftButtonText?: string
  rightButtonText: string
  rightButtonDisabled?: boolean
  spend: number
  setSpend: (spend: number) => void
  hasBottom?: boolean
  onSubmit?: () => void
}

export const JoinModal = ({
  title,
  label,
  leftButtonText = 'Cancel',
  rightButtonText,
  rightButtonDisabled = false,
  spend,
  setSpend,
  onClose,
  hasBottom = false,
  onSubmit = noop,
  ...rest
}: JoinModalProps) => {
  return (
    <Modal {...rest} onClose={onClose}>
      <ModalContent className="md:px-20 max-w-[470px]">
        <ModalCloseButton />
        <div className="flex flex-col">
          <ModalTitle className="text-32 leading-normal font-bold text-center mb-6">
            {title}
          </ModalTitle>
          <div className="bg-gray-600 rounded-md flex h-10 justify-between items-center w-full py-2 px-4 mb-2">
            <NumberFormat
              value={spend}
              onChange={(e) => {
                setSpend(Number(e.target.value.replace(/,/g, '')))
              }}
              className="w-2/3 bg-transparent font-semibold text-gray-350 outline-none flex-1"
              thousandSeparator
              inputMode="numeric"
            />
          </div>
          <div className="flex justify-between mt-7">
            <Button
              appearance="border-primary"
              className="w-full max-w-[144px]"
              onClick={onClose}
            >
              {leftButtonText}
            </Button>
            <Button
              onClick={onSubmit}
              disabled={rightButtonDisabled}
              className="w-full max-w-[144px] btn-contact text-white"
            >
              {rightButtonText}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
