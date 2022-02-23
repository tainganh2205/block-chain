import React from 'react'
import styled from 'styled-components'
import { Card } from '@artechain/uikit'

export const BodyWrapper1 = styled(Card)`
  position: relative;
  max-width: 670px;
  width: 100%;
  z-index: 5;
  background: #1A1E27;
  border-radius: 10px;
  margin: auto;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function FormBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper1>{children}</BodyWrapper1>
}
