import React, { memo, useCallback } from 'react'
import { Input } from 'antd'
import debounce from 'lodash.debounce'
import { SearchBoxBSCProps } from './index.d'
import './index.less'

const SearchBox = memo<SearchBoxBSCProps>(({ search, defaultValue, value, change }) => {
  const handleSearch = debounce(useCallback((keywork) => {
    return search && search(keywork)
  }, [search]), 500)
  return (
    <Input defaultValue={defaultValue} value={value} placeholder='Search enter keyword' onChange={(e) => {
      handleSearch(e.target.value)
    }} 
    // onSearch={handleSearch}
     className='input-art' />
  )
})

export default SearchBox