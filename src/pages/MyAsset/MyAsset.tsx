import React, { useMemo } from "react";
import InviteFriend from "./InviteFriend";
import { useParams } from "react-router-dom";
import Referral from "./Referral";

const MyAsset = () => {
  const params = useParams();

  return useMemo<React.ReactElement>(() => {
    // @ts-ignore
    if (params?.slug === "referral") {
      return <Referral />;
    }
    return <InviteFriend />;
  }, [params]);
};

export default MyAsset;
