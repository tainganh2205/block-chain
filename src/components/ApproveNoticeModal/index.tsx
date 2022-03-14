import React, { ChangeEvent, useState } from 'react'
import {
  Modal,
  ModalProps,
  ModalCloseButton,
  ModalContent,
  ModalTitle,
} from 'components/Modal1'
import { Text } from 'components/Text'
import { Button } from 'components/Button1'
import { Checkbox } from 'components/Checkbox'

interface BuySuccessModalProps extends ModalProps {
  onOk: (noShowAgain: boolean) => void
}

export const ApproveNoticeModal = ({
  isOpen,
  onClose,
  onOk,
}: BuySuccessModalProps) => {
  const [checked, setChecked] = useState(false)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent size="max-w-sm" className="flex flex-col items-center">
        <ModalCloseButton />
        <ModalTitle className="text-2xl font-semibold">Notice!</ModalTitle>
        <Text className="text-center mt-2 mb-6">
          The equipment will be detached from the Heroes and you may notice the
          changes on your NFT Stats.
        </Text>
        <div className="mb-4">
          <Checkbox
            checked={checked}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setChecked(e.target.checked)
            }
          >
            Do not show again!
          </Checkbox>
        </div>
        <Button className="w-44" onClick={() => onOk(checked)}>
          Ok, I got it!
        </Button>
      </ModalContent>
    </Modal>
  )
}
