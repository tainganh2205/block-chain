import { storiesOf } from '@storybook/react'
import React from 'react'
import { Equipment, EquipmentType } from '.'

const Equipments = ['armor', 'necklace', 'weapon', 'shoe', 'ring']

storiesOf('components/Equipment', module).add('Basic', () => (
  <div className="flex space-x-4">
    {Equipments.map((equipment) => (
      <Equipment
        key={equipment}
        type={equipment as EquipmentType}
        image="/img/hero/equiment-sample.png"
      />
    ))}
  </div>
))

storiesOf('components/Equipment', module).add('Empty', () => (
  <div>
    <Equipment type="armor" image="/img/hero/equiment-sample.png" isEmpty />
  </div>
))
