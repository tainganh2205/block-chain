import { useEffect, useState } from 'react'
import { useInterval } from 'hooks/useInterval'
import { useIsWindowVisible } from 'hooks/useIsWindowVisible'

interface UseCountDownProps {
  time: number // miliseconds
}

export const useCountDown = ({ time }: UseCountDownProps) => {
  const [timeLeft, setTimeLeft] = useState(time)
  const isWindowVisible = useIsWindowVisible()

  const calculateRemainingTime = () => {
    setTimeLeft((time) => {
      if (time - 1000 <= 0) {
        return 0
      }

      return time - 1000
    })
  }

  useInterval(
    calculateRemainingTime,
    isWindowVisible && timeLeft > 0 ? 1000 : null,
  )

  useEffect(() => {
    if (time > 0) {
      setTimeLeft(time)
    }
  }, [time])

  const seconds = Math.floor(timeLeft / 1000)
  return {
    days: Math.floor(seconds / (60 * 60 * 24)),
    hours: Math.floor((seconds % (3600 * 24)) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: Math.floor(seconds % 60),
    timeLeft,
  }
}
