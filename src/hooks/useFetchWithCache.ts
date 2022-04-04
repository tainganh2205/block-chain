import useSWR, { Key } from 'swr'
import { Fetcher, SWRConfiguration } from 'swr/dist/types'
import { useState, useEffect } from 'react'

// eslint-disable-next-line import/prefer-default-export
export function useFetchWithCache<Data = any, Error = any>(
  key: Key,
  fn: Fetcher<Data> | null = null,
  config: SWRConfiguration<Data, Error> | undefined = undefined,
) {
  const { data, error, ...rest } = useSWR<Data, Error>(key, fn, config)
  const [internalData, setInternalData] = useState<Data>()

  const isFirstLoading = !internalData && !error
  const isLoading = !data && !error

  useEffect(() => {
    if (data) {
      setInternalData(data)
    }
  }, [data])
  return { data: internalData, isFirstLoading, isLoading, error, ...rest }
}
