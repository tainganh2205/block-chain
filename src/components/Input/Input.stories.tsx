import { storiesOf } from '@storybook/react'
import { IconEyeVisible } from 'components/icons/components/IconEyeVisible'
import React from 'react'
import Input from './Input'

storiesOf('components/Input', module).add('basic', () => {
  return (
    <div className="space-y-3">
      <Input placeholder="Username" />
      <Input fullWidth placeholder="Username" invalid />
      <Input
        fullWidth
        placeholder="Password"
        endAdornment={<IconEyeVisible />}
      />
      <Input fullWidth placeholder="Password" type="password" />
    </div>
  )
})
