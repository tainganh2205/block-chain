import React, { useState } from 'react'
import { Text } from 'components/Text'
import { Column } from 'react-table'
import { useAsyncEffect } from '@dwarvesf/react-hooks'
import Countdown from 'react-countdown'
import Badge from 'components/Badge'
import { client } from 'libs'
import cx from 'classnames'
import { noop } from '@dwarvesf/react-utils'
import { Card } from '../../Card'
import Table from '../../Table'
import { useSuperFarmContract } from '../../../hooks/useContract'
import { ClaimLfwButton } from './staking/ClaimLfwButton'
import { ClaimNftButton } from './staking/ClaimNftButton'
import { toast } from '../../Toast'
import { handleTransactionError } from '../../../utils/error'
import { Button } from '../../Button'
import { RequireSignatureHOC } from '../../RequireSignatureHOC'
import { useIsMobile } from '../../../hooks/useIsMobile'
import ClaimConsumableButton from './staking/ClaimConsumableButton'
import { Tooltip } from '../../Tooltip'

interface HistoryProps {
  noUserClaimRemaining?: string
  onSuccess?: () => void
}

interface SuperFarm {
  index: number
  claimDate: string
  remainingTime: string
  isClaimedLfw: number
  isClaimedConsumable: number
  isClaimed200: number
  isClaimedVesting: string
  isClaimedNft: number
  isClaimedNftLega: number
}

