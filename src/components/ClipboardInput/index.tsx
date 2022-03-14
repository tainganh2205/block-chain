import { useClipboard } from '@dwarvesf/react-hooks'
import { truncate } from '@dwarvesf/react-utils'
import { Transition } from '@headlessui/react'
import { Button } from 'components/Button'
import { IconCopy } from 'components/icons/components/IconCopy'
import cx from 'classnames'

interface ClipboardInputProps {
  value: string
  max?: number
  appearance?: 'icon' | 'button'
  midTruncate?: boolean
  color?: 'light' | 'dark'
  label?: string
  className?: string
}

export const ClipboardInput = ({
  value,
  max = 24,
  appearance = 'icon',
  midTruncate = true,
  label = 'Copy to clipboard',
  color = 'dark',
  className,
}: ClipboardInputProps) => {
  const { hasCopied, onCopy } = useClipboard(value, 700)

  const copiedRender = (
    <div className="w-40 absolute flex items-center justify-center center-x top-[-20px]">
      <Transition
        show={hasCopied}
        appear
        enter="duration-700"
        enterFrom="translate-y-0 opacity-0"
        enterTo="-translate-y-5 opacity-100"
        leave="duration-500"
        leaveFrom="opacity-100 -translate-y-3"
        leaveTo="opacity-0 -translate-y-10"
        className="transition rounded bg-gray-700 px-2 py-1 text-gray-100"
      >
        Copied
      </Transition>
    </div>
  )

  if (appearance === 'icon') {
    return (
      <div
        className={cx(
          'rounded-lg px-4 h-10 flex items-center justify-between',
          className,
          color === 'dark' ? 'bg-gray-600' : 'bg-gray-500',
        )}
      >
        <input
          className="text-gray-100 p-0 pr-4 m-0 bg-transparent w-full font-semibold outline-none"
          value={truncate(value, max, midTruncate)}
          readOnly
        />
        <div className="relative flex-none">
          <button
            className="text-gray-350"
            onClick={() => {
              if (!hasCopied) {
                onCopy()
              }
            }}
            aria-label={label}
          >
            <IconCopy aria-hidden />
          </button>
          {copiedRender}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-4">
      <div
        className={cx(
          'rounded-lg px-4 h-10 flex items-center justify-between w-full',
          className,
          color === 'dark' ? 'bg-gray-600' : 'bg-gray-500',
        )}
      >
        <input
          className="text-gray-100 p-0 pr-4 m-0 bg-transparent w-full font-semibold outline-none"
          value={truncate(value, max, midTruncate)}
          readOnly
        />
      </div>
      <div className="relative flex-none">
        <Button
          appearance="primary"
          onClick={() => {
            if (!hasCopied) {
              onCopy()
            }
          }}
        >
          {label}
        </Button>
        {copiedRender}
      </div>
    </div>
  )
}
