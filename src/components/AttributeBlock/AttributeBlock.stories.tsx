import { storiesOf } from '@storybook/react'
import { GrowthBar } from 'components/GrowthBar'
import { HeroStat } from 'components/HeroStat'
import { AttributeBlock } from '.'

storiesOf('components/AttributeBlock', module).add('basic', () => {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-xs">
      <AttributeBlock title="Growth" className="col-span-2">
        <GrowthBar max={17} value={11} />
      </AttributeBlock>
      <AttributeBlock title="Strength" className="col-span-1">
        <HeroStat textClassName="text-2xl" type="strength" value={30} />
      </AttributeBlock>
      <AttributeBlock title="Vitality" className="col-span-1">
        <HeroStat textClassName="text-2xl" type="vitality" value={45} />
      </AttributeBlock>
      <AttributeBlock title="Dexterity" className="col-span-1">
        <HeroStat textClassName="text-2xl" type="dexterity" value={66} />
      </AttributeBlock>
      <AttributeBlock title="Intelligence" className="col-span-1">
        <HeroStat textClassName="text-2xl" type="intelligence" value={107} />
      </AttributeBlock>
    </div>
  )
})
