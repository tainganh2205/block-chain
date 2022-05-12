import React from "react";
import { Input, InputNumber } from "antd";

const BuyGem = ({ convertRatio, inputLfwValue, setInputLfwValue }) => {
  return <>
    <div className="mb-4">
      <label htmlFor="" className="text-white">I Spend</label>
      <InputNumber
        placeholder="spend"
        className="gem-input"
        size="large"
        value={inputLfwValue}
        onChange={(v) => setInputLfwValue(v)}
        min={0}
        prefix={<img src="/images/fish/lfw-token-logo.png" alt="" width="40" />}
      />
    </div>
    <div>
      <label htmlFor="" className="text-white">I'll Receive</label>
      <Input
        placeholder="receive"
        className="gem-input"
        size="large"
        value={Math.round(inputLfwValue * convertRatio * 100000) / 100000}
        prefix={<img src="/images/fish/coin-silver.png" alt="" width="40" />}
        readOnly
      />
    </div>
  </>;
};

export default BuyGem;