import { storiesOf } from '@storybook/react'
import { UpDownChange } from '.'

storiesOf('components/UpDownChange', module).add('basic', () => {
  return (
    <div className="space-y-5 flex flex-col">
      <UpDownChange>{0.23}</UpDownChange>
      <UpDownChange>{-5.5}</UpDownChange>
    </div>
  )
})
