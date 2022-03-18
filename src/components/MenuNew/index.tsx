import React, { useEffect, useState, useRef } from 'react'
import throttle from 'lodash/throttle'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import MenuNewMobile from './MenuNewMobile'
import UnlockButton from '../ConnectWalletButtonHeader'
import 'antd/dist/antd.css'
import './style.less'
import { ReactComponent as TradeIcon } from '../../images/img/trade.svg'
import { ReactComponent as TradeIcon1 } from '../../images/img/trade1.svg'
import { ReactComponent as CoinIcon } from '../../images/img/coin.svg'
import { ReactComponent as CoinIcon1 } from '../../images/img/coin1.svg'
import { ReactComponent as NftIcon } from '../../images/img/NFT.svg'
import { ReactComponent as NftIcon1 } from '../../images/img/NFT1.svg'
import { ReactComponent as GameIcon } from '../../images/img/Game.svg'
import { ReactComponent as GameIcon1 } from '../../images/img/Game1.svg'
import { ReactComponent as MetaverseIcon } from '../../images/img/metaverse.svg'
import { ReactComponent as IconMenu } from '../../images/img/Menu.svg'
import { ReactComponent as IconLFW } from '../../images/img/MenuLFW.svg'
import { useFetchWithCache } from "../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../utils/apis";
import { formatCurrency } from "../../utils";
import { ReactComponent as IconIdo } from '../../images/img/IDO.svg'


const MenuNew = () => {
  const [showMenu, setShowMenu] = useState(true)
  const refPrevOffset = useRef(window.pageYOffset)
  const { data } = useFetchWithCache(GET_PATHS.tokenInfo, () =>
    client.getTokenInfo()
  );
  const tokenInfo = data?.data;
  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  if (isMobile) {
    return <MenuNewMobile />
  }

  return (
    <FixedContainer showMenu={showMenu} height={80}>
      <header>
        <div className="main-header">
          <div className="header-left">
            <div className="main-logo">
              <Link to="/dashboard">
                <div className="d-flex align-items-center">
                  <IconMenu className="IconText" />
                  {/* <IconAtc className="Icon" /> */}
                  <IconLFW className="Icon" />
                </div>
              </Link>
            </div>
            <div className="main-menu">
              <ul className="list-menu">
                <li>
                  <div className="h__customLogoTrade">
                    <TradeIcon />
                    <TradeIcon1 />
                  </div>
                  Trade
                  <div className="submenu-nav">
                    <ul>
                      <Link to="/swap">
                        <li>Exchange </li>
                      </Link>

                      <Link to="/pool">
                        <li>Add liquidity</li>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="h__customLogoTrade">
                    <CoinIcon />
                    <CoinIcon1 />
                  </div>
                  Earns
                  <div className="submenu-nav">
                    <ul>
                      <Link to="/staking">
                        <li>Staking Pools</li>
                      </Link>
                      <Link to="/coming-soon">
                        <li>Farms</li>
                      </Link>
                      <Link to="/coming-soon">
                        <li>Launchpad Pools</li>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="h__customLogoTrade">
                    <NftIcon />
                    <NftIcon1 />
                  </div>
                  NFT
                  <div className="submenu-nav">
                    <ul>
                      <Link to="/NFTmarket">
                        <li>NFT Markets</li>
                      </Link>

                      <Link to="/collections">
                        <li>My Collections</li>
                      </Link>

                      <Link to="/stakeNFT">
                        <li>Stake NFT</li>
                      </Link>
                      <Link to="/mintNFT">
                        <li>Mint NFT</li>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="h__customLogoTrade">
                    <GameIcon />
                    <GameIcon1 />
                  </div>
                  GameFi
                  <div className="submenu-nav">
                    <ul>
                      <Link to="/coming-soon">
                        <li>Introduction</li>
                      </Link>

                      <Link to="/coming-soon">
                        <li>Mystery Box</li>
                      </Link>
                    </ul>
                  </div>
                </li>

                <Link to="/IDO">
                  <li>
                    <div className="h__customLogoTrade">
                      <IconIdo />
                      <IconIdo />
                    </div>
                    Launchpad
                  </li>
                </Link>

                <li>
                  <div className="h__customLogoTrade">
                    <MetaverseIcon />
                    <MetaverseIcon />
                  </div>
                  Metaverse
                  <div className="submenu-nav">
                    <ul>
                      <Link to="/Introduction">
                        <li>Introduction</li>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li>
                  About
                  <div className="submenu-nav">
                    <ul>
                      <a style={{color:'#b8bdb9'}} href="https://docsend.com/view/x8qrgrr8iq37aug9" rel="noreferrer" target="_blank">Pitch Deck</a>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-right">
            <div className="value-token">
              <img src="/images/logo-lfw.png" width={40} height={40} alt=""/> <span className="value-token">{formatCurrency(tokenInfo?.price ?? 0)}</span>
            </div>
            <div className="connect-wallet">
              <UnlockButton />
            </div>
          </div>
        </div>
      </header>
    </FixedContainer>
  )
}

const FixedContainer = styled.div<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
`
export default MenuNew
