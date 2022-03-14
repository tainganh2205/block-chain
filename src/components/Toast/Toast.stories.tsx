import { storiesOf } from '@storybook/react'
import { Button } from 'components/Button'
import React from 'react'
import { toast, Toaster } from '.'

storiesOf('components/Toast', module).add('basic', () => {
  return (
    <div className="space-y-4 flex flex-col max-w-xs">
      <Button
        onClick={() => {
          toast.error({ title: 'hello world' })
        }}
      >
        Show Error Toast
      </Button>
      <Button
        onClick={() => {
          toast.info({ title: 'hello world' })
        }}
      >
        Show Info Toast
      </Button>
      <Button
        onClick={() => {
          toast.warning({ title: 'hello world' })
        }}
      >
        Show Warn Toast
      </Button>
      <Button
        onClick={() => {
          toast.success({ title: 'hello world' })
        }}
      >
        Show Success Toast
      </Button>
      <Button
        onClick={() => {
          toast({
            status: 'success',
            title: 'Buy Character Successfully!',
            message: (
              <div className="text-green-500">
                You can view your characters in Profile.
              </div>
            ),
            duration: 4000,
          })
        }}
      >
        Show Custom Toast
      </Button>
      <Toaster />
    </div>
  )
})
