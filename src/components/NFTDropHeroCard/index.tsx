import cx from 'classnames'
import { AttributeBlock } from 'components/AttributeBlock'
import { ElementalBadge, ElementalType } from 'components/ElementalBadge'
import { GrowthBar } from 'components/GrowthBar'
import { Heading } from 'components/Heading'
import { HeroStat } from 'components/HeroStat'
import { Text } from 'components/Text'
import { ModelSkillData } from 'types/schema'

export interface NFTDropHeroCardProps {
  name?: string
  growth?: number
  maxGrowth?: number
  strength?: number
  vitality?: number
  quantity?: number
  dexterity?: number
  intelligence?: number
  heroAvatar?: string
  className?: string
  element?: ElementalType
  skill?: ModelSkillData[]
  reversed?: boolean
}

export const NFTDropHeroCard = (props: NFTDropHeroCardProps) => {
  const {
    name,
    growth = 0,
    maxGrowth = 0,
    strength,
    vitality,
    dexterity,
    intelligence,
    quantity,
    heroAvatar,
    className,
    element = 'wood',
    skill = [],
    reversed = false,
  } = props

  const render = (
    <div
      className={cx(
        'flex flex-col justify-between items-center gap-x-12 lg:gap-x-32 xl:gap-x-52 my-6 sm:my-44',
        {
          'sm:flex-row-reverse': reversed,
          'sm:flex-row': !reversed,
        },
        className,
      )}
    >
      <img className="max-h-[455px]" src={heroAvatar} alt="" />
      <div>
        <Heading as="h3">{name}</Heading>
        <Text className="mt-2 mb-5">
          Quantity:{' '}
          <Text as="b" color="white">
            {quantity}
          </Text>
        </Text>
        <div className="flex flex-col sm:flex-row gap-x-20 gap-y-4">
          <AttributeBlock title="Elemental">
            <ElementalBadge showText type={element} />
          </AttributeBlock>
          <AttributeBlock title="Skills">
            <div className="grid grid-cols-3 gap-x-3 gap-y-3">
              {skill.map((item, index) => (
                <img
                  key={index}
                  src={item.skillAvatar}
                  alt={item.name}
                  width={68}
                  height={68}
                />
              ))}
            </div>
          </AttributeBlock>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-y-9 py-6">
          <div className="col-span-2 lg:col-span-4 lg:w-3/4">
            <AttributeBlock title="Growth" className="col-span-2">
              <GrowthBar max={maxGrowth} value={growth} />
            </AttributeBlock>
          </div>
          <AttributeBlock title="Strength" className="col-span-1">
            <HeroStat
              textClassName="text-2xl"
              type="strength"
              value={strength}
            />
          </AttributeBlock>
          <AttributeBlock title="Vitality" className="col-span-1">
            <HeroStat
              textClassName="text-2xl"
              type="vitality"
              value={vitality}
            />
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
        </div>
      </div>
    </div>
  )

  return render
}
