/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo,useCallback, useMemo } from 'react'
import Button from 'components/Button'
import { isMobile } from 'react-device-detect'

import TypeFilter from './TypeFilter'

import { FilterProps } from './index.d'

import './index.less'

const Filter = memo<FilterProps>(({ filters, title, onFilter, onCancle }) => {
  const refs = {}
  const handleApply = useCallback(() => {
    if (onFilter) {
      onFilter(filters.map(filter => ({
        key: filter.keyFilter,
        value: refs[filter.keyFilter].value
      })))
    }
    if (onCancle) {
      onCancle()
    }
  }, [onFilter, filters, refs, onCancle])

  const handleCancle = useCallback(() => {
    if (onCancle) {
      onCancle()
    }
  }, [onCancle])

  return (
    <div
      className='bsc-list-artwork-actions-filter'
    >
      {title && (
        <div
          className='bsc-list-artwork-actions-filter-title'
        >
          <span>{title}</span>
        </div>
      )}
      <div
        className='bsc-list-artwork-actions-filter-content'
      >
        {filters.map(filter => (
          <TypeFilter
            {...filter}
            onFilter={onFilter}
            ref={ref => {refs[filter.keyFilter] = ref}}
          />
        ))}
      </div>
      {isMobile && (<div
        className='bsc-list-artwork-actions-filter-actions'
      >
        <Button
          click={handleApply}
          text='Apply'
          primary
        />
        <Button
          click={handleCancle}
          text='Cancel'
          ghost
        />
      </div>)}
    </div>
  )
})

export * from './index.d'

export default Filter