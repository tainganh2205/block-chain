import { storiesOf } from '@storybook/react'
import React from 'react'
import { Text } from 'components/Text'
import { SwitchTabs } from '.'

const stories = storiesOf('components/SwitchTabs', module)

stories
  .add('basic', () => {
    const tabsData = [
      {
        label: 'Character',
        content: (
          <Text className="text-gray-100 p-6 text-center">Character</Text>
        ),
      },
      {
        label: 'Equipment',
        content: (
          <Text className="text-gray-100 p-6 text-center">Equipment</Text>
        ),
      },
    ]

    return <SwitchTabs tabs={tabsData} />
  })
  .add('3 tabs', () => {
    const tabsData = [
      {
        label: 'Trusted Items',
        content: (
          <Text className="text-gray-100 p-6 text-center">Trusted Items</Text>
        ),
      },
      {
        label: 'Crystal',
        content: <Text className="text-gray-100 p-6 text-center">Crystal</Text>,
      },
      {
        label: 'Skillbooks',
        content: (
          <Text className="text-gray-100 p-6 text-center">Skillbooks</Text>
        ),
      },
    ]

    return <SwitchTabs tabs={tabsData} defaultIndex={1} />
  })
