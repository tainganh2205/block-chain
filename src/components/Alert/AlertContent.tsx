import { Text, TextProps } from 'components/Text'
import React from 'react'

export const AlertContent = ({ children, ...props }: Omit<TextProps, 'as'>) => {
  return (
    <Text as="p" color="gray-300" size="sm" {...props}>
      {children}
    </Text>
  )
}
