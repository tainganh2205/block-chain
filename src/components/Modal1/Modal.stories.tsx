import { useDisclosure } from '@dwarvesf/react-hooks'
import { storiesOf } from '@storybook/react'
import { Button } from 'components/Button'
import { ClipboardInput } from 'components/ClipboardInput'
import { IconShare } from 'components/icons/components/IconShare'
import { Text } from 'components/Text'
import React from 'react'
import { Modal, ModalCloseButton, ModalContent, ModalTitle } from '.'

storiesOf('components/Modal', module).add('basic', () => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true })

  return (
    <div>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent size="max-w-md">
          <ModalCloseButton />
          <div className="flex flex-col items-center text-center">
            <ModalTitle className="text-2xl font-bold mb-1">
              Your wallet
            </ModalTitle>
            <Text color="gray-300">Connect with MetaMask</Text>

            <div className="w-full text-left space-y-2 mt-5">
              <Text color="white">Your address:</Text>
              <ClipboardInput value="0x04aACbeFF4D4272bC9bsB0feBD9EA35fd5579093" />
              <Button Icon={IconShare} appearance="link" className="px-0">
                View on BSCScan
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  )
})
