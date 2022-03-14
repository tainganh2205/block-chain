import { storiesOf } from '@storybook/react'
import React from 'react'
import { LevelBadge, LevelBadgeColor } from '.'

const badgeColors: LevelBadgeColor[] = [
  'blue',
  'green',
  'orange',
  'red',
  'violet',
  'yellow',
]

storiesOf('components/LevelBadge', module).add('color', () => (
  <div className="flex space-x-4">
    {badgeColors.map((color) => (
      <LevelBadge key={color} color={color}>
        Level 12
      </LevelBadge>
    ))}
  </div>
))

storiesOf('components/LevelBadge', module).add('size', () => (
  <div className="space-x-4 flex">
    <LevelBadge size="xs">X Small</LevelBadge>
    <LevelBadge size="sm">Small</LevelBadge>
    <LevelBadge>Medium</LevelBadge>
    <LevelBadge size="lg">Large</LevelBadge>
  </div>
))
