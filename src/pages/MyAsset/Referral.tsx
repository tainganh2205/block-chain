import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button } from "antd";
import copy from "copy-to-clipboard";
import { Store } from "react-notifications-component";
import { useAsyncEffect } from "@dwarvesf/react-hooks";

import { PageWrapper } from "../App";
import { InvitedInfo, InvitedUser } from "./index";
import { useAuthContext } from "../../context/authNew";

const SampleText = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;

  .highlight {
    color: #28EBA8;
  }
`;

const inviteSteps: Array<{ img: string, content: React.ReactElement }> = [
  { img: "/images/fish/invite-1.png", content: <SampleText className="text-center">Copy and send the link to invite your friends to play game.</SampleText> },
  {
    img: "/images/fish/invite-2.png",
    content: <SampleText className="text-center">Receive <span className="highlight">5 LFW</span> when a friend buy the leader for the first time successfully.</SampleText>
  },
  {
    img: "/images/fish/invite-3.png",
    content: <SampleText className="text-center">Get <span className="highlight">1% (in LFW)</span> of your friends’ GEM purchases after your first 3 friends buy leader successfully.</SampleText>
  }
];

const { REACT_APP_API_URL } = process.env;

const Referral = () => {

  const { walletId: account, accessToken, isWalletSign } = useAuthContext();

  const [inviteLink, setInviteLink] = useState<string | undefined>();
  const [invitedInfo, setInvitedInfo] = useState<InvitedInfo>({});

  const invitedUsers = useMemo<Array<InvitedUser> | undefined>(() => invitedInfo?.invitedUsers, [invitedInfo]);

  useAsyncEffect(async () => {
    setInviteLink(undefined);
    if (account) {
      const response = await axios.get(`${REACT_APP_API_URL}/v1/user/referral`, {
        params: { walletAddress: account }
      });
      if (response?.data?.data) {
        setInviteLink(response.data.data);
      }
    }
  }, [account]);

  // Get Invite user
  useAsyncEffect(async () => {
    setInvitedInfo({});
    if (isWalletSign && accessToken) {
      const response = await axios.get(`${REACT_APP_API_URL}/v1/user/referrals?`, {
        headers: { "Authorization": `Bearer ${accessToken}` }
      });
      if (response?.data?.data) {
        const data = response.data.data;
        setInvitedInfo({ ...data, invitedUsers: (data.users || []).map(user => ({ status: user.status, wallet_address: user.referred_id?.wallet_address || "" })) });
      }
    }
  }, [isWalletSign, accessToken]);

  const onCopy = useCallback(async () => {
    if (inviteLink && copy(inviteLink)) {
      Store.addNotification({
        message: "Copied Invite Link to clipboard",
        container: "bottom-center",
        type: "info",
        insert: "top",
        dismiss: {
          duration: 2000
        }
      });
    }
  }, [inviteLink]);

  const linkValue = useMemo(() => inviteLink || "Please login before getting the invite link", [inviteLink]);

  return (
    <PageWrapper className="PageWrapper relative d-flex flex-column items-center justify-center">
      <div className={"InviteFriend h-full d-flex flex-column items-center justify-center"}>
        <H1Title className="text-center ml-4 mr-4">Invite 3 friends and earn more LFW</H1Title>
        <InviteLink className="d-flex items-center justify-center sm:mb-4 lg:mb-8">
          <input value={linkValue} readOnly className="flex-1 mr-4" />
          <Button type="text" onClick={onCopy}>
            <img src={"/images/fish/btn-copy.png"} alt="" />
          </Button>
        </InviteLink>
        <StepsWrap className="flex">
          {inviteSteps.map((step, index) => <div key={index} className={"mb-6 flex-1 flex flex-column items-center justify-center pr-4 pl-4"}>
            <img src={step.img} alt="" className="mb-2" />
            {step.content}
          </div>)}
        </StepsWrap>
        <InviteInfo className="flex items-center justify-center">
          <div className="flex-1 pr-4 pl-4 mb-4">
            <H1Title>Referral activities</H1Title>
            <span className={"grayText"}>Invite at least 3 friends to play and receive 1% referral bonus for your friends’ GEM purchases</span>
          </div>
          <div className="pr-4 pl-4 mb-4 flex-1 flex items-center justify-center w-full">
            <img src="/images/fish/invite-group.png" alt="" className="groupImg" />
            <div className="flex-1">
              <SampleText>Active friends / Total invited</SampleText>
              <div className="flex">
                <H1Title className="flex-1"><b>{invitedInfo?.activeUser || 0}</b> / {invitedInfo?.userInvited || 0}</H1Title>
              </div>
            </div>
          </div>
          <div className="pr-4 pl-4 mb-4 flex-1 flex items-center justify-center w-full">
            <img src="/images/fish/referral-gem.png" alt="" className="genImg" />
            <div className="flex-1">
              <SampleText>Total invited</SampleText>
              <div className="flex justify-center">
                <H1Title className="flex-1">{invitedInfo?.totalEarn || 0}</H1Title>
              </div>
            </div>
          </div>
        </InviteInfo>
      </div>
      <ReferralWrapper className={"ReferralWrapper h-full d-flex items-center justify-center"}>
        <CardDiv className={"mr-4 d-flex flex-column"} width={413} imgUrl={"/images/fish/box-full-blue.png"} padding={25}>
          <TitleH2>Invited friends</TitleH2>
          <TableWrap>
            <InviteTable>
              <thead>
              <tr>
                <th>
                  WALLET
                </th>
                <th>
                  ACTIVE STATUS
                </th>
              </tr>
              </thead>
              <tbody>
              {(invitedUsers || []).map((user, index) => <tr key={index}>
                <td title={user.wallet_address}>{user.wallet_address}</td>
                <td className={`statusText ${user.status?.toLowerCase()}`}>{user.status}</td>
              </tr>)}
              </tbody>
            </InviteTable>
            {(Array.isArray(invitedUsers) && !invitedUsers.length) && <div className={"h-full d-flex items-center justify-center"}>
              <img src={"/images/fish/empty.png"} alt={""} />
            </div>}
          </TableWrap>
        </CardDiv>
        <CardDiv className={"d-flex flex-column"} width={846} imgUrl={"/images/fish/box-referral.png"} padding={50}>
          <TitleH2>Referral Earned</TitleH2>
          <TableWrap>
            <ReferralTable>
              <thead>
              <tr>
                <th> ACTIVE FRIENDS</th>
                <th> TRANSACTIONS</th>
                <th> AMOUNT</th>
                <th> YOU WILL GET</th>
                <th> DATE</th>
                <th> STATUS</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </ReferralTable>
            <div className={"h-full d-flex items-center justify-center"}>
              <img src={"/images/fish/empty.png"} alt={""} />
            </div>
          </TableWrap>
        </CardDiv>
      </ReferralWrapper>
    </PageWrapper>
  );
};

const H1Title = styled.h1`
  font-weight: 500;
  font-size: 30px;
  line-height: 38px;
  color: #FFFFFF;

  b {
    color: #28EBA8;;
  }
