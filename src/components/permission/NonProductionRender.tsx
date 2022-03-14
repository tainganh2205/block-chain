/* eslint-disable react/jsx-no-useless-fragment */
import { ComingSoon } from 'components/ComingSoon'
import { IS_PRODUCTION } from 'constant/env'
import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
  showComingSoon?: boolean
}

export function NonProductionRender(props: Props): JSX.Element {
  const {
    children,
    showComingSoon = false,
    fallback = showComingSoon ? <ComingSoon className="!p-0" /> : null,
  } = props

  if (IS_PRODUCTION) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
