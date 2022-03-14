import { useEffect, useMemo, useRef } from 'react'
import { usePagination } from 'hooks/usePagination'
import cx from 'classnames'
import { Text } from '../Text'
import { Button } from '../Button1'
import { PaginationItem } from './PaginationItem'
import { IconPaginationNext } from '../icons/components/IconPaginationNext'
import { IconPaginationPrevious } from '../icons/components/IconPaginationPrevious'

// Number of always visible pages before and after the current page.
const SIBLING_COUNT = 1
const DOTS = '...'

interface PaginationProps {
  page: number
  count: number
  limit: number
  onChange?: (page: number) => void
  className?: string
}

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }).map((_, index) => ({
    page: index + start + 1,
    label: index + start + 1,
    isDot: false,
  }))
}

export const Pagination = (props: PaginationProps) => {
  const { limit, page, count, onChange, className } = props
  const {
    currentPage,
    pageSize,
    setNextPage,
    setPreviousPage,
    setPage,
    previousEnabled,
    nextEnabled,
  } = usePagination({
    initialPage: page,
    initialPageSize: limit,
    totalItems: count,
  })
  const firstRender = useRef(true)

  useEffect(() => {
    if (onChange) {
      onChange(currentPage)
    }
  }, [currentPage, onChange])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setPage(page)
  }, [page, setPage])

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(count / limit)

    // Pages count is determined as 2*SIBLING_COUNT + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = SIBLING_COUNT * 2 + 5

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(0, totalPageCount - 1)
    }

    const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 1)
    const rightSiblingIndex = Math.min(
      currentPage + SIBLING_COUNT,
      totalPageCount,
    )
    /*
      We do not want to show dots if there is only one position left
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * SIBLING_COUNT
      const leftRange = range(0, leftItemCount)

      return [
        ...leftRange,
        { page: totalPageCount - 1, isDot: true, label: DOTS },
        { page: totalPageCount, label: totalPageCount },
      ]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * SIBLING_COUNT
      const rightRange = range(
        totalPageCount - rightItemCount,
        totalPageCount - 1,
      )
      return [
        { page: 1, label: 1 },
        { page: 2, label: DOTS, isDot: true },
        ...rightRange,
      ]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [
        { page: 1, label: 1 },
        { page: 2, label: DOTS, isDot: true },
        ...middleRange,
        { page: totalPageCount - 1, label: DOTS, isDot: true },
        { page: totalPageCount, label: totalPageCount },
      ]
    }
  }, [limit, currentPage, count])

  if (count <= limit) {
    return null
  }

  const currentStartResult = (currentPage - 1) * pageSize + 1
  const currentPageMaxResult =
    currentStartResult + Math.min(currentPage * pageSize, limit) - 1
  const currentLastResult =
    currentPageMaxResult > count ? count : currentPageMaxResult

  return (
    <div
      className={cx(
        'flex items-center justify-center md:justify-start',
        className,
      )}
    >
      <Text className="text-gray-250 hidden md:block mr-8" size="sm">
        {currentStartResult}-{currentLastResult} of {count} results
      </Text>
      <ul className="flex">
        <li className="flex items-center">
          <Button
            className="bg-gray-650 text-gray-300 rounded !p-2 mr-2"
            onClick={setPreviousPage}
            disabled={!previousEnabled}
            appearance="link"
            size="sm"
          >
            <IconPaginationPrevious />
          </Button>
        </li>
        {(paginationRange ?? []).map((item) => (
          <PaginationItem
            page={item.page}
            key={`item-${item.page}`}
            label={item.label}
            selected={item.page === currentPage}
            onClick={() => setPage(item.page)}
            isDot={item.isDot}
          />
        ))}
        <li className="flex items-center">
          <Button
            disabled={!nextEnabled}
            onClick={setNextPage}
            className="bg-gray-650 text-gray-300 rounded !px-2 !py-3 ml-2"
            appearance="link"
            size="sm"
          >
            <IconPaginationNext />
          </Button>
        </li>
      </ul>
    </div>
  )
}
