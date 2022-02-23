import React from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

import ImgStake from '../../images/bgStakeNew2.svg'

interface ImgHeaderProps {
  title?: string
  subtitle1?: string
  subtitle2?: string
}

const PageHeader: React.FC<ImgHeaderProps> = ({ title, subtitle1, subtitle2 }) => {
  return (
    <StyledPageHeader>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubTitle1>{subtitle1}</StyledSubTitle1>
      <StyledSubTitle2>{subtitle2}</StyledSubTitle2>
    </StyledPageHeader>
  )
}

const StyledPageHeader = styled.div<any>`
  background: url(${isMobile ? './images/artBgStakeNftMb.png' : './images/artBgStakeNft.png'});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  padding: 63px 33px 86px;
  border-radius: 12px;

  @media (max-width: 468px) {
    padding: 30px 17px 171px;
    background-position: center;
    /* background: url(./images/artBgStakeNft.png); */
  }

  @media (min-width: 468px) {
    background: url(./images/artBgStakeNft.png);
    background-repeat: no-repeat;
    background-size: cover;
  }
`

const StyledTitle = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #fff;
  padding-bottom: 21px;
  letter-spacing: 1px;
  @media (max-width: 468px) {
    font-size: 30px;
  }
`

const StyledSubTitle1 = styled.div`
  font-size: 20px;
  color: #fff;
  @media (max-width: 468px) {
    font-size: 14px;
    padding-bottom: 18px;
    width: 70%;
  }
`

const StyledSubTitle2 = styled.div`
  font-size: 20px;
  color: #fff;
  @media (max-width: 468px) {
    font-size: 14px;
    width: 70%;
  }
`

export default PageHeader
