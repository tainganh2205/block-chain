import React, { useEffect, useState } from 'react'
import { Progress } from 'antd'
import { SOCKET_KEY_SERVERTIME } from '../../config/constants'

const SocketProcessing = ({socketInfo}) => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (socketInfo.Key === SOCKET_KEY_SERVERTIME) {
      const totalTime = 300 - (socketInfo.Item.Mins * 60 + socketInfo.Item.Secs)
      setPercent((totalTime / 300) * 100)
    }

  }, [socketInfo.Key, socketInfo.Item])

  return <Progress percent={percent} />
}

export default SocketProcessing