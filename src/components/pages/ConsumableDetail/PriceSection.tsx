import React from 'react'
import { Text } from 'components/Text'
import { ModelConsumableItemData } from 'types/schema'
import { formatCurrency } from 'utils/currency'
import { convertEtherToWei } from 'utils/wallet'
import { Alert, AlertIcon, AlertTitle } from 'components/Alert'
import { AlertBody } from 'components/Alert/AlertBody'
import { CONSUMABLE_STATUS } from 'constant/consumable'
import { IconCurrency } from 'components/IconCurrency'
import { formatNumber } from 'utils/number'
import { BuyButton } from './BuyButton'
import { ProfileAssetContextProvider } from '../profile/profile-asset-context'

export interface PriceSectionProps {
  consumable: ModelConsumableItemData
  refreshData?: () => void
}

export const PriceSection = ({
  consumable,
  refreshData,
}: PriceSectionProps) => {
  if (consumable?.status === CONSUMABLE_STATUS.BUYING) {
    return (
      <Alert status="info" className="mb-6 bg-gray-650">
        <AlertIcon />
        <AlertBody>
          <AlertTitle>This asset is pending for a purchase!</AlertTitle>
        </AlertBody>
      </Alert>
    )
  }

  return (
    <div className="flex justify-center lg:justify-end mb-10 lg:mb-0">
      <div className="flex lg:flex-row flex-col justify-center space-y-6 lg:space-y-0 items-center lg:space-x-5">
        <div className="flex items-center space-x-2">
          <IconCurrency
            className="h-8 w-8 object-scale-down"
            symbol={consumable.symbol}
          />
          <Text
            as="span"
            className="text-2xl sm:text-32 font-bold"
            color="white"
          >
            {formatNumber(Number(convertEtherToWei(consumable.price || 0)))}{' '}
            {consumable.symbol}
          </Text>
        </div>
        <Text className="font-bold" color="gray-300">
          (~ {formatCurrency(consumable.priceUSD || 0)})
        </Text>
        <ProfileAssetContextProvider>
          <BuyButton consumable={consumable} refreshData={refreshData} />
        </ProfileAssetContextProvider>
      </div>
    </div>
  )
}
