import React from "react";
import axios from "axios";

import BoxContent from "./BoxContent";
import { ReactComponent as Logo } from "../../images/fish/busd.svg";
import { useAsyncEffect } from "@dwarvesf/react-hooks";
import "./style.less";
import { PageWrapper } from "pages/App";

const { REACT_APP_API_URL } = process.env;

export interface ReceivableOptionsData {
  description?: string;
  image: string;
  name: string;
  name_id: string;
  power: number;
  rarity: number;
  rarity_percent: number;
  star: number;
}

interface StoryData {
  created_at: string;
  currency: string;
  discount: number;
  image: string;
  name: string;
  name_id: string;
  price: number;
  smart_contract_address: string;
  updated_at: string;
  receivable_options: ReceivableOptionsData[];
}

const Dashboard = () => {
  const [stories, setStories] = React.useState<StoryData[]>([]);
  const [options, setOptions] = React.useState<ReceivableOptionsData[]>();
  useAsyncEffect(async () => {
    const response = await axios.get(`${REACT_APP_API_URL}/v1/mystory`);
    if (response.data.data) {
      setStories(response.data.data);
    }
  }, []);

  const boxes = React.useMemo(() => {
    if (stories.length) {
      return stories.map((item) => {
        return <div className="box-full-blue mt-4" key={item.name_id}>
          <img src="/images/fish/box-full-blue.png" alt="" />
          <img src={item.image} className="chest" alt="" />
          <div className="box-content">
            <span className="box-full-blue-title">{item.name}</span>
            <div className="flex items-center gap-4 text-xl font-bold">
              <Logo />
              <span className="box-content-price">
                {item.price}
              </span>
            </div>
          </div>
          <div className="flex btn-footer gap-2">
            <img src="/images/fish/btn-buy.png" alt="" />
            <img src="/images/fish/btn-buy.png" alt="" onClick={()=>setOptions(item.receivable_options)}/>
          </div>
        </div>;
      });
    }
    return null;
  }, [stories]);
  return (
    <PageWrapper className="PageWrapper">
      <div className="flex p-6 gap-6 justify-center flex-wrap">
        {boxes}
      </div>
      <div className="separator">My Weapon</div>
      {options && <BoxContent data={options} />}
    </PageWrapper>
  );
};

export default Dashboard;
