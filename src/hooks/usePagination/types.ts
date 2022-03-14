export type UsePaginationConfig = {
  totalItems?: number
  initialPage?: number
  initialPageSize?: number
}

export type PaginationActions = {
  setPage: (page: number) => void
  setNextPage: () => void
  setPreviousPage: () => void
  setPageSize: (pageSize: number, nextPage?: number) => void
}

export type PaginationState = {
  totalItems: number
  pageSize: number
  currentPage: number
}

export type PaginationMeta = {
  totalPages: number
  startIndex: number
  endIndex: number
  previousEnabled: boolean
  nextEnabled: boolean
}
