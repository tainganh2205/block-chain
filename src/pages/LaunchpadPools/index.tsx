import React, { useMemo } from "react";
import { BigNumber, constants } from "ethers";
import { StakeTab } from "./StakeTab";
import { useWeb3React } from "@web3-react/core";
import { useFetchUserData } from "hooks/staking/useFetchUserData";
import { useFetchPublicPoolsData } from "hooks/staking/useFetchPublicPoolData";
import { PoolInfo } from "types/common";
import { useFetchWithCache } from "hooks/useFetchWithCache";
import { client, GET_PATHS } from "libs";
import { isMobile } from "react-device-detect";
import "./index.scss";
import TopIDO from "pages/LaunchpadV3/TopIDO";

const InnerRender = () => {
  const { account } = useWeb3React();
  // Fetch pools data from BE
  const {
    data: poolsFromBE,
    isLoading: isLoadingPoolsFromBE,
    error
  } = useFetchWithCache(
    GET_PATHS.getStakingInfo,
    () => client.getStakingInfo(),
    {
      refreshInterval: 20000
    }
  );

  const {
    data: usersData,
    isLoading: isLoadingUserData,
    refetch: refetchUserData
  } = useFetchUserData(account as string, poolsFromBE?.data);

  const { data: poolsData, isLoading: isLoadingPublicData } =
    useFetchPublicPoolsData(poolsFromBE?.data);

  const isLoading =
    isLoadingPoolsFromBE || isLoadingUserData || isLoadingPublicData;

  const allPools = useMemo(() => {
    return (poolsFromBE?.data ?? []).map((pool) => {
      const poolAddress = pool.poolAddress as string;
      const publicData = poolsData?.find(
        (pool) => pool.poolAddress === poolAddress
      );
      const userData = usersData?.find(
        (pool) => pool.poolAddress === poolAddress
      );

      const balance = account
        ? BigNumber.from(userData?.balance ?? 0)
        : constants.Zero;
      const allowance = account
        ? BigNumber.from(userData?.allowance ?? 0)
        : constants.Zero;
      const stakedBalance = account
        ? BigNumber.from(userData?.stakedBalance ?? 0)
        : constants.Zero;
      const rewardAmount = account
        ? BigNumber.from(userData?.pendingReward ?? 0)
        : constants.Zero;
      const lastStakingBlock = account
        ? BigNumber.from(userData?.lastStakingBlock ?? 0).toNumber()
        : constants.Zero;

      return {
        ...pool,
        balance,
        allowance,
        stakedBalance,
        rewardAmount,
        isEnabledContract: allowance.gt(0),
        isStaked: stakedBalance.gt(0),
        hasReward: rewardAmount.gt(0),
        startBlock: BigNumber.from(publicData?.startBlock ?? 0).toNumber() ?? 0,
        endBlock: BigNumber.from(publicData?.endBlock ?? 0).toNumber() ?? 0,
        unstakingBlock:
          BigNumber.from(publicData?.unstakingBlock ?? 0).toNumber() ?? 0,
        lastStakingBlock,
        isEnded: publicData?.isEnded as boolean
      } as PoolInfo;
    });
  }, [poolsFromBE, usersData, poolsData, account]);

  return (
    <div
      className="w-full max-w-[1160px] mx-auto px-3 sm:py-10 py-6 space-y-6"
      style={{
        marginTop: isMobile ? 80 : 0
      }}
    >
      <StakeTab
        isLoading={isLoading}
        pools={allPools?.filter((pool) => !pool.isEnded)}
        error={error}
        isFinished={false}
        refetchUserData={refetchUserData}
      />
    </div>
  );
};
const LaunchpadPools = () => {
  return (
    <>
      <div><TopIDO/></div>
      <InnerRender />
    </>
  );
};

export default LaunchpadPools;
