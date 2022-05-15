import React, { useCallback } from "react";
import { PageWrapper } from "../App";
import { useFishTabs } from "../../hooks/useFishTabs";

import "./style.less";
import { Input } from "antd";
import { useWeb3React } from "@web3-react/core";
import BoxContent from "./BoxContent";
import copy from "copy-to-clipboard";
import { Store } from "react-notifications-component";

const Reward = () => {
  const { tabsDom, currentTab } = useFishTabs([{ key: "claim", label: "Claim" }, { key: "lucky", label: "Lucky Draw" }, { key: "history", label: "History" }]);
  const { account } = useWeb3React();

  const onCopy = useCallback(async () => {
    if (account && copy(account)) {
      Store.addNotification({
        message: "Copied wallet to clipboard",
        container: "bottom-center",
        type: "info",
        insert: "top",
        dismiss: {
          duration: 2000
        }
      });
    }
  }, [account]);

  const tabContent = React.useMemo(() => {
    let content: JSX.Element | undefined;
    let title: string = "Claim";
    switch (currentTab) {
      case "claim":
        content = <>
          <img src="/images/fish/btn-buy1.png" alt="" className="btn-buy-gem" />
          <div className="gem-input-wrapper">
            <div className="mb-4">
              <label htmlFor="" className="text-white">Your Address</label>
              <Input
                className="gem-input"
                size="large"
                value={account || ""}
                readOnly
                suffix={<img src="/images/fish/icon-copy.png" className="cursor-pointer" alt="" onClick={onCopy} />}
              />
            </div>
            <div>
              <label htmlFor="" className="text-white">Claimable rewards</label>
              <Input
                className="gem-input"
                size="large"
                // value={Math.round(inputLfwValue * convertRatio * 100000) / 100000}
                suffix={<img src="/images/fish/lfw-token-logo.png" alt="" width="40" />}

              />
            </div>
          </div>
        </>;
        break;
      case "lucky":
        title = "Lucky Draw";
        content = <>
          <img src="/images/fish/btn-buy1.png" alt="" className="btn-buy-gem" />
          <div className="lucky-draw-content-wrapper">
            <h2 className="lucky-draw-title">
              Everyday could be your lucky day to
              win an iphone <span className="text-green">13</span> and 1 <span className="text-green">BTC</span>
            </h2>
            <span className="lucky-draw-title-detail">
            Join our lottery campaign today!
          </span>
          </div>
        </>;
        break;
    }
    return <BoxContent content={content} title={title} />;
  }, [currentTab]);
  const tabContentEmpty = React.useMemo(() => {
    let content: JSX.Element | undefined;
    let title: string = "Claim";
    switch (currentTab) {
      case "claim":
        content = <>
          <img src="/images/fish/btn-buy1.png" alt="" className="btn-buy-gem" />
          <div className="lucky-draw-content-wrapper">
            <img src="/images/fish/gift-empty.png" alt="" className="ml-auto mr-auto block" />
            <h2 className="lucky-draw-title">
              You have no reward to claim now
            </h2>
            <span className="lucky-draw-title-detail">
            Go explore the Fish Unchained and earn some juicy rewards.
            </span>
          </div>
        </>
        break;
      case "lucky":
        title = "Lucky Draw";
        content = <>
          <img src="/images/fish/btn-buy1.png" alt="" className="btn-buy-gem" />
          <div className="lucky-draw-content-wrapper">
            <img src="/images/fish/lucky-empty.png" alt="" className="ml-auto mr-auto block" />
            <h2 className="lucky-draw-title">
              You are not eligible to participate
            </h2>
            <span className="lucky-draw-title-detail">
            Go explore the Fish Unchained and earn some juicy rewards.
            </span>
          </div>
        </>;
        break;
    }
    return <BoxContent content={content} title={title} />;
  }, [currentTab]);
  return (
    <PageWrapper className="Reward relative flex flex-column items-center justify-center">
      {tabsDom}
      {tabContentEmpty}
    </PageWrapper>
  );
};

export default Reward;
