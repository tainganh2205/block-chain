import { noop } from '@dwarvesf/react-utils'
import { storiesOf } from '@storybook/react'
import { DisclaimerPopUpModal } from '.'

storiesOf('components/DisclaimerPopUpModal', module).add('basic', () => {
  return (
    <div className="py-10 max-w-sm space-y-10">
      <DisclaimerPopUpModal isOpen onClose={noop} />
    </div>
  )
})
