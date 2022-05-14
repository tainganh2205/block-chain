import React from "react";
import { ReceivableOptionsData } from "../Dashboard";
import { Rate } from "antd";
import { PageWrapper } from "pages/App";

const MyWeapon = ({weapons}: {weapons: ReceivableOptionsData[]}) => {
  const content = React.useMemo(() => {
    if (weapons.length) {
      return weapons.map((item => {
        return <div className="weapon-green" key={item.name_id}>
          <img className="logo" src={`/images/fish/${item.rarity}.png`} alt="" />
          <div className="flex items-center justify-between mr-4">
            <span className="sp-power"><img src="/images/fish/wood.png" alt="" width="30" /></span>
            <span className="sp-power">{item.power}</span>
            <span className="sp-percent">{item.rarity_percent}%</span>
          </div>
          <Rate allowHalf defaultValue={item.star} className="mt-2 text-center w-full" />
          <div className="w-50 ml-auto mr-auto mt-2">
            <img src={item.image} alt="" />
          </div>
          <div>
            <span className="weapon-name">{item.name}</span>
          </div>
        </div>;
      }));
    }
    return null;
  }, [weapons]);

  return (
    <PageWrapper className="PageWrapper relative d-flex flex-column items-center justify-center">
      {content}
    </PageWrapper>
  );
};

export default MyWeapon;
