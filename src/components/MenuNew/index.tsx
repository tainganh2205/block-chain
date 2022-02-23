import React, { useEffect, useState, useRef } from 'react'
import throttle from 'lodash/throttle'
import styled from 'styled-components'
import { Menu } from 'antd'
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
import { ReactComponent as DotIcon } from '../../images/img/IconDot.svg'
import { ReactComponent as MenuIcon } from '../../images/img/iconMenu.svg'
import { ReactComponent as IconMenu } from '../../images/img/Menu.svg'
import { ReactComponent as IconAtc } from '../../images/img/AtcIcon.svg'

const MenuNew = () => {
  const [showMenu, setShowMenu] = useState(true)
  const refPrevOffset = useRef(window.pageYOffset)

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
  const { SubMenu } = Menu
  const [current, setCurrent] = useState('trade')
  const handleClick = (e) => {
    console.log('click ', e)
  }
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
                  <IconAtc className="Icon" />
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
                      <a href="https://stake.artinfinity.app/#/">
                        <li>Start Pools </li>
                      </a>

                      <a href="https://stake.artinfinity.app/#/Farms">
                        <li>Farms</li>
                      </a>
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
                      <Link to="/Introduction">
                        <li>Introduction</li>
                      </Link>

                      <Link to="#!">
                        <li>Mystery Box</li>
                      </Link>

                      <a
                        href="https://docs.artinfinity.app/atf/core-products/gamefi/phase-1-play-to-earn-on-the-web"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <li>Play&Earn</li>
                      </a>

                      <a
                        href="https://docs.artinfinity.app/atf/core-products/gamefi/phase-3-metaverse"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <li>Metaverse</li>
                      </a>
                    </ul>
                  </div>
                </li>
                <li>
                  <DotIcon />
                  <div className="submenu-nav">
                    <ul>
                      <a href="https://docs.artinfinity.app/welcome-to-artinfinity/" target="_blank" rel="noreferrer">
                        <li>Docs</li>
                      </a>
                      <Link to="/">
                        <li>Blogs</li>
                      </Link>
                      <a href="https://github.com/artinfinityofficial" target="_blank" rel="noreferrer">
                        <li>Github</li>
                      </a>
                      <Link to="/">
                        <li>Certik Audit</li>
                      </Link>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-right">
            <div className="value-token">
              <MenuIcon /> <span>$0</span>
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
