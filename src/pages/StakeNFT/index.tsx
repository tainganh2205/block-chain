import React, { memo } from 'react'
import { isMobile } from 'react-device-detect'

import styled from 'styled-components'
import Info from './components/Info'
import Stake from './components/Stake'

import './stake-index.less'

export default function Nft(props) {
  return (
    <>
      <StyleBgColor>
        <div className={`h__myartwork ${isMobile ? 'h__myartwork-mobile' : ''}`}>
          <Info />
        </div>
      </StyleBgColor>
      <div className={`p-bsc-myartwork ${isMobile ? 'p-bsc-myartwork-mobile' : ''}`}>
        <Stake />
      </div>
    </>
  )
}

const StyleBgColor = styled.div`
  width: 100%;
  min-height: 100%;
  background: #0a0a0d;

  .h__myartwork {
  font-family: 'Montserrat';
    display: flex;
    width: 100%;
    max-width: 1505px !important;
    margin: 0 auto;
    flex-direction: column;
    padding: 30px;
    padding-bottom: 0;

    @media (max-width: 576px) {
      padding-right: 20px;
      padding-left: 20px;
    }
  }

  .h__myartwork-mobile {
    padding: 0 20px;
    padding-top: 30px ;
  }
`
