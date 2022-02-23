import { Button, Input } from '@artechain/uikit'
// import { SearchInput } from 'components/SearchModal/styleds'
import { btnPrimary, btnYel } from 'style/atoms'
import styled from 'styled-components'

export const ButtonArt = styled(Button)`
  ${btnPrimary}
`

export const ButtonArtSoon = styled(Button)`
  ${btnPrimary}
  position: relative;
  
  ::after {
    content:"";
    width: 10px;
    height: 10px;
    background-color: yellow;
    position: absolute;
    top: 0;
    right: 0;
  }
`

export const ButtonYelArt = styled(Button)`
  ${btnYel}
`

export const InputArt = styled(Input)`
  background-color: #15181e;
  border: 1px solid #454545;
  box-sizing: border-box;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  &::placeholder {
    color: #808982;
    font-weight: 500;
    font-size: 14px;
  }
  &:focus {
    background-color: #272c35;
    border: 0.75px solid #16b979 !important;
    /* box-shadow: inset 0px 0px 4px rgba(22, 185, 121, 0.27) !important; */
  }
`


export const InputArtNew = styled(Input)`
  width: 273px;
  background-color: #15181e;
  border: 1px solid #454545;
  box-sizing: border-box;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  &::placeholder {
    color: #808982;
    font-weight: 500;
    font-size: 14px;
  }
  &:focus {
    background-color: #272c35;
    border: 0.75px solid #16b979 !important;
    /* box-shadow: inset 0px 0px 4px rgba(22, 185, 121, 0.27) !important; */
  }
`

export const WrapperContainer = styled.div`
  background-color: #1a1e27;
  box-shadow: 2px 4px 30px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  & > * {
    border-radius: 10px;
  }
`

export const WrapperPage = styled.div`
  ${({ theme }) => theme.mediaQueries.xs} {
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const WrapperHeaderArticle = styled.article`
  text-align: center;
  .title {
    color: #ffffff;
    font-size: 30px;
  }
  .subtitle {
    color: #f5de05;
    font-size: 16px;
  }
`

export const WrapperModal = styled.div`
  & > * {
    border-radius: 10px;
    background: #1A1E27;
    border: none;
    h2{
      color: #fff;
      font-size: 18px;
    }
    & > div:nth-child(1){
      background: #1A1E27;
      /* border-bottom: none; */
      button{
        width: auto;
        svg{
          fill:  #A9B3BE;
        }
      }
  }
  }
`