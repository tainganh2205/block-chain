import React from 'react'
import { Heading } from 'components/Heading'
import { Text } from 'components/Text'
import { ElementalBadge, ElementalType } from 'components/ElementalBadge'
import { ModelConsumableItemData } from 'types/schema'
import { AttributeBlock } from 'components/AttributeBlock'
import { RarityBadge, RarityType } from 'components/RarityBadge'
import { GrowthBar } from 'components/GrowthBar'
import { truncate } from '@dwarvesf/react-utils'
import { Card } from 'components/Card'
import { Button } from 'components/Button'
import Link from 'next/link'
import { ROUTES } from 'constant/routes'
import { ConsumableType } from 'types/consumable'

export interface AboutSectionProps {
  data?: ModelConsumableItemData
  extra?: React.ReactNode
}

export const AboutSection = ({ data, extra }: AboutSectionProps) => {
  const elemental = data?.elementSlug as ElementalType
  const server = data?.gameServerName || ''
  const rarity = data?.rarity || 'N/A'
  const owner = data?.ownerAddress || 'N/A'
  const quantity = data?.quantity || 0
  const growth = data?.growth ?? 0
  const maxGrowth = data?.maxGrowth ?? 15
  const description = data?.description ? data.description : 'N/A'
  const category = data?.category ? data?.category : 'N/A'
  const consumableType = data?.itemType as ConsumableType
  const chestType = data?.type

  return (
    <div className="space-y-2">
      <Heading as="h3">About</Heading>
      <Card className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 md:grid-cols-4 gap-y-6 lg:gap-y-10 sm:px-8 px-4 lg:px-10 py-8">
        <AttributeBlock className="col-span-full" title="DESCRIPTION">
          <Text className="font-medium" color="white">
            {description}
          </Text>
        </AttributeBlock>
        <AttributeBlock title="CATEGORY">
          <Text className="font-medium" color="white">
            {category}
          </Text>
        </AttributeBlock>
        {consumableType === 'hero_shard' && (
          <AttributeBlock title="Elemental">
            <ElementalBadge showText type={elemental} />
          </AttributeBlock>
        )}
        {consumableType === 'hero_shard' && (
          <AttributeBlock title="Rarity">
            <RarityBadge size="md" type={rarity as RarityType} />
          </AttributeBlock>
        )}
        {consumableType === 'chest' && (
          <AttributeBlock title="TYPE">
            <Text className="font-medium" color="white">
              {chestType}
            </Text>
          </AttributeBlock>
        )}
        <AttributeBlock title="QUANTITY">
          <Text className="font-medium" color="white">
            {quantity}
          </Text>
        </AttributeBlock>
        <AttributeBlock title="Owner" className="col-span-2">
          <Link
            href={ROUTES.MARKETPLACE_SALE_CONSUMABLES.getUrl(
              owner,
              consumableType,
            )}
          >
            <Button
              as="a"
              appearance="link"
              className="px-0 !text-white hover:!text-primary transition duration-200"
              href={ROUTES.MARKETPLACE_SALE_CONSUMABLES.getUrl(
                owner,
                consumableType,
              )}
            >
              {truncate(owner, 32, true)}
            </Button>
          </Link>
        </AttributeBlock>
        {consumableType === 'hero_shard' && (
          <AttributeBlock title="Server">
            <Text className="font-medium" color="white">
              {server || 'N/A'}
            </Text>
          </AttributeBlock>
        )}
        {extra && <div className="col-span-1">{extra}</div>}
        {consumableType === 'hero_shard' && (
          <AttributeBlock title="Growth" className="col-span-2">
            <GrowthBar max={maxGrowth} value={growth} />
          </AttributeBlock>
        )}
      </Card>
    </div>
  )
}
