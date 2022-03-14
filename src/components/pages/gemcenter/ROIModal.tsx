import { useOnClickOutside } from '@dwarvesf/react-hooks'
import { FocusTrap, Transition } from '@headlessui/react'
import { Button } from 'components/Button1'
import { Card } from 'components/Card1'
import { IconClose } from 'components/icons/components/IconClose'
import Table from 'components/Table'
import { Text } from 'components/Text'
import { useRef } from 'react'
import { Column } from 'react-table'
import { UtilROIResults } from 'types/schema'
import { formatNumber, roundNumber2D } from 'utils/number'

interface ROIModalProps {
  data: UtilROIResults[]
  rewardToken: string
  isOpen: boolean
  onClose: () => void
}
export interface FilteredROI {
  timeframe: JSX.Element
  roi: JSX.Element
  rewardTokenPer1k: JSX.Element
}

function filterFloat(value: number) {
  if (value > 10000) {
    return `${formatNumber(10000)}+`
  }
  return roundNumber2D(value)
}

export default function ROIModal(props: ROIModalProps) {
  const { data, onClose, isOpen, rewardToken } = props
  const ref = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  useOnClickOutside(ref, onClose)

  const filteredROI = data.map((item: UtilROIResults) => {
    const color =
      item.timeframe === '1 year (APY)' ? 'text-primary' : 'text-white'

    const rewardTokenPer1k = filterFloat(Number(item.rewardTokenPer1k))

    const roi = filterFloat(Number(item.roi))

    return {
      timeframe: (
        <Text as="span" className={color}>
          {item.timeframe}
        </Text>
      ),
      roi: (
        <Text as="span" className={color}>
          {roi}%
        </Text>
      ),
      rewardTokenPer1k: (
        <Text as="span" className={color}>
          {rewardTokenPer1k}
        </Text>
      ),
    }
  })

  const columns: Array<Column<FilteredROI>> = [
    {
      Header: (
        <Text color="gray-300" className="text-sm">
          TIMEFRAME
        </Text>
      ),
      accessor: 'timeframe',
      Cell: ({ value }) => value,
      width: '33%',
    },
    {
      Header: (
        <Text color="gray-300" className="text-sm">
          ROI
        </Text>
      ),
      accessor: 'roi',
      Cell: ({ value }) => value,
      width: '32%',
    },
    {
      Header: (
        <Text color="gray-300" className="text-right text-sm">
          {rewardToken} PER $1,000
        </Text>
      ),
      accessor: 'rewardTokenPer1k',
      Cell: ({ value }) => value,
      className: 'text-right',
      width: '35%',
    },
  ]

  return (
    <Transition
      className="absolute inset-x-0 top-[20%] p-3 sm:p-6 duration-200 transition"
      show={isOpen}
      enterFrom="opacity-0 translate-y-5"
      enterTo="opacity-100 translate-y-0"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-5"
    >
      <FocusTrap initialFocus={closeButtonRef}>
        <Button
          className="!absolute right-8 top-8 text-gray-300 !p-0 h-8 w-8"
          onClick={onClose}
          appearance="borderless"
          aria-label="Close"
        >
          <IconClose aria-hidden className="w-5" />
        </Button>
        <Card color="gray-900" ref={ref}>
          <Table minWidth={400} data={filteredROI || []} columns={columns} />
        </Card>
      </FocusTrap>
    </Transition>
  )
}
