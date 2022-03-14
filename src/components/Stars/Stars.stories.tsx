import { storiesOf } from '@storybook/react'
import { useState } from 'react'
import { Stars } from '.'

const stories = storiesOf('components/Stars', module)

stories.add('horizontal', () => {
  return (
    <div className="space-y-5">
      <Stars max={10} value={5} size="lg" />
      <Stars max={8} value={3} />
      <Stars max={5} value={2} size="sm" />
      <Stars max={5} value={2} size="xs" />
    </div>
  )
})

stories.add('verical', () => {
  return (
    <div className="space-x-5 flex">
      <Stars display="vertical" max={10} value={5} size="lg" />
      <Stars display="vertical" max={10} value={9} />
      <Stars display="vertical" max={5} value={2} size="sm" />
      <Stars display="vertical" max={5} value={2} size="xs" />
    </div>
  )
})

stories.add('form', () => {
  const [value, setValue] = useState(0)
  const max = 7

  return (
    <div className="space-y-5">
      <Stars
        max={max}
        value={value}
        onClick={(index) => {
          if (value === index + 1) {
            setValue(0)
          } else {
            setValue(index + 1)
          }
        }}
        size="lg"
      />
    </div>
  )
})
