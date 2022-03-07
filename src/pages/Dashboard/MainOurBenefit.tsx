import React from "react";
import { ReactComponent as Icon1 } from "../../images/img/icon/daily.svg";
import { ReactComponent as Icon2 } from "../../images/img/icon/total.svg";
import { ReactComponent as Icon3 } from "../../images/img/icon/activeN.svg";
import { ReactComponent as Icon4 } from "../../images/img/icon/trade.svg";

const MainOurBenefit = () => {
  return (
    <>
      <div className="main-our-benefit">
        <div className="all">
          <div className="main-title-benefit">Our Benefits</div>
          <div className="benefit-top">
            <div className="table-benefit">
              <div className="columns">
                <div className="colum">
                  <div className="content-row">
                    <div className="title">Universal Smart Bridge.</div>
                    <p className="desc">
                      Linked Finance World provides a universal smart bridge that utilizes cross-chain technology to provide interoperable blockchain infrastructure for enabling abundant liquidity of
                      both tokens and NFTs to support scalable multi-chain games and metaverse.
                    </p>
                  </div>
                </div>
                <div className="colum">
                  <div className="box-img animation-css">
                    <img src="/images/imagesDashboard/img-row-1.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="table-benefit">
              <div className="columns">
                <div className="colum">
                  <div className="content-row">
                    <div className="title">DeFi and Blockchain infrastructure for Gaming and Metaverse</div>
                    <p className="desc">
                      Linked Finance World ecosystem includes Blockchain game infrastructure, DeFi infrastructure for gaming as well as metaverse applications. The technology is provided to game
                      publishers around the world through Application Programming Interface (API).
                    </p>
                  </div>
                </div>
                <div className="colum">
                  <div className="box-img">
                    <span className="img-big">
                      <img src="/images/benefits-left.png" alt="" className="animation-css" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-benefit">
              <div className="columns">
                <div className="colum">
                  <div className="content-row">
                    <div className="title">Attractive launchpad for IDO and INO</div>
                    <p className="desc">
                      LFW token holders are able to join a series of IDO and INO on our launchpad and receive remarkable airdrops including tokens and NFTs from our partners, and share profits from
                      transaction fees of trading activities.
                    </p>
                  </div>
                </div>
                <div className="colum">
                  <div className="box-img">
                    <span className="img-big">
                      <img src="/images/benefits-right.png" alt="" className="animation-css" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-benefit">
              <div className="columns">
                <div className="colum">
                  <div className="content-row">
                    <div className="title">Exchange fees are always the lowest</div>
                    <p className="desc">
                      The basic problem in most DeFi transactions is the high fees.
                      That&apos;s why we solve this problem by building a stable yet decentralized ecosystem that provides solutions to reduce transaction fees when trading or liquidating NFTs tokens.
                    </p>
                  </div>
                </div>
                <div className="colum">
                  <div className="box-img animation-css">
                    <img src="/images/benefits-left1.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="table-benefit">
              <div className="columns">
                <div className="colum">
                  <div className="content-row">
                    <div className="title">Secure and Safe</div>
                    <p className="desc">
                      We offer the most advanced risk control system on the market. 100% security of transaction and customer information.
                    </p>
                  </div>
                </div>
                <div className="colum">
                  <div className="box-img">
                    <span className="img-big">
                      <img src="/images/benefits-right2.png" alt="" className="animation-css" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="benefit-bottom">
            <ul className="list-total-market">
              <li>
                <div className="content-market">
                  <div className="icon">
                    <Icon1 />
                  </div>
                  <div className="text-market">Daily Volume</div>
                  <div className="number-market">$0</div>
                </div>
              </li>
              <li>
                <div className="content-market">
                  <div className="icon">
                    <Icon2 />
                  </div>
                  <div className="text-market">Total Volume</div>
                  <div className="number-market">$0</div>
                </div>
              </li>
              <li>
                <div className="content-market">
                  <div className="icon">
                    <Icon3 />
                  </div>
                  <div className="text-market">Active users</div>
                  <div className="number-market">0</div>
                </div>
              </li>
              <li>
                <div className="content-market">
                  <div className="icon">
                    <Icon4 />
                  </div>
                  <div className="text-market">Trade Fee Saved</div>
                  <div className="number-market">$0</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainOurBenefit;
