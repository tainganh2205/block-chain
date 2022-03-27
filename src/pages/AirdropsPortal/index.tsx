import React from "react";
import styled from "styled-components";
import { WrapperPage } from "components/Art";
import "./style.less";
import { isMobile } from "react-device-detect";

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

const AirdropsPortal = () => {
  return (
    <PageWrapper className="full-with PageWrapper bg-main-wrapper">
      <h1 style={{ textAlign: "center", color: "white", fontSize: isMobile ? "2rem" : "3rem", marginTop: isMobile ? "3rem" : 0 }}>
        Welcome to
        LFW airdrops portal
      </h1>
      <h1 style={{ textAlign: "center", color: "white", fontSize: "1rem", marginTop: "1rem" }}>
        A central place for you to claim airdrops from blockchain games and metaverse projects launched on our Launchpad.
      </h1>

    </PageWrapper>
  );
};

export default AirdropsPortal;
