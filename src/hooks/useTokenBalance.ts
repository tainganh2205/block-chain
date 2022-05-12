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
import { bigNumberToFloat } from "../utils/number";

const { REACT_APP_API_URL } = process.env;

export const useTokenBalance = ({ accessToken = "" }) => {
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

  return { balance, balanceFloat, fetchStatus, refetch, balanceGem, balanceGemFloat, fetchGemStatus, refetchGem };
};

