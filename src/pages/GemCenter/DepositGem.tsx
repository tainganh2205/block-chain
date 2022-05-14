import { InputNumber } from "antd";
import React from "react";

const DepositGem = () => {
  return <div className="mb-4">
    <label htmlFor="" className="text-white">Amount</label>
    <InputNumber
      placeholder="0"
      className="gem-input"
      size="large"
      prefix={<img src="/images/fish/gem.png" alt="" width="40" />}
    />
  </div>;
};

export default DepositGem;
