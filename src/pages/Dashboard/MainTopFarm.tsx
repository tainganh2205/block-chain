import React, { useCallback, useEffect, useMemo, useState } from 'react'

const ItemFarm = () => {
    return (
        <>
            <div className="farm-item">
                <div className="item-two-part d-flex">
                    <div className="box-logo">
                        <div className="img-big">
                            <img src="/images/imagesDashboard/logo-big.png" alt="" />
                        </div>
                        <div className="img-small">
                            <img src="/images/imagesDashboard/logo-small.png" alt="" />
                        </div>
                    </div>
                    <div className="box-token-farm">
                        USDT-BSW
                    </div>
                </div>
                <div className="item-two-part">
                    <div className="text-top">
                        APY
                    </div>
                    <div className="text-bottom">
                        <span className="number">395.58%</span> <img src="/images/imagesDashboard/icon-info.png" alt="" />
                    </div>
                </div>
                <div className="item-two-part d-none-m">
                    <div className="text-top">
                        APR
                    </div>
                    <div className="text-bottom">
                        <span className="number">195.58%</span> <img src="/images/imagesDashboard/cal.png" alt="" />
                    </div>
                </div>
                <div className="item-two-part d-none-m">
                    <div className="text-top">
                        Liquidity
                    </div>
                    <div className="text-bottom">
                        <span className="text-liqui">$6 632 268</span> <img src="/images/imagesDashboard/icon-info.png" alt="" />
                    </div>
                </div>
                <div className="item-two-part d-none-m">
                    <div className="text-top">
                        Earned
                    </div>
                    <div className="text-bottom">
                        <span className="text-liqui">0.0</span> <img src="/images/imagesDashboard/icon-info.png" alt="" />
                    </div>
                </div>
                <div className="item-two-part">
                    <button type="button" className="btn-main-wrap">Start Farm</button>
                </div>
            </div>
        </>
    )
}
const MainTopFarm = () => {
    return (
        <>
            <div className="main-farm">
                <div className="all">
                    <div className="main-top-farm-box">
                        <div className="main-title-farm">
                            <div className="title-left">
                                <div className="icon">
                                    <img src="/images/imagesDashboard/tractor.png" alt="" />
                                </div>
                                <p className="text">
                                    Top Farms
                                </p>
                            </div>
                            <div className="title-right">
                                <div className="icon">
                                    <img src="/images/imagesDashboard/arrow-right.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="farm-content">
                            <div className="farm-guide">
                                <ItemFarm />
                                <ItemFarm />
                                <ItemFarm />
                                <ItemFarm />
                                <ItemFarm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MainTopFarm

