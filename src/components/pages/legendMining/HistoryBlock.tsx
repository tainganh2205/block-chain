import React, { useState } from 'react'
import { Text } from 'components/Text'
import { Column } from 'react-table'
import { useAsyncEffect } from '@dwarvesf/react-hooks'
import Countdown from 'react-countdown'
import { client } from 'libs'
import { get } from 'lodash'
import Badge from 'components/Badge'
import cx from 'classnames'
import { Card } from '../../Card'
import Table from '../../Table'
import { useMiningContract } from '../../../hooks/useContract'
import { ClaimLfwButton } from './staking/ClaimLfwButton'
import { Tooltip } from '../../Tooltip'

interface HistoryProps {
  noUserClaimRemaining?: string
}

interface SuperFarm {
  index: number
  claimDate: string
  remainingTime: string
  isClaimedLfw: number
  isClaimedLfw2: number
  isClaimedLfw3: number
  isClaimedLfw4: number
  isClaimedLfw5: number
  isClaimedNft: number
  isClaimedNft1: number
  reward: number
}

export function HistoryBlock({ noUserClaimRemaining = '0' }: HistoryProps) {
  const [data, setData] = useState([])
  const [isRefresh, setIsRefresh] = useState(false)
  let token: { address: any } | null = null
  if (typeof window !== 'undefined') {
    // @ts-ignore
    token = JSON.parse(localStorage.getItem('lfw-signature'))
  }
  const contract = useMiningContract()
  const columns: Array<Column<SuperFarm>> = [
    {
      Header: (
        <Text className="text-center" color="gray-300">
          FARM ROUNDS
        </Text>
      ),
      accessor: 'index',
      Cell: ({ value }) => (
        <Text className="text-center block my-3" color="white">
          {+value + 1}
        </Text>
      ),
    },
    // {
    //   Header: <Text color="gray-300">AMOUNT</Text>,
    //   accessor: 'amount',
    //   Cell: () => (
    //     <div className="flex flex-col">
    //       <div className="flex items-center gap-2">
    //         <img
    //           src="/img/icon/busd.png"
    //           alt=""
    //           className="h-4 w-4 object-contain"
    //         />
    //         <Text className="text-sm text-primary" as="b" color="white">
    //           99 BUSD
    //         </Text>
    //       </div>
    //       <div className="flex items-center gap-1">
    //         <img
    //           src="/img/marketplace/chest.png"
    //           alt=""
    //           className="h-6 w-4 object-contain"
    //         />
    //         <Text className="text-sm text-primary" as="b" color="white">
    //           10 Legendary Chest
    //         </Text>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      Header: (
        <Text className="text-center" color="gray-300">
          CLAIM DATE
        </Text>
      ),
      accessor: 'claimDate',
      Cell: ({ value }) => (
        <Text className="text-center" color="white">
          {value}
        </Text>
      ),
    },
    {
      Header: (
        <Text className="text-center" color="gray-300">
          REMAINING TIME
        </Text>
      ),
      accessor: 'remainingTime',
      Cell: ({ value }) => (
        <div className="text-center">
          <Countdown date={value} />
        </div>
      ),
    },
    {
      Header: (
        <Text className="text-center" color="gray-300">
          CLAIM NFT
        </Text>
      ),
      accessor: 'isClaimedNft1',
      Cell: () => {
        // const isDisabled =
        //   new Date(cell.row.original.remainingTime).getTime() >
        //   new Date().getTime()
        return (
          <div className="text-center">
            <ClaimLfwButton
              isDisabled
              onSuccess={() => {
                setIsRefresh(!isRefresh)
              }}
            />
          </div>
        )
      },
    },
    {
      Header: (
        <Text className="text-center" color="gray-300">
          CLAIM LFW
        </Text>
      ),
      accessor: 'isClaimedLfw3',
      Cell: () => {
        // const isDisabled =
        //   new Date(cell.row.original.remainingTime).getTime() >
        //   new Date().getTime()
        return (
          <div className="text-center">
            <ClaimLfwButton
              isDisabled
              onSuccess={() => {
                setIsRefresh(!isRefresh)
              }}
            />
          </div>
        )
      },
    },
    {
      Header: (
        <div className="relative">
          <Tooltip
            triggerType="click"
            classNameChildren={cx(
              'absolute cursor-pointer text-center bg-primary w-[20px] h-[20px] h-[15px]leading-3  rounded-full text-small font-bold text-white right-[5px]',
            )}
            label="This is the total amount of LFW tokens you will receive after 30 days."
          >
            i
          </Tooltip>
          <Text className="text-center" color="gray-300">
            REWARD
          </Text>
        </div>
      ),
      accessor: 'reward',
      Cell: ({ value }) => {
        return (
          <div className="text-center text-lg">
            <Badge type="success" className="text-lg">
              {value}
            </Badge>
          </div>
        )
      },
    },
  ]
  useAsyncEffect(async () => {
    const result = []
    const dataConvert = [...Array(+noUserClaimRemaining).keys()]
    if (dataConvert.length) {
      const isClaimedNft: any = false
      const isClaimedLfw: any = true
      for (const index in dataConvert) {
        // eslint-disable-next-line no-await-in-loop
        const history: any = await contract?.getUserRemainingBlockForReward(
          token?.address,
          +index + 1,
        )
        // eslint-disable-next-line no-await-in-loop
        const reward = await client.getRewardHistoryMining(
          token?.address,
          +index + 1,
        )
        const currentTime = new Date().getTime()
        const timeConvert = +history.toString() * 3 * 1000 + currentTime
        const claimDate = new Date(timeConvert)
        const object = {
          index,
          amount: 0,
          isClaimedNft,
          isClaimedNft1: isClaimedNft,
          isClaimedLfw,
          isClaimedLfw1: isClaimedLfw,
          isClaimedLfw2: isClaimedLfw,
          isClaimedLfw3: isClaimedLfw,
          isClaimedLfw4: isClaimedLfw,
          isClaimedLfw5: isClaimedLfw,
          claimDate: claimDate.toLocaleDateString(),
          remainingTime: claimDate,
          reward: get(reward, 'data.lfw', 0),
        }
        result.push(object)
      }
      // @ts-ignore
      setData(result)
    }
  }, [noUserClaimRemaining, isRefresh])

  return (
    <Card className="relative mb-4 w-full overflow-hidden mt-4">
      <div className="absolute top-0 left-0 w-full rounded-t-[10px] h-14 p-6 bg-gray-500 flex items-center justify-between text-white">
        <div className="flex items-center">
          <Text
            as="b"
            color="white"
            className="ml-2 sm:ml-4 text-md sm:text-xl"
          >
            Mining Pool V.1 History
          </Text>
        </div>
      </div>
      <Table
        className="mt-8"
        minWidth={700}
        data={data}
        columns={columns}
        pagination={{
          pageSize: 8,
          pageIndex: 0,
        }}
      />
    </Card>
  )
}
