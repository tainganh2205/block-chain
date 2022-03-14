import { limitPageBounds } from './utils'
import type { PaginationState } from './types'

export const ACTION_TYPE_SET_TOTAL_ITEMS = 'SET_TOTAL_ITEMS'
export const ACTION_TYPE_SET_PAGE = 'SET_PAGE'
export const ACTION_TYPE_NEXT_PAGE = 'NEXT_PAGE'
export const ACTION_TYPE_PREVIOUS_PAGE = 'PREVIOUS_PAGE'
export const ACTION_TYPE_SET_PAGE_SIZE = 'SET_PAGE_SIZE'

type CurrentPageActions =
  | { type: typeof ACTION_TYPE_NEXT_PAGE }
  | { type: typeof ACTION_TYPE_PREVIOUS_PAGE }
  | { type: typeof ACTION_TYPE_SET_PAGE; page: number }

type TotalItemsActions = {
  type: typeof ACTION_TYPE_SET_TOTAL_ITEMS
  totalItems: number
  nextPage?: number
}

type PageSizeActions = {
  type: typeof ACTION_TYPE_SET_PAGE_SIZE
  pageSize: number
  nextPage?: number
}

type PaginationStateReducerActions =
  | CurrentPageActions
  | TotalItemsActions
  | PageSizeActions

const getCurrentPageReducer = (rootState: PaginationState) =>
  function currentPageReducer(
    state: PaginationState['currentPage'],
    action: PaginationStateReducerActions,
  ) {
    switch (action.type) {
      case ACTION_TYPE_SET_PAGE:
        return limitPageBounds(
          rootState.totalItems,
          rootState.pageSize,
        )(action.page)
      case ACTION_TYPE_NEXT_PAGE:
        return limitPageBounds(
          rootState.totalItems,
          rootState.pageSize,
        )(state + 1)
      case ACTION_TYPE_PREVIOUS_PAGE:
        return limitPageBounds(
          rootState.totalItems,
          rootState.pageSize,
        )(state - 1)
      case ACTION_TYPE_SET_PAGE_SIZE:
        return limitPageBounds(
          rootState.totalItems,
          action.pageSize,
        )(action.nextPage ?? state)
      case ACTION_TYPE_SET_TOTAL_ITEMS:
        return limitPageBounds(
          action.totalItems,
          rootState.pageSize,
        )(action.nextPage ?? state)
      /* istanbul ignore next */
      default:
        return state
    }
  }

function totalItemsReducer(
  state: PaginationState['totalItems'],
  action: TotalItemsActions,
) {
  switch (action.type) {
    case ACTION_TYPE_SET_TOTAL_ITEMS:
      return action.totalItems
    default:
      return state
  }
}

function pageSizeReducer(
  state: PaginationState['pageSize'],
  action: PageSizeActions,
) {
  switch (action.type) {
    case ACTION_TYPE_SET_PAGE_SIZE:
      return action.pageSize
    default:
      return state
  }
}

export function paginationStateReducer(
  state: PaginationState,
  action: PaginationStateReducerActions,
): PaginationState {
  return {
    currentPage: getCurrentPageReducer(state)(
      state.currentPage,
      action as CurrentPageActions,
    ),
    totalItems: totalItemsReducer(
      state.totalItems,
      action as TotalItemsActions,
    ),
    pageSize: pageSizeReducer(state.pageSize, action as PageSizeActions),
  }
}
