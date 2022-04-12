import React, { useEffect, useMemo, useRef } from "react";
import cx from "classnames";
import { BigNumber, constants } from "ethers";

import { Card } from "components/Card1";
import { Text } from "components/Text";
import { Button } from "components/Button1";
import { BaseButton } from "components/ButtonBase";
import ROIModal from "components/pages/gemcenter/ROIModal";
import { IconCalculator } from "components/icons/components/IconCalculator";
import { IconViewTransaction } from "components/icons/components/IconViewTransaction";

import { useDisclosure } from "@dwarvesf/react-hooks";
import { noop } from "@dwarvesf/react-utils";
import { useWeb3React } from "@web3-react/core";
import Countdown from "react-countdown";
import { addTokenToWallet, TokenProps } from "utils/token";
import { formatBigNumber } from "utils/formatBalance";
import { getScanLink } from "utils/connector";
import { HandlerStakingInfo, UtilROIResults } from "types/schema";
import { PoolStatus } from "types/common";
import { ReactComponent as IconMetaMask } from "./svg/metamask.svg";
import { WithdrawAllButton } from "../staking/WithdrawAllButton";
import { HarvestButton } from "../staking/HarvestButton";
import { StakeButton } from "../staking/StakeButton";
import { UnstakeButton } from "../staking/UnstakeButton";
import { EnableContractButton } from "./EnableContractButton";
import ConnectWalletButton from "components/ConnectWalletButton";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export interface PoolGridCardProps {
  isConnected?: boolean;
  onConnectWallet?: () => void;
  poolInfo: HandlerStakingInfo;
  isEnded?: boolean;
  isEnabledContract?: boolean;
  onEnabledContractSuccess?: () => void;
  stakedBalance: BigNumber;
  tokenBalance: BigNumber;
  rewardAmount?: BigNumber;
  onWithdrawSuccess?: () => void;
  onHarvestSuccess?: () => void;
  onStakeSuccess?: () => void;
  onUnstakeSuccess?: () => void;
  poolStatus?: PoolStatus;
  startBlock: number;
  endBlock: number;
  lastStakingBlock: number;
  unstakingBlock: number;
  currentBlock: number;
  lockTimeStamp: number;
  isCalculatingBlock?: boolean;
}

