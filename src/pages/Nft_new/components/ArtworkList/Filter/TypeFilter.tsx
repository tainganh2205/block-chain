/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { memo, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import { isMobile } from 'react-device-detect'

import { TypeFilterProps, TypeFilterRef } from './index.d'

const TypeFilter = memo<TypeFilterProps>(
  forwardRef<TypeFilterRef, TypeFilterProps>(({ keyFilter, title, filter, onFilter }, ref) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(filter[0].value)
  
  const selectFilter = useCallback((selected) => {
    setSelectedFilter(selected)
  }, [])

  const handleFilter = useCallback((value) => {
    if (onFilter && !isMobile) {
      onFilter([{ key: keyFilter, value }])
    }
    selectFilter(value)
  }, [onFilter, keyFilter, selectFilter])

  useImperativeHandle(ref, () => {
    return {
      value: selectedFilter
    }
  }, [selectedFilter])

  return (
    <div
      className='bsc-list-artwork-actions-filter-type'
    >
      {title && (<span>{title}</span>)}
      <ul>
        {filter.map(({ label, value }) => (
          <li onClick={() => handleFilter(value)} key={label}>
            <div className={`${selectedFilter === value ? 'bsc-list-artwork-actions-filter-selected' : ''}`} />
            <span>
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}))

export default TypeFilter