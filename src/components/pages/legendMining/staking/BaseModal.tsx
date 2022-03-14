import React from 'react'
import { BigNumber } from 'ethers'
import { Button } from 'components/Button'
import {
  Modal,
  ModalProps,
  ModalCloseButton,
  ModalContent,
  ModalTitle,
} from 'components/Modal'
import { Text } from 'components/Text'
import { IconViewTransaction } from 'components/icons/components/IconViewTransaction'
import { noop } from '@dwarvesf/react-utils'

interface BaseModalProps extends ModalProps {
  title: string
  label: string
  tokenAddress?: string
  tokenSymbol?: string
  balance?: BigNumber
  staked?: BigNumber
  url?: string
  leftButtonText?: string
  rightButtonText: string
  rightButtonDisabled?: boolean
  spend: number
  setSpend: (spend: number) => void
  hasBottom?: boolean
  onSubmit?: () => void
}

export const BaseModal = ({
  title,
  label,
  tokenAddress,
  tokenSymbol = 'Token',
  balance,
  staked,
  url,
  leftButtonText = 'Cancel',
  rightButtonText,
  rightButtonDisabled = false,
  spend,
  setSpend,
  onClose,
  hasBottom = false,
  onSubmit = noop,
  ...rest
}: BaseModalProps) => {
  return (
    <Modal {...rest} onClose={onClose}>
      <ModalContent className="md:px-20 max-w-[470px]">
        <ModalCloseButton />
        <div className="flex flex-col">
          <ModalTitle className="text-32 leading-normal font-bold text-center mb-6">
            {title}
          </ModalTitle>
          <div className="flex justify-between items-center mb-3">
            <Text color="white">{label}</Text>
            <Text size="sm">{tokenSymbol}</Text>
          </div>
          <div className="bg-gray-600 rounded-md flex h-10 justify-between items-center w-full py-2 px-4 mb-2">
            <Text
              size="sm"
              color="white"
              className="text-white m-auto font-bold text-2xl text-center "
            >
              {spend}
            </Text>
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
              className="w-full max-w-[144px]"
            >
              {rightButtonText}
            </Button>
          </div>
          {hasBottom && (
            <Button
              Icon={IconViewTransaction}
              iconPosition="right"
              className="mt-6"
              appearance="link"
              as="a"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              Get {tokenSymbol}
            </Button>
          )}
        </div>
      </ModalContent>
    </Modal>
  )
}
