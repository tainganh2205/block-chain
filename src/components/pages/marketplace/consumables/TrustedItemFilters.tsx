import { Button } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import CheckboxGroup from 'components/CheckboxGroup'
import { Heading } from 'components/Heading'
import { RangeInput } from 'components/RangeInput'
import cx from 'classnames'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalTitle,
} from 'components/Modal'
import { FilterSidebarSkeleton } from 'components/HeroListing/FilterSidebarSkeleton'
import { defaultFilters, FilterObject } from 'hooks/consumables/useFilters'
import {
  elementalList,
  rarityList,
} from 'components/ConsumableListing/filter-data'
import { FilterContainer, FilterHeader } from 'components/ConsumableListing'

interface TrustedItemFiltersProps {
  isFirstLoading?: boolean
  isFiltersChanged?: boolean
  filters: FilterObject
  setFilters: (filters: Partial<FilterObject>) => void
  filterCount: number
  isModalOpen: boolean
  onModalClose: () => void
}

export const TrustedItemFilters = ({
  isFirstLoading = false,
  isFiltersChanged = false,
  filters,
  setFilters,
  filterCount,
  isModalOpen,
  onModalClose,
}: TrustedItemFiltersProps) => {
  return (
    <FilterContainer>
      <FilterHeader
        isFirstLoading={isFirstLoading}
        isFiltersChanged={isFiltersChanged}
        onResetClick={() =>
          setFilters(JSON.parse(JSON.stringify(defaultFilters)))
        }
      />
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
            <Heading as="h6">Rarity</Heading>
            <CheckboxGroup
              value={filters.rarity}
              onChange={(rarity) => setFilters({ rarity: rarity as string[] })}
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
      {isFirstLoading ? null : (
        <Modal
          isOpen={isModalOpen}
          onClose={onModalClose}
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
                <Button onClick={onModalClose}>Apply</Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
    </FilterContainer>
  )
}
