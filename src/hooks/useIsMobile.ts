import { useMedia } from '@dwarvesf/react-hooks'

export function useIsMobile() {
  return useMedia<boolean>(['(max-width: 639px)'], [true], false)
}
