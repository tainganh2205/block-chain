import React, { memo } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import Page from '../../components/BannerHeader'
import Introduction from './Introduction'
import Nftmarketplace from './NftMarketplace'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
`

const GameIntroduction = memo(() => {
  return (
    <Wrapper>
      <Page
        data-is-mobile={isMobile}
        background={isMobile ? '/images/imgGame/GameMobile.png' : '/images/imgGame/GameIntroduction.png'}
        height="630px"
      >
        ``
      </Page>
      <Introduction />
      <Nftmarketplace />
    </Wrapper>
  )
})

export default GameIntroduction
