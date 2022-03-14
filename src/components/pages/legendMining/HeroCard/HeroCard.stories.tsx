import { storiesOf } from '@storybook/react'
import React from 'react'
import { mapHeroData } from 'utils/data'
import { heroDetailStub } from '__stubs__/hero'
import { HeroCard } from '.'

const stories = storiesOf('components/HeroCard', module)
const sampleData = mapHeroData(heroDetailStub.heroInfo || {})

stories.add('basic', () => (
  <div className="flex flex-col space-y-4">
    <div className="flex space-x-4 items-center">
      <HeroCard className="w-[152px]" size="xs" {...sampleData} />
      <HeroCard size="sm" className="w-[224px]" {...sampleData} />
      <HeroCard className="w-[260px]" {...sampleData} />
      <HeroCard className="w-[400px]" size="lg" {...sampleData} />
    </div>
    <div className="flex space-x-4 items-center">
      <HeroCard className="w-[152px]" size="xs" {...sampleData} />
      <HeroCard className="w-[260px]" {...sampleData} />
    </div>
  </div>
))

stories.add('3d model', () => (
  <div className="flex space-x-4 items-center">
    <HeroCard className="w-[224px]" size="sm" {...sampleData} />
    <HeroCard className="w-[260px]" {...sampleData} />
    <HeroCard className="w-[400px]" size="lg" {...sampleData} />
  </div>
))
