import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ReactComponent as Icon1 } from '../../images/img/icon/daily.svg'
import { ReactComponent as Icon2 } from '../../images/img/icon/total.svg'
import { ReactComponent as Icon3 } from '../../images/img/icon/activeN.svg'
import { ReactComponent as Icon4 } from '../../images/img/icon/trade.svg'

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
                    <div className="title">Cross-platform protocol.</div>
                    <p className="desc">
                      We uses a cross-platform protocol. By using a variety of protocols and performing argument
                      validation and execution verification makes transactions cost-effective and fas
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
                    <div className="title">Exchange fees are always the lowest</div>
                    <p className="desc">
                      The basic problem in most defi transactions is the high fees Thats why we solve this problem by
                      building a stable yet decentralized ecosystem that provides solutions to reduce transaction fees
                      when trading or liquidating NFTs tokens.
                    </p>
                  </div>
                </div>
                <div className="colum">
                  <div className="box-img">
                    <span className="img-big">
                      <img src="/images/imagesDashboard/img-a1.png" alt="" className="animation-css" />
                    </span>
                    <span className="img-small animation-css-scale">
                      <img src="/images/imagesDashboard/small-img-row-1.png" alt="" />
                    </span>
                    <span className="img-small-1 animation-css-scale">
                      <img src="/images/imagesDashboard/small-img-row-1-1.png" alt="" />
                    </span>
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
                      We offer the most advanced risk control system on the market. 100% security of transaction and
                      customer information.
                    </p>
                  </div>
                </div>
                <div className="colum">
                  <div className="box-img">
                    <span className="img-big">
                      <img src="/images/imagesDashboard/img-a3N.png" alt="" className="animation-css" />
                    </span>
                    <span className="img-small animation-css-scale cus">
                      <img src="/images/imagesDashboard/small-img-row-1.png" alt="" />
                    </span>
                    <span className="img-small-1 animation-css-scale cus">
                      <img src="/images/imagesDashboard/small-img-row-1-1.png" alt="" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-benefit">
              <div className="columns">
                <div className="colum">
                  <div className="content-row">
                    <div className="title">Build a collection of characters and items for game developers</div>
                    <p className="desc">
                      We provide a space to create and develop NTFs for the development of game characters and items.
                      Here you can create content, images and build NTFs for the sale and exchange of creative ideas for
                      the purpose of designing and building game platforms.
                    </p>
                  </div>
                </div>
                <div className="colum">
                  <div className="box-img animation-css">
                    <img src="/images/imagesDashboard/img-row-4.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ádkjahskdjas  */}
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
  )
}
export default MainOurBenefit
