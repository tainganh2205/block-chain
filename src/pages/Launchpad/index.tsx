/* eslint-disable prefer-template */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import 'antd/dist/antd.css';

import IdoTop from "./IdoTop";
import IdoTabList from "./IdoTabList"
import IdoMiddle from "./IdoMiddle"
import './style.css';

import { useHookProjects } from './Store'

const LaunchPadV2 = () => {
    const [state, actions]: any = useHookProjects()
    const { account } = useWeb3React();


    const loadDataOnConnectWallet = useCallback(() => {
        if (account) {
            actions.getOwner({ account })
            actions.getBalanceByWallet(account)
        }
    }, [account, actions])

    const initData = useCallback(() => {
        actions.getProject()
    }, [actions.getProject])

    useEffect(() => {
        initData()
    }, [initData])

    useEffect(() => {
        loadDataOnConnectWallet()
    }, [loadDataOnConnectWallet])
    
    return (
        <>
             <div className="full-width">
                <div className="content-wrapper">
                    <div className="container-fl">
                        <IdoTop />
                        <IdoTabList />
                        <IdoMiddle />
                    </div>
                </div>
             </div>
        </>
    )
}
export default LaunchPadV2;