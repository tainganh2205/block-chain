/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@artechain/uikit'
import TranslatedText from 'components/TranslatedText'

const StyledNav = styled.div`
  /* margin-bottom: 20px; */
  margin-bottom: 30px;
  margin-top: 20px;
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
        /* padding: 0 10px; */
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

export const NavCard = ({ activeIndex = 0, setActiveIndex }: { activeIndex?: number, setActiveIndex: (item:number) => any }) => (
  <StyledNav className='wrapper-nav'>
    <ButtonMenu scale='md' activeIndex={activeIndex} variant="subtle" onItemClick={setActiveIndex}>
      <ButtonMenuItem  className={+activeIndex === 0 ? 'active' : ''}>
        <TranslatedText translationId={8}>Image</TranslatedText>
      </ButtonMenuItem>
      <ButtonMenuItem  className={+activeIndex === 1 ? 'active' : ''} >
        <TranslatedText translationId={74}>Gif</TranslatedText>
      </ButtonMenuItem>
      <ButtonMenuItem  className={+activeIndex === 2 ? 'active' : ''}>
        <TranslatedText translationId={8}>Video</TranslatedText>
      </ButtonMenuItem>
    </ButtonMenu>
  </StyledNav>
)

export default NavCard
