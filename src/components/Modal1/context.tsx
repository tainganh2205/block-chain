import { createContext } from '@dwarvesf/react-utils'
import { ModalProps } from '.'

export const [ModalContextProvider, useModalContext] = createContext<{
  isOpen: boolean
  onClose: () => void
  fullscreen: ModalProps['fullscreen']
  animation: ModalProps['animation']
}>()
