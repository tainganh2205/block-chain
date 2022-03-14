import React from 'react'
import { IconEquipmentArmor } from 'components/icons/components/IconEquipmentArmor'
import { IconEquipmentNecklake } from 'components/icons/components/IconEquipmentNecklake'
import { IconEquipmentRing } from 'components/icons/components/IconEquipmentRing'
import { IconEquipmentShoe } from 'components/icons/components/IconEquipmentShoe'
import { IconEquipmentWeapon } from 'components/icons/components/IconEquipmentWeapon'
import { ImageWithFallback } from 'components/ImageWithFallback'

export type EquipmentType = 'armor' | 'necklace' | 'weapon' | 'shoe' | 'ring'

export interface EquipmentProps {
  type: EquipmentType
  image: string
  isEmpty?: boolean
}

const getEquipmentIcon = (type: EquipmentType) => {
  switch (type) {
    case 'armor':
      return <IconEquipmentArmor />
    case 'necklace':
      return <IconEquipmentNecklake />
    case 'weapon':
      return <IconEquipmentWeapon />
    case 'shoe':
      return <IconEquipmentShoe />
    case 'ring':
      return <IconEquipmentRing />
    default:
      return null
  }
}

export const Equipment = ({ type, image, isEmpty = false }: EquipmentProps) => {
  return (
    <div className="inline-flex flex-col items-center">
      {getEquipmentIcon(type)}
      <div
        className="w-[86px] h-[86px] mt-2 bg-no-repeat bg-cover overflow-hidden p-2"
        style={{ backgroundImage: 'url(/img/equipment-frame.svg)' }}
      >
        {isEmpty ? (
          <figure
            className="w-full h-full rounded-full"
            style={{
              background:
                'radial-gradient(39.24% 39.24% at 50% 50%, rgba(97, 196, 215, 0.5) 0%, rgba(109, 209, 228, 0) 100%)',
            }}
          />
        ) : (
          <ImageWithFallback
            src={image}
            fallback={image}
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>
  )
}

export default Equipment
