import React from 'react'
import { WithChildren } from 'types/common'

export const StickyTabsContainer = ({ children }: WithChildren) => (
  <div className="border-b border-gray-500 sticky top-[60px] bg-gray-800 z-[1]">
    <div className="container mx-auto px-5">{children}</div>
  </div>
)
