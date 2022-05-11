import { Input } from "antd";
import React from "react";
import classnames from "classnames";

const Tabs = () => {
  const [tab, setTab] = React.useState<string>("buy");
  const content = React.useMemo(() => {
    switch (tab) {
      case "buy":
        return <div className="relative">
          <img src="/images/fish/box-reward.png" alt="" />
          <img src="/images/fish/btn-buy1.png" alt="" className="btn-buy-gem" />
          <div className="gem-input-wrapper">
            <div className="mb-4">
              <label htmlFor="" className="text-white">I Spend</label>
              <Input
                placeholder="Basic usage"
                className="gem-input"
                size="large"
                suffix={<img src="/images/fish/N.png" alt="" width="40" />}
              />
            </div>
            <div>
              <label htmlFor="" className="text-white">I Receive</label>
              <Input
                placeholder="Basic usage"
                className="gem-input"
                size="large"
                suffix={<img src="/images/fish/N.png" alt="" width="40" />}
              />
            </div>
          </div>
        </div>;
      case "deposit":
        return <div className="relative">
          <img src="/images/fish/box-reward.png" alt="" />
          <img src="/images/fish/btn-buy1.png" alt="" className="btn-buy-gem" />
          <div className="gem-input-wrapper">
            <div className="mb-4">
              <label htmlFor="" className="text-white">Amount</label>
              <Input
                placeholder="0"
                className="gem-input"
                size="large"
                suffix={<img src="/images/fish/N.png" alt="" width="40" />}
              />
            </div>
          </div>
        </div>;
      default :
        return null;
    }
  }, [tab]);
  return (
    <div className="flex flex-column items-center justify-center">
      <div className="flex gap-1 mb-2">
        <button
          className={classnames("btn-tab", {
            "opacity-50": tab === "deposit"
          })}
          onClick={() => setTab("buy")}
        >
          <img src="/images/fish/btn-tab-reward.png" alt="" />
          <span className="btn-tab-text">
                Buy Gem
          </span>
        </button>
        <button
          className={classnames("btn-tab", {
            "opacity-50": tab === "buy"
          })}
          onClick={() => setTab("deposit")}
        >
          <img src="/images/fish/btn-tab-reward.png" alt="" />
          <span className="btn-tab-text">
                Deposit
          </span>
        </button>
      </div>
      {content}
    </div>
  );
};

export default Tabs;
