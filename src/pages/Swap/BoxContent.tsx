import React from "react";
import { Rate } from 'antd';
const BoxContent = () => {
  return (
    <div className="flex">
      <div className="weapon-green">
        <img src="/images/fish/N.png" alt=""/>
        <div className="flex items-center justify-around mt-2">
          <span className="sp-power">9999999</span>
          <span className="sp-percent">0,001%</span>
        </div>
        <Rate allowHalf defaultValue={2.5} className="mt-2 text-center w-full"/>
      </div>
    </div>
  );
};

export default BoxContent;
