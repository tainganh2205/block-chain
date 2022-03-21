import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Button, Collapse } from "antd";
import "antd/dist/antd.css";
import UnlockButton from "../ConnectWalletButton";

import { ReactComponent as IconIdo } from "../../images/img/IDO.svg";

function MenuNewMobile() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const { Panel } = Collapse;

  function callback(key) {
    console.log(key);
  }

  const trade = (
    <>
      <div className="header-collapse">
        <img src="/images/trade.png" alt="" /> <span>Trade</span>
      </div>
    </>
  );
  const home = (
    <>
      <Link to="/Dashboard">
        <div className="header-collapse">
          <img src="/images/icon-home.png" className="css-icon-home" alt="" /> <span className="text-home">Home</span>
        </div>
      </Link>
    </>
  );
  const earns = (
    <>
      <div className="header-collapse">
        <img src="/images/coin.png" alt="" /> <span>Earns</span>
      </div>
    </>
  );
  const nft = (
    <>
      <div className="header-collapse">
        <img src="/images/shop.png" alt="" /> <span>NFT</span>
      </div>
    </>
  );
  const about = (
    <>
      <div className="header-collapse">
        <span className="text-home">About</span>
      </div>
    </>
  );
  const game = (
    <>
      <div className="header-collapse">
        <img src="/images/iconGame1N.png" alt="" /> <span>GameHub</span>
      </div>
    </>
  );

  const ido = (
    <>
      <>
        <Link to="/coming-soon">
          <div className="header-collapse">
            <IconIdo className="css-icon-home" /> <span className="text-home">Launchpad</span>
          </div>
        </Link>
      </>
    </>
  );

  const menuTrade = (
    <>
      <ul>
        <Link to="/swap">
          <li>Exchange</li>
        </Link>
        <Link to="/pool">
          <li>Add liquidity</li>
        </Link>
      </ul>
    </>
  );

  const menuAbout = (
    <>
      <ul>
        <a href="https://docsend.com/view/x8qrgrr8iq37aug9" rel="noreferrer" target="_blank">
          <li>Pitch Deck</li>
        </a>
      </ul>
    </>
  );

  const menuEarn = (
    <>
      <ul>
        <li>
          <Link to="/staking">Staking Pools</Link>
        </li>
        <li>
          <Link to="/coming-soon">Farms</Link>
        </li>
        <li>
          <Link to="/coming-soon">Launchpad Pools</Link>
        </li>
      </ul>
    </>
  );
  const menuNFT = (
    <>
      <ul>
        <Link to="/coming-soon">
          <li>NFT Markets</li>
        </Link>
        <Link to="/coming-soon">
          <li>My Collections</li>
        </Link>
        <Link to="/coming-soon">
          <li>Stake NFT</li>
        </Link>
        <Link to="/coming-soon">
          <li>Mint NFT</li>
        </Link>
      </ul>
    </>
  );
  const menuGame = (
    <>
      <ul>
        <Link to="/legend-of-galaxy">
          <li>Legend of Galaxy</li>
        </Link>
        <Link to="/coming-soon">
          <li>Mystery Box</li>
        </Link>
      </ul>
    </>
  );
  const menuDocs = (
    <>
      <ul>
        <a href="https://docs.artinfinity.app/welcome-to-artinfinity/">
          <li>Docs</li>
        </a>
        <Link to="/">
          <li>Blogs</li>
        </Link>
        <a href="https://github.com/legendfantasywar" target="_blank" rel="noreferrer">
          <li>Github</li>
        </a>
        <Link to="/">
          <li>Certik Audit</li>
        </Link>
      </ul>
    </>
  );
  const contentMenuMoblie = (
    <>
      <Collapse defaultActiveKey={["0"]} onChange={callback}>
        {home}
        <Panel header={trade} key="1">
          <p>{menuTrade}</p>
        </Panel>
        <Panel header={earns} key="2">
          <p>{menuEarn}</p>
        </Panel>
        <Panel header={game} key="4">
          <p>{menuGame}</p>
        </Panel>
        {ido}
        <Panel header={nft} key="3">
          <p>{menuNFT}</p>
        </Panel>
        <Panel header={about} key="5">
          <p>{menuAbout}</p>
        </Panel>
      </Collapse>
      <div className="footer-menu">
        <div className="box-footer-menu">
          <div className="value-token">
            <img src="/images/logo-lfw.png" alt="" /> <span>$0</span>
          </div>
          <div className="socail-footer">
            <a className="h__boxIcon" href="https://t.me/artinfinityofficial" target="_blank" rel="noreferrer">
              <img src="/images/imagesDashboard/tele.png" alt="" />
            </a>

            <a className="h__boxIcon" href="https://twitter.com/artinfinitynft" target="_blank" rel="noreferrer">
              <img src="/images/imagesDashboard/twi.png" alt="" />
            </a>

            <a className="h__boxIcon" href="#!">
              <img src="/images/imagesDashboard/you.png" alt="" />
            </a>

            <a className="h__boxIcon" href="https://medium.com/@ARTINFINITY" target="_blank" rel="noreferrer">
              <img src="/images/imagesDashboard/medi.png" alt="" />
            </a>
          </div>
          <div className="copy-right-ft">Copyright © 2021 artinfinity.app All Rights Reserved</div>
        </div>
      </div>
    </>
  );
  return (
    <>
      <div className="main-header-mobile">
        <div className="header-l-mobile">
          <div className="main-menu">
            <Button className="btn-show-menu" type="primary" onClick={showDrawer}>
              <img src="/images/icon-menu-m.png" alt="" />
            </Button>
            <Drawer title="Basic Drawer" className="drawer-menu" placement="left" onClose={onClose} visible={visible}>
              {contentMenuMoblie}
            </Drawer>
          </div>
          <Link to="/Dashboard">
            <div className="main-logo">
              <img src="/images/logo-m.png" width="50" height="50" alt="" />
            </div>
          </Link>
        </div>
        <div className="header-r-mobile">
          <div className="button-connect-mobile">
            <UnlockButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuNewMobile;
