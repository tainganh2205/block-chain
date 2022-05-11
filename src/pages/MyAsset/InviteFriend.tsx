import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import copy from "copy-to-clipboard";
import { Store } from "react-notifications-component";

import { PageWrapper } from "../App";
import { InvitedInfo } from "./index";

const SampleText = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;

  .highlight {
    color: #28EBA8;;
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


const InviteFriend: React.FC<{ inviteLink: string | undefined, account: string | undefined | null, invitedInfo: InvitedInfo | undefined }>
  = ({ inviteLink, account, invitedInfo }) => {
  const history = useHistory();
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

  const accountTitle = useMemo(() => (account && inviteLink) ? `${account.slice(0, 10)}...${account.slice(account.length - 18)}` : "Please login before getting the invite link", [account, inviteLink]);

  return (
    <PageWrapper className="PageWrapper relative d-flex items-center justify-center">
      <div className={"h-full d-flex flex-column items-center justify-center"}>
        <H1Title className="text-center ml-4 mr-4">Invite 3 friends and earn more LFW</H1Title>
        <InviteLink className="d-flex items-center justify-center sm:mb-4 lg:mb-10">
          <input value={accountTitle} readOnly className="flex-1 mr-4" />
          <Button type="text" onClick={onCopy}>
            <img src={"/images/fish/btn-copy.png"} alt="" />
          </Button>
        </InviteLink>
        <StepsWrap className="flex">
          {inviteSteps.map((step, index) => <div key={index} className={"sm:mb-4 lg:mb-10 flex-1 flex flex-column items-center justify-center pr-4 pl-4"}>
            <img src={step.img} alt="" className="mb-2" />
            {step.content}
          </div>)}
        </StepsWrap>
        <InviteInfo className="flex items-center justify-center">
          <div className="flex-1 pr-4 pl-4 mb-2">
            <H1Title>Referral activities</H1Title>
            <span className={"grayText"}>Invite at least 3 friends to play and receive 1% referral bonus for your friends’ GEM purchases</span>
          </div>
          <div className="pr-4 pl-4 mb-2 flex-1 flex items-center justify-center w-full">
            <img src="/images/fish/invite-group.png" alt="" className="groupImg" />
            <div className="flex-1">
              <SampleText>Active friends / Total invited</SampleText>
              <div className="flex">
                <H1Title className="flex-1"><b>{invitedInfo?.activeUser || 0}</b> / {invitedInfo?.userInvited || 0}</H1Title>
                <Button className="btnDetail" type="text" onClick={() => history.push("/my-asset/referral")}>Detail</Button>
              </div>
            </div>
          </div>
          <div className="pr-4 pl-4 mb-2 flex-1 flex items-center justify-center w-full">
            <img src="/images/fish/referral-gem.png" alt="" className="genImg" />
            <div className="flex-1">
              <SampleText>Total invited</SampleText>
              <div className="flex justify-center">
                <H1Title className="flex-1">{invitedInfo?.totalEarn || 0}</H1Title>
                <Button className="btnDetail" type="text" onClick={() => history.push("/my-asset/referral")}>Detail</Button>
              </div>
            </div>
          </div>
        </InviteInfo>
      </div>
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
  max-width: 552px;
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
    line-height: 40px
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
  //@media (max-width: 960px) {
  //  flex-direction: column;
  //}

  img {
    width: 262px;
  }

  @media (max-width: 960px) {
    img {
      width: 124px;
    }
  }
`;

const InviteInfo = styled.div`
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
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

  .btnDetail {
    padding: 0;
    margin: 0;
    width: 138px;
    height: 40px;
    background-image: url("/images/fish/btn-active.png");
    background-size: 138px 40px;

    span {
      color: #FFFFFF;
    }
  }
`;

export default InviteFriend;
