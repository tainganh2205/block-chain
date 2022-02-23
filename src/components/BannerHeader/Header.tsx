
import React from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'


interface HeaderProps {
  background: string
  children: any
  height: string
}

const Header: React.FC<HeaderProps> = ({ children, background,height }) => {
  return (
    <Layout background={background} height={height}>
      <Dnone>{children}</Dnone>
    </Layout>
  )
}

interface LayoutProps {
  background: string
  height: string

}

export const Layout = styled.div<LayoutProps>`
  background: ${(props) => `url(${props.background}) center bottom / cover no-repeat`};
  width: 100%;
  min-height: ${(props)  => props.height && props.height};

  @media(min-width: 1024px) {
    background: url(./images/imgGame/GameIntroduction.png) right bottom / cover ;
  }
`

export const Dnone = styled.div`
  display: none;
`

export default Header
