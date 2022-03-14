import { Button } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import CheckboxGroup from 'components/CheckboxGroup'
import { Heading } from 'components/Heading'
import { IconSearch } from 'components/icons/components/IconSearch'
import { Input } from 'components/Input'
import { RangeInput } from 'components/RangeInput'
import { Stars } from 'components/Stars'
import cx from 'classnames'
import { Text } from 'components/Text'
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { client } from 'libs'
import { HandlerHeroFilterRequest } from 'types/schema'
import { useConstant, useDebounce, useDisclosure } from '@dwarvesf/react-hooks'
import { HeroCardList } from 'components/HeroCardList'
import { ROUTES } from 'constant/routes'
import { SeverSelect } from 'components/SeverSelect'
import { Empty } from 'components/Empty'
import { IconFilter } from 'components/icons/components/IconFilter'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalTitle,
} from 'components/Modal'
import { IconHelpCircle } from 'components/icons/components/IconHelpCircle'
import useFetch from 'hooks/useFetch'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import { HeroSortType, MarketplaceType } from 'types/hero'
import { PriceSelect } from 'components/PriceSelect'
import { Tooltip } from 'components/Tooltip'
import { FilterSidebarSkeleton } from './FilterSidebarSkeleton'
import { elementalList, qualityList, rarityList } from './filter-data'

interface FilterObject {
  element: string[]
  rank: number
  growth: number[]
  quality: string[]
  rarity: string[]
  sort: HeroSortType
}

const defaultFilters: FilterObject = {
  element: [],
  rank: 0,
  growth: [1, 15],
  quality: [],
  rarity: [],
  sort: '',
}

const PAGE_SIZE = 16

interface HeroListingProps {
  type: 'marketplace' | 'profile' | 'on-sale' | 'sales'
}

const getDefaultValues = (url: string) => {
  const {
    q: qParam,
    element,
    growthFrom,
    growthTo,
    rank: rankParam,
    server: serverParam,
    marketType,
    inGame,
    quality,
    rarity,
    sort,
    page: pageParam,
  } = queryString.parseUrl(url, {
    arrayFormat: 'separator',
    arrayFormatSeparator: '|',
  }).query

  let gFrom =
    growthFrom === undefined || Number.isNaN(growthFrom)
      ? defaultFilters.growth[0]
      : Number(growthFrom)
  let gTo =
    growthTo === undefined || Number.isNaN(growthTo)
      ? defaultFilters.growth[1]
      : Number(growthTo)
  if (gFrom < defaultFilters.growth[0]) {
    gFrom = defaultFilters.growth[0]
  }
  if (gTo > defaultFilters.growth[1]) {
    gTo = defaultFilters.growth[1]
  }

  const rank =
    rankParam === undefined || Number.isNaN(rankParam)
      ? defaultFilters.rank
      : Number(rankParam)
  const page =
    pageParam === undefined || Number.isNaN(pageParam) ? 1 : Number(pageParam)
  const server = typeof serverParam === 'string' ? serverParam : ''
  const q = typeof qParam === 'string' ? qParam : ''

  return {
    q,
    element: Array.isArray(element)
      ? element
      : ([element].filter(Boolean) as string[]),
    quality: Array.isArray(quality)
      ? quality
      : ([quality].filter(Boolean) as string[]),
    rarity: Array.isArray(rarity)
      ? rarity
      : ([rarity].filter(Boolean) as string[]),
    rank,
    growth: [gFrom, gTo],
    server,
    marketType:
      typeof marketType === 'string'
        ? (marketType as MarketplaceType)
        : 'legend-vault',
    sort: typeof sort === 'string' ? (sort as HeroSortType) : '',
    inGame,
    page,
  }
}

