import { noop } from '@dwarvesf/react-utils'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useEffect } from 'react'
import cx from 'classnames'
import { ModalContextProvider } from './context'
import { ModalTitle } from './ModalTitle'
import { ModalCloseButton } from './ModalCloseButton'
import { ModalContent } from './ModalContent'

export interface ModalProps {
  isOpen: boolean
  clickOutsideToDismiss?: boolean
  onClose: () => void
  children?: React.ReactNode
  className?: string
  fullscreen?: boolean
  animation?: 'scale' | 'slide-up'
  enableFocusTrap?: boolean
}

export function Modal(props: ModalProps) {
  const {
    isOpen,
    children,
    onClose,
    clickOutsideToDismiss = true,
    className,
    fullscreen = false,
    animation = 'scale',
    enableFocusTrap = true,
  } = props

  const fakeRef = useRef<HTMLDivElement | null>(null)

  // Workaround to remove the overflow style when two dialog open in the same time
  useEffect(() => {
    if (isOpen) return
    const handler = setTimeout(() => {
      let {overflow} = document.documentElement.style
      if (overflow.includes('hidden')) {
        overflow = overflow.replace('hidden', '')
        document.documentElement.style.overflow = overflow
      }
    }, 200)
    return () => {
      clearTimeout(handler)
    }
  }, [isOpen])

  return (
    <ModalContextProvider value={{ isOpen, onClose, fullscreen, animation }}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={clickOutsideToDismiss ? onClose : noop}
          initialFocus={enableFocusTrap ? undefined : fakeRef}
        >
          <div className={cx('min-h-screen px-4 relative', className)}>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className={cx('fixed flex items-center justify-center inset-0', {
                'px-5': !fullscreen,
              })}
            >
              {fullscreen ? null : (
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay
                    className="fixed inset-0 backdrop-filter backdrop-blur bg-primary bg-opacity-25"
                    onClick={onClose}
                  />
                </Transition.Child>
              )}
              {children}
            </div>
          </div>
          {!enableFocusTrap && <div ref={fakeRef} className="h-0 w-0" />}
        </Dialog>
      </Transition>
    </ModalContextProvider>
  )
}

export { ModalTitle, ModalCloseButton, ModalContent }
