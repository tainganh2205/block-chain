import React, { useCallback, useEffect, useMemo, useState } from 'react'

const ItemFarm = () => {
    return (
        <>
            <div className="farm-item launch">
                <div className="item-two-part d-flex">
                    <div className="box-logo">
                        <div className="launch-pool img-big">
                            <img src="/images/imagesDashboard/img-big-pool.png" alt="" />
                        </div>
                        <div className="launch-pool img-small">
                            <img src="/images/imagesDashboard/logo-small.png" alt="" />
                        </div>
                    </div>
                    <div className="box-token-farm">
                        Auto Compound <span>Stake BNB - Earn BNB</span>
                    </div>
                </div>
                <div className="item-two-part d-none-m">
                    <div className="text-top">
                        BNB Earned
                    </div>
                    <div className="text-bottom">
                        <span className="number">0.0</span>
                    </div>
                </div>
                <div className="item-two-part">
                    <div className="text-top">
                        APR
                    </div>
                    <div className="text-bottom">
                        <span className="number">195.58%</span> <img src="/images/imagesDashboard/cal.png" alt="" />
                    </div>
                </div>
                <div className="item-two-part d-none-m">
                    <div className="text-top">
                        Total Raise
                    </div>
                    <div className="text-bottom">
                        <span className="text-liqui">100,000 BNB</span>
                    </div>
                </div>
                <div className="item-two-part d-none-m">
                    <div className="text-top">
                        Rewards end in
                    </div>
                    <div className="text-bottom">
                        <span className="text-liqui color-main-text">100,000 Blocks</span>
                    </div>
                </div>
                <div className="item-two-part">
                    <button type="button" className="btn-main-wrap">Stake ATF</button>
                </div>
            </div>
        </>
    )
}
const MainLaunchPool = () => {
    return (
        <>
            <div className="main-launch-pool">
                <div className="all">
                    <div className="main-top-farm-box">
                        <div className="main-title-farm">
                            <div className="title-left">
                                <div className="icon">
                                    <img src="/images/imagesDashboard/ido.png" alt="" />
                                </div>
                                <p className="text">
                                    Launchpools
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
export default MainLaunchPool

