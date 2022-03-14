import { useCallback, useEffect, useMemo, useRef, useReducer } from 'react'
import {
  paginationStateReducer,
  ACTION_TYPE_SET_TOTAL_ITEMS,
  ACTION_TYPE_SET_PAGE,
  ACTION_TYPE_NEXT_PAGE,
  ACTION_TYPE_PREVIOUS_PAGE,
  ACTION_TYPE_SET_PAGE_SIZE,
} from './reducer'
import { getPaginationMeta } from './utils'
import type {
  UsePaginationConfig,
  PaginationActions,
  PaginationState,
  PaginationMeta,
} from './types'

export function usePagination({
  totalItems = 0,
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationConfig = {}): PaginationState &
  PaginationMeta &
  PaginationActions {
  const initialState = {
    totalItems,
    pageSize: initialPageSize,
    currentPage: initialPage,
  }

  const [paginationState, dispatch] = useReducer(
    paginationStateReducer,
    initialState,
  )

  const totalItemsRef = useRef(totalItems)
  totalItemsRef.current = totalItems

  useEffect(() => {
    return () => {
      if (
        typeof totalItemsRef.current !== 'number' ||
        totalItems === totalItemsRef.current
      ) {
        return
      }

      dispatch({
        type: ACTION_TYPE_SET_TOTAL_ITEMS,
        totalItems: totalItemsRef.current,
      })
    }
  }, [totalItems])

  return {
    ...paginationState,
    ...useMemo(() => getPaginationMeta(paginationState), [paginationState]),
    setPage: useCallback((page: number) => {
      dispatch({
        type: ACTION_TYPE_SET_PAGE,
        page,
      })
    }, []),
    setNextPage: useCallback(() => {
      dispatch({ type: ACTION_TYPE_NEXT_PAGE })
    }, []),
    setPreviousPage: useCallback(() => {
      dispatch({ type: ACTION_TYPE_PREVIOUS_PAGE })
    }, []),
    setPageSize: useCallback((pageSize: number, nextPage = 0) => {
      dispatch({ type: ACTION_TYPE_SET_PAGE_SIZE, pageSize, nextPage })
    }, []),
  }
}
