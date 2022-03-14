import { ChangeEvent, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import { IconSearch } from 'components/icons/components/IconSearch'
import { Input } from 'components/Input'
import { Text } from 'components/Text'
import { SeverSelect } from 'components/SeverSelect'
import { IconFilter } from 'components/icons/components/IconFilter'
import { IconHelpCircle } from 'components/icons/components/IconHelpCircle'
import { PriceSelect } from 'components/PriceSelect'
import { Tooltip } from 'components/Tooltip'
import {
  ConsumableMarketType,
  ConsumableSortType,
  ConsumableType,
} from 'types/consumable'

interface ListingHeaderProps {
  marketType: ConsumableMarketType
  query: string
  setQuery: (query: string) => void
  inGame: boolean
  setInGame: (inGame: boolean) => void
  server: string
  setServer: (server: string) => void
  sort: ConsumableSortType
  setSort: (sort: ConsumableSortType) => void
  filterCount: number
  openMobileFilter: () => void
  type: ConsumableType
}

export const ListingHeader = ({
  query,
  setQuery,
  filterCount,
  inGame,
  setInGame,
  server,
  setServer,
  sort,
  setSort,
  marketType,
  openMobileFilter,
  type,
}: ListingHeaderProps) => {
  const { query: pathQuery } = useRouter()

  const searchPlaceholder = useMemo(() => {
    if (pathQuery.type === 'hero_shard') {
      return 'Trusted Items name'
    }
    if (pathQuery.type === 'crystal') {
      return 'Crystal name'
    }
    if (pathQuery.type === 's') {
      return 'Skillbooks name'
    }
    if (pathQuery.type === 'chest') {
      return 'Looking for the part of...'
    }
    return 'Search'
  }, [pathQuery.type])

  return (
    <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 sm:space-x-6">
      <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 justify-between">
        {/* Header Filter  */}
        <div className="flex flex-col space-y-2">
          <Text as="span" color="white">
            Search
          </Text>
          <div className="flex space-x-4">
            <Input
              className="sm:w-80 h-10"
              placeholder={searchPlaceholder}
              fullWidth
              endAdornment={<IconSearch />}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <div className="relative block sm:hidden">
              <Button
                className="w-10"
                appearance="borderless"
                aria-label="Filters"
                onClick={openMobileFilter}
              >
                <IconFilter className="flex-none" aria-hidden />
              </Button>
              {filterCount > 0 ? (
                <div
                  className="w-5 h-5 flex items-center justify-center text-xs bg-red-600 text-white rounded-full absolute font-semibold -right-1 -top-0 leading-none pb-0.5"
                  aria-label={`${filterCount} active filter${
                    filterCount > 1 ? 's' : ''
                  }`}
                >
                  <span aria-hidden>{filterCount}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* Filter servers and sorting */}
      <div className="grid grid-cols-2 gap-x-6">
        <div className="flex flex-col space-y-2">
          <Text as="span" color="white">
            Server
          </Text>
          <SeverSelect
            className="xl:w-44 h-10"
            value={server}
            onChange={setServer}
            hasAll
          />
        </div>
        {marketType === 'marketplace' || marketType === 'sales' ? (
          <div className="flex flex-col space-y-2">
            <Text as="span" color="white">
              Sort by
            </Text>
            <PriceSelect
              className="xl:w-44 h-10"
              value={sort}
              onChange={setSort}
            />
          </div>
        ) : null}
        {marketType === 'profile' ? (
          <div>
            {type !== 'chest' && (
              <div className="flex items-center space-x-2 pt-8">
                <Checkbox
                  checked={inGame}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInGame(e.target.checked)
                  }
                >
                  <Text as="span" color="gray-300">
                    In-game Assets
                  </Text>
                </Checkbox>
                <Tooltip
                  className="w-56 text-center text-sm font-semibold"
                  label="Your assets imported in game are stored here. You can list them on marketplace to sell."
                >
                  <IconHelpCircle className="text-gray-300" />
                </Tooltip>
              </div>
            )}
          </div>
        ) : null}
        {/* End Filter servers and sorting */}
      </div>
    </div>
  )
}
