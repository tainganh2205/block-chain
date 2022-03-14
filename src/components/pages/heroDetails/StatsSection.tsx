import React from 'react'
import { Heading } from 'components/Heading'
import { HeroStat } from 'components/HeroStat'
import { ModelHeroDetail } from 'types/schema'
import { AttributeBlock } from 'components/AttributeBlock'
import { GrowthBar } from 'components/GrowthBar'
import cx from 'classnames'
import { Card } from 'components/Card'

export interface StatsSectionProps {
  data?: ModelHeroDetail
  className?: string
}
export const StatsSection = (props: StatsSectionProps) => {
  const { data, className } = props

  const growth = data?.heroStat?.growth || 0
  const maxGrowth = data?.heroStat?.maxGrowth || 0
  const dexterity = data?.heroStat?.dexterity || 0
  const intelligence = data?.heroStat?.intelligence || 0
  const strength = data?.heroStat?.strength || 0
  const vitality = data?.heroStat?.vitality || 0

  return (
    <div className={cx('space-y-2', className)}>
      <Heading as="h3">Stats</Heading>
      <Card className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-y-10 lg:px-10 py-8">
        <div className="col-span-2 lg:col-span-4 lg:w-1/2">
          <AttributeBlock title="Growth" className="col-span-2">
            <GrowthBar max={maxGrowth} value={growth} />
          </AttributeBlock>
        </div>
        <AttributeBlock title="Strength" className="col-span-1">
          <HeroStat textClassName="text-2xl" type="strength" value={strength} />
        </AttributeBlock>
        <AttributeBlock title="Vitality" className="col-span-1">
          <HeroStat textClassName="text-2xl" type="vitality" value={vitality} />
        </AttributeBlock>
        <AttributeBlock title="Dexterity" className="col-span-1">
          <HeroStat
            textClassName="text-2xl"
            type="dexterity"
            value={dexterity}
          />
        </AttributeBlock>
        <AttributeBlock title="Intelligence" className="col-span-1">
          <HeroStat
            textClassName="text-2xl"
            type="intelligence"
            value={intelligence}
          />
        </AttributeBlock>
      </Card>
    </div>
  )
}
