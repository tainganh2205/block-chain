import { storiesOf } from '@storybook/react'
import { StepIndicator } from '.'

storiesOf('components/StepIndicator', module).add('basic', () => {
  return (
    <div className="space-y-5">
      <StepIndicator current={0} steps={['Approve', 'Sell asset']} />
      <StepIndicator current={1} steps={['Approve', 'Import asset']} />
    </div>
  )
})
