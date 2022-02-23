import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Tooltip } from 'antd';
import './style.css'
import bgFarm from '../../images/bg-ido.png'

const BoxFreeWithdraw = () => {
    return (
        <>
            <div className="box-free-return" style={{ backgroundImage: `url(${bgFarm})` }}>
                <p className="desc">
                    Free Return: <Tooltip placement="bottom" title="Make a swap on ArtInfinity and get up to 100% of fee return in ATF Token"><img src="/images/imagesSwap/info.png" alt="" style={{marginLeft:"5px" , marginRight:"5px"}} /></Tooltip> 0.000 ATF
                </p>
                <button type="button">
                    Withdraw
                </button>
            </div>
        </>
    )
}
export default BoxFreeWithdraw