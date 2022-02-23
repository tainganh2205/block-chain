import React from 'react'
import styled from 'styled-components'
import { Card } from '@artechain/uikit'

export const BodyInfo = styled(Card)`
  position: relative;
  border-radius: 0px !important;
  width: 100%;
  z-index: 5;
  background-color: transparent !important;
  padding-top: 20px;
  
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function Body({ children }: { children: React.ReactNode }) {
  return <BodyInfo>{children}</BodyInfo>
}
