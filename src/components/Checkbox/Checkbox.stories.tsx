import { storiesOf } from '@storybook/react'
import CheckboxGroup from 'components/CheckboxGroup'
import React, { ChangeEvent, useState } from 'react'
import { Checkbox } from '.'

const stories = storiesOf('components/Checkbox', module)

stories.add('basic', () => {
  const [checked, setChecked] = useState(false)
  return (
    <div className="space-y-4">
      <Checkbox
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setChecked(e.target.checked)
        }
        checked={checked}
      >
        Option
      </Checkbox>

      <Checkbox invalid>Invalid option</Checkbox>

      <Checkbox disabled checked>
        Disabled option
      </Checkbox>
    </div>
  )
})

stories.add('CheckboxGroup', () => (
  <CheckboxGroup defaultValue={['1', '2']} className="space-y-4">
    <Checkbox value="1">Option 1</Checkbox>
    <Checkbox value="2">Option 2</Checkbox>
    <Checkbox value="3">Option 3</Checkbox>
  </CheckboxGroup>
))
