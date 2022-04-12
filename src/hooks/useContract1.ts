import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { getContract } from "utils/contract";
import {
  LFW_TOKEN_CONTRACT, IDO_CONTRACT
} from "constant/contracts";
import lfwTokenAbi from "config/abi/lfwToken.json";
import idoAbi from "config/abi/ido.json";
import erc20Abi from "config/abi/erc20.json";
import stakingAbi from "config/abi/staking.json";
import launchpadAbi from "config/abi/launchpad.json";
import {
  LfwToken,
  Staking,
  Launchpad,
  Ido
} from "types/contracts";

export function useContract<T extends Contract>(
  address: string,
  ABI: any
): T | null {
  const { library } = useActiveWeb3React();
  if (!address || !ABI) {
    console.warn("`address` and `ABI` are required");
  }
  return useMemo(() => {
    return getContract<T>(ABI, address, library?.getSigner());
  }, [address, ABI, library]);
}

export const useERC20 = (address: string) => {
  return useContract(address, erc20Abi);
};

export const useLFWTokenContract = () => {
  return useContract<LfwToken>(LFW_TOKEN_CONTRACT, lfwTokenAbi);
};

export const usePoolContract = (poolAddress: string) => {
  return useContract<Staking>(poolAddress, stakingAbi);
};

export const useLaunchpadPoolContract = (poolAddress: string) => {
  return useContract<Launchpad>(poolAddress, launchpadAbi);
};

export const useIdoContract = () => {
  return useContract<Ido>(IDO_CONTRACT, idoAbi);
};
