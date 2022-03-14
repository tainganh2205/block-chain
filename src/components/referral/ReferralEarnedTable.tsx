import { truncate } from '@dwarvesf/react-utils'
import Badge from 'components/Badge'
import { Button } from 'components/Button'
import { Heading } from 'components/Heading'
import Table from 'components/Table'
import { Text } from 'components/Text'
import { toast } from 'components/Toast'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs'
import { useMemo, useState } from 'react'
import { Column } from 'react-table'
import { formatTime } from 'utils/datetime'

interface Referral {
  walletAddress: string
  actionName: string
  amount: string
  bonus: string
  date: string
  isClaimed: number
}

const columns: Array<Column<Referral>> = [
  {
    Header: <Text color="gray-300">Active Friends</Text>,
    accessor: 'walletAddress',
    Cell: ({ value }) => (
      <Text className="block my-3" color="white">
        {truncate(value, 20, true)}
      </Text>
    ),
  },
  {
    Header: <Text color="gray-300">Transactions</Text>,
    accessor: 'actionName',
    Cell: ({ value }) => <Text color="white">{value}</Text>,
  },
  {
    Header: <Text color="gray-300">Amount</Text>,
    accessor: 'amount',
    Cell: ({ value }) => <Text color="white">{value}</Text>,
  },
  {
    Header: <Text color="gray-300">You will get</Text>,
    accessor: 'bonus',
    Cell: ({ value }) => <Text className="!text-primary">{value}</Text>,
  },
  {
    Header: <Text color="gray-300">Date</Text>,
    accessor: 'date',
    Cell: ({ value }) => <Text color="white">{value}</Text>,
  },
  {
    Header: (
      <Text className="text-center" color="gray-300">
        Status
      </Text>
    ),
    accessor: 'isClaimed',
    Cell: ({ value }) => {
      if (value === 1) {
        return (
          <div>
            <Badge type="success">Claimed</Badge>
          </div>
        )
      }
      if (value === 0) {
        return (
          <div>
            <Badge>Unclaimed</Badge>
          </div>
        )
      }
      return <Text color="white">--</Text>
    },
  },
]

export const ReferralEarnedTable = () => {
  const [submitting, setSubmitting] = useState(false)

  const { data, mutate } = useFetchWithCache(
    GET_PATHS.profileReferralEarned,
    () => client.getProfileReferralEarned(),
  )
  const dataArray = useMemo(
    () => data?.data.referralEarned ?? [],
    [data?.data.referralEarned],
  )

  const hasNotClaimedAll = useMemo(
    () => dataArray.some((item) => !item.isClaimed),
    [dataArray],
  )

  const referralData: Array<Required<Referral>> =
    dataArray.length > 0
      ? dataArray.map((item) => ({
          walletAddress: String(item.walletAddress),
          actionName: String(item.actionName),
          amount: String(Number(item.amount) > 0 ? item.amount : '--'),
          bonus: String(`${Number(item.bonus).toFixed(1)} LFW`),
          date: formatTime(item.date || ''),
          isClaimed: Number(item.isClaimed ? 1 : 0),
        }))
      : [
          {
            walletAddress: '--',
            actionName: '--',
            amount: '--',
            bonus: '--',
            date: '--',
            isClaimed: 2,
          },
        ]

  const claimAll = async () => {
    setSubmitting(true)
    try {
      await client.postProfileReferralBonus()
      mutate()
      toast.success({
        title: 'Success',
        message: 'Refferal earned successfully.',
      })
      setSubmitting(false)
    } catch (error: any) {
      toast.error({
        title: 'Claim error',
        message: error?.message,
      })
    }
  }

  return (
    <>
      <div className="flex justify-between space-x-5 mb-5">
        <Heading as="h3">Referral earned</Heading>
        <Button
          className="-mt-2 w-24"
          disabled={submitting || !hasNotClaimedAll}
          loading={submitting}
          onClick={claimAll}
        >
          Claim all
        </Button>
      </div>
      <Table
        minWidth={700}
        data={referralData}
        columns={columns}
        pagination={{
          pageSize: 8,
          pageIndex: 0,
        }}
      />
    </>
  )
}
