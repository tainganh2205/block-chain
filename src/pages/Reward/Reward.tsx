import React from "react";
import "./style.less";
import { PageWrapper } from "../App";

const Reward = () => {
  return (
    <PageWrapper className="PageWrapper relative">
      <div className="h-full flex flex-column items-center justify-center">
        <div>
          <button className="btn-tab">
            <img src="/images/fish/btn-tab-reward.png" alt="" />
            <span className="btn-tab-text">
                Claim
              </span>
          </button>
        </div>
        <img src="/images/fish/box-reward.png" alt="" />
      </div>
    </PageWrapper>
  );
};

export default Reward;
