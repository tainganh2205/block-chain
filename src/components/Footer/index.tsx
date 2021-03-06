import React from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import "./style.less";

import { useFetchWithCache } from "hooks/useFetchWithCache";
import { client, GET_PATHS } from "utils/apis";
import { formatCurrency, formatNumber } from "utils";
import { UpDownChange } from "components/UpDownChange";
import FooterMb from "./FooterMobile";

const Footer = () => {
  const { data } = useFetchWithCache(GET_PATHS.tokenInfo, () =>
    client.getTokenInfo()
  );
  const tokenInfo = data?.data;
  return (
    <>
      <div className="footer">
        <div className="all">
          <div className="footer-wrap">
            <div className="footer-left">
              <div className="content-footer-left">
                <div className="col-50">
                  <div className="item-token">
                    <div className="icon">
                      <img src="/images/logo-lfw.png" height="50" width="50" alt="" />
                    </div>
                    <div className="text">
                      LFW <span className="value-token">{formatCurrency(tokenInfo?.price ?? 0)}</span>
                    </div>
                  </div>
                  <div className="item-token">
                    <div className="icon">
                      <img src="/images/imagesDashboard/icon-meta.png" alt="" />
                    </div>
                    <div className="text">
                      <button type="button" className="btn-bought">
                        <a href="https://pancakeswap.finance/swap?outputCurrency=0xd71239a33c8542bd42130c1b4aca0673b4e4f48b" target="_blank" rel="noreferrer">
                          Buy LFW
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-50">
                  <ul className="list-supply">
                    <li>
                      <div className="text-sp-l">Max supply:</div>
                      <div className="text-left">
                        <div className="text-sp-r">200,000,000</div>
                      </div>
                    </li>
                    <li>
                      <div className="text-sp-l ">Total supply:</div>

                      <div className="text-left h__custom">
                        <div className="text-sp-r">{formatNumber(tokenInfo?.totalSupply || 0)}</div>
                      </div>
                    </li>
                    <li>
                      <div className="text-sp-l ">Circulating supply:</div>

                      <div className="text-left h__custom">
                        <div className="text-sp-r">{formatNumber(tokenInfo?.circulatingSupply || 0)}</div>
                      </div>
                    </li>
                    <li>
                      <div className="text-sp-l ">Total Volume (24h):</div>

                      <div className="text-left h__custom">
                        <div className="text-sp-r">
                          {formatCurrency(tokenInfo?.totalVolume || 0)}
                        </div>
                      </div>

                    </li>
                    <li>
                      <div className="text-sp-l " />

                      <div className="text-left h__custom">
                        <div className="text-sp-r">
                          <UpDownChange className="ftext-sp-r">
                            {tokenInfo?.totalVolumeChange || 0}
                          </UpDownChange>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {isMobile ? (
              <FooterMb />
            ) : (
              <div className="footer-right">
                <div className="content-footer-right">
                  <div className="columns h__Columns">
                    <div className="colum">
                      <div className="content-guide">
                        <h3 className="title">About</h3>
                        <ul className="list-menu-ft">
                          <a
                            href="#!"
                          >
                            <li>Docs</li>
                          </a>
                          <a
                            href="#!"
                          >
                            <li>Team</li>
                          </a>
                          <a
                            href="#!"
                          >
                            <li>Roadmap</li>
                          </a>
                          <a href="#!">
                            <li>Github</li>
                          </a>
                        </ul>
                      </div>
                    </div>
                    <div className="colum">
                      <div className="content-guide">
                        <h3 className="title">Products</h3>
                        <ul className="list-menu-ft">
                          <Link to="/swap">
                            <li>Exchange</li>
                          </Link>
                          <Link to="/pool">
                            <li>Add liquidity</li>
                          </Link>
                          <a href="#!">
                            <li>Start Pools</li>
                          </a>
                          <a href="#!">
                            <li>Farms</li>
                          </a>
                          <Link to="/coming-soon">
                            <li>NFT Market</li>
                          </Link>
                        </ul>
                      </div>
                    </div>
                    <div className="colum">
                      <div className="content-guide">
                        <h3 className="title">Developer</h3>
                        <ul className="list-menu-ft">
                          <a
                            href="#!"
                          >
                            <li>GameFi</li>
                          </a>

                          <a
                            href="#!"
                          >
                            <li>Metaverse</li>
                          </a>
                        </ul>
                      </div>
                    </div>
                    <div className="colum">
                      <div className="content-guide">
                        <h3 className="title mar-b-15">Community</h3>
                        <ul className="list-menu-ft">
                          <li>
                            <div className="box-img">
                              <a
                                href="https://t.me/LFWofficial"
                                className="h__boxIcon"
                                target="_blank" aria-hidden="true"
                              >
                                <i className="fa fa-paper-plane h__customIcon" aria-hidden="true" />
                              </a>

                              <a
                                href="https://twitter.com/Legend_LFW"
                                target="_blank" aria-hidden="true"
                                className="h__boxIcon"
                              >
                                <i className="fab fa-twitter h__customIcon" aria-hidden="true" />
                              </a>

                              <a className="h__boxIcon" target="_blank" aria-hidden="true" href="https://www.youtube.com/channel/UCV5ULujFsmj7-aWih6ftQoQ">
                                <i className="fab fa-youtube h__customIcon" aria-hidden="true" />
                              </a>

                              <a
                                href="https://medium.com/legend-of-fantasy-war"
                                target="_blank" aria-hidden="true"
                                className="h__boxIcon"
                              >
                                <i className="fab fa-medium-m h__customIcon" aria-hidden="true" />
                              </a>
                            </div>
                          </li>
                          <li>
                            <h3 className="title mar-b-15">Support 24/7</h3>
                          </li>
                          <li>
                            <button type="button" className="btn-contact h__btnContact">
                              <a href="#!">
                                <i className="fa fa-paper-plane h__customIcon2" aria-hidden="true" />
                                Contact us
                              </a>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="copy-right">Copyright ?? 2022 Linked Finance World. All Rights Reserved.</div>
        </div>
      </div>
    </>
  );
};
export default Footer;
