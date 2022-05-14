import React from "react";
import { useAuthContext } from "../../context/authNew";
import { abbreviateNumber } from "../../utils/number";

import "./index.less";

export default function BalanceCard({ weaponCount }: { weaponCount?: number }) {
  const { balanceFloat, balanceGemFloat } = useAuthContext();

  return <div className="relative walletCard">
    <img src="/images/fish/box-gem.png" alt="" />
    <div className="absolute top-[38%] left-[4%] flex flex-column gap-2">
      <h2 className="title-balance">Your Balance</h2>
      <span className="d-flex items-center">
        <img title="Total LFW" src={"/images/fish/lfw-token-logo.png"} alt="" className={"mr-2"} />
        <span className={"sp-price"} title={balanceFloat.toString()}>{abbreviateNumber(balanceFloat)}</span>
        {weaponCount !== undefined && <>
          <img title="Total Weapon" src={"/images/fish/gun-logo.png"} alt="" className={"ml-5 mr-2"} />
          <span className={"sp-price"} title={weaponCount.toString()}>{weaponCount}</span>
        </>}
        <img title="Total Gem" src={"/images/fish/gem.png"} alt="" className={"ml-5 mr-2"} />
        <span className={"sp-price"} title={balanceGemFloat.toString()}>{abbreviateNumber(balanceGemFloat)}</span>
      </span>
      <span className="textValue">Value: ~$200</span>
    </div>
  </div>;
}