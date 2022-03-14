import { storiesOf } from '@storybook/react'
import { IconShare } from 'components/icons/components/IconShare'
import React from 'react'
import { Button } from '.'

storiesOf('components/Button', module).add('basic', () => (
  <div className="space-y-4">
    <div className="space-x-4 flex items-center">
      <Button>Click me</Button>
      <Button size="sm">Click me</Button>
      <Button isLoading>Click me</Button>
      <Button disabled>Click me</Button>
    </div>
    <div className="space-x-4 flex items-center">
      <Button appearance="gradient">Click me</Button>
      <Button size="sm" appearance="gradient">
        Click me
      </Button>
      <Button appearance="gradient" isLoading>
        Click me
      </Button>
      <Button appearance="gradient" disabled>
        Click me
      </Button>
    </div>
    <div className="space-x-4 flex items-center">
      <Button appearance="borderless">Click me</Button>
      <Button size="sm" appearance="borderless">
        Click me
      </Button>
      <Button appearance="borderless" isLoading>
        Click me
      </Button>
      <Button appearance="borderless" disabled>
        Click me
      </Button>
    </div>
    <div className="space-x-4 flex items-center">
      <Button appearance="border-white">Click me</Button>
      <Button size="sm" appearance="border-white">
        Click me
      </Button>
      <Button appearance="border-white" isLoading>
        Click me
      </Button>
      <Button appearance="border-white" disabled>
        Click me
      </Button>
    </div>
    <div className="space-x-4 flex items-center">
      <Button appearance="border-primary">Click me</Button>
      <Button size="sm" appearance="border-primary">
        Click me
      </Button>
      <Button appearance="border-primary" isLoading>
        Click me
      </Button>
      <Button appearance="border-primary" disabled>
        Click me
      </Button>
    </div>
    <div className="space-x-4 flex items-center">
      <Button appearance="link">Click me</Button>
      <Button size="sm" appearance="link">
        Click me
      </Button>
      <Button appearance="link" isLoading>
        Click me
      </Button>
      <Button appearance="link" disabled>
        Click me
      </Button>
    </div>
    <div className="space-x-4 flex items-center">
      <Button Icon={IconShare} appearance="link">
        View on BSCScan
      </Button>
    </div>
  </div>
))
