import React from "react";
import "./style.less";
import { PageWrapper } from "../App";
import Tabs from "./Tabs";

const GemCenter = () => {
  return (
    <PageWrapper className="PageWrapper relative">
      {/* <div className="relative"> */}
      {/*   <img src="/images/fish/box-gem.png" alt="" /> */}
      {/*   <div className="absolute top-[38%] left-[4%] flex flex-column gap-2"> */}
      {/*     <h2 className="title-balance">Your Balance</h2> */}
      {/*     <span className="sp-price">200</span> */}
      {/*     <span className="text-white">Value: $200</span> */}
      {/*   </div> */}
      {/*   <div className="absolute top-[62%] right-[23%] flex flex-column gap-2"> */}
      {/*     <img src="/images/fish/btn-buy-gem.png" alt="" className="cursor-pointer"/> */}
      {/*   </div> */}
      {/* </div> */}
      <Tabs/>
    </PageWrapper>
  );
};

export default GemCenter;
