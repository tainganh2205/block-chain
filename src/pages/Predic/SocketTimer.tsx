import React, { useState, useEffect } from 'react'
import { SOCKET_KEY_SERVERTIME } from '../../config/constants'

const SocketTimer = ({socketInfo}) => {
  const [minute, setMinute] = useState('00')
  const [second, setSecond] = useState('00')

  useEffect(() => {
    if (socketInfo.Key === SOCKET_KEY_SERVERTIME) {
      const m = `0${socketInfo.Item.Mins}`
      const s = socketInfo.Item.Secs < 10 ? `0${socketInfo.Item.Secs}` : socketInfo.Item.Secs
      setMinute(m)
      setSecond(s)
    }

  }, [socketInfo.Key, socketInfo.Item])
  return (
    <>
      {minute}:{second}
    </>
  )
}

export default SocketTimer