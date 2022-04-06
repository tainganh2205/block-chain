/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface LaunchpadInterface extends utils.Interface {
  functions: {
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "apy()": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "changeAPY(uint256)": FunctionFragment;
    "claim()": FunctionFragment;
    "decimals()": FunctionFragment;
    "decreaseAllowance(address,uint256)": FunctionFragment;
    "emergencyWithdraw(uint256)": FunctionFragment;
    "increaseAllowance(address,uint256)": FunctionFragment;
    "initialize(address,bool,uint256,address)": FunctionFragment;
    "isRemovable()": FunctionFragment;
    "name()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setRemovePool(bool)": FunctionFragment;
    "stake(uint256)": FunctionFragment;
    "stakedToken()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unStake(uint256)": FunctionFragment;
    "userInfo(address)": FunctionFragment;
    "userList(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "apy", values?: undefined): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "changeAPY",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "claim", values?: undefined): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyWithdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, boolean, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isRemovable",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setRemovePool",
    values: [boolean]
  ): string;
  encodeFunctionData(functionFragment: "stake", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "stakedToken",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "unStake",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "userInfo", values: [string]): string;
  encodeFunctionData(
    functionFragment: "userList",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "apy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "changeAPY", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "emergencyWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isRemovable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRemovePool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakedToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unStake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "userInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "userList", data: BytesLike): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ChangeAPYvalue(uint256)": EventFragment;
    "Claimed(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Stake(address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
    "Unstake(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChangeAPYvalue"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Claimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Stake"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unstake"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  { owner: string; spender: string; value: BigNumber }
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export type ChangeAPYvalueEvent = TypedEvent<
  [BigNumber],
  { amount: BigNumber }
>;

export type ChangeAPYvalueEventFilter = TypedEventFilter<ChangeAPYvalueEvent>;

export type ClaimedEvent = TypedEvent<
  [string, BigNumber],
  { wallet: string; amount: BigNumber }
>;

export type ClaimedEventFilter = TypedEventFilter<ClaimedEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type StakeEvent = TypedEvent<
  [string, BigNumber],
  { wallet: string; amount: BigNumber }
>;

export type StakeEventFilter = TypedEventFilter<StakeEvent>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  { from: string; to: string; value: BigNumber }
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export type UnstakeEvent = TypedEvent<
  [string, BigNumber],
  { user: string; amount: BigNumber }
>;

export type UnstakeEventFilter = TypedEventFilter<UnstakeEvent>;

export interface Launchpad extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LaunchpadInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    apy(overrides?: CallOverrides): Promise<[BigNumber]>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    changeAPY(
      _apy: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    emergencyWithdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      _stakedToken: string,
      _isRemovable: boolean,
      _apy: BigNumberish,
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isRemovable(overrides?: CallOverrides): Promise<[boolean]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRemovePool(
      _remove: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakedToken(overrides?: CallOverrides): Promise<[string]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unStake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    userInfo(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        stakingTime: BigNumber;
        lockTime: BigNumber;
        lastClaimingTime: BigNumber;
        stakedAmount: BigNumber;
      }
    >;

    userList(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
  };

  allowance(
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  apy(overrides?: CallOverrides): Promise<BigNumber>;

  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  changeAPY(
    _apy: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claim(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  decimals(overrides?: CallOverrides): Promise<number>;

  decreaseAllowance(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  emergencyWithdraw(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  increaseAllowance(
    spender: string,
    addedValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    _stakedToken: string,
    _isRemovable: boolean,
    _apy: BigNumberish,
    _admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isRemovable(overrides?: CallOverrides): Promise<boolean>;

  name(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRemovePool(
    _remove: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stake(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakedToken(overrides?: CallOverrides): Promise<string>;

  symbol(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    from: string,
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unStake(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  userInfo(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      stakingTime: BigNumber;
      lockTime: BigNumber;
      lastClaimingTime: BigNumber;
      stakedAmount: BigNumber;
    }
  >;

  userList(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    apy(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    changeAPY(_apy: BigNumberish, overrides?: CallOverrides): Promise<void>;

    claim(overrides?: CallOverrides): Promise<void>;

    decimals(overrides?: CallOverrides): Promise<number>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    emergencyWithdraw(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(
      _stakedToken: string,
      _isRemovable: boolean,
      _apy: BigNumberish,
      _admin: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isRemovable(overrides?: CallOverrides): Promise<boolean>;

    name(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setRemovePool(_remove: boolean, overrides?: CallOverrides): Promise<void>;

    stake(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    stakedToken(overrides?: CallOverrides): Promise<string>;

    symbol(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unStake(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    userInfo(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        stakingTime: BigNumber;
        lockTime: BigNumber;
        lastClaimingTime: BigNumber;
        stakedAmount: BigNumber;
      }
    >;

    userList(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): ApprovalEventFilter;
    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): ApprovalEventFilter;

    "ChangeAPYvalue(uint256)"(amount?: null): ChangeAPYvalueEventFilter;
    ChangeAPYvalue(amount?: null): ChangeAPYvalueEventFilter;

    "Claimed(address,uint256)"(
      wallet?: string | null,
      amount?: null
    ): ClaimedEventFilter;
    Claimed(wallet?: string | null, amount?: null): ClaimedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Stake(address,uint256)"(
      wallet?: string | null,
      amount?: null
    ): StakeEventFilter;
    Stake(wallet?: string | null, amount?: null): StakeEventFilter;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TransferEventFilter;

    "Unstake(address,uint256)"(
      user?: string | null,
      amount?: null
    ): UnstakeEventFilter;
    Unstake(user?: string | null, amount?: null): UnstakeEventFilter;
  };

  estimateGas: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    apy(overrides?: CallOverrides): Promise<BigNumber>;

    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    changeAPY(
      _apy: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    emergencyWithdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      _stakedToken: string,
      _isRemovable: boolean,
      _apy: BigNumberish,
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isRemovable(overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRemovePool(
      _remove: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakedToken(overrides?: CallOverrides): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unStake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    userInfo(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    userList(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    allowance(
      owner: string,
      spender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    apy(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balanceOf(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeAPY(
      _apy: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decreaseAllowance(
      spender: string,
      subtractedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    emergencyWithdraw(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    increaseAllowance(
      spender: string,
      addedValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      _stakedToken: string,
      _isRemovable: boolean,
      _apy: BigNumberish,
      _admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isRemovable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRemovePool(
      _remove: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakedToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unStake(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    userInfo(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userList(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
