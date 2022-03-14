import { truncate } from '@dwarvesf/react-utils'
import Table from 'components/Table'
import { Text } from 'components/Text'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs'
import { Column } from 'react-table'

interface Friend {
  walletAddress: string
  status: string
}

const columns: Array<Column<Friend>> = [
  {
    Header: <Text color="gray-300">Wallet Address</Text>,
    accessor: 'walletAddress',
    Cell: ({ value }) => (
      <Text className="text-left my-3" color="white">
        {truncate(value, 20, true)}
      </Text>
    ),
  },
  {
    Header: (
      <Text className="text-center" color="gray-300">
        Status
      </Text>
    ),
    accessor: 'status',
    Cell: ({ value }) => {
      if (value === 'active')
        return (
          <Text className="!text-primary capitalize block text-center">
            {value}
          </Text>
        )
      if (value === 'pending')
        return (
          <Text className="capitalize block text-center" color="white">
            {value}
          </Text>
        )
      return (
        <Text className="capitalize block text-center" color="white">
          {value}
        </Text>
      )
    },
  },
]

export const InvitedFriendTable = () => {
  const { data } = useFetchWithCache(GET_PATHS.profileReferralFriend, () =>
    client.getProfileReferralFriend(),
  )

  const dataArray = data?.data.invitedFriends ?? []
  const friendData: Array<Required<Friend>> =
    dataArray.length > 0
      ? dataArray.map((item) => ({
          walletAddress: String(item.walletAddress),
          status: String(item.status),
        }))
      : [
          {
            walletAddress: '--',
            status: '--',
          },
        ]

  return <Table data={friendData} columns={columns} />
}
