import type { PaginationState, PaginationMeta } from './types'

export const getPreviousEnabled = (currentPage: number): boolean =>
  currentPage > 1

export const getNextEnabled = (
  currentPage: number,
  totalPages: number,
): boolean => currentPage + 1 <= totalPages

export const getTotalPages = (totalItems: number, pageSize: number): number =>
  Math.ceil(totalItems / pageSize)

export const getStartIndex = (pageSize: number, currentPage: number): number =>
  pageSize * currentPage

export const getEndIndex = (
  pageSize: number,
  currentPage: number,
  totalItems: number,
): number => {
  const lastPageEndIndex = pageSize * (currentPage + 1)

  if (lastPageEndIndex >= totalItems) {
    return totalItems
  }

  return lastPageEndIndex
}

export const limitPageBounds =
  (totalItems: number, pageSize: number) =>
  (page: number): number =>
    Math.min(Math.max(page, 1), getTotalPages(totalItems, pageSize))

export const getPaginationMeta = ({
  totalItems,
  pageSize,
  currentPage,
}: PaginationState): PaginationMeta => {
  const totalPages = getTotalPages(totalItems, pageSize)
  return {
    totalPages,
    startIndex: getStartIndex(pageSize, currentPage),
    endIndex: getEndIndex(pageSize, currentPage, totalItems),
    previousEnabled: getPreviousEnabled(currentPage),
    nextEnabled: getNextEnabled(currentPage, totalPages),
  }
}
