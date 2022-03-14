import { storiesOf } from '@storybook/react'
import { ClipboardInput } from '.'

storiesOf('components/ClipboardInput', module).add('basic', () => {
  return (
    <div className="py-10 max-w-sm space-y-10">
      <ClipboardInput value="0x04aACbeFF4D4272bC9bsB0feBD9EA35fd5579093" />
      <ClipboardInput
        value="http://legendfantasyword.com/xXgotyWQrigEHuUJhxNZDk"
        appearance="button"
        max={27}
        midTruncate={false}
        label="Copy link"
      />
    </div>
  )
})
