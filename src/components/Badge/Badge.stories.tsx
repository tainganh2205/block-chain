import { storiesOf } from '@storybook/react'
import React from 'react'
import { Badge } from '.'

storiesOf('components/Badge', module).add('basic', () => (
  <div className="space-y-4">
    <div className="space-x-4 flex items-center">
      <Badge>Unclaimed</Badge>
      <Badge type="success">Claimed</Badge>
      <Badge type="error">Error</Badge>
    </div>
  </div>
))