export const HeroListing = ({ type }: HeroListingProps) => {
  const { pathname, asPath, replace } = useRouter()
  const firstRender = useRef(true)
  const previousPath = useRef(asPath)
  const defaultParams = useConstant(getDefaultValues(asPath))
  const [server, setServer] = useState<string>(defaultParams.server)
  const [marketType] = useState<MarketplaceType>('flea-market')
  const [sort, setSort] = useState<HeroSortType>(defaultParams.sort)
  const [query, setQuery] = useState(defaultParams.q)
  const [currentPage, setCurrentPage] = useState(defaultParams.page)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [inGame, setInGame] = useState(Boolean(defaultParams.inGame))

  const [filters, setInternalFilters] = useState({
    ...defaultFilters,
    element: defaultParams.element,
    growth: defaultParams.growth,
    quality: defaultParams.quality,
    rarity: defaultParams.rarity,
    rank: defaultParams.rank,
    sort: defaultParams.sort,
  })

  const filterCount = useMemo(() => {
    let count = 0
    if (filters.element.length > 0) {
      count++
    }
    if (filters.quality.length > 0) {
      count++
    }
    if (filters.rarity.length > 0) {
      count++
    }
    if (filters.rank !== 0) {
      count++
    }
    if (filters.growth[0] !== 1 || filters.growth[1] !== 15) {
      count++
    }

    return count
  }, [filters])

  const isFiltersChanged = filterCount > 0

  const setFilters = useCallback((values: Partial<FilterObject>) => {
    setInternalFilters((prev) => ({ ...prev, ...values }))
  }, [])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setCurrentPage(1)
  }, [filters, inGame, marketType, server])

  const [trimQuery, setTrimQuery] = useState(query.trim())
  useEffect(() => {
    setTrimQuery(query.trim())
  }, [query])

  const router = useRouter()
  const { id } = router.query
  const owner = typeof id === 'string' ? id : undefined

  const filterBody: HandlerHeroFilterRequest = useMemo(() => {
    return {
      element: filters.element,
      name: trimQuery,
      ownerAddress: owner,
      growthFrom: filters.growth[0],
      growthTo: filters.growth[1],
      quality: filters.quality,
      rarity: filters.rarity,
      rank: filters.rank,
      pageSize: PAGE_SIZE,
      pageNumber: currentPage,
      sort,
      serverId: server ? Number(server) : undefined,
      inGame,
    }
  }, [filters, trimQuery, currentPage, server, inGame, sort, owner])

  useEffect(() => {
    const {
      element = [],
      growthFrom,
      growthTo,
      name,
      serverId,
      rank,
      pageNumber,
      quality = [],
      rarity = [],
    } = filterBody

    let params: Record<string, any> = {}
    if (name) {
      params = { ...params, q: name }
    }
    if (growthFrom !== 1 || growthTo !== 15) {
      params = { ...params, growthFrom, growthTo }
    }
    if (typeof pageNumber === 'number' && pageNumber > 1) {
      params = { ...params, page: pageNumber }
    }
    if (quality.length > 0) {
      params = { ...params, quality }
    }
    if (rarity.length > 0) {
      params = { ...params, rarity }
    }
    if (rank) {
      params = { ...params, rank }
    }
    if (element.length > 0) {
      params = { ...params, element }
    }
    if (serverId) {
      params = { ...params, server: serverId }
    }

    if (marketType !== 'legend-vault') {
      params = { ...params, marketType }
    }

    if (sort !== '') {
      params = { ...params, sort }
    }

    if (inGame) {
      params = { ...params, inGame }
    }

    const stringifiedParams = queryString.stringify(params, {
      arrayFormat: 'separator',
      arrayFormatSeparator: '|',
    })

    let path = pathname
    if (path.includes('[id]') && typeof id === 'string') {
      path = path.replace('[id]', id)
    }

    const newPath = [path, stringifiedParams].filter(Boolean).join('?')

    if (newPath !== previousPath.current) {
      previousPath.current = newPath
      replace(newPath, undefined, { shallow: true })
    }
  }, [filterBody, pathname, marketType, inGame, replace, sort, id])

  const debouncedFilterBody = useDebounce(filterBody, 500)

  const { data, isFirstLoading, isLoading } = useFetch(() => {
    if (type === 'marketplace') {
      return client.getMarketplaceHeroes(debouncedFilterBody, marketType)
    }
    if (type === 'sales') {
      if (!debouncedFilterBody.ownerAddress) {
        return null
      }
      return client.getMarketplaceHeroes(debouncedFilterBody, 'flea-market')
    }
    if (type === 'profile') {
      return client.getProfileAssets(debouncedFilterBody)
    }
    if (type === 'on-sale') {
      return client.getProfileOnSale(debouncedFilterBody)
    }
  }, [JSON.stringify(debouncedFilterBody), marketType])

  const heroes = data?.data || []

  const getUrl = useMemo(() => {
    if (type === 'marketplace' || type === 'sales') {
      return ROUTES.MARKETPLACE_CHARACTERS_DETAIL.getUrl
    }

    if (type === 'profile') {
      return ROUTES.PROFILE_CHARACTERS_DETAIL.getUrl
    }

    if (type === 'on-sale') {
      return ROUTES.PROFILE_ON_SALE_CHARACTERS_DETAIL.getUrl
    }

    return undefined
  }, [type])

  return (
    <>
      <div className="flex items-start mb-10">
        <div className="flex-1 lg:pr-10">
          <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 justify-between">
              <div className="flex flex-col space-y-2">
                <Text as="span" color="white">
                  Search
                </Text>
                <div className="flex space-x-4">
                  <Input
                    className="sm:w-80 h-10"
                    fullWidth
                    placeholder="Looking for the part of..."
                    endAdornment={<IconSearch />}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                  />
                  <div className="relative block sm:hidden">
                    <Button
                      className="w-10"
                      appearance="borderless"
                      aria-label="Filters"
                      onClick={onOpen}
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
            {(type === 'marketplace' && marketType === 'flea-market') ||
            type !== 'marketplace' ? (
              <div className="grid grid-cols-2 gap-x-6">
                <div className="flex flex-col space-y-2">
                  <Text as="span" color="white">
                    Server
                  </Text>
                  <SeverSelect
                    className="xl:w-44"
                    value={server}
                    onChange={setServer}
                    hasAll
                  />
                </div>
                {(type === 'marketplace' && marketType === 'flea-market') ||
                type === 'sales' ? (
                  <div className="flex flex-col space-y-2">
                    <Text as="span" color="white">
                      Sort by
                    </Text>
                    <PriceSelect
                      className="xl:w-44"
                      value={sort}
                      onChange={setSort}
                    />
                  </div>
                ) : null}
                {type === 'profile' ? (
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
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-6">
            {heroes.length === 0 && !isFirstLoading ? (
              <Empty />
            ) : (
              <HeroCardList
                className={cx('transitiona-all duration-200', {
                  'opacity-50': isLoading,
                })}
                getUrl={getUrl}
                count={data?.metadata.totalCount ?? 0}
                limit={PAGE_SIZE}
                page={currentPage}
                onPageChange={setCurrentPage}
                isLoading={isFirstLoading}
                data={heroes}
                hoverShowGif
                hideFooter={type === 'profile'}
              />
            )}
          </div>
        </div>
        <div className="w-[320px] lg:block hidden flex-none bg-black p-8 rounded-lg">
          <div className="flex items-center justify-between">
            <Heading as="h3" className="mb-1">
              Filters
            </Heading>
            {isFirstLoading ? null : (
              <Button
                className="px-0 text-sm"
                appearance="link"
                disabled={!isFiltersChanged}
                onClick={() => {
                  setFilters(JSON.parse(JSON.stringify(defaultFilters)))
                }}
              >
                Reset all
              </Button>
            )}
          </div>
          {isFirstLoading ? (
            <FilterSidebarSkeleton />
          ) : (
            <div className="mt-5 space-y-10">
              <div className="space-y-2">
                <Heading as="h6">Elemental</Heading>
                <CheckboxGroup
                  value={filters.element}
                  onChange={(element) =>
                    setFilters({ element: element as string[] })
                  }
                  className="space-y-1"
                >
                  {elementalList.map(({ icon, value }) => (
                    <Checkbox key={value} value={value}>
                      {icon}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
              <div className="space-y-2">
                <Heading as="h6">Rank</Heading>
                <Stars
                  max={7}
                  value={filters.rank}
                  onClick={(index) => {
                    if (filters.rank === index + 1) {
                      setFilters({ rank: 0 })
                    } else {
                      setFilters({ rank: index + 1 })
                    }
                  }}
                />
              </div>
              <div className="space-y-6">
                <Heading as="h6">Growth (1 - 15)</Heading>
                <RangeInput
                  min={1}
                  max={15}
                  value={filters.growth}
                  onChange={(growth) => setFilters({ growth })}
                />
              </div>
              <div className="space-y-4">
                <Heading as="h6">Quality</Heading>
                <CheckboxGroup
                  value={filters.quality}
                  onChange={(quality) =>
                    setFilters({ quality: quality as string[] })
                  }
                  className="grid grid-cols-2 gap-6"
                >
                  {qualityList.map(({ text, color, value }) => (
                    <Checkbox key={value} value={value}>
                      <div className="flex items-center space-x-2">
                        <div
                          className={cx('w-1.5 h-1.5 rounded-full', color)}
                        />
                        <Text as="span" color="white">
                          {text}
                        </Text>
                      </div>
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
              <div className="space-y-4">
                <Heading as="h6">Rarity</Heading>
                <CheckboxGroup
                  value={filters.rarity}
                  onChange={(rarity) =>
                    setFilters({ rarity: rarity as string[] })
                  }
                  className="grid grid-cols-2 gap-x-6 gap-y-2"
                >
                  {rarityList.map(({ icon, value }) => (
                    <Checkbox key={value} value={value}>
                      {icon}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
            </div>
          )}
        </div>
      </div>
      {isFirstLoading ? null : (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          className="px-0"
          fullscreen
          animation="slide-up"
        >
          <ModalContent className="pb-0">
            <ModalCloseButton className="z-10" />
            <div
              className={cx('flex flex-col h-full relative', {
                'pb-16': isFiltersChanged,
              })}
            >
              <ModalTitle className="text-2xl font-bold mb-1 px-6">
                Filters
              </ModalTitle>

              <div className="overflow-y-auto flex-1">
                <div className="space-y-10 p-6 pb-8">
                  <div className="space-y-2">
                    <Heading as="h6">Elemental</Heading>
                    <CheckboxGroup
                      value={filters.element}
                      onChange={(element) =>
                        setFilters({ element: element as string[] })
                      }
                      className="space-y-1"
                    >
                      {elementalList.map(({ icon, value }) => (
                        <Checkbox key={value} value={value}>
                          {icon}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </div>
                  <div className="space-y-2">
                    <Heading as="h6">Rank</Heading>
                    <Stars
                      max={7}
                      value={filters.rank}
                      onClick={(index) => {
                        if (filters.rank === index + 1) {
                          setFilters({ rank: 0 })
                        } else {
                          setFilters({ rank: index + 1 })
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-6">
                    <Heading as="h6">Growth (1 - 15)</Heading>
                    <div className="px-2">
                      <RangeInput
                        min={1}
                        max={15}
                        value={filters.growth}
                        onChange={(growth) => setFilters({ growth })}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Heading as="h6">Quality</Heading>
                    <CheckboxGroup
                      value={filters.quality}
                      onChange={(quality) =>
                        setFilters({ quality: quality as string[] })
                      }
                      className="grid grid-cols-2 gap-6"
                    >
                      {qualityList.map(({ text, color, value }) => (
                        <Checkbox key={value} value={value}>
                          <div className="flex items-center space-x-2">
                            <div
                              className={cx('w-1.5 h-1.5 rounded-full', color)}
                            />
                            <Text as="span" color="white">
                              {text}
                            </Text>
                          </div>
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </div>
                  <div className="space-y-4">
                    <Heading as="h6">Rarity</Heading>
                    <CheckboxGroup
                      value={filters.rarity}
                      onChange={(rarity) =>
                        setFilters({ rarity: rarity as string[] })
                      }
                      className="grid grid-cols-2 gap-x-6 gap-y-2"
                    >
                      {rarityList.map(({ icon, value }) => (
                        <Checkbox key={value} value={value}>
                          {icon}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </div>
                </div>
              </div>
              <div
                className={cx(
                  'absolute px-6 bottom-0 inset-x-0 bg-gray-900 border-t border-gray-650 py-3.5 grid grid-cols-2 gap-5',
                  'transition duration-200',
                  { 'translate-y-full': !isFiltersChanged },
                )}
              >
                <Button
                  appearance="borderless"
                  onClick={() => {
                    setFilters(JSON.parse(JSON.stringify(defaultFilters)))
                  }}
                >
                  Clear ({filterCount})
                </Button>
                <Button onClick={onClose}>Apply</Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
