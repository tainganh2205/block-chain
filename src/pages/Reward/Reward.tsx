import React from "react";
import { PageWrapper } from "../App";
import { useFishTabs } from "../../hooks/useFishTabs";

import "./style.less";

const Reward = () => {
  const { tabsDom } = useFishTabs([{ key: "claim", label: "Claim" }, { key: "lucky", label: "Lucky Draw" }, { key: "history", label: "History" }]);

  return (
    <PageWrapper className="Reward relative flex flex-column items-center justify-center">
      {tabsDom}
      <img src="/images/fish/box-reward.png" alt="" />
    </PageWrapper>
  );
};

export default Reward;
