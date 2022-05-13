import React from "react";
import { useAuthContext } from "../../context/authNew";
import { abbreviateNumber } from "../../utils/number";

import "./index.less";

export default function BalanceCard() {
  const { balanceFloat, balanceGemFloat } = useAuthContext();

  return <div className="relative walletCard">
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
  </div>;
}