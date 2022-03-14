import { storiesOf } from '@storybook/react'
import { Text } from 'components/Text'
import React, { useState } from 'react'
import { ButtonSize, SwitchButton } from '.'

const stories = storiesOf('components/SwitchButton', module)

stories.add('basic', () => {
  const [enabled, setEnabled] = useState(false)

  const size: Array<ButtonSize> = ['sm', 'md', 'lg']

  return (
    <div className="flex flex-col space-y-2">
      {size.map((item, index) => {
        return (
          <div key={index} className="flex items-center space-x-2">
            <SwitchButton
              label={item}
              size={item}
              value={enabled}
              onChange={setEnabled}
            />
          </div>
        )
      })}
      <Text>Status: {enabled ? 'Off' : 'On'}</Text>
    </div>
  )
})
