import { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Pagination } from '.'

storiesOf('components/Pagination', module).add('basic', () => {
  const totalCount = 50
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <Pagination
      page={currentPage}
      limit={10}
      count={totalCount}
      onChange={(page) => setCurrentPage(page)}
    />
  )
})
