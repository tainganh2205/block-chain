import React, { useMemo } from 'react'
import { truncate } from '@dwarvesf/react-utils'
import { Column } from 'react-table'
import { Heading } from 'components/Heading'
import { Table } from 'components/Table'
import { Text } from 'components/Text'
import { ModelHeroDetail, ModelUserTransaction } from 'types/schema'
import { Card } from 'components/Card'
import { formatTime } from 'utils/datetime'
import { IconCurrency } from 'components/IconCurrency'

export type HistoryActivity = 'listed' | 'purchased' | 'unlisted'

export interface HeroHistory {
  activity: string
  price: number
  from: string
  to: string
  date: string
}
export interface HistorySectionProps {
  data?: ModelHeroDetail
  className?: string
}

export const HistorySection = ({ data }: HistorySectionProps) => {
  const symbol = data?.heroInfo?.symbol ?? 'BNB'
  const columns = useMemo<Array<Column<ModelUserTransaction>>>(
    () => [
      {
        Header: 'activity',
        accessor: 'activity',
        className: 'py-4',
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ value }) => (
          <div className="flex items-center">
            <IconCurrency
              className="h-4 w-4 object-scale-down"
              symbol={symbol}
            />
            <Text className="ml-2" color="white" as="b">
              {value} {symbol}
            </Text>
          </div>
        ),
      },
      {
        Header: 'From',
        accessor: 'from',
        Cell: ({ value }) => truncate(value as string, 16, true),
        width: 180,
      },
      {
        Header: 'To',
        accessor: 'to',
        Cell: ({ value }) => truncate(value as string, 16, true),
        width: 180,
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => formatTime(value || ''),
      },
    ],
    [symbol],
  )

  const items: HeroHistory[] = (data?.history || []).map((his) => {
    return {
      activity: his.activity || '',
      from: his.from || '_',
      to: his.to || '_',
      price: his.price || 0,
      date: his.date || '_',
    }
  })

  return (
    <div className="space-y-2">
      <Heading as="h3">History</Heading>
      <Card className="lg:px-10">
        <Table minWidth={700} data={items || []} columns={columns} />
      </Card>
    </div>
  )
}
