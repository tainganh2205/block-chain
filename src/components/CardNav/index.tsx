/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@artechain/uikit'
import TranslatedText from '../TranslatedText'

const StyledNav = styled.div`
  margin-bottom: 30px;
  margin-top: 50px;
  text-align: center;
  & > div{
    background-color: #121517;
    border: none;
    border-radius: 8px;
    button, a{
      &:hover{
        opacity: 1 !important;
      }
      font-weight: 600;
      font-size: 18px;
      border-radius: 8px;
      color: #808982;
      @media only screen and (max-width: 600px) {
        font-size: 14px;
        padding: 0 10px;
      }
      &:hover,&:active{
          color: #808982  !important;
      }
    }
    button.active, a.active {
      &:hover,&:active{
        background-color: #f5de05 !important;
        color: #000000 !important; 
      }
      background-color: #f5de05;
      color: #000000;
    }
  }
`

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => (
  <StyledNav className='wrapper-nav'>
    <ButtonMenu activeIndex={activeIndex} variant="subtle">
      <ButtonMenuItem  className={activeIndex === 0 ? 'active' : ''} id="swap-nav-link" to="/swap" as={Link}>
        <TranslatedText translationId={8}>Swap</TranslatedText>
      </ButtonMenuItem>
      <ButtonMenuItem  className={activeIndex === 1 ? 'active' : ''}  id="pool-nav-link" to="/pool" as={Link}>
        <TranslatedText translationId={74}>Liquidity</TranslatedText>
      </ButtonMenuItem>
      <ButtonMenuItem  className={activeIndex === 2 ? 'active' : ''} id="bridge-nav-link" as="a" target='_blank' href='https://www.binance.org/en/bridge'>
        <TranslatedText translationId={8}>Bridge</TranslatedText>
      </ButtonMenuItem>
      <ButtonMenuItem  className={activeIndex === 3 ? 'active' : ''}  id="transaction-nav-link" to="/transactions" as={Link}>
        <TranslatedText translationId={74}>Transactions</TranslatedText>
      </ButtonMenuItem>
    </ButtonMenu>
  </StyledNav>
)

export default Nav
