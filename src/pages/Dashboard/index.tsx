import React from "react";

import MainBanner from "./MainBanner";
// import MainTeam from "./MainTeam";
import MainOurBenefit from "./MainOurBenefit";
import MainOurPartner from "./MainOurPartner";
import NftGame from "./NftGame";
import "./style.less";

export default function Dashboard() {

  return (
    <main className="full-with">
      <MainBanner />
      <MainOurBenefit />
      <NftGame />
      <MainOurPartner />
      {/* <MainTeam /> */}
    </main>
  );
}
