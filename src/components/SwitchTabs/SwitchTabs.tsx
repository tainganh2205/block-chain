import React, { Fragment, useState } from 'react'
import cx from 'classnames'
import { Tab } from '@headlessui/react'
import { Text } from 'components/Text'
import { useIsMobile } from 'hooks/useIsMobile'
import { useAsyncEffect } from '@dwarvesf/react-hooks'

export interface TabProps {
  label: string
  content?: React.ReactNode
}

export interface TabsProps {
  tabs: TabProps[]
  onChange?: (index: number) => void
  defaultIndex?: number
  tabSize?: number
  className?: string
}

const TAB_SIZE_DESKTOP = 144 // 144px
const TAB_SIZE_MOBILE = 100 // 100px

export function SwitchTabs({
  tabs,
  defaultIndex = 0,
  onChange,
  tabSize,
  className,
}: TabsProps) {
  const hasContent = tabs.filter(({ content }) => Boolean(content)).length > 0
  const [index, setIndex] = useState(defaultIndex)
  const [size, setSize] = useState(tabSize ?? TAB_SIZE_DESKTOP)
  const isMobile = useIsMobile()

  useAsyncEffect(
    (isMounted) => {
      if (isMounted()) {
        setSize(isMobile ? TAB_SIZE_MOBILE : TAB_SIZE_DESKTOP)
      }
    },
    [isMobile],
  )

  return (
    <Tab.Group
      onChange={(index) => {
        if (onChange) {
          onChange(index)
        }
        setIndex(index)
      }}
      defaultIndex={index}
    >
      <Tab.List
        className={cx(
          'relative flex items-center justify-between h-10 bg-gray-900 rounded-full mx-auto',
          className,
        )}
        style={{ width: size * tabs.length }}
      >
        <div
          className="absolute h-10 bg-gray-650 rounded-full duration-200 transition"
          style={{
            transform: `translateX(${index * 100}%)`,
            width: size,
          }}
        />
        {tabs.map((tab, idx) => (
          <Fragment key={`tab-${tab.label}`}>
            <Tab as={Fragment}>
              <button
                className={cx(
                  'relative h-10 w-36 rounded-full duration-500 cursor-pointer',
                  idx === index ? 'text-white' : 'text-gray-300 ',
                )}
              >
                <Text
                  as="span"
                  className="text-sm md:text-base absolute inset-x-0 bottom-2"
                >
                  {tab.label}
                </Text>
              </button>
            </Tab>
            {idx !== tabs.length - 1 && (
              <div
                className={cx(
                  'w-px bg-transparent transition duration-300 h-6',
                  {
                    'bg-gray-600':
                      Math.abs(idx - index) > 0 && idx !== index - 1,
                  },
                )}
              />
            )}
          </Fragment>
        ))}
      </Tab.List>
      {hasContent ? (
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={`tab-content-${tab.label}`}>
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      ) : null}
    </Tab.Group>
  )
}
