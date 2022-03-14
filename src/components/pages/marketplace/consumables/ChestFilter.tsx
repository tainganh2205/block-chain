import { Button } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import CheckboxGroup from 'components/CheckboxGroup'
import { Heading } from 'components/Heading'
import cx from 'classnames'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalTitle,
} from 'components/Modal'
import { FilterSidebarSkeleton } from 'components/HeroListing/FilterSidebarSkeleton'
import { defaultFilters, FilterObject } from 'hooks/consumables/useFilters'
import { FilterContainer, FilterHeader } from 'components/ConsumableListing'

interface ChestFilterProps {
  isFirstLoading?: boolean
  isFiltersChanged?: boolean
  filters: FilterObject
  setFilters: (filters: Partial<FilterObject>) => void
  filterCount: number
  isModalOpen: boolean
  onModalClose: () => void
}

export const chestTypes = [
  {
    text: 'Legend Chest',
    value: 'Legend Chest',
  },
]

export const ChestFilter = ({
  isFirstLoading = false,
  isFiltersChanged = false,
  filters,
  setFilters,
  filterCount,
  isModalOpen,
  onModalClose,
}: ChestFilterProps) => {
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
            <Heading as="h6">Type</Heading>
            <CheckboxGroup
              value={filters.chestType}
              onChange={(type) => setFilters({ chestType: type as string[] })}
              className="space-y-1"
            >
              {chestTypes.map(({ text, value }) => (
                <Checkbox key={value} value={value}>
                  {text}
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
                      value={filters.chestType}
                      onChange={(type) =>
                        setFilters({ chestType: type as string[] })
                      }
                      className="space-y-1"
                    >
                      {chestTypes.map(({ text, value }) => (
                        <Checkbox key={value} value={value}>
                          {text}
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
