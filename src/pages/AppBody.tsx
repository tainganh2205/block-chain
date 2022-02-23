import React from 'react'
import styled from 'styled-components'
import { Card } from '@artechain/uikit'

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 510px;
  width: 100%;
  z-index: 5;
  background: linear-gradient(#252017, #1b1916);
  overflow: initial !important;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper className='wrapper-body'>{children}</BodyWrapper>
}
