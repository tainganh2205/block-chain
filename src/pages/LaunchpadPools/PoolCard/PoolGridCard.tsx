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
import { roundNumber2D, formatNumber } from "utils/number";
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
  isCalculatingBlock?: boolean;
}

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
    startBlock,
    unstakingBlock,
    lastStakingBlock,
    endBlock
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

  const unstakeFeePeriodBlock = useMemo(() => {
    return feePeriod - (currentBlock - lastStakingBlock);
  }, [lastStakingBlock, feePeriod, currentBlock]);

  // unstacking block
  const remainingUnlock = useMemo(() => {
    return unstakingBlock - currentBlock;
  }, [unstakingBlock, currentBlock]);

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
          {isStaking && (
            <HarvestButton
              reward={rewardAmount}
              onSuccess={onHarvestSuccess}
              poolStatus={poolStatus}
              poolAddress={poolAddress}
            />
          )}
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
          <div className="flex w-[140px]">
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
            {isStaking && stakedBalance.gt(0) && remainingUnlock <= 0 && (
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
    remainingUnlock,
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
              <Text>Unstacking time</Text>
              <Text color="white">
                {formatNumber(roundNumber2D(dailyRewards ?? 0))}{" "}
                {rewardToken?.symbol}
              </Text>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Text>Tickets eligible for IDO allocation</Text>
              </div>
              <div className="flex items-center space-x-2">
                <Text as="b" size="sm" color="gray-300">
                  {unstakeFeePeriodBlock <= 0 ? 0 : formatNumber(unstakeFeePeriodBlock)}{" "}
                  {unstakeFeePeriodBlock <= 1 ? "ticket" : "tickets"}
                </Text>
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
          Stacked LFW to earn LFW
        </Text>
      </div>
    </Card>
  );
};

