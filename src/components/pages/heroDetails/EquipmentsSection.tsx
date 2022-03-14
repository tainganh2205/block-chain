import React from 'react'
import { Heading } from 'components/Heading'
import { Equipment } from 'components/Equipment'
import { Card } from 'components/Card'

export const EquipmentsSection = () => {
  return (
    <div className="flex-1">
      <Heading as="h3">Equipments</Heading>
      <Card className="h-[428px] mt-2 px-6 sm:px-8 lg:px-10 py-8 space-y-2">
        <div className="flex justify-between">
          <Equipment isEmpty type="armor" image="" />
          <Equipment isEmpty type="necklace" image="" />
        </div>
        <div className="flex justify-center">
          <Equipment isEmpty type="weapon" image="" />
        </div>
        <div className="flex justify-between">
          <Equipment isEmpty type="shoe" image="" />
          <Equipment isEmpty type="ring" image="" />
        </div>
      </Card>
    </div>
  )
}
