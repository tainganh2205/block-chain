import cx from 'classnames'
import { Text } from 'components/Text'
import { ReactComponent as DexterityIcon } from './svg/dexterity.svg'
import { ReactComponent as StrengthIcon } from './svg/strength.svg'
import { ReactComponent as IntelligenceIcon } from './svg/intelligence.svg'
import { ReactComponent as VitalityIcon } from './svg/vitality.svg'
import { ReactComponent as GrowthIcon } from './svg/growth.svg'

export type StatType =
  | 'intelligence'
  | 'dexterity'
  | 'vitality'
  | 'strength'
  | 'growth'

interface HeroStatProps {
  type: StatType
  value?: number
  className?: string
  textClassName?: string
}

const getIcon = (type: StatType) => {
  if (type === 'dexterity') {
    return DexterityIcon
  }

  if (type === 'strength') {
    return StrengthIcon
  }

  if (type === 'vitality') {
    return VitalityIcon
  }

  if (type === 'growth') {
    return GrowthIcon
  }

  return IntelligenceIcon
}

export const HeroStat = (props: HeroStatProps) => {
  const { type, value, className, textClassName } = props
  const Icon = getIcon(type)

  return (
    <div className={cx('inline-flex items-center space-x-2', className)}>
      <Icon />
      {typeof value !== 'undefined' ? (
        <Text
          as="span"
          className={cx('font-bold text-xl', textClassName)}
          color="white"
        >
          {value}
        </Text>
      ) : null}
    </div>
  )
}
