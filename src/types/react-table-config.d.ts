import {
  UseRowSelectState,
  UsePaginationState,
  UsePaginationInstanceProps,
  UseRowSelectRowProps,
  UseTableColumnOptions as RTUseTableColumnOptions,
  Hooks as RTHooks,
} from 'react-table'

declare module 'react-table' {
  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseRowSelectState<D>,
      UsePaginationState<D> {}

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UsePaginationInstanceProps<D> {}

  export interface UseTableColumnOptions extends RTUseTableColumnOptions {
    className?: string
  }

  export interface Row<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseRowSelectRowProps<D> {}
}
