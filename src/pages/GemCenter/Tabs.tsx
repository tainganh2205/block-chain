import React from "react";

const Tabs = () => {
  return (
    <div className="flex flex-column items-center justify-center">
      <div className="flex gap-1 mb-2">
        <button className="btn-tab">
          <img src="/images/fish/btn-tab-reward.png" alt="" />
          <span className="btn-tab-text">
                Buy Gem
          </span>
        </button>
        <button className="btn-tab">
          <img src="/images/fish/btn-tab-reward.png" alt="" />
          <span className="btn-tab-text">
                Deposit
          </span>
        </button>
        <button className="btn-tab">
          <img src="/images/fish/btn-tab-reward.png" alt="" />
          <span className="btn-tab-text">
                Withdraw
          </span>
        </button>
      </div>
      <div className="relative">
        <img src="/images/fish/box-reward.png" alt="" />
        <img src="/images/fish/btn-buy1.png" alt="" className="btn-buy-gem"/>
      </div>
    </div>
  );
};

export default Tabs;