export function HistoryBlock({
  noUserClaimRemaining = '0',
  onSuccess = noop,
}: HistoryProps) {
  const [data, setData] = useState([])
  const [isRefresh, setIsRefresh] = useState(false)
  const [loading, setLoading] = useState({
    vesting: false,
    lfw: false,
  })

  let token: { address: any } | null = null
  if (typeof window !== 'undefined') {
    // @ts-ignore
    token = JSON.parse(localStorage.getItem('lfw-signature'))
  }
  const contract = useSuperFarmContract()
  const isMobile = useIsMobile()

  const handleClaim = async (type: string) => {
    try {
      setLoading({ ...loading, [type]: true })
      const response = await client.claimSuperFarm({
        campaign: '1',
        claimItem: type,
      })
      setIsRefresh(!isRefresh)
      onSuccess()
      toast({
        status: 'success',
        title: 'Claim Successfully!',
        message: (
          <div className="text-green-500">
            You’ve just claimed {response.data.quantity} LFW. Your transaction
            is being processed and takes some time to complete. Please refresh
            the page after about 1 minute to see Your Assets updated.
          </div>
        ),
        duration: 10000,
      })
    } catch (error) {
      handleTransactionError('Error', error)
    } finally {
      setLoading({ ...loading, [type]: false })
    }
  }

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
          1 NFT Legend
        </Text>
      ),
      accessor: 'isClaimedNft',
      Cell: ({ value, cell }) => {
        const isDisabled =
          new Date(cell.row.original.remainingTime).getTime() >
          new Date().getTime()
        return (
          <div className="text-center">
            {+value.toString() ? (
              <Badge type="success">Claimed</Badge>
            ) : (
              <ClaimNftButton
                isDisabled={isDisabled}
                onSuccess={() => {
                  onSuccess()
                  setIsRefresh(!isRefresh)
                }}
              />
            )}
          </div>
        )
      },
    },
    {
      Header: (
        <Text className="text-center" color="gray-300">
          1 NFT Legacy N
        </Text>
      ),
      accessor: 'isClaimedNftLega',
      Cell: ({ value, cell }) => {
        const isDisabled =
          new Date(cell.row.original.remainingTime).getTime() >
          new Date().getTime()
        return (
          <div className="text-center">
            {value ? (
              <Badge type="success">Claimed</Badge>
            ) : (
              <ClaimConsumableButton
                type="hero"
                onSuccess={onSuccess}
                setIsRefresh={setIsRefresh}
                isRefresh={isRefresh}
                isDisabled={isDisabled}
              />
            )}
          </div>
        )
      },
    },
    {
      Header: (
        <Text className="text-center" color="gray-300">
          10 GAME ITEMS
        </Text>
      ),
      accessor: 'isClaimedConsumable',
      Cell: ({ value, cell }) => {
        const isDisabled =
          new Date(cell.row.original.remainingTime).getTime() >
          new Date().getTime()
        return (
          <div className="text-center">
            {value ? (
              <Badge type="success">Claimed</Badge>
            ) : (
              <ClaimConsumableButton
                onSuccess={onSuccess}
                type="consumable"
                setIsRefresh={setIsRefresh}
                isRefresh={isRefresh}
                isDisabled={isDisabled}
              />
            )}
          </div>
        )
      },
    },
    {
      Header: (
        <Text className="text-center" color="gray-300">
          1000 LFW
        </Text>
      ),
      accessor: 'isClaimedLfw',
      Cell: ({ value, cell }) => {
        const isDisabled =
          new Date(cell.row.original.remainingTime).getTime() >
          new Date().getTime()
        return (
          <div className="text-center">
            {+value.toString() ? (
              <Badge type="success">Claimed</Badge>
            ) : (
              <ClaimLfwButton
                isDisabled={isDisabled}
                onSuccess={() => {
                  onSuccess()
                  setIsRefresh(!isRefresh)
                }}
              />
            )}
          </div>
        )
      },
    },
    {
      Header: (
        <Text className="text-center" color="gray-300">
          200 LFW
        </Text>
      ),
      accessor: 'isClaimed200',
      Cell: ({ value, cell }) => {
        const isDisabled =
          new Date(cell.row.original.remainingTime).getTime() >
          new Date().getTime()
        return (
          <div className="text-center">
            {value ? (
              <Badge type="success">Claimed</Badge>
            ) : (
              <RequireSignatureHOC>
                <Button
                  className={cx('mt-2 mb-2 mx-auto', {
                    'w-[100px]': !isMobile,
                    'w-[80px]': isMobile,
                  })}
                  isLoading={loading.lfw}
                  disabled={isDisabled || loading.lfw}
                  onClick={() => handleClaim('lfw')}
                >
                  Claim
                </Button>
              </RequireSignatureHOC>
            )}
          </div>
        )
      },
    },
    {
      Header: (
        <Text className="text-center" color="gray-300">
          VESTING 30 DAYS
        </Text>
      ),
      accessor: 'isClaimedVesting',
      Cell: ({ value, cell }) => {
        const isDisabled =
          new Date(cell.row.original.remainingTime).getTime() >
          new Date().getTime()
        return (
          <div className="text-center relative w-[160px]">
            {value ? (
              <Tooltip
                className="w-56 text-center text-sm font-semibold"
                triggerType="click"
                classNameChildren={cx(
                  'absolute  cursor-pointer bg-primary w-[25px] h-[25px] p-1 leading-3  rounded-full text-small font-bold text-white right-[0px]',
                )}
                label={
                  value === 'disabled'
                    ? 'Complete Daily Quests to acquire Legendary Chest in order to claim vesting rewards.'
                    : 'Get back on the next day for Daily Quests to get the reward.'
                }
              >
                i
              </Tooltip>
            ) : null}
            {value === 'claimed' ? (
              <Badge type="success">Claimed</Badge>
            ) : (
              <RequireSignatureHOC>
                <Button
                  className={cx('mt-2 mb-2 mx-auto', {
                    'w-[100px]': !isMobile,
                    'w-[80px]': isMobile,
                  })}
                  isLoading={loading.vesting}
                  disabled={
                    isDisabled || loading.vesting || value === 'disabled'
                  }
                  onClick={() => handleClaim('vesting')}
                >
                  Claim
                </Button>
              </RequireSignatureHOC>
            )}
          </div>
        )
      },
    },
  ]
  useAsyncEffect(async () => {
    const result = []
    const dataConvert = [...Array(+noUserClaimRemaining).keys()]
    if (dataConvert.length) {
      let superFarmHistory = null
      let errGetHistory = ''
      let isClaimedNftLega = false
      let isClaimedVesting = null
      let isClaimedConsumable = false
      let isClaimed200 = false
      try {
        superFarmHistory = await client.getSuperFarmHistory()
      } catch (err: any) {
        errGetHistory = err.message
      }
      if (!errGetHistory) {
        isClaimedNftLega = superFarmHistory?.data.claim_hero === 'claimed'
        isClaimedVesting = superFarmHistory?.data.claim_vesting
        isClaimed200 = superFarmHistory?.data.claim_lfw === 'claimed'
        isClaimedConsumable =
          superFarmHistory?.data.claim_consumable === 'claimed'
      }
      const history: any = await contract?.getUserRemainingBlockForReward(
        token?.address,
      )
      // eslint-disable-next-line no-await-in-loop
      const isClaimedNft: any = await contract?.getClaimStatusNFT(
        token?.address,
      )
      // eslint-disable-next-line no-await-in-loop
      const isClaimedLfw: any = await contract?.getClaimStatusLFW(
        token?.address,
      )

      for (const index in dataConvert) {
        const currentTime = new Date().getTime()
        const timeConvert = +history.toString() * 3 * 1000 + currentTime
        const claimDate = new Date(timeConvert)
        const object = {
          index,
          amount: 0,
          isClaimedNft,
          isClaimedNftLega,
          isClaimedLfw,
          isClaimedVesting,
          isClaimed200,
          isClaimedConsumable,
          claimDate: claimDate.toLocaleDateString(),
          remainingTime: claimDate,
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
            Your Super Farm History
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
