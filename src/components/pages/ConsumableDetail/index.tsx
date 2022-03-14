import React from 'react'
import { ConsumableCardDetail } from 'components/ConsumableCardDetail'
import { ModelConsumableItemData } from 'types/schema'
import { mapConsumableData } from 'utils/data'
import { AboutSection } from './AboutSection'
import { SimilarNFTSection } from './SimilarNFTSection'

export interface ConsumableDetailProps {
  consumable?: ModelConsumableItemData
  priceSection?: React.ReactNode
  extra?: React.ReactNode
  actions?: React.ReactNode
  showSimilarNFT?: boolean
}

export const ConsumableDetail = ({
  consumable,
  priceSection,
  extra,
  actions,
  showSimilarNFT = false,
}: ConsumableDetailProps) => {
  const consumableDetailData = mapConsumableData(
    consumable as ModelConsumableItemData,
  )
  return (
    <div className="lg:flex mt-6 space-y-6 lg:space-y-0">
      <div className="w-full max-w-[260px] mx-auto md:max-w-full md:w-[496px] lg:w-1/3 xl:px-12">
        <div className="w-full sticky top-36 flex flex-col items-center space-y-6 lg:space-y-10">
          <ConsumableCardDetail
            className="w-full sm:w-[400px] h-[400px] sm:h-[580px]"
            size="xl"
            {...consumableDetailData}
          />
          {actions}
        </div>
      </div>
      <div className="xl:flex-1 lg:w-2/3 lg:pl-10">
        {priceSection}
        <div className="space-y-10">
          <AboutSection data={consumable} extra={extra} />
          {showSimilarNFT && (
            <SimilarNFTSection
              consumableId={consumable?.id as string}
              consumableType={consumableDetailData.itemType}
            />
          )}
        </div>
      </div>
    </div>
  )
}
