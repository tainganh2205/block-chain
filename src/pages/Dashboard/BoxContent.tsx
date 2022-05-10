import React from "react";
import { Rate } from "antd";
import { ReceivableOptionsData } from "./index";

interface Props {
  data: ReceivableOptionsData[];
}

const BoxContent = (props: Props) => {
  const content = React.useMemo(() => {
    if (props.data.length) {
      return props.data.map((item => {
        return <div className="weapon-green" key={item.name_id}>
          <img className="logo" src="/images/fish/N.png" alt="" />
          <div className="flex items-center justify-between mr-4">
            <span className="sp-power"><img src="/images/fish/wood.png" alt="" width="30" /></span>
            <span className="sp-power">{item.power}</span>
            <span className="sp-percent">{item.rarity_percent}%</span>
          </div>
          <Rate allowHalf defaultValue={item.rarity} className="mt-2 text-center w-full" />
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
  }, [props.data]);
  return (
    <div className="flex gap-8 flex-wrap mt-3">
      {content}
    </div>
  );
};

export default BoxContent;
