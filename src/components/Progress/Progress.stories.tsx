import { storiesOf } from '@storybook/react'
import { Progress } from '.'

storiesOf('components/Progress', module).add('basic', () => {
  return (
    <div className="space-y-5 max-w-sm">
      <Progress max={100} min={0} value={20} />
      <Progress max={100} min={0} value={50} />
      <Progress max={100} min={0} value={75} />
    </div>
  )
})

storiesOf('components/Progress', module).add('borderless', () => {
  return (
    <div className="space-y-5 max-w-sm">
      <Progress
        max={100}
        min={0}
        value={20}
        appearance="borderless"
        color="primary"
      />
      <Progress
        max={100}
        min={0}
        value={50}
        appearance="borderless"
        color="primary"
      />
      <Progress
        max={100}
        min={0}
        value={75}
        appearance="borderless"
        color="primary"
      />
    </div>
  )
})
