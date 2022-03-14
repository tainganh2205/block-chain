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
import { LegendaryChestCard } from 'components/ConsumableCard'
import { noop } from '@dwarvesf/react-utils'
import { useLegendMiningContext } from 'context/legendMining'
import cx from 'classnames'

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
  onSubmit?: () => void
}

export const ModalSelectChest = ({
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
  onClose,
  onSubmit = noop,
  ...rest
}: BaseModalProps) => {
  const { setNumberChest, numberChest } = useLegendMiningContext()
  const arrChest = [
    {
      name: 'Legendary Chest',
      imageUrl:
        'https://storage.googleapis.com/lfw-resources/lfw/inventory/legendary_chest.png',
      hidePrice: true,
      quantity: 5,
    },
    {
      name: 'Legendary Chest',
      imageUrl:
        'https://storage.googleapis.com/lfw-resources/lfw/inventory/legendary_chest.png',
      hidePrice: true,
      quantity: 10,
    },
    {
      name: 'Legendary Chest',
      imageUrl:
        'https://storage.googleapis.com/lfw-resources/lfw/inventory/legendary_chest.png',
      hidePrice: true,
      quantity: 15,
    },
    {
      name: 'Legendary Chest',
      imageUrl:
        'https://storage.googleapis.com/lfw-resources/lfw/inventory/legendary_chest.png',
      hidePrice: true,
      quantity: 20,
    },
  ]
  return (
    <Modal {...rest} onClose={onClose}>
      <ModalContent className="md:px-20 max-w-[600px]">
        <ModalCloseButton />
        <div className="flex flex-col">
          <ModalTitle className="text-32 leading-normal font-bold text-center mb-6">
            {title}
          </ModalTitle>
          <div className="flex gap-6 justify-center flex-wrap">
            {arrChest.map((chest, index) => (
              <div
                aria-hidden="true"
                key={index}
                className="mb-2"
                onMouseDown={() => setNumberChest(chest.quantity)}
              >
                <LegendaryChestCard
                  className={cx({
                    'bg-gray-300': chest.quantity === numberChest,
                  })}
                  quantity={chest.quantity}
                  name={chest.name}
                  hidePrice={chest.hidePrice}
                  imageUrl={chest.imageUrl}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3 mt-7">
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
        </div>
      </ModalContent>
    </Modal>
  )
}
