import { storiesOf } from '@storybook/react'
import React from 'react'
import { RarityBadge } from '.'

storiesOf('components/RarityBadge', module).add('color', () => (
  <div className="flex flex-col space-y-4">
    <div className="flex space-x-6">
      <RarityBadge size="xs" type="N" />
      <RarityBadge size="xs" type="NR" />
      <RarityBadge size="xs" type="R" />
      <RarityBadge size="xs" type="SR" />
      <RarityBadge size="xs" type="UR" />
      <RarityBadge size="xs" type="SSR" />
    </div>
    <div className="flex space-x-6">
      <RarityBadge size="2sm" type="N" />
      <RarityBadge size="2sm" type="NR" />
      <RarityBadge size="2sm" type="R" />
      <RarityBadge size="2sm" type="SR" />
      <RarityBadge size="2sm" type="UR" />
      <RarityBadge size="2sm" type="SSR" />
    </div>
    <div className="flex space-x-6">
      <RarityBadge size="sm" type="N" />
      <RarityBadge size="sm" type="NR" />
      <RarityBadge size="sm" type="R" />
      <RarityBadge size="sm" type="SR" />
      <RarityBadge size="sm" type="UR" />
      <RarityBadge size="sm" type="SSR" />
    </div>
    <div className="flex space-x-6">
      <RarityBadge size="md" type="N" />
      <RarityBadge size="md" type="NR" />
      <RarityBadge size="md" type="R" />
      <RarityBadge size="md" type="SR" />
      <RarityBadge size="md" type="UR" />
      <RarityBadge size="md" type="SSR" />
    </div>
    <div className="flex space-x-6">
      <RarityBadge size="lg" type="N" />
      <RarityBadge size="lg" type="NR" />
      <RarityBadge size="lg" type="R" />
      <RarityBadge size="lg" type="SR" />
      <RarityBadge size="lg" type="UR" />
      <RarityBadge size="lg" type="SSR" />
    </div>
  </div>
))
