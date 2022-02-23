import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import { getBep20Contract, getSellPubliContract } from "utils";

import useWeb3 from "./useWeb3";
import useRefresh from "./useRefresh";

export const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, web3);
      console.log("contract>>", contract);
      if (!account) {
        const res = await contract.methods.balanceOf(account).call();
        setBalance(new BigNumber(res));
      }
     
    };

    if (account) {
      fetchBalance();
    }
  }, [account, tokenAddress, web3, fastRefresh]);

  return balance;
};

export const useCurrentBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async () => {
      const data = await web3.eth.getBalance(account || '');
      setBalance(new BigNumber(data));
    };

    if (account) {
      fetchBalance();
    }
  }, [account, web3, fastRefresh]);

  return balance;
};

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { slowRefresh } = useRefresh();
  const web3 = useWeb3();

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, web3);
      const res = await contract.methods
        .balanceOf("0x000000000000000000000000000000000000dEaD")
        .call();
      setBalance(new BigNumber(res));
    };

    fetchBalance();
  }, [web3, tokenAddress, slowRefresh]);

  return balance;
};
const calPercentDeposit = (totalBNBDeposit, lastSummary = 486) => {
  return ((totalBNBDeposit / 1e18 / lastSummary) * 100).toFixed(3);
};

export const useGetInfo = () => {
  const [result, setResult] = useState({});
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchInfo = async () => {
      const contract = getSellPubliContract(web3);
      const info = await contract.methods
        .users(account)
        .call({ from: account });
      const orders = await contract.methods
        .getOrders(account)
        .call({ from: account });
      const blockTimestamp = await contract.methods
        .getBlockTimestamp()
        .call({ from: account });
      const totalBNBDeposit = await contract.methods
        .totalBNBDeposit()
        .call({ from: account });
      setResult({
        blockTimestamp,
        info,
        orders,
        percentBNBDeposit: calPercentDeposit(totalBNBDeposit),
        totalBNBDeposit: (totalBNBDeposit / 1e18).toFixed(3),
      });
    };
    if (account) {
      fetchInfo();
    }
  }, [account, web3, fastRefresh]);

  return result;
};
