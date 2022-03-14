import { storiesOf } from '@storybook/react'
import { Button } from 'components/Button'
import { ImageWithFallback } from 'components/ImageWithFallback'
import React from 'react'
import { Empty } from '.'

storiesOf('components/Empty', module)
  .add('search', () => <Empty />)
  .add('data', () => <Empty type="data" />)
  .add('custom', () => (
    <Empty
      title="It's a bit empty here"
      message="Go to marketplace and buy assets to play game"
      image={
        <ImageWithFallback
          src="/img/icon/empty-assets.webp"
          fallback="/img/icon/empty-assets.webp"
          width={144}
          height={144}
        />
      }
    >
      <Button>Go to marketplace</Button>
    </Empty>
  ))
