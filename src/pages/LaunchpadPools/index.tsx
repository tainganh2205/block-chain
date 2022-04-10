import React, { useMemo } from "react";
import { BigNumber, constants } from "ethers";
import { StakeTab } from "./StakeTab";
import { useWeb3React } from "@web3-react/core";
import { useFetchUserData, useFetchUserDataLaunchpad } from "hooks/staking/useFetchUserData";
import { useFetchPublicLaunchpadPoolsData, useFetchPublicPoolsData } from "hooks/staking/useFetchPublicPoolData";
import { PoolInfo } from "types/common";
import { useFetchWithCache } from "hooks/useFetchWithCache";
import { client, GET_PATHS } from "libs";
import { isMobile } from "react-device-detect";
import "./index.scss";
import TopBanner from "./TopBanner";


const InnerRender = () => {
  const { account } = useWeb3React();
  // Fetch pools data from BE
  const {
    data: poolsFromBE,
    isLoading: isLoadingPoolsFromBE,
    error
  } = useFetchWithCache(
    GET_PATHS.getStakingInfo,
    () => client.getLaunchpadPoolInfo(),
    {
      refreshInterval: 20000
    }
  );

  const {
    data: usersData,
    isLoading: isLoadingUserData,
    refetch: refetchUserData
  } = useFetchUserDataLaunchpad(account as string, poolsFromBE?.data);

  const { data: poolsData, isLoading: isLoadingPublicData } =
    useFetchPublicLaunchpadPoolsData(account || "", poolsFromBE?.data);

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
      const stakedBalance = account
        ? BigNumber.from(userData?.stakedBalance ?? 0)
        : constants.Zero;
      const rewardAmount = account
        ? BigNumber.from(userData?.reward ?? 0)
        : constants.Zero;
      const lastStakingBlock = account
        ? BigNumber.from(userData?.lastStakingBlock ?? 0).toNumber()
        : constants.Zero;
      const lockTimeStamp = account
        ? BigNumber.from(userData?.lockTimeStamp ?? 0).toNumber()
        : constants.Zero;
      const allowance = account
        ? BigNumber.from(userData?.allowance ?? 0)
        : constants.Zero;
      return {
        ...pool,
        balance,
        allowance,
        stakedBalance,
        isEnabledContract: allowance.gt(0),
        isStaked: stakedBalance.gt(0),
        startBlock: BigNumber.from(publicData?.startBlock ?? 0).toNumber() ?? 0,
        endBlock: BigNumber.from(publicData?.endBlock ?? 0).toNumber() ?? 0,
        unstakingBlock: BigNumber.from(publicData?.unstakingBlock ?? 0).toNumber() ?? 0,
        isEnded: publicData?.isEnded as boolean,
        lastStakingBlock,
        lockTimeStamp,
        rewardAmount
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
    <div className="w-full">
      <TopBanner />
      <InnerRender />
    </div>
  );
};

export default LaunchpadPools;
