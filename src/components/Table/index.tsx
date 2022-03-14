import cx from 'classnames'
import {
  useTable,
  useMountedLayoutEffect,
  useRowSelect,
  usePagination,
  Column,
  ColumnInstance,
  IdType,
  PluginHook,
  Hooks,
} from 'react-table'
import { DEFAULT_PAGE_SIZE } from 'constant/pagination'
import { Empty } from 'components/Empty'
import { IndeterminateCheckbox } from './IndeterminateCheckbox'
import { Pagination } from '../Pagination1'

export interface RowSelectionType {
  selectedRows: Record<IdType<any>, boolean>
  onSelectedRowsChange: (rows: Record<IdType<any>, boolean>) => void
}

export interface PaginationType {
  pageSize?: number
  pageIndex?: number
}

interface TableProps<RecordType extends object> {
  data: RecordType[]
  columns: Array<Column<RecordType>>
  rowSelection?: RowSelectionType
  pagination?: PaginationType
  className?: string
  rowClassName?: string
  minWidth?: number
}

export function Table<RecordType extends object = any>(
  props: TableProps<RecordType>,
) {
  const {
    data,
    columns,
    rowSelection,
    pagination,
    className,
    rowClassName,
    minWidth = 0,
  } = props

  const params = [
    pagination && usePagination,
    rowSelection && useRowSelect,
    (hooks: Hooks<RecordType>) => {
      hooks.visibleColumns.push((columns) => {
        if (rowSelection) {
          return [
            {
              id: 'selection',
              className: 'border-b-0',
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox
                    name="selection"
                    {...row.getToggleRowSelectedProps()}
                  />
                </div>
              ),
            } as ColumnInstance<RecordType>,
            ...columns,
          ]
        }
        return columns
      })
    },
  ].filter(Boolean)

  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow,
    page,
    gotoPage,
    state: { selectedRowIds, pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        selectedRowIds: rowSelection?.selectedRows,
        pageSize: pagination?.pageSize ?? DEFAULT_PAGE_SIZE,
        pageIndex: pagination?.pageIndex ?? 0,
      },
    },
    ...(params as Array<PluginHook<RecordType>>),
  )

  const internalRows = pagination ? page : rows

  useMountedLayoutEffect(() => {
    if (rowSelection) {
      rowSelection.onSelectedRowsChange(selectedRowIds)
    }
  }, [rowSelection, selectedRowIds])

  return (
    <div className={cx('w-full overflow-x-auto', className)}>
      <table {...getTableProps({ className: 'w-full', style: { minWidth } })}>
        <colgroup>
          {columns.map(({ width }, index) => (
            <col
              key={index}
              style={
                width
                  ? {
                      width: typeof width === 'number' ? `${width}px` : width,
                    }
                  : undefined
              }
            />
          ))}
        </colgroup>
        <thead className="text-left">
          <tr>
            {headers.map((column) => (
              <th
                {...column.getHeaderProps({
                  className: 'text-xs text-gray-300 uppercase font-bold p-2',
                })}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {internalRows.map((row) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps({
                  className: cx(
                    'group text-gray-100 cursor-pointer border-b border-gray-400 last:border-none',
                    rowClassName,
                  ),
                })}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={cx(cell.column.className, 'p-2')}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {data.length === 0 ? <Empty type="data" className="mt-10" /> : null}
      {pagination && (
        <div className="flex justify-end">
          <Pagination
            className="mt-6"
            count={rows.length}
            limit={pageSize}
            page={pageIndex + 1}
            onChange={(index) => gotoPage(index - 1)}
          />
        </div>
      )}
    </div>
  )
}

export default Table
