import React, { useRef, useEffect } from 'react'
import cx from 'classnames'
import { useRouter } from 'next/router'

export interface TabProps {
  label: string
  icon?: React.ReactElement
  href: string
  activePaths?: string[]
}

export interface LinkTabsProps {
  tabs: TabProps[]
}

const isActiveTab = (activePaths: string[], asPath: string) =>
  activePaths.some((path) => asPath.startsWith(path))

export function LinkTabs({ tabs }: LinkTabsProps) {
  const { asPath, push } = useRouter()

  const selectedTabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (selectedTabRef && selectedTabRef.current) {
      selectedTabRef.current.scrollIntoView({
        block: 'center',
        inline: 'center',
      })
    }
  }, [])

  return (
    <div className="flex flex-col overflow-hidden relative -mx-5 sm:-mx-0">
      <div className="overflow-auto w-full flex-shrink-0 flex flex-col no-scrollbar">
        <nav className="flex space-x-6">
          {tabs.map(({ icon, href, label, activePaths = [href] }) => {
            const isActive = isActiveTab(activePaths, asPath)
            return (
              <button
                key={label}
                className={cx(
                  'flex-none border-b-2 transition duration-200 cursor-pointer',
                  {
                    'text-gray-100 border-primary': isActive,
                    'text-gray-300 border-transparent': !isActive,
                  },
                )}
                ref={isActive ? selectedTabRef : null}
                onClick={(e) => {
                  const element = e.currentTarget
                  // scroll element to viewport
                  element?.scrollIntoView({
                    block: 'center',
                    inline: 'center',
                  })
                  push(href)
                }}
              >
                <div
                  className={cx(
                    'flex items-center whitespace-nowrap px-6 py-3 font-semibold space-x-4 text-gray-300',
                  )}
                >
                  {icon && (
                    <div className="flex items-center flex-none w-6 h-6">
                      {icon}
                    </div>
                  )}
                  <div>{label}</div>
                </div>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
