import React, { useEffect, useState } from "react";
import { Flex } from "@artechain/uikit";
import { useHistory } from "react-router-dom";
import { Tabs, Select } from "antd";
import TabsContentActive from "./TabsContentActive";
import TabsContentEnd from "./TabsContentEnd";
import TabsContentJoined from "./TabsContentJoined";
import { useHookProjects } from "./Store";
import Schedules from "./Schedules";
import { STATUS, POOL_WEIGHT } from "./index.d";

const TabsIDO = () => {
  const [state]: any = useHookProjects();
  const listIdo: any = state.idoList;
  const listIdoEnd: any = state.idoListEnd;
  const listIdoJoined: any = state.idoListJoined;
  const { idoListSchedule } = state;
  const { idoListScheduleJoined } = state;
  const { TabPane } = Tabs;
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [optionSchedule, setOptionSchedule] = useState("Calendar");
  const history = useHistory();
  const [defaultKey, setDefaultKey] = useState("Upcoming");
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
    setActiveTab(key);
    setDefaultKey(key);
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

  function handleChangeOptionSchedule(value) {
    setOptionSchedule(value);
  }

  return (
    <>
      <div className="tabs-v3 cus">
        <Tabs activeKey={defaultKey} onChange={callback}>
          <TabPane tab="Upcoming" key="Upcoming">
            <div className="table-collapse-custom">
              <div className="w-100">
                <div className="devCusIdo">
                  <Flex alignItems="center">
                    <p className="title-1">NEXT PROJECTS</p>
                    <img style={{ paddingLeft: "8px" }} src="/images/imagesV3/IdoLoad.png" alt="..." />
                  </Flex>
                  <Flex justifyContent="space-between">
                    <p className="title-2">UPCOMING</p>
                    <Select className="devCus__select" onChange={handleChangeOptionSchedule} defaultValue="Calendar" style={{ width: 194 }}>
                      <Option value="Calendar">Calendar</Option>
                      <Option value="Table">Table</Option>
                    </Select>
                  </Flex>
                </div>
              </div>
              <Schedules activeTab={activeTab} idoListSchedule={idoListSchedule} optionSchedule={optionSchedule}/>
            </div>
          </TabPane>
          <TabPane tab="Active" key="Active">
            <div className="main-cnt-tabs">
              <div className="w-100">
                <div className="devCusIdo">
                  <Flex alignItems="center">
                    <p className="title-1">NEXT PROJECTS</p>
                    <img style={{ paddingLeft: "8px" }} src="/images/imagesV3/IdoLoad.png" alt="..." />
                  </Flex>
                  <Flex justifyContent="space-between">
                    <p className="title-2">ACTIVE</p>
                    <Select className="devCus__select" disabled defaultValue="CALENDER" style={{ width: 194 }}>
                      <Option value="Calendar">Calendar</Option>
                      <Option value="Table">Table</Option>
                    </Select>
                  </Flex>
                </div>
              </div>
              <TabsContentActive activeTab={activeTab} idoList={listIdo} status={STATUS.COMING} />
            </div>
          </TabPane>
          <TabPane tab="Ended" key="Ended">
            <div className="w-100">
              <div className="devCusIdo">
                <Flex alignItems="center">
                  <p className="title-1">NEXT PROJECTS</p>
                  <img style={{ paddingLeft: "8px" }} src="/images/imagesV3/IdoLoad.png" alt="..." />
                </Flex>
                <Flex justifyContent="space-between">
                  <p className="title-2">ENDED</p>
                  {/* <Select className="devCus__select" disabled defaultValue="CALENDER" style={{ width: 194 }}>
                    <Option value="Calendar">Calendar</Option>
                    <Option value="Table">Table</Option>
                  </Select> */}
                </Flex>
              </div>
            </div>
            <TabsContentEnd activeTab={activeTab} idoList={listIdo} listIdoEnd={listIdoEnd} status={STATUS.CLOSE} />
          </TabPane>
          <TabPane tab="Joined" key="Joined">
            <div className="devCusIdo">
              <Flex alignItems="center">
                <p className="title-1">NEXT PROJECTS</p>
                <img style={{ paddingLeft: "8px" }} src="/images/imagesV3/IdoLoad.png" alt="..." />
              </Flex>
              <Flex justifyContent="space-between">
                <p className="title-2">JOINED</p>
              </Flex>
            </div>
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
