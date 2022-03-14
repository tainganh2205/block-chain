import { storiesOf } from '@storybook/react'
import { useState } from 'react'
import { RangeInput } from '.'

storiesOf('components/RangeInput', module).add('basic', () => {
  const [value, setValue] = useState([10, 50])

  return (
    <div className="space-y-10 max-w-xs">
      <RangeInput max={100} min={0} value={value} onChange={setValue} />
      <RangeInput
        max={100}
        min={0}
        value={value}
        onChange={setValue}
        showHandlerValue={false}
      />
    </div>
  )
})
