import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsyncEffect } from "@dwarvesf/react-hooks";
import axios from "axios";

import InviteFriend from "./InviteFriend";
import Referral from "./Referral";
import MyWallet from "./MyWallet";
import { useAuthContext } from "../../context/authNew";

import "./style.less";

const { REACT_APP_API_URL } = process.env;

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
  const params = useParams();
  const { walletId: account, getAccessToken, isWalletSign } = useAuthContext();
  const [inviteLink, setInviteLink] = useState<string | undefined>();
  const [invitedInfo, setInvitedInfo] = useState<InvitedInfo>({});

  useAsyncEffect(async () => {
    console.log(account)
    setInviteLink(undefined);
    if (account) {
      const response = await axios.get(`${REACT_APP_API_URL}/v1/user/referral`, {
        params: { walletAddress: account }
      });
      if (response?.data?.data) {
        setInviteLink(response.data.data);
        console.log(response.data.data)
      }
    }
  }, [account]);

  // Get Invite user
  useAsyncEffect(async () => {
    setInvitedInfo({ });
    const accessToken = getAccessToken();
    if (isWalletSign && accessToken) {
      const response = await axios.get(`${REACT_APP_API_URL}/v1/user/referrals?`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      if (response?.data?.data) {
        const data = response.data.data;
        setInvitedInfo({ ...data, invitedUsers: (data.users || []).map(user => ({ status: user.status, wallet_address: user.referred_id?.wallet_address || "" })) });
      }
    }
  }, [isWalletSign, getAccessToken]);

  return useMemo<React.ReactElement>(() => {
    // @ts-ignore
    if (params?.slug === "invite") {
      return <InviteFriend inviteLink={inviteLink} invitedInfo={invitedInfo}/>;
      // @ts-ignore
    } else if (params?.slug === "referral") {
      return <Referral invitedInfo={invitedInfo}/>;
    }
    return <MyWallet />;
  }, [params, inviteLink, invitedInfo]);
};

export default MyAsset;
