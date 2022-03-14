import { storiesOf } from '@storybook/react'
import React from 'react'
import { ElementalBadge } from '.'

storiesOf('components/ElementalBadge', module).add('color', () => (
  <div className="flex flex-col space-y-4">
    <div className="flex space-x-6">
      <ElementalBadge size="xs" type="water" />
      <ElementalBadge size="xs" type="fire" />
      <ElementalBadge size="xs" type="wood" />
      <ElementalBadge size="xs" type="earth" />
      <ElementalBadge size="xs" type="metal" />
    </div>
    <div className="flex space-x-6">
      <ElementalBadge size="sm" type="water" />
      <ElementalBadge size="sm" type="fire" />
      <ElementalBadge size="sm" type="wood" />
      <ElementalBadge size="sm" type="earth" />
      <ElementalBadge size="sm" type="metal" />
    </div>
    <div className="flex space-x-6">
      <ElementalBadge type="water" />
      <ElementalBadge type="fire" />
      <ElementalBadge type="wood" />
      <ElementalBadge type="earth" />
      <ElementalBadge type="metal" />
    </div>
    <div className="flex space-x-6">
      <ElementalBadge size="lg" type="water" />
      <ElementalBadge size="lg" type="fire" />
      <ElementalBadge size="lg" type="wood" />
      <ElementalBadge size="lg" type="earth" />
      <ElementalBadge size="lg" type="metal" />
    </div>
    <div className="flex space-x-6">
      <ElementalBadge showText type="water" />
      <ElementalBadge showText type="fire" />
      <ElementalBadge showText type="wood" />
      <ElementalBadge showText type="earth" />
      <ElementalBadge showText type="metal" />
    </div>
  </div>
))
