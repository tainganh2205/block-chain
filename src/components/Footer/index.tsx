import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import './style.less'
import { ReactComponent as MenuIcon } from '../../images/img/iconMenu.svg'
import FooterMb from './FooterMobile'

const Footer = () => {
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
                      <MenuIcon />
                    </div>
                    <div className="text">
                      ATF <span className="value-token">$0</span>
                    </div>
                  </div>
                  <div className="item-token">
                    <div className="icon">
                      <img src="/images/imagesDashboard/icon-meta.png" alt="" />
                    </div>
                    <div className="text">
                      <button type="button" className="btn-bought">
                        <a href="https://artinfinity.app/#/swap" target="_blank" rel="noreferrer">
                          Buy ATF
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
                        <div className="text-sp-r">1 000 000 000</div>
                      </div>
                    </li>
                    <li>
                      <div className="text-sp-l ">Total supply:</div>

                      <div className="text-left h__custom">
                        <div className="text-sp-r">0</div>
                      </div>
                    </li>
                    <li>
                      <div className="text-sp-l ">Circulating supply:</div>

                      <div className="text-left h__custom">
                        <div className="text-sp-r">0</div>
                      </div>
                    </li>
                    <li>
                      <div className="text-sp-l ">Total Burned:</div>

                      <div className="text-left h__custom">
                        <div className="text-sp-r">0</div>
                      </div>
                    </li>
                    <li>
                      <div className="text-sp-l ">Market Cap:</div>

                      <div className="text-left h__custom">
                        <div className="text-sp-r">0%</div>
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
                            href="https://docs.artinfinity.app/welcome-to-artinfinity/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <li>Docs</li>
                          </a>
                          <a
                            href="https://docs.artinfinity.app/welcome-to-artinfinity/team/our-team"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <li>Team</li>
                          </a>
                          <a
                            href="https://docs.artinfinity.app/welcome-to-artinfinity/roadmap"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <li>Roadmap</li>
                          </a>
                          <a href="https://github.com/artinfinityofficial" target="_blank" rel="noreferrer">
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
                          <a href="https://stake.artinfinity.app/#/">
                            <li>Start Pools </li>
                          </a>
                          <a href="https://stake.artinfinity.app/#/Farms">
                            <li>Farms</li>
                          </a>
                          <Link to="/NFTmarket">
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
                            href="https://docs.artinfinity.app/welcome-to-artinfinity/core-products/gamefi"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <li>GameFi</li>
                          </a>

                          <a
                            href="https://docs.artinfinity.app/welcome-to-artinfinity/core-products/gamefi/phase-3-metaverse"
                            target="_blank"
                            rel="noreferrer"
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
                                className="h__boxIcon"
                                href="https://t.me/artinfinityofficial"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fa fa-paper-plane h__customIcon" aria-hidden="true" />
                              </a>

                              <a
                                className="h__boxIcon"
                                href="https://twitter.com/artinfinitynft"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fab fa-twitter h__customIcon" aria-hidden="true" />
                              </a>

                              <a className="h__boxIcon" href="#!">
                                <i className="fab fa-youtube h__customIcon" aria-hidden="true" />
                              </a>

                              <a
                                className="h__boxIcon"
                                href="https://medium.com/@ARTINFINITY"
                                target="_blank"
                                rel="noreferrer"
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
                              <a href="https://t.me/artinfinityofficial" target="_blank" rel="noreferrer">
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
          <div className="copy-right">Copyright © 2021 artinfinity.app All Rights Reserved</div>
        </div>
      </div>
    </>
  )
}
export default Footer
