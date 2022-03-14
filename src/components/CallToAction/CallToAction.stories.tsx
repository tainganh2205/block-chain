import { storiesOf } from '@storybook/react'
import { CallToAction } from '.'

storiesOf('components/CallToAction', module).add('basic', () => {
  return (
    <div className="space-y-4">
      <CallToAction
        title="You don’t have any leaders"
        buttonText="Go to marketplace"
        message="You need to buy at least 1 leader to play game."
      />
    </div>
  )
})
