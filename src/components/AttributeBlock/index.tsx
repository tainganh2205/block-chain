import React from 'react'
import cx from 'classnames'
import { Heading } from 'components/Heading'

interface AttributeBlockProps {
  title: string
  className?: string
  children: React.ReactNode
}

export const AttributeBlock = (props: AttributeBlockProps) => {
  const { children, title, className } = props

  return (
    <div className={cx(className, 'space-y-2')}>
      <Heading as="h6">{title}</Heading>
      <div>{children}</div>
    </div>
  )
}
