import { storiesOf } from '@storybook/react'
import { ElementalBadge } from 'components/ElementalBadge'
import React, { useState } from 'react'
import { Select } from '.'

storiesOf('components/Select', module).add('basic', () => {
  const [elemental, setElemental] = useState('all')
  const [sever, setSever] = useState('all')
  return (
    <div className="space-x-4 flex items-center">
      <Select
        className="w-48"
        options={[
          { text: 'All elementals', value: 'all' },
          {
            text: 'Wood',
            value: 'wood',
            icon: <ElementalBadge size="xs" type="wood" />,
          },
          {
            text: 'Earth',
            value: 'earth',
            icon: <ElementalBadge size="xs" type="earth" />,
          },
          {
            text: 'Fire',
            value: 'fire',
            icon: <ElementalBadge size="xs" type="fire" />,
          },
          {
            text: 'Water',
            value: 'water',
            icon: <ElementalBadge size="xs" type="water" />,
          },
          {
            text: 'Metal',
            value: 'metal',
            icon: <ElementalBadge size="xs" type="metal" />,
          },
        ]}
        value={elemental}
        onChange={setElemental}
      />

      <Select
        appearance="borderless"
        options={[
          { text: 'All servers', value: 'all' },
          {
            text: 'Sever 1',
            value: 'sever-1',
          },
          {
            text: 'Sever 2',
            value: 'sever-2',
          },
          {
            text: 'Sever 3',
            value: 'sever-3',
          },
          {
            text: 'Sever 4',
            value: 'sever-4',
          },
        ]}
        value={sever}
        onChange={setSever}
      />
    </div>
  )
})
