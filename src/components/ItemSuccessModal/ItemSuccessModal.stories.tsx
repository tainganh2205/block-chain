import { noop } from '@dwarvesf/react-utils'
import { storiesOf } from '@storybook/react'
import { Button } from 'components/Button'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import { HeroCardProps, HeroCard } from 'components/HeroCard'
import {
  TrustedItemFrame,
  TrustedItemFrameProps,
} from 'components/TrustedItemFrame'
import React from 'react'
import { ItemSuccessModal } from '.'

const stories = storiesOf('components/ItemSuccessModal', module)

const heroData: HeroCardProps = {
  stars: 4,
  attack: 9999,
  level: 12,
  imageUrl: '/img/hero/sample.png',
  name: 'Joe Doe',
  elemental: 'water',
  size: 'sm',
  levelBadgeColor: 'blue',
}

stories.add('Transfer asset successfully', () => (
  <ItemSuccessModal
    isOpen
    onClose={noop}
    disabledCloseButton
    itemRender={
      <HeroCard
        className="w-[212px]"
        {...heroData}
        sketchFabId={undefined}
        previewMode
        hideFooter
      />
    }
    bottomRender={
      <div className="px-4 space-y-6">
        <ModalTitle className="text-white text-32 font-semibold">
          Transfer asset successfully!
        </ModalTitle>
        <div className="flex flex-col space-y-1 w-40 mx-auto">
          <Button>View other assets</Button>
          <Button appearance="link">View on BSCScan</Button>
        </div>
      </div>
    }
  />
))

stories.add('List asset succesfully', () => (
  <ItemSuccessModal
    isOpen
    onClose={noop}
    disabledCloseButton
    itemRender={
      <HeroCard
        className="w-[212px]"
        {...heroData}
        sketchFabId={undefined}
        previewMode
        hideFooter
      />
    }
    bottomRender={
      <div className="px-4">
        <ModalTitle className="text-white text-32 font-semibold">
          Your asset has been listed on marketplace
        </ModalTitle>
        <Text className="mb-8 mt-2">
          You can unlist your asset or update price later in “On Sale” tab
        </Text>
        <div className="flex flex-col space-y-1 w-40 mx-auto">
          <Button>View other assets</Button>
          <Button appearance="link">View other assets</Button>
        </div>
      </div>
    }
  />
))

const truestedItemData: TrustedItemFrameProps = {
  image: '/img/marketplace/trusted-item/test_character.png',
  rarity: 'N',
  name: 'Test',
}

stories.add('Buy Consumable Success', () => (
  <ItemSuccessModal
    isOpen
    onClose={noop}
    disabledCloseButton
    itemRender={
      // TODO use actual TrustedItemCard when it's available
      <TrustedItemFrame
        rarity={truestedItemData.rarity}
        name={truestedItemData.name}
        image={truestedItemData.image}
      />
    }
    bottomRender={
      <div className="px-4">
        <ModalTitle className="text-white text-32 font-semibold">
          Your asset has been listed on marketplace
        </ModalTitle>
        <Text className="mb-8 mt-2">
          You can unlist your asset or update price later in “On Sale” tab
        </Text>
        <div className="flex flex-col space-y-1 w-40 mx-auto">
          <Button>View other assets</Button>
          <Button appearance="link">View other assets</Button>
        </div>
      </div>
    }
  />
))
