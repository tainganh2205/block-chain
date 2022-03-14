import { isSSR } from '@dwarvesf/react-utils'

export const isIOS =
  !isSSR && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
