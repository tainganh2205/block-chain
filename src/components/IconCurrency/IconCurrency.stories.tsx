import { storiesOf } from '@storybook/react'
import React from 'react'
import { IconCurrency } from '.'

storiesOf('components/IconCurrency', module).add('basic', () => (
  <div className="space-y-4">
    <div className="flex space-x-4 items-center">
      <IconCurrency symbol="LFW" />
      <IconCurrency symbol="BNB" />
    </div>
  </div>
))

storiesOf('components/IconCurrency', module).add('scaled', () => (
  <div className="space-y-4">
    <div className="flex space-x-4 items-center">
      <IconCurrency className="h-12 w-12 object-scale-down" symbol="LFW" />
      <IconCurrency className="h-12 w-12 object-scale-down" symbol="BNB" />
    </div>
  </div>
))
