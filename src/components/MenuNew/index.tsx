import React, { useEffect, useState, useRef } from "react";
import throttle from "lodash/throttle";
import classNames from "classnames";
import styled from "styled-components";
import { Button, Drawer } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import UnlockButton from "../ConnectWalletButtonHeader";
import { useAuthContext } from "../../context/authNew";
import { abbreviateNumber } from "../../utils/number";
import { ReactComponent as GunIcon } from "../../images/img/menu/gun.svg";
import { ReactComponent as GunIcon1 } from "../../images/img/menu/gun1.svg";
import { ReactComponent as GemIcon } from "../../images/img/menu/gem.svg";
import { ReactComponent as GemIcon1 } from "../../images/img/menu/gem1.svg";
import { ReactComponent as AssetIcon } from "../../images/img/menu/asset.svg";
import { ReactComponent as AssetIcon1 } from "../../images/img/menu/asset1.svg";
import { ReactComponent as RewardIcon } from "../../images/img/menu/reward.svg";
import { ReactComponent as RewardIcon1 } from "../../images/img/menu/reward1.svg";

import { ReactComponent as IconLFW } from "../../images/img/HuntingFishLogo.svg";

import "./style.less";

interface Menu {
  label: string,
  icon: React.ReactElement,
  icon1: React.ReactElement,
  path: string
}

const menus: Array<Menu> = [
  { label: "Gun NFT", icon: <GunIcon />, icon1: <GunIcon1 />, path: "/gun-nft" },
  { label: "Gem Center", icon: <GemIcon />, icon1: <GemIcon1 />, path: "/gem-center" },
  { label: "Reward", icon: <RewardIcon />, icon1: <RewardIcon1 />, path: "/reward" },
  { label: "Profile", icon: <AssetIcon />, icon1: <AssetIcon1 />, path: "/my-asset" },
];

const MenuNew = () => {
  const history = useHistory();
  const location = useLocation();
  const refPrevOffset = useRef(window.pageYOffset);

  const [showDrawer, setShowDrawer] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  return (
    <FixedContainer showMenu={showMenu} height={100}>
      <header>
        <div className="flex main-header-new">
          <div className="header-left">
            <div className="drawer-menu-div block xl:hidden">
              <Button className="btn-show-menu" type="primary" onClick={() => setShowDrawer(true)}>
                <img src="/images/icon-menu-m.png" alt="" />
              </Button>
              <Drawer placement="left" visible={showDrawer} className={"drawer-menu"} onClose={() => setShowDrawer(false)}>
                <ul className="list-menu">
                  {menus.map((menu) => <li key={menu.label} onClick={() => history.push(menu.path)} className={classNames({ isActive: location.pathname.startsWith(menu.path) })}>
                    <div className="h__customLogoTrade">
                      {menu.icon}{menu.icon1}
                    </div>
                    {menu.label}
                  </li>)}
                </ul>
              </Drawer>
            </div>
            <div className="main-logo">
              <Link to="/dashboard">
                <div className="d-flex align-items-center">
                  <IconLFW className="IconText" />
                </div>
              </Link>
            </div>
            <div className="main-menu xl:block hidden">
              <ul className="list-menu">
                {menus.map((menu) => <li key={menu.label} onClick={() => history.push(menu.path)} className={classNames({ isActive: location.pathname.startsWith(menu.path) })}>
                  <div className="h__customLogoTrade">
                    {menu.icon}{menu.icon1}
                  </div>
                  {menu.label}
                </li>)}
              </ul>
            </div>
          </div>
          <div className="header-right">
            <button className="btn-play-game">
              Play Game
            </button>
            <div className="connect-wallet">
              <UnlockButton />
            </div>
          </div>
        </div>
      </header>
    </FixedContainer>
  );
};

const FixedContainer = styled.div<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
`;

export default MenuNew;
