import { Pagination } from 'components/Pagination'

interface CardListPaginationProps {
  limit: number
  page: number
  onPageChange?: (page: number) => void
  count: number
}

export const CardListPagination = (props: CardListPaginationProps) => {
  const { limit, onPageChange, page, count } = props

  return (
    <div className="flex justify-center sm:justify-end">
      <Pagination
        count={count}
        limit={limit}
        page={page}
        onChange={onPageChange}
      />
    </div>
  )
}
