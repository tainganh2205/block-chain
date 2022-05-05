import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";

import styled from "styled-components";

import { WrapperPage } from "components/Art";
import "./style.less";
import BoxContent from "./BoxContent";

const PageWrapper = styled(WrapperPage)`
  padding-top: 46px;
  padding-bottom: 110px;

  .wrapper-body {
    margin: auto;
  }

  width: 100%;
  height: calc(100vh - 80px);
  background: url(./images/fish/bg-game.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Swap = () => {

  return (
    <PageWrapper className="PageWrapper bg-main-wrapper">
      <div className="flex p-6 gap-6 justify-center">
        <div className="box-full-blue">
          <img src="/images/fish/box-full-blue.png" alt="" />
          <img src="/images/fish/chest.png" className="chest" alt="" />
          <div className="flex btn-footer gap-2">
            <img src="/images/fish/btn-buy.png"  alt="" />
            <img src="/images/fish/btn-buy.png"  alt="" />
          </div>
        </div>
        <div className="box-full-blue">
          <img src="/images/fish/box-full-blue.png" alt="" />
          <img src="/images/fish/goldchest.png" className="chest" alt="" />
          <div className="flex btn-footer gap-2">
            <img src="/images/fish/btn-buy.png"  alt="" />
            <img src="/images/fish/btn-buy.png"  alt="" />
          </div>
        </div>
        <div className="box-full-blue">
          <img src="/images/fish/box-full-blue.png" alt="" />
          <img src="/images/fish/chestpuple.png" className="chest" alt="" />
          <div className="flex btn-footer gap-2">
            <img src="/images/fish/btn-buy.png"  alt="" />
            <img src="/images/fish/btn-buy.png"  alt="" />
          </div>
        </div>
      </div>
      <div className="separator">My Weapon</div>
      <BoxContent/>
    </PageWrapper>
  );
};

export default Swap;
