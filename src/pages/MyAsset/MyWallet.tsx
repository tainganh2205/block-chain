import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { PageWrapper } from "../App";
import { abbreviateNumber } from "../../utils/number";

const MyWallet = ({ balanceGemFloat, balanceFloat }) => {
  const history = useHistory();

  return (
    <PageWrapper className="MyWallet relative d-flex flex-column items-center">
      <div className="walletDiv">
        <div className="relative walletCard">
          <img src="/images/fish/box-gem.png" alt="" />
          <div className="absolute top-[38%] left-[4%] flex flex-column gap-2">
            <h2 className="title-balance">Your Balance</h2>
            <span className="d-flex items-center sp-price">
            <img src={"/images/fish/coin-silver.png"} alt="" className={"mr-2"} />
              {abbreviateNumber(balanceGemFloat)}
              <img src={"/images/fish/lfw-token-logo.png"} alt="" className={"ml-5 mr-2"} />
              {abbreviateNumber(balanceFloat)}
          </span>
            <span className="textValue">Value: $200</span>
          </div>
          <div className="btnWithdraw absolute right-[15%] flex flex-column gap-2 cursor-pointer" onClick={() => false}>
            <img src="/images/fish/btn-withdraw.png" alt="" />
          </div>
        </div>
        <div className={"btnControls flex gap-4 mt-2"}>
          <Button type={"button"} onClick={() => history.push("/my-asset/invite")}>
            Invite friend
          </Button>
          <Button type={"button"} onClick={() => history.push("/my-asset/referral")}>
            Your referral
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};

const Button = styled.button`
  padding: 12px 24px;
  margin: 0;
  background-image: url("/images/fish/btn-tab-reward.png");
  background-size: 100% 100%;
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
`;

export default MyWallet;
