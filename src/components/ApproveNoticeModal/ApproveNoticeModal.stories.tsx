import { noop } from '@dwarvesf/react-utils'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { ApproveNoticeModal } from '.'

storiesOf('components/ApproveNoticeModal', module).add('basic', () => {
  return (
    <ApproveNoticeModal
      isOpen
      onClose={noop}
      onOk={(noShowAgain) => alert(JSON.stringify({ noShowAgain }))}
    />
  )
})
