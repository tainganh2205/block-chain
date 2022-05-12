import { useEffect, useState, useCallback, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { Zero } from "@ethersproject/constants";
import axios from "axios";
import { BigNumber } from "ethers";
import { FetchStatus } from "constant/commons";
import { LfwToken } from "types/contracts";
import {
  useLFWTokenContract
} from "./useContract1";
import { bigNumberToFloat, inputNumberToBigNumber } from "../utils/number";
import { FISH_CONTRACT } from "../constant/contracts";

const { REACT_APP_API_URL } = process.env;

export interface TokenBalance {
  balanceFloat: number,
  balance: BigNumber,
  requestAllowance: (allowanceRequest: number, requestMargin?: number) => Promise<true | false>,
  fetchStatus: FetchStatus,
  fetchGemStatus: FetchStatus,
  balanceGemFloat: number,
  refetch: () => void,
  checkAllowance: (allowanceRequest: number) => Promise<boolean>,
  balanceGem: BigNumber,
  refetchGem: () => void
}

export const useTokenBalance = ({ accessToken = "" }): TokenBalance => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [balance, setBalance] = useState(Zero);
  const balanceFloat = useMemo<number>(() => bigNumberToFloat(balance), [balance]);

  const [fetchGemStatus, setFetchGemStatus] = useState(FetchStatus.NOT_FETCHED);
  const [balanceGem, setBalanceGem] = useState(Zero);
  const balanceGemFloat = useMemo(() => bigNumberToFloat(balanceGem), [balanceGem]);

  const { account } = useWeb3React();
  const contract = useLFWTokenContract();

  const fetchBalance = useCallback(
    async (account: string, contract: LfwToken) => {
      try {
        const walletBalance = await contract.balanceOf(account);
        setBalance(BigNumber.from(walletBalance.toString()));
        setFetchStatus(FetchStatus.SUCCESS);
      } catch (e) {
        console.error(e);
        setFetchStatus(FetchStatus.FAILED);
      }
    },
    [setBalance, setFetchStatus]
  );

  const refetch = useCallback(() => {
    if (account && contract) {
      fetchBalance(account, contract).then();
    }
  }, [account, contract, fetchBalance]);

  useEffect(() => {
    if (account && contract) {
      fetchBalance(account, contract).then();
    }
  }, [account, contract, fetchBalance]);

  const fetchBalanceGem = useCallback(async (account: string, accessToken: string) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/v1/gem/${account}`, { headers: { "Authorization": `Bearer ${accessToken}` } });
      console.log(response?.data);
      setFetchGemStatus(FetchStatus.SUCCESS);
    } catch (e) {
      console.error(e);
      setFetchGemStatus(FetchStatus.FAILED);
    }
  }, [setBalanceGem, setFetchGemStatus]);

  useEffect(() => {
    if (account && accessToken) {
      fetchBalanceGem(account, accessToken).then();
    }
  }, [account, fetchBalanceGem, accessToken]);

  const refetchGem = useCallback(() => {
    if (account && accessToken) {
      fetchBalanceGem(account, accessToken).then();
    }
  }, [account, accessToken, fetchBalanceGem]);

  const checkAllowance = useCallback(async (allowanceRequest: number) => {
    const allowance = await contract?.allowance(account || "", FISH_CONTRACT.trim());
    const allowanceFloat = bigNumberToFloat(allowance);
    console.log(allowanceFloat, allowanceRequest);
    return allowanceFloat >= allowanceRequest;
  }, [account, contract]);

  const requestAllowance = useCallback(async (allowanceRequest: number, requestMargin = 1000000) => {
    // Check allowance
    if (!(await checkAllowance(allowanceRequest))) {
      // Request allowance
      let transaction;
      try {
        console.log(inputNumberToBigNumber(allowanceRequest + requestMargin).toString())
        transaction = await contract?.increaseAllowance(FISH_CONTRACT.trim(), inputNumberToBigNumber(allowanceRequest + requestMargin).toString());
      } catch (e) {
        console.error(e);
      }

      if (transaction) {
        const receipt = await transaction.wait();
        if (receipt.blockNumber) {
          // success
          return true;
        }
      }

      // fail transaction
      return false;
    }
    // allowance is enough
    return true;
  }, [checkAllowance, contract]);

  return { balance, balanceFloat, fetchStatus, refetch, balanceGem, balanceGemFloat, fetchGemStatus, refetchGem, checkAllowance, requestAllowance };
};

