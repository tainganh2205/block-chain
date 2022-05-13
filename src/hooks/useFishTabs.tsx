import React, { useMemo, useState } from "react";
import classnames from "classnames";
import styled from "styled-components";

interface TabDefine {
  key: string;
  label: string;
}

export function useFishTabs(tabs: Array<TabDefine>): { currentTab: string, tabsDom: React.ReactElement } {
  const [currentTab, setCurrentTab] = useState(tabs[0].key);
  const tabsDom = useMemo(() => {
    return <FishTabs className="FishTabs flex gap-5 mb-2">
      {tabs.map(btn => <button
        key={btn.key} onClick={() => setCurrentTab(btn.key)}
        className={classnames("btn-tab", btn.key, { "opacity-50": currentTab !== btn.key })}>
        <img src="/images/fish/btn-tab-reward.png" alt="" />
        <span className="btn-tab-text">
                {btn.label}
            </span>
      </button>)}
    </FishTabs>;
  }, [currentTab, tabs]);

  return { currentTab, tabsDom };
}

const FishTabs = styled.div`
  .btn-tab {
    position: relative;
    cursor: pointer;
    padding: 10px 30px;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
      top: 0;
      left: 0;
      object-fit: fill;
    }

    .btn-tab-text {
      position: relative;
      z-index: 1;
      font-weight: 700;
      font-size: 18px;
      line-height: 32px;
      color: #FFFFFF;
    }
  }
`;