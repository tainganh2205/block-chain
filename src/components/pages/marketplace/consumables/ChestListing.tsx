import { useCallback } from 'react'
import { useDebounce, useDisclosure } from '@dwarvesf/react-hooks'
import { LegendaryChestCard } from 'components/ConsumableCard'
import { ROUTES } from 'constant/routes'
import { Empty } from 'components/Empty'
import { useFilterConsumables, PAGE_SIZE } from 'hooks/consumables/useFilters'
import { useFetchConsumables } from 'hooks/consumables/useFetchConsumables'
import { ConsumableMarketType } from 'types/consumable'
import {
  ListingContainer,
  ListingHeader,
  CardListContainer,
  CardListPagination,
} from 'components/ConsumableListing'
import { mapConsumableData } from 'utils/data'
import { ModelConsumableItemData } from 'types/schema'
import { ChestFilter } from './ChestFilter'

interface ChestListingProps {
  marketType: ConsumableMarketType
}

export const ChestListing = ({ marketType }: ChestListingProps) => {
  const {
    isOpen: isOpenMobileFilter,
    onClose: onCloseMobileFilter,
    onOpen: onOpenMobileFilter,
  } = useDisclosure()

  const consumableType = 'chest'

  const {
    query,
    setQuery,
    inGame,
    setInGame,
    server,
    setServer,
    sort,
    setSort,
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
    filterBody,
    isFiltersChanged,
    filterCount,
  } = useFilterConsumables(consumableType)

  const debouncedFilterBody = useDebounce(filterBody, 500)

  const { data, isFirstLoading, isLoading } = useFetchConsumables(
    consumableType,
    marketType,
    debouncedFilterBody,
  )

  const getUrl = useCallback(
    (consumable?: ModelConsumableItemData) => {
      if (!consumable || !consumable.id) return undefined
      const { id } = consumable

      if (marketType === 'marketplace' || marketType === 'sales') {
        return ROUTES.MARKETPLACE_CONSUMABLE_DETAIL.getUrl(id, 'chest')
      }

      if (marketType === 'profile') {
        return ROUTES.PROFILE_MY_ASSETS_CONSUMABLE_DETAIL.getUrl(id, 'chest')
      }

      if (marketType === 'on-sale') {
        return ROUTES.PROFILE_ON_SALE_CONSUMABLE_DETAIL.getUrl(id, 'chest')
      }

      return undefined
    },
    [marketType],
  )

  const consumables = data?.data || []

  return (
    <ListingContainer
      filter={
        <ChestFilter
          isFirstLoading={isFirstLoading}
          isFiltersChanged={isFiltersChanged}
          filters={filters}
          setFilters={setFilters}
          filterCount={filterCount}
          isModalOpen={isOpenMobileFilter}
          onModalClose={onCloseMobileFilter}
        />
      }
    >
      <div className="flex-1 lg:pr-10">
        <ListingHeader
          marketType={marketType}
          query={query}
          setQuery={setQuery}
          inGame={inGame}
          setInGame={setInGame}
          server={server}
          setServer={setServer}
          sort={sort}
          setSort={setSort}
          filterCount={filterCount}
          openMobileFilter={onOpenMobileFilter}
          type="chest"
        />
        <div className="mt-6">
          {consumables.length === 0 && !isFirstLoading ? (
            <Empty />
          ) : (
            <CardListContainer
              isLoading={isLoading}
              isFirstLoading={isFirstLoading}
              column="5"
              pagination={
                <CardListPagination
                  count={data?.metadata?.totalCount ?? 0}
                  limit={PAGE_SIZE}
                  page={currentPage}
                  onPageChange={setCurrentPage}
                />
              }
            >
              {consumables.map((consumable) => {
                const mappedData = mapConsumableData(consumable)
                console.log(mappedData)
                return (
                  <LegendaryChestCard
                    key={consumable.id}
                    href={getUrl(consumable)}
                    hidePrice={marketType === 'profile'}
                    {...mappedData}
                  />
                )
              })}
            </CardListContainer>
          )}
        </div>
      </div>
    </ListingContainer>
  )
}
