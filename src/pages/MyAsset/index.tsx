import React, { useMemo } from "react";
import { PageWrapper } from "../App";
import { useFishTabs } from "../../hooks/useFishTabs";
import BalanceCard from "../../components/BalanceCard";
import Referral from "./Referral";

import "./style.less";

export interface InvitedUser {
  wallet_address?: string;
  status?: string;
}

export interface InvitedInfo {
  activeUser?: number;
  totalEarn?: number;
  userInvited?: number;
  invitedUsers?: Array<InvitedUser>;
}

const MyAsset = () => {
  const { currentTab, tabsDom } = useFishTabs([{ key: "weapon", label: "Weapon" }, { key: "referrals", label: "Referrals" }]);

  const contentDom = useMemo<React.ReactElement>(() => {
    if (currentTab === "weapon") {
      return <></>;
    } else if (currentTab === "referrals") {
      return <Referral />;
    }
    return <></>;
  }, [currentTab]);

  return <PageWrapper className="MyAsset relative d-flex flex-column items-center">
    <div className="walletDiv">
      <BalanceCard />
      <div className={"btnControls flex gap-4 mt-2"}>
        {tabsDom}
      </div>
    </div>
    <div className={"MyAssetContent pt-4 pb-4"}>
      {contentDom}
    </div>
  </PageWrapper>;
};

export default MyAsset;
