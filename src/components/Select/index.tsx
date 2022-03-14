import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import cx from 'classnames'
import { Text } from 'components/Text'
import { IconChevronDown } from 'components/icons/components/IconChevronDown'

export interface SelectOption<T = string> {
  icon?: React.ReactNode
  value: T
  text: string
}

interface SelectProps<T = string> {
  options: SelectOption<T>[]
  onChange: (value: T) => void
  value: T
  className?: string
  placeholder?: string
  appearance?: 'default' | 'borderless'
  align?: 'left' | 'right'
}

export function Select<T = string>(props: SelectProps<T>) {
  const {
    onChange,
    options,
    value,
    className,
    placeholder,
    appearance = 'default',
    align = 'left',
  } = props

  const selected = options.find((option) => option.value === value)

  return (
    <Menu as="div" className={cx('relative h-10 inline-block', className)}>
      {({ open }) => (
        <>
          <Menu.Button
            className={cx(
              'flex rounded-md h-10 px-2.5 items-center justify-between w-full font-medium cursor-pointer',
              { border: appearance === 'default' },
              { 'border-gray-300': !open, 'border-primary': open },
            )}
          >
            <div className="space-x-3 inline-flex items-center w-4/5">
              {selected?.icon}
              <Text
                as="span"
                color="white"
                size="base"
                className="pr-2 truncate"
              >
                {selected?.text || placeholder}
              </Text>
            </div>

            <IconChevronDown
              className={cx('text-gray-300 flex-none', { 'rotate-180': open })}
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={cx(
                'absolute min-w-full py-2 mt-1 origin-top-right bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20 border border-gray-400',
                { 'right-0': align === 'right', 'left-0': align === 'left' },
              )}
            >
              {options.map(({ text, value, icon }) => {
                return (
                  <Menu.Item key={text}>
                    {({ active }) => (
                      <button
                        onClick={() => onChange(value)}
                        className={cx(
                          'text-gray-300 group flex rounded-md items-center w-full px-2.5 py-1.5 transition-all duration-150 space-x-3 font-medium whitespace-nowrap cursor-pointer',
                          { 'bg-gray-900': active },
                        )}
                      >
                        {icon}
                        <span>{text}</span>
                      </button>
                    )}
                  </Menu.Item>
                )
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
