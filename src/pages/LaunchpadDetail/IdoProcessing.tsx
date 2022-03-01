import React, { useEffect, useState } from 'react'
import { Progress } from 'antd'
import { SOCKET_KEY_IDO_PROCESS } from '../../config/constants'

const IdoProcessing = ({idoId, ido_status, percentProcess, socketInfo}) => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (socketInfo.Key === SOCKET_KEY_IDO_PROCESS) {
      if (ido_status === 3 && socketInfo.Item.Id === idoId) {
        if (percentProcess !== null && percentProcess < socketInfo.Item.Value)
          setPercent(socketInfo.Item.Value)
        else
          setPercent(percentProcess || 0)
      }
    } else {
      setPercent(percentProcess || 0)
    }
  }, [idoId, ido_status, percentProcess, socketInfo.Item, socketInfo.Key])

  return <Progress percent={percent} />
}

export default IdoProcessing