import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { simpleRpcProvider } from 'utils/contract'

const DEFAULT_REFRESH_TIME = 6 * 1000 // 6 seconds

export const GET_CURRENT_BLOCK = 'get-current-block'

export const usePollBlockNumber = (refreshTime = DEFAULT_REFRESH_TIME) => {
  const { data = 0, error } = useFetchWithCache(
    [GET_CURRENT_BLOCK, refreshTime],
    () => {
      return simpleRpcProvider.getBlockNumber()
    },
    { refreshInterval: refreshTime },
  )

  const isLoading = !data && !error

  return { currentBlock: data, isLoading }
}
