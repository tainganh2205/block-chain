import { storiesOf } from '@storybook/react'
import { GrowthBar } from '.'

storiesOf('components/GrowthBar', module).add('basic', () => {
  return <GrowthBar max={17} value={7} />
})
