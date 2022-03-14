import cx from 'classnames'
import { Text } from 'components/Text'
import { ReactComponent as DoneIcon } from './svg/done.svg'
import { ReactComponent as ActiveIcon } from './svg/active.svg'
import { ReactComponent as InactiveIcon } from './svg/inactive.svg'

interface Props {
  steps: string[]
  current?: number
}

export const StepIndicator = (props: Props) => {
  const { steps, current = 0 } = props

  return (
    <div className="relative inline-flex">
      <div
        className={cx('absolute sm:w-32 w-24 h-px top-3 center-x', {
          'bg-gray-400': current !== steps.length - 1,
          'bg-primary': current === steps.length - 1,
        })}
      />
      <div className="flex items-center sm:space-x-16 space-x-6">
        {steps.map((name, index) => {
          const isDone = current > index
          const isActive = current === index

          let icon = null
          if (isDone) {
            icon = <DoneIcon />
          } else if (isActive) {
            icon = <ActiveIcon />
          } else {
            icon = <InactiveIcon />
          }

          return (
            <div
              className="w-32 flex items-center justify-center flex-col space-y-2"
              key={name}
            >
              {icon}
              <Text
                as="span"
                color={isDone || isActive ? 'white' : 'gray-300'}
                className={cx({ 'font-medium': isDone })}
              >
                {name}
              </Text>
            </div>
          )
        })}
      </div>
    </div>
  )
}
