import { storiesOf } from '@storybook/react'
import React from 'react'
import { DetailPageSkeleton } from '.'

storiesOf('components/DetailPageSkeleton', module).add('hero', () => (
  <DetailPageSkeleton />
))

storiesOf('components/DetailPageSkeleton', module).add('consumable', () => (
  <DetailPageSkeleton showStatsSection={false} />
))
