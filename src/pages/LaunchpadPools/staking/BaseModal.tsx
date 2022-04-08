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
import { Text } from 'components/Text'
import { IconViewTransaction } from 'components/icons/components/IconViewTransaction'
import { formatBigNumber } from 'utils/formatBalance'
import { noop } from '@dwarvesf/react-utils'

interface BaseModalProps extends ModalProps {
  title: string
  label: string
  tokenAddress: string
  tokenSymbol: string
  balance: BigNumber
  staked: BigNumber
  url: string
  leftButtonText?: string
  rightButtonText: string
  rightButtonDisabled?: boolean
  spend: number
  setSpend: (spend: number) => void
  hasBottom?: boolean
  onMaxClick?: () => void
  onSubmit?: () => void
}

export const BaseModal = ({
  title,
  label,
  tokenAddress,
  tokenSymbol,
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
  onMaxClick = noop,
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
            <Text size="sm">
              Balance: <strong className="text-primary-launchpad">{formatBigNumber(balance, 3)}{" "} {tokenSymbol}</strong>
            </Text>
          </div>
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
            <button
              onClick={onMaxClick}
              className="text-primary text-sm tracking-wide px-2 cursor-pointer text-launchpad"
            >
              Max
            </button>
          </div>
          <Text size="sm">
            Staked: {formatBigNumber(staked)} {tokenSymbol}
          </Text>
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
              Get {tokenSymbol} Token
            </Button>
          )}
        </div>
      </ModalContent>
    </Modal>
  )
}
