import { storiesOf } from '@storybook/react'
import React from 'react'
import { HeroStat } from '.'

storiesOf('components/HeroStat', module).add('basic', () => (
  <div className="flex flex-col space-y-4">
    <div className="flex space-x-6">
      <HeroStat type="intelligence" />
      <HeroStat type="vitality" />
      <HeroStat type="strength" />
      <HeroStat type="dexterity" />
      <HeroStat type="growth" />
    </div>
    <div className="flex space-x-6">
      <HeroStat value={40} type="intelligence" />
      <HeroStat value={23} type="vitality" />
      <HeroStat value={98} type="strength" />
      <HeroStat value={72} type="dexterity" />
      <HeroStat value={100} type="growth" />
    </div>
  </div>
))
