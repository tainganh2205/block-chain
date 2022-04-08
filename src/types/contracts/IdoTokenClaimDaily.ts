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

export interface IdoTokenClaimDailyInterface extends utils.Interface {
  functions: {
    "addWhitelistMulti(address[],uint256[])": FunctionFragment;
    "addWhitelistUser(address,uint256)": FunctionFragment;
    "claimAble(address)": FunctionFragment;
    "claimTokens()": FunctionFragment;
    "cliff()": FunctionFragment;
    "firstRelease()": FunctionFragment;
    "fundVesting(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "removeWhitelistUser(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "rescueStuckErc20(address)": FunctionFragment;
    "setStartTime(uint256)": FunctionFragment;
    "startTime()": FunctionFragment;
    "timePerPeriod()": FunctionFragment;
    "token()": FunctionFragment;
    "totalPeriods()": FunctionFragment;
    "totalTokens()": FunctionFragment;
    "totalTokensDeposited()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateWhitelistAmount(address,uint256)": FunctionFragment;
    "userInfo(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addWhitelistMulti",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addWhitelistUser",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "claimAble", values: [string]): string;
  encodeFunctionData(
    functionFragment: "claimTokens",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "cliff", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "firstRelease",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fundVesting",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeWhitelistUser",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rescueStuckErc20",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setStartTime",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "startTime", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "timePerPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalPeriods",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalTokensDeposited",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateWhitelistAmount",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "userInfo", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "addWhitelistMulti",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addWhitelistUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claimAble", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cliff", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "firstRelease",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fundVesting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeWhitelistUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rescueStuckErc20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStartTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "startTime", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "timePerPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalPeriods",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalTokensDeposited",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateWhitelistAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "userInfo", data: BytesLike): Result;

  events: {
    "AddWhitelistUser(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "RemoveWhitelistUser(address)": EventFragment;
    "SetStartTime(uint256)": EventFragment;
    "TokenClaimed(address,uint256)": EventFragment;
    "VestingFunded(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddWhitelistUser"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveWhitelistUser"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetStartTime"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VestingFunded"): EventFragment;
}

export type AddWhitelistUserEvent = TypedEvent<
  [string, BigNumber],
  { _address: string; _amount: BigNumber }
>;

export type AddWhitelistUserEventFilter =
  TypedEventFilter<AddWhitelistUserEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type RemoveWhitelistUserEvent = TypedEvent<
  [string],
  { _address: string }
>;

export type RemoveWhitelistUserEventFilter =
  TypedEventFilter<RemoveWhitelistUserEvent>;

export type SetStartTimeEvent = TypedEvent<
  [BigNumber],
  { _startTime: BigNumber }
>;

export type SetStartTimeEventFilter = TypedEventFilter<SetStartTimeEvent>;

export type TokenClaimedEvent = TypedEvent<
  [string, BigNumber],
  { _address: string; tokensClaimed: BigNumber }
>;

export type TokenClaimedEventFilter = TypedEventFilter<TokenClaimedEvent>;

export type VestingFundedEvent = TypedEvent<
  [BigNumber],
  { totalTokens: BigNumber }
>;

export type VestingFundedEventFilter = TypedEventFilter<VestingFundedEvent>;

export interface IdoTokenClaimDaily extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IdoTokenClaimDailyInterface;

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
    addWhitelistMulti(
      addrs: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addWhitelistUser(
      _address: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimAble(_sender: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    claimTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    cliff(overrides?: CallOverrides): Promise<[BigNumber]>;

    firstRelease(overrides?: CallOverrides): Promise<[BigNumber]>;

    fundVesting(
      _totalTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    removeWhitelistUser(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rescueStuckErc20(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setStartTime(
      _startTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    startTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    timePerPeriod(overrides?: CallOverrides): Promise<[BigNumber]>;

    token(overrides?: CallOverrides): Promise<[string]>;

    totalPeriods(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalTokens(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalTokensDeposited(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateWhitelistAmount(
      addr: string,
      amt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    userInfo(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; tokensClaimed: BigNumber }
    >;
  };

  addWhitelistMulti(
    addrs: string[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addWhitelistUser(
    _address: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimAble(_sender: string, overrides?: CallOverrides): Promise<BigNumber>;

  claimTokens(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  cliff(overrides?: CallOverrides): Promise<BigNumber>;

  firstRelease(overrides?: CallOverrides): Promise<BigNumber>;

  fundVesting(
    _totalTokens: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  removeWhitelistUser(
    _address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rescueStuckErc20(
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setStartTime(
    _startTime: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  startTime(overrides?: CallOverrides): Promise<BigNumber>;

  timePerPeriod(overrides?: CallOverrides): Promise<BigNumber>;

  token(overrides?: CallOverrides): Promise<string>;

  totalPeriods(overrides?: CallOverrides): Promise<BigNumber>;

  totalTokens(overrides?: CallOverrides): Promise<BigNumber>;

  totalTokensDeposited(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateWhitelistAmount(
    addr: string,
    amt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  userInfo(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amount: BigNumber; tokensClaimed: BigNumber }
  >;

  callStatic: {
    addWhitelistMulti(
      addrs: string[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    addWhitelistUser(
      _address: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    claimAble(_sender: string, overrides?: CallOverrides): Promise<BigNumber>;

    claimTokens(overrides?: CallOverrides): Promise<void>;

    cliff(overrides?: CallOverrides): Promise<BigNumber>;

    firstRelease(overrides?: CallOverrides): Promise<BigNumber>;

    fundVesting(
      _totalTokens: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    removeWhitelistUser(
      _address: string,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    rescueStuckErc20(_token: string, overrides?: CallOverrides): Promise<void>;

    setStartTime(
      _startTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    startTime(overrides?: CallOverrides): Promise<BigNumber>;

    timePerPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<string>;

    totalPeriods(overrides?: CallOverrides): Promise<BigNumber>;

    totalTokens(overrides?: CallOverrides): Promise<BigNumber>;

    totalTokensDeposited(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateWhitelistAmount(
      addr: string,
      amt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    userInfo(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount: BigNumber; tokensClaimed: BigNumber }
    >;
  };

  filters: {
    "AddWhitelistUser(address,uint256)"(
      _address?: null,
      _amount?: null
    ): AddWhitelistUserEventFilter;
    AddWhitelistUser(
      _address?: null,
      _amount?: null
    ): AddWhitelistUserEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "RemoveWhitelistUser(address)"(
      _address?: null
    ): RemoveWhitelistUserEventFilter;
    RemoveWhitelistUser(_address?: null): RemoveWhitelistUserEventFilter;

    "SetStartTime(uint256)"(_startTime?: null): SetStartTimeEventFilter;
    SetStartTime(_startTime?: null): SetStartTimeEventFilter;

    "TokenClaimed(address,uint256)"(
      _address?: null,
      tokensClaimed?: null
    ): TokenClaimedEventFilter;
    TokenClaimed(
      _address?: null,
      tokensClaimed?: null
    ): TokenClaimedEventFilter;

    "VestingFunded(uint256)"(totalTokens?: null): VestingFundedEventFilter;
    VestingFunded(totalTokens?: null): VestingFundedEventFilter;
  };

  estimateGas: {
    addWhitelistMulti(
      addrs: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addWhitelistUser(
      _address: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimAble(_sender: string, overrides?: CallOverrides): Promise<BigNumber>;

    claimTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    cliff(overrides?: CallOverrides): Promise<BigNumber>;

    firstRelease(overrides?: CallOverrides): Promise<BigNumber>;

    fundVesting(
      _totalTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    removeWhitelistUser(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rescueStuckErc20(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setStartTime(
      _startTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    startTime(overrides?: CallOverrides): Promise<BigNumber>;

    timePerPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    totalPeriods(overrides?: CallOverrides): Promise<BigNumber>;

    totalTokens(overrides?: CallOverrides): Promise<BigNumber>;

    totalTokensDeposited(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateWhitelistAmount(
      addr: string,
      amt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    userInfo(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addWhitelistMulti(
      addrs: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addWhitelistUser(
      _address: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimAble(
      _sender: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    cliff(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    firstRelease(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fundVesting(
      _totalTokens: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeWhitelistUser(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rescueStuckErc20(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setStartTime(
      _startTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    startTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    timePerPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalPeriods(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalTokensDeposited(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateWhitelistAmount(
      addr: string,
      amt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    userInfo(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}