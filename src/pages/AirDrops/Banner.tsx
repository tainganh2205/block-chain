import React from "react";
import UnlockButton from "../../components/ButtonV2";
import { ButtonArt as Button } from "../../components/Art";
import { isMobile } from "react-device-detect";

const Banner = () => {

  return (
    <div className="main-banner-v3">
      <div className="box-banner-v3-new">
        <div className="box-img">
          <img src="/images/bg-airdrop.png" alt="" />
        </div>
      </div>

      <div className="box-content-v3">
        <div>
          <img src="/images/airdrop-logo.png" style={{
            height: isMobile ? 80 : 200
          }} className="object-contain" alt="" />
        </div>
        <div className="text-l-banner">
          <h3 className="title-v3">StormGain</h3>
          <p className="desc">The Ultimate Incubation Hub on Binance Smart Chain,</p>
          <p className="desc">Ethereum and Polygon.</p>
          <div className="devCus__bt">
            <Button type="button" className="button-cnt" style={{ borderRadius: "8px", height: "44px", width: 175 }}>
              CLAIM AIRDROP
            </Button>
          </div>
        </div>

        <div className="text-right-banner">
          <div className="CusAb" />
          <div className="list-staking">
            <div className="text-flex">
              <span className="t-left">Airdrop Link:</span>
              <span className="t-right">Goto airdrop</span>
            </div>
            <div className="text-flex">
              <span className="t-left">Total value:</span>
              <span className="t-right">n/a</span>
            </div>
            <div className="text-flex">
              <span className="t-left">Platform:</span>
              <span className="t-right">ETH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
