import React from 'react'
import { Text } from '@artechain/uikit'
import styled from 'styled-components'
import { RowFixed } from '../Row'

export const FilterWrapper = styled(RowFixed)`
  /* padding: 8px; */
  background: rgba(19, 200, 90, 0.1);
  border-radius: 8px;
  user-select: none;
  padding: 6px 10px;
  & > * {
    user-select: none;
  }
  :hover {
    cursor: pointer;
  }
`

export default function SortButton({
  toggleSortOrder,
  ascending
}: {
  toggleSortOrder: () => void
  ascending: boolean
}) {
  return (
    <FilterWrapper onClick={toggleSortOrder}>
      <Text fontSize="14px" className='cl-light-primary'>{ascending ? '↑' : '↓'}</Text>
    </FilterWrapper>
  )
}
