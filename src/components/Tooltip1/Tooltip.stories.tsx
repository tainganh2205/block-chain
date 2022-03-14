import { storiesOf } from '@storybook/react'
import React from 'react'
import { IconHelpCircle } from 'components/icons/components/IconHelpCircle'
import { Text } from 'components/Text'
import { Tooltip } from './Tooltip'

const stories = storiesOf('components/Tooltip', module)

stories.add('Default', () => {
  return (
    <div className="flex items-center space-x-4">
      <Text>Unstaking fee period</Text>
      <Tooltip
        className="max-w-[212px]"
        label={
          <div>
            <Text className="text-gray-900 mb-4">
              Unstaking fee: <b>2%</b>
            </Text>
            <Text className="text-gray-900">
              Applies within <b>12 hours</b> of staking. Unstaking after{' '}
              <b>12 hours</b> will not include a fee. Timer resets every time
              you stake in the pool.
            </Text>
          </div>
        }
      >
        <IconHelpCircle className="text-gray-300" />
      </Tooltip>
    </div>
  )
})

stories.add('Open on click', () => {
  return (
    <div className="flex items-center space-x-4">
      <Text>Unstaking fee period</Text>
      <Tooltip
        className="max-w-[212px]"
        triggerType="click"
        as="button"
        label={
          <div>
            <Text className="text-gray-900 mb-4">
              Unstaking fee: <b>2%</b>
            </Text>
            <Text className="text-gray-900">
              Applies within <b>12 hours</b> of staking. Unstaking after{' '}
              <b>12 hours</b> will not include a fee. Timer resets every time
              you stake in the pool.
            </Text>
          </div>
        }
      >
        <IconHelpCircle className="text-gray-300" />
      </Tooltip>
    </div>
  )
})
