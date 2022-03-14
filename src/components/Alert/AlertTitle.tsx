import React, { HTMLAttributes } from 'react'
import { Heading } from 'components/Heading'

export const AlertTitle = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Heading as="h5" {...props}>
      {children}
    </Heading>
  )
}
