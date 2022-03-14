import { noop } from '@dwarvesf/react-utils'
import { storiesOf } from '@storybook/react'
import { Button } from 'components/Button'
import { HeroCardProps } from 'components/HeroCard'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import React from 'react'
import { HeroSuccessModal } from '.'

const stories = storiesOf('components/HeroSuccessModal', module)

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

stories.add('transfer asset successfully', () => (
  <HeroSuccessModal
    isOpen
    heroData={heroData}
    onClose={noop}
    disabledCloseButton
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

stories.add('list asset succesfully', () => (
  <HeroSuccessModal
    isOpen
    heroData={heroData}
    onClose={noop}
    disabledCloseButton
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