const { REACT_APP_PROMOTION } = process.env;
export const PoolGridCard = (props: PoolGridCardProps) => {
  const {
    poolInfo,
    poolStatus = "UNDETERMINED",
    isConnected,
    onConnectWallet = noop,
    isEnded = false,
    isEnabledContract = false,
    onEnabledContractSuccess = noop,
    stakedBalance,
    tokenBalance,
    rewardAmount = constants.Zero,
    onWithdrawSuccess = noop,
    onHarvestSuccess = noop,
    onStakeSuccess = noop,
    onUnstakeSuccess = noop,
    currentBlock,
    unstakingBlock,
    lockTimeStamp
  } = props;

  const {
    token,
    roi = [],
    rewardToken,
    poolAddress = "",
    totalStaked = 0,
    dailyRewards = 0,
    feePeriod = 0,
    getTokenUrl = ""
  } = poolInfo;

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { chainId } = useWeb3React();

  const isStaking = poolStatus === "STAKING";
  const timeCountDown = lockTimeStamp * 1000;

  const formatedRewardToken: TokenProps = {
    image: rewardToken?.image ?? "",
    address: rewardToken?.address ?? "",
    symbol: rewardToken?.symbol ?? "",
    decimals: rewardToken?.decimals ?? 18
  };


  const buttonsSection = useMemo(() => {
    if (!isConnected) {
      return (
        <ConnectWalletButton />
      );
    }
    if (!isEnabledContract) {
      return (
        <EnableContractButton
          tokenAddress={token?.address as string}
          poolAddress={poolAddress}
          onSuccess={onEnabledContractSuccess}
        />
      );
    }

    return (
      <div className="flex flex-col space-y-6 py-6">
        <div className="flex justify-between items-center space-x-4">
          <div>
            <Text color="white">
              <Text as="span">
                {rewardToken?.symbol}
              </Text>{" "}
              earned
            </Text>
            <Text className="mt-2 text-primary-launchpad">{formatBigNumber(rewardAmount, 3)}</Text>
          </div>
          {isEnded && (
            <WithdrawAllButton
              stakedBalance={stakedBalance}
              onSuccess={onWithdrawSuccess}
              poolAddress={poolAddress}
              reward={rewardAmount}
              currentBlock={currentBlock}
              unstakingBlock={unstakingBlock}
            />
          )}
          <HarvestButton
            reward={rewardAmount}
            onSuccess={onHarvestSuccess}
            poolStatus={poolStatus}
            poolAddress={poolAddress}
          />
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div>
            <Text color="white">
              <Text as="span">
                {token?.symbol}
              </Text>{" "}
              staked
            </Text>
            <Text className="mt-2 text-primary-launchpad">{formatBigNumber(stakedBalance, 3)}</Text>
          </div>
          <div className="flex gap-1">
            <StakeButton
              onSuccess={onStakeSuccess}
              stakedBalance={stakedBalance}
              tokenBalance={tokenBalance}
              poolStatus={poolStatus}
              poolAddress={poolAddress}
              tokenAddress={token?.address ?? ""}
              tokenSymbol={token?.symbol ?? ""}
              tokenUrl={getTokenUrl}
            />
            {isStaking && stakedBalance.gt(0) && unstakingBlock <= 0 && (
              <UnstakeButton
                stakedBalance={stakedBalance}
                tokenBalance={tokenBalance}
                poolStatus={poolStatus}
                onSuccess={onUnstakeSuccess}
                poolAddress={poolAddress}
                tokenAddress={token?.address ?? ""}
                tokenSymbol={token?.symbol ?? ""}
                tokenUrl={getTokenUrl}
              />
            )}
          </div>
        </div>
      </div>
    );
  }, [
    isConnected,
    onConnectWallet,
    isEnabledContract,
    token,
    poolAddress,
    onEnabledContractSuccess,
    rewardToken,
    rewardAmount,
    isEnded,
    isStaking,
    onHarvestSuccess,
    onStakeSuccess,
    onUnstakeSuccess,
    onWithdrawSuccess,
    poolStatus,
    stakedBalance,
    tokenBalance,
    unstakingBlock,
    currentBlock,
    unstakingBlock,
    getTokenUrl
  ]);

  // This is to prevent interference between onClick and onOutsideClick
  const recoveredClick = useRef(true);
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        recoveredClick.current = !isOpen;
      },
      isOpen ? 0 : 500
    );

    return () => clearTimeout(timeout);
  }, [isOpen]);
  const totalTicket = useMemo(() => {
    let total = 0;
    let step1 = 800;
    let step2 = 3200;
    let step3 = 8000;
    let step4 = 21600;
    let step5 = 60000;
    if (REACT_APP_PROMOTION) {
      step1 = 400;
      step2 = 1600;
      step3 = 4000;
      step4 = 10800;
      step5 = 30000;
    }
    const newStakedBalance = parseInt(formatBigNumber(stakedBalance, 3));
    if (newStakedBalance >= step1 && newStakedBalance < step2) {
      total = 1;
    }
    if (newStakedBalance >= step2 && newStakedBalance < step3) {
      total = 5;
    }
    if (newStakedBalance >= step3 && newStakedBalance < step4) {
      total = 15;
    }
    if (newStakedBalance >= step4 && newStakedBalance < step5) {
      total = 50;
    }
    if (newStakedBalance >= step5) {
      total = 150;
    }
    return total;
  }, [formatBigNumber(stakedBalance, 3)]);
  // Random component
  const Completionist = () => <span>You are good to go unstake!</span>;
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed, days }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
    }
  };
  return (
    <Card className="relative mb-4 w-full max-w-[520px] overflow-hidden">
      <div className="absolute top-0 left-0 w-full rounded-t-[10px] h-14 p-6 bg-gray-500 flex items-center justify-between text-white">
        <div className="flex items-center">
          <Text
            as="b"
            color="white"
            className="ml-2 sm:ml-4 text-md sm:text-xl"
          >
            Launchpad Staking Pool
          </Text>
        </div>
      </div>
      <div className="w-full flex flex-col mt-10">
        <div className="flex justify-between">
          <div className="flex justify-between items-center w-40">
            <Text>APY:</Text>
            <div className="flex justify-between">
              <Text as="span" className="text-primary-launchpad text-2xl">
                12%
              </Text>
              <Button
                appearance="borderless"
                className="!p-0 h-auto"
                aria-label="Open calculator"
                onClick={() => {
                  if (recoveredClick.current) {
                    onOpen();
                  }
                }}
                disabled={!isStaking || totalStaked === 0}
              >
                <IconCalculator
                  aria-hidden
                  className={cx("text-gray-300", {
                    "bg-gray-900": isOpen
                  })}
                />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center w-40">
            <Text>Earn in</Text>
            <div className="flex justify-between items-center">
              <img
                className="bg-white rounded-full h-6 w-6 p-0.5"
                src={rewardToken?.image}
                alt=""
                aria-hidden
              />
              <Text color="white" className="ml-2">
                {rewardToken?.symbol}
              </Text>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <BaseButton
            className="flex items-center mt-2 space-x-1.5"
            onClick={() => addTokenToWallet(formatedRewardToken)}
          >
            <IconMetaMask />
            <Text as="span" size="sm" className="text-primary-launchpad ml-1">
              Add to MetaMask
            </Text>
          </BaseButton>
        </div>
        {buttonsSection}
        <div className="border-t-2 border-gray-550">
          <div className="w-full flex flex-col mt-6 space-y-4">

            <div className="flex justify-between">
              <Text>Unstaking time</Text>
              <Text color="white" className="text-primary-launchpad">
                {lockTimeStamp ? <Countdown date={timeCountDown} renderer={renderer} /> : null}
              </Text>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Text>Tickets eligible for IDO allocation</Text>
              </div>
              <div className="flex items-center space-x-2">
                <Text as="b" size="sm" color="gray-300" className="text-primary-launchpad">
                  {totalTicket} ticket(s)

                </Text>
                <Tooltip placement="leftTop" title={(<span className="p-2">
                    Your eligible tickets from the launchpad pool will be used in a lucky draw for IDO allocation. The more tickets you have, the higher chance you get an allocation (and with a larger allocated amount.)
                    <br />
                    The number of eligible tickets is calculated based on your LFW staked amount:
                    <br />
                  (There will be a 50% reduction of the below required staked amount during promotion period!)
                    <br />
                    - at least 800 LFW: 1 ticket
                    <br />
                    - up to 3200 LFW: 5 tickets
                    <br />
                    - up to 8000 LFW: 15 tickets
                    <br />
                    - up to 21600 LFW: 50 tickets
                    <br />
                    - up to 60000 LFW: 150 tickets
                  </span>)}>
                  <QuestionCircleOutlined className="ml-1 text-white" />
                </Tooltip>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <Button
                as="a"
                appearance="borderless"
                className="px-0 font-medium"
                target="_blank"
                href={getScanLink(poolAddress as string, "address", chainId)}
              >
                <Text as="span" className="text-launchpad">
                  View contract
                </Text>
                <IconViewTransaction className="ml-1 text-launchpad" />
              </Button>
              <Button
                as="a"
                appearance="borderless"
                className="px-0 font-medium"
                target="_blank"
                href={getTokenUrl}
              >
                <Text as="span" className="text-launchpad">
                  Get LFW Token
                </Text>
                <IconViewTransaction className="ml-1 text-launchpad" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ROIModal
        onClose={onClose}
        isOpen={isOpen}
        rewardToken={String(poolInfo.rewardToken?.symbol)}
        data={roi as UtilROIResults[]}
      />
      <div className="absolute right-0 bottom-0 bg-black px-4 md:px-9 py-4 rounded-tl-[10px]">
        <Text color="white" className="font-semibold">
          Stake LFW to earn LFW
        </Text>
      </div>
    </Card>
  );
};

