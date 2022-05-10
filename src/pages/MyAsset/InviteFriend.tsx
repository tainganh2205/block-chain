import React from "react";
import styled from "styled-components";
import { Button } from "antd";

import { PageWrapper } from "../App";
import { useHistory } from "react-router-dom";

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

const InviteFriend = () => {
  const history = useHistory();

  return (
    <PageWrapper className="PageWrapper relative d-flex items-center justify-center">
      <div className={"h-full d-flex flex-column items-center justify-center"}>
        <H1Title className="text-center ml-4 mr-4">Invite 3 friends and earn more LFW</H1Title>
        <InviteLink className="d-flex items-center justify-center mb-5">
          <input value={"0cc30d34f...50e8B6A2222c32"} className="flex-1 mr-4" />
          <Button type="text">
            <img src={"/images/fish/btn-copy.png"} alt="" />
          </Button>
        </InviteLink>
        <StepsWrap className="flex">
          {inviteSteps.map((step, index) => <div key={index} className={"mb-5 flex-1 flex flex-column items-center justify-center pr-4 pl-4"}>
            <img src={step.img} alt="" className="mb-4" />
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
              <SampleText>Total invited</SampleText>
              <div className="flex">
                <H1Title className="flex-1">20</H1Title>
                <Button className="btnDetail" type="text" onClick={() => history.push("/my-asset/referral")}>Detail</Button>
              </div>
            </div>
          </div>
          <div className="pr-4 pl-4 mb-4 flex-1 flex items-center justify-center w-full">
            <img src="/images/fish/referral-gem.png" alt="" className="genImg" />
            <div className="flex-1">
              <SampleText>Total invited</SampleText>
              <div className="flex justify-center">
                <H1Title className="flex-1">20</H1Title>
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
`;

const InviteLink = styled.div`
  width: 100%;
  max-width: 452px;
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
  @media (max-width: 960px) {
    flex-direction: column;
  }

  img {
    width: 262px;
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
