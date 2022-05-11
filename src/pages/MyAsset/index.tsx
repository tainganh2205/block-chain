import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsyncEffect } from "@dwarvesf/react-hooks";
import axios from "axios";

import InviteFriend from "./InviteFriend";
import Referral from "./Referral";
import MyWallet from "./MyWallet";
import { useActiveWeb3React } from "../../hooks";

import "./style.less";

const { REACT_APP_API_URL } = process.env;

const MyAsset = () => {
  const params = useParams();
  const { account } = useActiveWeb3React();
  const [inviteLink, setInviteLink] = useState();

  useAsyncEffect(async () => {
    setInviteLink(undefined);
    if (account) {
      const response = await axios.get(`${REACT_APP_API_URL}/v1/user/referral?`, {
        params: { walletAddress: account }
      });
      if (response?.data?.data) {
        setInviteLink(response.data.data);
      }
    }
  }, [account]);

  return useMemo<React.ReactElement>(() => {
    // @ts-ignore
    if (params?.slug === "invite") {
      return <InviteFriend inviteLink={inviteLink} account={account} />;
      // @ts-ignore
    } else if (params?.slug === "referral") {
      return <Referral />;
    }
    return <MyWallet />;
  }, [params]);
};

export default MyAsset;
