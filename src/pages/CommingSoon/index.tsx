import React from "react";
import styled from "styled-components";
import { WrapperPage } from "components/Art";
import "./style.less";

const PageWrapper = styled(WrapperPage)`
  padding-top: 46px;
  padding-bottom: 110px;

  .wrapper-body {
    margin: auto;
  }

  width: 100%;
  height: 100%;
  background: url(./images/lfw-swap-banner.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const ComingSoon = () => {
  return (
    <PageWrapper className="full-with PageWrapper bg-main-wrapper">
      <h1 style={{textAlign:'center',color:'white',fontSize:'4rem'}}>Coming Soon</h1>
    </PageWrapper>
  );
};

export default ComingSoon;
