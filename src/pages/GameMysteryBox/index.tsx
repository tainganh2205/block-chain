import React, { memo } from 'react'
import { isMobile } from 'react-device-detect'
import { Collapse } from 'antd'

import { ButtonArt } from 'components/Art'
import styled from 'styled-components'
import Statistic from './components/Statistic'
import Artwork from './components/Artwork'

import './index.less'

const Wrapper = styled.div`
  width: 100%;
  background: linear-gradient(
    199.07deg,
    rgba(13, 14, 17, 0.26) -30.81%,
    rgba(13, 14, 17, 0.35) -30.77%,
    #5ff985 342.39%
  );
  .p-bscs-nft-bottom {
    padding: ${(props) => (props['data-is-mobile'] ? '30px' : '30px 120px')};
    background: #15181e;
  }

  ${(props) =>
    props['data-is-mobile']
      ? `
    .bsc-list-artwork-actions{
      flex-wrap: wrap;
    }  
    .wrapper-collection{
      overflow: auto;
      width: max-content;

      ::-webkit-scrollbar {
        height: 0px;
      }
    }
    .widget-left, .widget-right{
      width: 100%;
      margin-bottom: 20px;
    }
  `
      : ``}
`

const HeaderStyled = styled.div`
  background: url(${isMobile ? '/images/imageMysteryBox/mystery-box-slider.png' : '/images/imageMysteryBox/mystery-box-slider.png'});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 410px;
  padding: ${(props) => (props['data-is-mobile'] ? '20px 30px 30px' : '30px 120px')};
  justify-content: space-between;
  display: flex;
  align-items: center;
  position: relative;
  /* flex-direction: column; */
  ${(props) => (props['data-is-mobile'] ? 'align-items: center!important;' : '')};

  .titleOverplay {
    position: relative;
    z-index: 10;
  }

  .title {
    font-weight: bold;
    font-size: 40px;
    line-height: 49px;

    letter-spacing: 0.005em;

    color: #ffffff;
  }
  .sub {
    max-width: 430px;
    margin-top: 5px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.005em;

    color: #fff;
  }
  .action-create-nft {
    margin-top: 24px;
  }
  .create-nft {
    color: #169CE7;
    font-size: 14px;
    font-weight: 500;
  }

  .btn-w {
    width: ${(props) => (props['data-is-mobile'] ? '136px' : '163px')};
    margin-right: 10px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  ${(props) =>
    props['data-is-mobile']
      ? `
      .f-custom {
        display:flex;
         align-item: center;
        flex-direction: row;
        justify-content: flex-start;
      }
    `
      : ``}

  @media(max-width: 416px) {
    align-items: flex-start;

    .f-custom {
      margin-top: 120px;
    }
  }
`

const Nft = memo(() => {
  const { Panel } = Collapse
  return (
    <Wrapper
      data-is-mobile={isMobile}
    >
      <HeaderStyled data-is-mobile={isMobile} className="nft-market-header">
        <div className="titleOverplay">
          <h2 className="title">Legend of Galaxy<br />_Mystery box</h2>
          <p className="sub" />
        </div>
      </HeaderStyled>
      <div className="p-bscs-nft-bottom">
        <Artwork />
      </div>
    </Wrapper>
  )
})

export default Nft
