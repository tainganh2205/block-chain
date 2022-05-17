import React, { useMemo } from "react";
import { useAsyncEffect } from "@dwarvesf/react-hooks";
import axios from "axios";
import { PageWrapper } from "../App";
import { useFishTabs } from "../../hooks/useFishTabs";
import BalanceCard from "../../components/BalanceCard";
import { ReceivableOptionsData } from "../Dashboard";
import Referral from "./Referral";
import MyWeapon from "./Weapon";

import "./style.less";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useAuthContext } from "../../context/authNew";

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

const { REACT_APP_API_URL } = process.env;

const MyAsset = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { showConnectModal } = useAuthContext();
  const { currentTab, tabsDom } = useFishTabs([{ key: "weapon", label: "Weapon" }, { key: "referrals", label: "Referrals" }]);
  const [weapons, setWeapons] = React.useState<ReceivableOptionsData[]>([]);

  useAsyncEffect(async () => {
    if(account){
      const responseMyWeapon = await axios.get(`${REACT_APP_API_URL}/v1/weapon/list?walletAddress=${account}`);
      if (responseMyWeapon.data.data) {
        setWeapons(responseMyWeapon.data.data);
      }
    }
  }, [account]);

  const contentDom = useMemo<React.ReactElement>(() => {
    if (currentTab === "weapon") {
      return <MyWeapon weapons={weapons} />;
    } else if (currentTab === "referrals") {
      return <Referral />;
    }
    return <></>;
  }, [currentTab, weapons]);

  const connectWallet = useMemo<React.ReactElement>(() => {
    return <PageWrapper className="MyAsset relative flex flex-column items-center justify-center">
      <img src="/images/fish/connect.png" alt="" width="40" />
      <h1 className="title-connect">
        Connect wallet required
      </h1>
      <span className="title-connect-detail">
        You need to Connect a Wallet to view your profile dashboard
      </span>
      <img src="/images/fish/btn-connect.png" className="btn-connect" alt="" onClick={showConnectModal}/>
    </PageWrapper>;
  }, []);

  return !account ?
    connectWallet :
    <PageWrapper className="MyAsset relative d-flex flex-column items-center">
      < div className="walletDiv">
        <BalanceCard weaponCount={weapons.length} />
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
