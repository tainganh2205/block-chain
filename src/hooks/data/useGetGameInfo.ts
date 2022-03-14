import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'

export function useGetGameInfo() {
  return useFetchWithCache(GET_PATHS.getGameInfo, () => client.getGameInfo())
}
