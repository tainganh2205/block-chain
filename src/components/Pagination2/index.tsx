/* eslint-disable react-hooks/exhaustive-deps, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { memo, useCallback, useMemo, useState,useEffect } from 'react'
import debounce from 'lodash.debounce'
import { Pagination } from 'antd';

import './index.less'
import { PaginationBSCProps } from './index.d'

const PaginationBSC2 = memo<PaginationBSCProps>((props) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const countPages = useMemo<number>(() => {
    const count = Math.ceil(props.totalCount / props.pageSize)
    return Number.isNaN(count) ? 0 : count
  }, [props.pageSize, props.totalCount])
  
  const handleChangePage = useCallback((nextPage) => {
    setCurrentPage(p => {
      // const nextPage = (p+_temp)
      // if (nextPage > countPages || nextPage < 1) {
      //   return p
      // }
      if (props.onPageChange) {
        props.onPageChange({ pageNumber: nextPage })
      }
      return nextPage
    })
  }, [props.onPageChange, countPages])

  useEffect(() => {
    if (currentPage > countPages || currentPage < 1) {
      setCurrentPage(1)
    }
  }, [countPages, currentPage])

  return (
    <>
    <Pagination className='pagination-art' pageSize={24} current={currentPage || 1} defaultCurrent={currentPage || 1} total={props.totalCount} onChange={handleChangePage} />
    {/* <div
      className='bsc-pagination2'
    >
      <div
        className='bsc-pagination2-current-page'
      >
        <span>{currentPage}</span>
      </div>
      <div
        className='bsc-pagination2-pages'
      >
        <span>of {countPages}</span>
      </div>
      <div
        onClick={debounce(() => handleChangePage(-1), 200, { leading: true, trailing: false })}
        className='bsc-pagination2-prev'
      >
        <img src={`${currentPage !== 1 ? '/images/pagination-next.svg' : '/images/pagination-prev.svg'}`} alt='...' />
      </div>
      <div
        onClick={debounce(() => handleChangePage(1), 200, { leading: true, trailing: false })}
        className='bsc-pagination2-next'
      >
        <img src={`${currentPage !==  countPages ? '/images/pagination-next.svg' : '/images/pagination-prev.svg'}`} alt='...' />
      </div>
    </div> */}
    </>
  )
})
export * from './index.d'
export default PaginationBSC2