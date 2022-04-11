import React, { useEffect, useState } from "react";
import { Flex } from "@artechain/uikit";
import { useHistory } from "react-router-dom";
import { Tabs, Select } from "antd";
import TabsContentActive from "./TabsContentActive";
import TabsContentEnd from "./TabsContentEnd";
import TabsContentJoined from "./TabsContentJoined";
import { useHookProjects } from "./Store";
import { STATUS, POOL_WEIGHT } from "./index.d";

const TabsIDO = () => {
  const [state]: any = useHookProjects();
  const listIdo: any = state.idoList;
  const listIdoEnd: any = state.idoListEnd;
  const listIdoJoined: any = state.idoListJoined;
  const { idoListSchedule } = state;
  const { idoListScheduleJoined } = state;
  const { TabPane } = Tabs;
  const [activeTab, setActiveTab] = useState("tab=Upcoming");
  const [optionSchedule, setOptionSchedule] = useState("Calendar");
  const history = useHistory();
  const [defaultKey, setDefaultKey] = useState("tab=Upcoming");
  const { Option } = Select;

  const tierText = (() => {
    switch (state.owner?.currentTier) {
      case POOL_WEIGHT.Bronze:
        return POOL_WEIGHT[POOL_WEIGHT.Bronze];
      case POOL_WEIGHT.Diamond:
        return POOL_WEIGHT[POOL_WEIGHT.Diamond];
      case POOL_WEIGHT.Gold:
        return POOL_WEIGHT[POOL_WEIGHT.Gold];
      case POOL_WEIGHT.Platinum:
        return POOL_WEIGHT[POOL_WEIGHT.Platinum];
      case POOL_WEIGHT.Silver:
        return POOL_WEIGHT[POOL_WEIGHT.Silver];
      default:
        return "N/A";
    }
  })();

  // Get Path Name
  const pathname = history.location.search.split("?");
  const tabBox = pathname[1];

  function callback(key) {
    setActiveTab(`tab=${key}`);
    setDefaultKey(`tab=${key}`);
    history.push({
      pathname: history.location.pathname,
      search: `${key}`
    });
  }

  useEffect(() => {
    if (tabBox) {
      setDefaultKey(tabBox);
      setActiveTab(tabBox);
    }
  }, [tabBox]);


  return (
    <>
      <div className="tabs-v3 cus">
        <Tabs activeKey={defaultKey} onChange={callback}>
          <TabPane tab="Upcoming" key="tab=Upcoming">
            <div className="main-cnt-tabs">
              <div className="w-100">
                <div className="devCusIdo">
                  <Flex alignItems="center">
                    <p className="title-1">NEXT PROJECTS</p>
                    <img style={{ paddingLeft: "8px" }} src="/images/imagesV3/IdoLoad.png" alt="..." />
                  </Flex>
                  <Flex justifyContent="space-between">
                    <p className="title-2">UPCOMING</p>
                  </Flex>
                </div>
              </div>
              {activeTab === "tab=Upcoming" ? <TabsContentActive activeTab={activeTab} idoList={listIdo} status={STATUS.COMING} /> : null}
            </div>
          </TabPane>
          <TabPane tab="Active" key="tab=Active">
            <div className="main-cnt-tabs">
              <div className="w-100">
                <div className="devCusIdo">
                  <Flex alignItems="center">
                    <p className="title-1">NEXT PROJECTS</p>
                    <img style={{ paddingLeft: "8px" }} src="/images/imagesV3/IdoLoad.png" alt="..." />
                  </Flex>
                  <Flex justifyContent="space-between">
                    <p className="title-2">ACTIVE</p>
                  </Flex>
                </div>
              </div>
              {activeTab === "tab=Active" ? <TabsContentActive activeTab={activeTab} idoList={listIdo} status={STATUS.COMING} /> : null}
            </div>
          </TabPane>
          <TabPane tab="Ended" key="tab=Ended">
            <div className="w-100">
              <div className="devCusIdo">
                <Flex alignItems="center">
                  <p className="title-1">NEXT PROJECTS</p>
                  <img style={{ paddingLeft: "8px" }} src="/images/imagesV3/IdoLoad.png" alt="..." />
                </Flex>
                <Flex justifyContent="space-between">
                  <p className="title-2">ENDED</p>
                </Flex>
              </div>
            </div>
            <TabsContentEnd activeTab={activeTab} idoList={listIdo} listIdoEnd={[]} status={STATUS.CLOSE} />
          </TabPane>
          <TabPane tab="Joined" key="tab=Joined">
            <div className="devCusIdo">
              <Flex alignItems="center">
                <p className="title-1">NEXT PROJECTS</p>
                <img style={{ paddingLeft: "8px" }} src="/images/imagesV3/IdoLoad.png" alt="..." />
              </Flex>
              <Flex justifyContent="space-between">
                <p className="title-2">JOINED</p>
              </Flex>
            </div>
            {/* <TabsContentActive activeTab={activeTab} idoList={idoListScheduleJoined} status={STATUS.CLOSE} /> */}
            <TabsContentJoined
              activeTab={activeTab}
              idoList={listIdo}
              listIdoJoined={listIdoJoined}
              status={STATUS.CLOSE}
              idoListScheduleJoined={idoListScheduleJoined}
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
export default TabsIDO;