`;

const InviteLink = styled.div`
  width: 100%;
  max-width: 690px;
  margin-top: 24px;

  input {
    text-align: center;
    background: rgba(33, 34, 39, 0.1);
    border: 1px solid rgba(87, 87, 87, 0.1);
    box-shadow: inset 0 0 11px rgba(0, 0, 0, 0.49);
    border-radius: 10px;
    color: #FFFDFD;
    font-weight: 500;
    font-size: 16px;
    line-height: 40px;
    padding: 0 20px;
  }

  button {
    width: 117px;
    padding: 0;
    margin: 0;
    height: unset;
  }
`;

const StepsWrap = styled.div`
  max-width: 1100px;

  img {
    width: 200px;
  }

  @media (max-width: 960px) {
    flex-direction: column;
    
    p {
      max-width: 400px;
    }
  }
`;

const InviteInfo = styled.div`
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
    max-width: 550px;
  }

  .grayText {
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #FFFFFF;
    opacity: .7;
  }

  .groupImg {
    margin: 0 12px;
  }

  .genImg {
    margin: 0 30px;
  }
`;

const ReferralWrapper = styled.div`
  @media (max-width: 1300px) {
    flex-direction: column;
  }
`;

const CardDiv = styled.div<{ width: number, imgUrl: string, padding: number }>`
  width: ${({ width }) => width}px;
  height: 314px;
  position: relative;
  padding: 30px ${({ padding }) => padding}px;
  margin: 12px 0;

  > * {
    position: relative;
    z-index: 1;
  }

  :before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: ${({ width }) => width}px;
    height: 314px;
    opacity: .5;
    background-image: url("${({ imgUrl }) => imgUrl}");
    background-size: ${({ width }) => width}px 314px;
    background-repeat: no-repeat;
  }
`;

const TitleH2 = styled.h2`
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #FFFDFD;
  margin-bottom: 24px;
`;

const TableWrap = styled.div`
  flex: 1;
  max-height: 210px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-right: -15px;
`;

const InviteTable = styled.table`
  width: 100%;

  th, td {
    font-weight: 500;
    font-size: 14px;
    line-height: 40px;

    &:first-child {
      max-width: 270px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:last-child {
      white-space: nowrap;
      text-align: center;
    }
  }

  th {
    color: #28EBA8;
  }

  td {
    color: #FFFDFD;
    border-bottom: 1px rgba(219, 219, 219, 0.2) solid;

    &.statusText {
      text-transform: capitalize;

      &.pending {
        color: #ECD35E;
      }

      &.active {
        color: #35eb28;
      }
    }
  }
`;

const ReferralTable = styled.table`
  width: 100%;

  th, td {
    font-weight: 500;
    font-size: 14px;
    line-height: 40px;
    color: #FFFDFD;
  }
`;

export default Referral;
