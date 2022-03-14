import { useState } from 'react'
import { useAsyncEffect, useDebounce } from '@dwarvesf/react-hooks'
import { client } from 'libs/apis'

export function useConvertGemFromLfw(amount: number, token: string = 'lfw') {
  const debouncedAmount = useDebounce(amount, 500)
  const [isLoading, setIsLoading] = useState(false)
  const [gem, setGem] = useState(0)

  useAsyncEffect(async () => {
    if (debouncedAmount > 0) {
      try {
        setIsLoading(true)
        const response = await client.convertGem({
          amount: debouncedAmount,
          token,
        })
        setGem(response.data.convertAmount ?? 0)
      } catch (error) {
        console.warn(error)
        setGem(0)
      } finally {
        setIsLoading(false)
      }
    }
  }, [debouncedAmount, token])

  return { isLoading, gem, setGem }
}
