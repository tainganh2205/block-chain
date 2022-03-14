import React from 'react'
import cx from 'classnames'
import { Progress } from 'components/Progress'
import { HeroStat } from 'components/HeroStat'
import { Text } from 'components/Text'

interface GrowthBarProps {
  max: number
  value: number
  className?: string
}

export const GrowthBar = (props: GrowthBarProps) => {
  const { className, max, value } = props

  return (
    <div className={cx('flex space-x-4 items-center', className)}>
      <HeroStat type="growth" className="flex-none" />
      <Progress
        showAria={false}
        className="flex-1"
        max={max}
        value={value}
        min={0}
      />
      <div className="flex-none">
        <Text as="strong" className="text-2xl" color="white">
          {value}
        </Text>{' '}
        <Text as="b" size="sm" color="gray-300">
          / {max}
        </Text>
      </div>
    </div>
  )
}
