import { Button } from 'components/Button'
import { Heading } from 'components/Heading'

interface FilterHeaderProps {
  isFirstLoading?: boolean
  isFiltersChanged?: boolean
  onResetClick: () => void
}

export const FilterHeader = ({
  isFirstLoading = false,
  isFiltersChanged = false,
  onResetClick,
}: FilterHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <Heading as="h3" className="mb-1">
        Filters
      </Heading>
      {isFirstLoading ? null : (
        <Button
          className="px-0 text-sm"
          appearance="link"
          disabled={!isFiltersChanged}
          onClick={onResetClick}
        >
          Reset all
        </Button>
      )}
    </div>
  )
}
