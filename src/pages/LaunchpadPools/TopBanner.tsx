import React from "react";
import { isMobile } from "react-device-detect";
import { useHistory } from "react-router-dom";
import UnlockButton from "../../components/ButtonV2";

const TopBanner = () => {

  const history = useHistory();
  const typePath = history.location.search.split("?");

  return (
    <div className="main-banner-v3">
      <div className="box-banner-v3-new">
        <div className="box-img">
          <img src="/images/banner1.jpg" alt="" />
        </div>
      </div>
      <div className="launchpad-content">
        <div className="text-l-banner" style={{ width: isMobile ? "100%" : "50%" }}>
          <h3 className="title-v3">Launchpad Pools</h3>
          <p className="desc">
            Launchpad pools offer multiple opportunities for you. Get double rewards by staking LFW tokens in return for LFW tokens and earning eligible tickets for attractive IDO allocation on our
            Launchpad.
          </p>
          <p className="desc">More Details...</p>
        </div>
      </div>
    </div>
  );
};
export default TopBanner;
