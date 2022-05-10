import React, { useEffect, useState, useRef } from "react";
import throttle from "lodash/throttle";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MenuNewMobile from "./MenuNewMobile";
import UnlockButton from "../ConnectWalletButtonHeader";
import "antd/dist/antd.css";
import "./style.less";
import { ReactComponent as VectorIcon } from "../../images/img/Vector.svg";
import { ReactComponent as CoinIcon } from "../../images/img/coin.svg";
import { ReactComponent as CoinIcon1 } from "../../images/img/coin1.svg";
import { ReactComponent as GameIcon } from "../../images/img/Game.svg";
import { ReactComponent as GameIcon1 } from "../../images/img/Game1.svg";
import { ReactComponent as IconMenu } from "../../images/img/Menu.svg";
import { ReactComponent as IconLFW } from "../../images/img/HuntingFishLogo.svg";


const MenuNew = () => {
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

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
    <FixedContainer showMenu={showMenu} height={80}>
      <header>
        <MenuNewMobile />
        <div className="xl:flex main-header hidden">
          <div className="header-left">
            <div className="main-logo">
              <Link to="/dashboard">
                <div className="d-flex align-items-center">
                  <IconLFW className="IconText" />
                  {/* <IconAtc className="Icon" /> */}
                  <IconLFW className="Icon" />
                </div>
              </Link>
            </div>
            <div className="main-menu">
              <ul className="list-menu">
                <li>
                  <div className="h__customLogoTrade">
                    <VectorIcon />
                  </div>
                  Gun NFT
                </li>
                <li>
                  <div className="h__customLogoTrade">
                    <CoinIcon />
                    <CoinIcon1 />
                  </div>
                  Gem Center
                </li>
                <li>
                  <div className="h__customLogoTrade">
                    <GameIcon />
                    <GameIcon1 />
                  </div>
                  <Link to="/my-asset">
                    My Asset
                  </Link>
                </li>
                <li>
                  <div className="h__customLogoTrade">
                    <GameIcon />
                    <GameIcon1 />
                  </div>
                  <Link to="/referral">
                    Referral
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-right">
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
