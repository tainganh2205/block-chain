import React, { memo } from 'react'
import { ProgressBar, ProgressBarProps } from 'react-bootstrap'

import './index.less'

const ProgressBarBSC = memo<ProgressBarProps>((props) => {
  return (
    <ProgressBar {...props} />
  )
})

export default ProgressBarBSC