import { useMemo, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Column } from 'react-table'
import { Card } from 'components/Card1'
import { IconMoreVertical } from '../icons/components/IconMoreVertical'
import { Button } from '../Button1'
import { ImageWithFallback } from '../ImageWithFallback1'
import { Table } from '.'

type Character = {
  id: string
  avatar: string
  name: string
  growth: number
  vitality: number
  strength: number
  intelligence: number
  dexterity: number
  server: string
}

const generateAsset = (length: number) =>
  Array.from({ length }).map((_, index) => ({
    id: String(index),
    avatar: '/img/profile-character.png',
    name: `Name ${index}`,
    growth: 11,
    vitality: 70,
    strength: 45,
    intelligence: 107,
    dexterity: 66,
    server: 'N/A',
  }))

const columnsArray: Array<Column<Character>> = [
  {
    Header: '',
    accessor: 'avatar',
    className: 'border-b-0 py-1',
    Cell: ({ value }) => (
      <div className="flex items-center justify-center bg-gray-800 w-14 h-14 border border-yellow-500 rounded-md">
        <ImageWithFallback
          width={32}
          height={32}
          src={value}
          fallback={value}
        />
      </div>
    ),
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Server',
    accessor: 'server',
  },
  {
    Header: '',
    accessor: 'id',
    Cell: () => (
      <Button
        className="text-white"
        appearance="link"
        size="sm"
        Icon={IconMoreVertical}
      />
    ),
  },
]

storiesOf('components/Table', module).add('basic', () => {
  const columns = useMemo<Array<Column<Character>>>(() => columnsArray, [])

  const data = useMemo(() => generateAsset(10), [])

  return (
    <Card>
      <Table data={data} columns={columns} />
    </Card>
  )
})

storiesOf('components/Table', module).add('selection', () => {
  const [selectedRows, setSelectedRows] = useState({})
  const columns = useMemo<Array<Column<Character>>>(() => columnsArray, [])

  const data = useMemo(() => generateAsset(10), [])

  return (
    <Card>
      <Table
        data={data}
        columns={columns}
        rowSelection={{
          selectedRows,
          onSelectedRowsChange: setSelectedRows,
        }}
      />
    </Card>
  )
})

storiesOf('components/Table', module).add('pagination', () => {
  const [selectedRows, setSelectedRows] = useState({})
  const columns = useMemo<Array<Column<Character>>>(() => columnsArray, [])

  const data = useMemo(() => generateAsset(32), [])

  return (
    <Card>
      <Table
        data={data}
        columns={columns}
        rowSelection={{
          selectedRows,
          onSelectedRowsChange: setSelectedRows,
        }}
        pagination={{
          pageSize: 3,
          pageIndex: 0,
        }}
      />
    </Card>
  )
})
