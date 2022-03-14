import { useMemo } from 'react'
import { useDebounce, useDisclosure } from '@dwarvesf/react-hooks'
import { TrustedItemCard } from 'components/ConsumableCard'
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
import { TrustedItemFilters } from './TrustedItemFilters'

interface TrustedItemListingProps {
  marketType: ConsumableMarketType
}

export const TrustedItemListing = ({ marketType }: TrustedItemListingProps) => {
  const {
    isOpen: isOpenMobileFilter,
    onClose: onCloseMobileFilter,
    onOpen: onOpenMobileFilter,
  } = useDisclosure()

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
  } = useFilterConsumables('hero_shard')

  const debouncedFilterBody = useDebounce(filterBody, 500)

  const { data, isFirstLoading, isLoading } = useFetchConsumables(
    'hero_shard',
    marketType,
    debouncedFilterBody,
  )

  const getUrl = useMemo(() => {
    if (marketType === 'marketplace' || marketType === 'sales') {
      return ROUTES.MARKETPLACE_CONSUMABLE_DETAIL.getUrl
    }

    if (marketType === 'profile') {
      return ROUTES.PROFILE_MY_ASSETS_CONSUMABLE_DETAIL.getUrl
    }

    if (marketType === 'on-sale') {
      return ROUTES.PROFILE_ON_SALE_CONSUMABLE_DETAIL.getUrl
    }

    return undefined
  }, [marketType])

  const consumables = data?.data || []

  return (
    <ListingContainer
      filter={
        <TrustedItemFilters
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
          type="hero_shard"
        />
        <div className="mt-6">
          {consumables.length === 0 && !isFirstLoading ? (
            <Empty />
          ) : (
            <CardListContainer
              isFirstLoading={isFirstLoading}
              isLoading={isLoading}
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
                return (
                  <TrustedItemCard
                    key={consumable.id}
                    href={
                      getUrl && consumable.id
                        ? getUrl(consumable.id, 'hero_shard')
                        : undefined
                    }
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
