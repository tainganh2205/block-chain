

import React, { memo, useEffect, useState, useCallback } from "react";
import {  Progress } from "antd";
import Countdown from "react-countdown";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { isMobile } from "react-device-detect";
import { useWeb3React } from "@web3-react/core";
import Button, { PropsButtonBSC } from "components/Button";
import { useHookDetail } from "../Store-Detail";
import "./index.less";

import { checkIsClaimed, isRefundedRC, refund, totalClaimed, totalRefunded, totalDailyClaimed } from "./utils";
import { useIdoTokenClaimContract } from "hooks/useContract";

const YourInvestment = memo(({ props }: any) => {
  const [state, actions]: any = useHookDetail();
  const { account, chainId } = useWeb3React();
  const { objData, objClaim, objJoin, listAllocations, isHideRefundClaiming } = state;
  const [isRefundedFromSC, setRefundedFromSC] = useState(false);
  const [isClaimedFromSC, setIsClaimedFromSC] = useState(false);
  const [totalClaimToken, setTotalClaimToken] = useState(0);
  const [totalRefund, setTotalRefund] = useState(0);
  const [totalClaimDaily, setTotalClaimDaily] = useState(0);

  const [isLoading, setLoading] = useState(false);
  const contract_address = objData && objData.contractAddress ? objData.contractAddress : "";
  const idoTokenClaimContract = useIdoTokenClaimContract(contract_address, undefined);

  const daily_obj = listAllocations.find(x => x.claimRound === 100);
  const contract_daily = daily_obj !== undefined ? daily_obj.contractAddress : "";
  const idoTokenClaimDailyContract = useIdoTokenClaimContract(contract_daily, daily_obj);

  useEffect(() => {
    try {
      if (idoTokenClaimDailyContract !== null) {
        totalDailyClaimed(idoTokenClaimDailyContract, account).then((res) => {
          setTotalClaimDaily(res.tokensClaimed / 1e18);
        });
      }
    } catch (error) {
      // TODO
    }
  }, [account, idoTokenClaimDailyContract]);

  useEffect(() => {
    try {
      if (idoTokenClaimContract !== null) {
        isRefundedRC(idoTokenClaimContract, account).then((res) => {
          setRefundedFromSC(res);
        });
      }
    } catch (error) {
      setRefundedFromSC(false);
    }
  }, [account, idoTokenClaimContract]);

  useEffect(() => {
    try {
      if (idoTokenClaimContract !== null) {
        checkIsClaimed(idoTokenClaimContract, account).then((res) => {
          setIsClaimedFromSC(res);
        });
      }
    } catch (error) {
      setIsClaimedFromSC(false);
    }
  }, [account, idoTokenClaimContract]);

  useEffect(() => {
    try {
      if (idoTokenClaimContract !== null) {
        totalClaimed(idoTokenClaimContract, account).then((res) => {
          setTotalClaimToken(res / 1e18);
        });
      }
    } catch (error) {
      // setTotalClaimToken(0)
    }
  }, [account, idoTokenClaimContract]);

  useEffect(() => {
    try {
      if (idoTokenClaimContract !== null) {
        totalRefunded(idoTokenClaimContract, account).then((res) => {
          setTotalRefund(res / 1e18);
        });
      }
    } catch (error) {
      // setTotalClaimToken(0)
    }
  }, [account, idoTokenClaimContract]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    // Render a countdown
    if (days > 1) {
      return (
        <span>
          {days} days : {hours} h : {minutes} m : {seconds} s
        </span>
      );
    } else if (days === 1) {
      return (
        <span>
          {days} day : {hours} h : {minutes} m : {seconds} s
        </span>
      );
    } else {
      return (
        <span>
          {hours} h : {minutes} m : {seconds} s
        </span>
      );
    }
  };

  const getProgressTime = useCallback((startTime) => {
    if (!startTime) {
      return `TBA`;
    }
    const now = new Date();
    const utcDate = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      0
    );

    const startDate = new Date(startTime);
    const startTS = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes(),
      startDate.getSeconds(),
      0
    );
    let delta = Math.abs(startTS.valueOf() - utcDate.valueOf()) / 1000;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600);
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const seconds = Math.floor(delta % 60); // in theory the modulus is not required

    if (days >= 1) {
      return Date.now() + days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
    } else {
      return Date.now() + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
    }
  }, []);

  const _idoBlockchainRefund = async () => {
    try {
      setLoading(true);
      await refund(idoTokenClaimContract, objJoin.busd, listAllocations[0]);
      setTimeout(() => {
        setLoading(false);
      }, 10000);
      return true;
    } catch (error: any) {
      setLoading(false);
      if (error.data) {
        Store.addNotification({
          title: "Notify !",
          message: error.data.message,
          type: "warning",
          width: 300,
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true,
            click: true,
            touch: true
          }
        });
      }
      return false;
    }
  };

  const _handleClaimRefund = async () => {
    await _idoBlockchainRefund();
  };

  let _claimedTokens: any = totalClaimToken + totalClaimDaily;
  for (let i = 0; i < listAllocations.length; i++) {
    _claimedTokens += listAllocations[i].tokenClaim;
  }

  const claimedTokens = Number(_claimedTokens).toFixed(2);
  const isJoined = objJoin && objJoin.status === 2;
  const hasYourToken = isJoined || (objData && objData.isHot);
  const allowRefund = objClaim && objClaim.allowRefund && listAllocations.length > 0 && listAllocations[0].signBusd !== null;
  const buttonRefund = isRefundedFromSC ? "Refunded" : "Refund";
  const is_network_bep = objData && objData.network === "bep";
  const is_network_erc = objData && objData.network === "erc";
  const is_network_poly = objData && objData.network === "poly";
  const showButtonRefund = ((is_network_bep && chainId === 56) || (is_network_erc && chainId === 1) || (is_network_poly && chainId === 137))
    && (allowRefund || isRefundedFromSC);
  let tokenName = "BUSD";
  let className = "bsc-p-launchpad_detail-investment-top";
  if (is_network_erc) {
    tokenName = "USDT";
    className = "erc20-p-launchpad_detail-investment-top";
  } else if (is_network_poly) {
    tokenName = "USDC";
    className = "poly-p-launchpad_detail-investment-top";
  }

  const actions2: PropsButtonBSC[] = [
    {
      text: buttonRefund,
      ghost: isJoined && allowRefund,
      disabled: !allowRefund,
      click: () => {
        _handleClaimRefund();
      }
    }
  ];

  let isWhite = true;
  if (objData && objData.isAllocation && listAllocations.length === 0) {
    isWhite = false;
  }

  const percentClaimTemp = objJoin.totalToken > 0 ? (_claimedTokens / objJoin.totalToken) * 100 : 0;
  const percentClaim = Math.round(percentClaimTemp);

  return (
    <div className={`bsc-p-launchpad_detail-investment ${isMobile && "bsc-p-launchpad_detail-investment-mobile"}`}>
      {objData && !objData.isAllocation ? (
        <div className="bsc-p-launchpad_detail-investment-not-whitelisted">
          <Countdown date={getProgressTime(objData && objData.socical.startIDO)} renderer={renderer} />
        </div>
      ) : !isWhite ? (
        <div className="bsc-p-launchpad_detail-investment-not-whitelisted">
          <span>You&apos;re not whitelisted</span>
        </div>
      ) : (
        ""
      )}
      <div className={className}>
        <span>Your Investment</span>
      </div>
      <div className="bsc-p-launchpad_detail-investment-mid">
        {isRefundedFromSC ? (
          ""
        ) : (
          <div className="bsc-p-launchpad_detail-investment-mid-col">
            <span>Your Tokens</span>
            <span>{hasYourToken ? `${Number(objJoin.totalToken).toFixed(2)}` : "0"}</span>
          </div>
        )}
        <div className="bsc-p-launchpad_detail-investment-mid-col">
          <span>{isRefundedFromSC ? "Refunded" : "Token Claimed"}</span>
          <span>{isRefundedFromSC ? `${totalRefund} ${tokenName}` : `${claimedTokens}`}</span>
        </div>
        <div className="bsc-p-launchpad_detail-investment-mid-col">
          <span>Funds needed</span>
          <span>{`${Number(objJoin.busd).toFixed(6)} ${tokenName}`}</span>
        </div>
      </div>
      {isJoined && !isRefundedFromSC && objData && objData.status === 4 ? (
        <div className="claim-progress">
          <span className="claim-progress-text">Claimed Progress</span>
          <div className="claim-progress-content">
            <Progress className="test" strokeWidth={9} percent={percentClaim} size="small" status="active" />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="bsc-p-launchpad_detail-investment-bottom">
        {isHideRefundClaiming ? (
          ""
        ) : !isClaimedFromSC && !isRefundedFromSC && showButtonRefund ? (
          <div className="show">
            {actions2.map((btn) => (
              <Button {...btn} loading={isLoading} />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
});

export default YourInvestment;
