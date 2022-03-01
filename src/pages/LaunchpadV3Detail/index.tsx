/* eslint-disable prefer-template */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect , memo } from "react";
import { useWeb3React } from "@web3-react/core";
import { useHookProjects } from './Store'
import './style.less'

const LaunchPadV3Detail = memo((props) => {
    const [state, actions]: any = useHookProjects()
    const { account } = useWeb3React();

    const {
        match: { params },
    }: any = props
    const idoId = params && params.id

    const loadDataOnConnectWallet = useCallback(() => {
        if (account) {
            actions.getOwner({ account })
            actions.getBalanceByWallet(account)
        }
    }, [account, actions])

    const initData = useCallback(() => {
        actions.getProjectNew()
    }, [actions.getProject])

    useEffect(() => {
        initData()
    }, [initData])

    useEffect(() => {
        return () => {
          actions.resetListAllocations()
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [idoId]);

    useEffect(() => {
        loadDataOnConnectWallet()
    }, [loadDataOnConnectWallet])

    return (
        <></>
    )
})
export default LaunchPadV3Detail;