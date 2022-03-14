import React, { useCallback } from 'react'
import { Heading } from 'components/Heading'
import { Button } from 'components/Button'
import Link from 'next/link'
import { ROUTES } from 'constant/routes'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs'
import cx from 'classnames'
import { CardListContainer } from 'components/ConsumableListing'
import { Empty } from 'components/Empty'
import { mapConsumableData } from 'utils/data'
import { LegendaryChestCard, TrustedItemCard } from 'components/ConsumableCard'
import { ConsumableType } from 'types/consumable'
import { ModelConsumableItemData } from 'types/schema'

export interface SimilarNFTSectionProps {
  consumableId: string
  consumableType: ConsumableType
  className?: string
}

export const SimilarNFTSection = (props: SimilarNFTSectionProps) => {
  const { consumableId, className, consumableType } = props

  const { data: similarData, isFirstLoading } = useFetchWithCache(
    [GET_PATHS.marketplaceSimilarConsumables, consumableId, consumableType],
    (_, consumableId, type) =>
      client.getMarketplaceSimilarConsumables(consumableId as string, type),
  )

  const similarAssets = similarData?.data || []

  const renderItem = useCallback((consumable: ModelConsumableItemData) => {
    const mappedData = mapConsumableData(consumable)
    if (mappedData.itemType === 'hero_shard') {
      return (
        <TrustedItemCard
          key={consumable.id}
          href={ROUTES.MARKETPLACE_CONSUMABLE_DETAIL.getUrl(
            consumable.id as string,
            mappedData.itemType,
          )}
          hidePrice
          {...mappedData}
        />
      )
    }
    if (mappedData.itemType === 'chest') {
      return (
        <LegendaryChestCard
          key={consumable.id}
          href={ROUTES.MARKETPLACE_CONSUMABLE_DETAIL.getUrl(
            consumable.id as string,
            mappedData.itemType,
          )}
          hidePrice
          {...mappedData}
        />
      )
    }

    return null
  }, [])

  return (
    <div className={cx('space-y-2', className)}>
      <div className="flex">
        <Heading as="h3">Similar NFT</Heading>
        <Link href={`${ROUTES.MARKETPLACE_CONSUMABLES}?type=${consumableType}`}>
          <Button appearance="link">
            {!similarAssets.length ? 'Visit marketplace' : 'View all'}
          </Button>
        </Link>
      </div>

      <CardListContainer isFirstLoading={isFirstLoading} column="4">
        {similarAssets?.slice(0, 4).map((consumable) => renderItem(consumable))}
      </CardListContainer>
      {!similarData?.data?.length && <Empty type="data" className="py-10" />}
    </div>
  )
}
