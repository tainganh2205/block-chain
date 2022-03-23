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

const ComingSoonStaking = () => {
  return (
    <PageWrapper className="full-with PageWrapper bg-main-wrapper">
      <h1 style={{ textAlign: "center", color: "white", fontSize: "1rem" }}>
        Our first and secure staking pool will be online today at 14:00 UTC today (23 March 2022).
        </h1>
      <h1 style={{ textAlign: "center", color: "white", fontSize: "1rem" }}>
        Get ready to join for attractive APR and the chance to receive airdrop tokens and NFTs from our Game & Metaverse Hub.
        </h1>

    </PageWrapper>
  );
};

export default ComingSoonStaking;
