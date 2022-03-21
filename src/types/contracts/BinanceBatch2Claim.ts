/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface BinanceBatch2ClaimInterface extends ethers.utils.Interface {
  functions: {
    "addWhitelistAddress(string,uint256[],uint256[],address[])": FunctionFragment;
    "addWhitelistNft(string,uint256,uint256,uint256[])": FunctionFragment;
    "binanceLFWToken(uint256)": FunctionFragment;
    "binanceNFTContract()": FunctionFragment;
    "claimBinanceMysteryBox(uint256,address,uint256,bytes)": FunctionFragment;
    "claimBinanceNFT(uint256)": FunctionFragment;
    "claimByAddress(string)": FunctionFragment;
    "getLFWTokenId(uint256)": FunctionFragment;
    "getPoolSlotSize(address,string)": FunctionFragment;
    "initialize()": FunctionFragment;
    "inititalContract(address,address)": FunctionFragment;
    "isInitialized()": FunctionFragment;
    "lfwContract()": FunctionFragment;
    "mysteryBoxBalance(address,uint256)": FunctionFragment;
    "nftSlots(string,uint256)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "poolLFWToken(string,uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "revokeWhitelistedNft(string,uint256[])": FunctionFragment;
    "setMaxSupplyBox(address,uint256)": FunctionFragment;
    "setWhitelistOperator(address[],bool)": FunctionFragment;
    "totalMinted()": FunctionFragment;
    "totalWhitelist()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateBinanceNFTContract(address)": FunctionFragment;
    "updateLFWContract(address)": FunctionFragment;
    "validateSignature(uint256,address,uint256,bytes)": FunctionFragment;
    "whitelistAddress(address,string)": FunctionFragment;
    "whitelistOperator(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addWhitelistAddress",
    values: [string, BigNumberish[], BigNumberish[], string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addWhitelistNft",
    values: [string, BigNumberish, BigNumberish, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "binanceLFWToken",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "binanceNFTContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimBinanceMysteryBox",
    values: [BigNumberish, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "claimBinanceNFT",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "claimByAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getLFWTokenId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolSlotSize",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "inititalContract",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isInitialized",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lfwContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mysteryBoxBalance",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "nftSlots",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "poolLFWToken",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revokeWhitelistedNft",
    values: [string, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setMaxSupplyBox",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setWhitelistOperator",
    values: [string[], boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "totalMinted",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalWhitelist",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateBinanceNFTContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateLFWContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "validateSignature",
    values: [BigNumberish, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "whitelistAddress",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "whitelistOperator",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "addWhitelistAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addWhitelistNft",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "binanceLFWToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "binanceNFTContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimBinanceMysteryBox",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimBinanceNFT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimByAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLFWTokenId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPoolSlotSize",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "inititalContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isInitialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lfwContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mysteryBoxBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nftSlots", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "poolLFWToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeWhitelistedNft",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMaxSupplyBox",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setWhitelistOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalMinted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateBinanceNFTContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateLFWContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validateSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "whitelistAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "whitelistOperator",
    data: BytesLike
  ): Result;

  events: {
    "ClaimToken(address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "VerifySigner(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ClaimToken"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VerifySigner"): EventFragment;
}

export type ClaimTokenEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { minter: string; binanceTokenId: BigNumber; lfwTokenId: BigNumber }
>;

export type ClaimTokenEventFilter = TypedEventFilter<ClaimTokenEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type VerifySignerEvent = TypedEvent<[string], { signer: string }>;

export type VerifySignerEventFilter = TypedEventFilter<VerifySignerEvent>;

export interface BinanceBatch2Claim extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BinanceBatch2ClaimInterface;

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
    addWhitelistAddress(
      _poolName: string,
      _startId: BigNumberish[],
      _endId: BigNumberish[],
      _addresses: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addWhitelistNft(
      _heroId: string,
      _startId: BigNumberish,
      _endId: BigNumberish,
      _binanceTokenId: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    binanceLFWToken(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    binanceNFTContract(overrides?: CallOverrides): Promise<[string]>;

    claimBinanceMysteryBox(
      _binanceNFTId: BigNumberish,
      _binanceNFTAddress: string,
      _lfwId: BigNumberish,
      _signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimBinanceNFT(
      _binanceNFTId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimByAddress(
      _poolName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getLFWTokenId(
      _binanceNFTId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getPoolSlotSize(
      _userAddress: string,
      _poolName: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    inititalContract(
      _lfwAddress: string,
      _binanceNFTAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isInitialized(overrides?: CallOverrides): Promise<[boolean]>;

    lfwContract(overrides?: CallOverrides): Promise<[string]>;

    mysteryBoxBalance(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    nftSlots(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    poolLFWToken(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeWhitelistedNft(
      _heroId: string,
      _binanceTokenId: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMaxSupplyBox(
      _address: string,
      _maxSupply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setWhitelistOperator(
      _operator: string[],
      _whitelist: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalMinted(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalWhitelist(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateBinanceNFTContract(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateLFWContract(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    validateSignature(
      _binanceNFTId: BigNumberish,
      _binanceNFTAddress: string,
      _lfwId: BigNumberish,
      _signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    whitelistAddress(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    whitelistOperator(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  addWhitelistAddress(
    _poolName: string,
    _startId: BigNumberish[],
    _endId: BigNumberish[],
    _addresses: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addWhitelistNft(
    _heroId: string,
    _startId: BigNumberish,
    _endId: BigNumberish,
    _binanceTokenId: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  binanceLFWToken(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  binanceNFTContract(overrides?: CallOverrides): Promise<string>;

  claimBinanceMysteryBox(
    _binanceNFTId: BigNumberish,
    _binanceNFTAddress: string,
    _lfwId: BigNumberish,
    _signature: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimBinanceNFT(
    _binanceNFTId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimByAddress(
    _poolName: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getLFWTokenId(
    _binanceNFTId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPoolSlotSize(
    _userAddress: string,
    _poolName: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  initialize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  inititalContract(
    _lfwAddress: string,
    _binanceNFTAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isInitialized(overrides?: CallOverrides): Promise<boolean>;

  lfwContract(overrides?: CallOverrides): Promise<string>;

  mysteryBoxBalance(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  nftSlots(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  onERC721Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  poolLFWToken(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeWhitelistedNft(
    _heroId: string,
    _binanceTokenId: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMaxSupplyBox(
    _address: string,
    _maxSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setWhitelistOperator(
    _operator: string[],
    _whitelist: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalMinted(overrides?: CallOverrides): Promise<BigNumber>;

  totalWhitelist(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateBinanceNFTContract(
    _address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateLFWContract(
    _address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  validateSignature(
    _binanceNFTId: BigNumberish,
    _binanceNFTAddress: string,
    _lfwId: BigNumberish,
    _signature: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  whitelistAddress(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  whitelistOperator(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    addWhitelistAddress(
      _poolName: string,
      _startId: BigNumberish[],
      _endId: BigNumberish[],
      _addresses: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    addWhitelistNft(
      _heroId: string,
      _startId: BigNumberish,
      _endId: BigNumberish,
      _binanceTokenId: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    binanceLFWToken(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    binanceNFTContract(overrides?: CallOverrides): Promise<string>;

    claimBinanceMysteryBox(
      _binanceNFTId: BigNumberish,
      _binanceNFTAddress: string,
      _lfwId: BigNumberish,
      _signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    claimBinanceNFT(
      _binanceNFTId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    claimByAddress(_poolName: string, overrides?: CallOverrides): Promise<void>;

    getLFWTokenId(
      _binanceNFTId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolSlotSize(
      _userAddress: string,
      _poolName: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(overrides?: CallOverrides): Promise<void>;

    inititalContract(
      _lfwAddress: string,
      _binanceNFTAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isInitialized(overrides?: CallOverrides): Promise<boolean>;

    lfwContract(overrides?: CallOverrides): Promise<string>;

    mysteryBoxBalance(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nftSlots(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    poolLFWToken(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    revokeWhitelistedNft(
      _heroId: string,
      _binanceTokenId: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    setMaxSupplyBox(
      _address: string,
      _maxSupply: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setWhitelistOperator(
      _operator: string[],
      _whitelist: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    totalMinted(overrides?: CallOverrides): Promise<BigNumber>;

    totalWhitelist(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateBinanceNFTContract(
      _address: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateLFWContract(
      _address: string,
      overrides?: CallOverrides
    ): Promise<void>;

    validateSignature(
      _binanceNFTId: BigNumberish,
      _binanceNFTAddress: string,
      _lfwId: BigNumberish,
      _signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    whitelistAddress(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    whitelistOperator(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "ClaimToken(address,uint256,uint256)"(
      minter?: string | null,
      binanceTokenId?: null,
      lfwTokenId?: null
    ): ClaimTokenEventFilter;
    ClaimToken(
      minter?: string | null,
      binanceTokenId?: null,
      lfwTokenId?: null
    ): ClaimTokenEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "VerifySigner(address)"(signer?: string | null): VerifySignerEventFilter;
    VerifySigner(signer?: string | null): VerifySignerEventFilter;
  };

  estimateGas: {
    addWhitelistAddress(
      _poolName: string,
      _startId: BigNumberish[],
      _endId: BigNumberish[],
      _addresses: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addWhitelistNft(
      _heroId: string,
      _startId: BigNumberish,
      _endId: BigNumberish,
      _binanceTokenId: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    binanceLFWToken(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    binanceNFTContract(overrides?: CallOverrides): Promise<BigNumber>;

    claimBinanceMysteryBox(
      _binanceNFTId: BigNumberish,
      _binanceNFTAddress: string,
      _lfwId: BigNumberish,
      _signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimBinanceNFT(
      _binanceNFTId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimByAddress(
      _poolName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getLFWTokenId(
      _binanceNFTId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolSlotSize(
      _userAddress: string,
      _poolName: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    inititalContract(
      _lfwAddress: string,
      _binanceNFTAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isInitialized(overrides?: CallOverrides): Promise<BigNumber>;

    lfwContract(overrides?: CallOverrides): Promise<BigNumber>;

    mysteryBoxBalance(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nftSlots(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    poolLFWToken(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeWhitelistedNft(
      _heroId: string,
      _binanceTokenId: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMaxSupplyBox(
      _address: string,
      _maxSupply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setWhitelistOperator(
      _operator: string[],
      _whitelist: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalMinted(overrides?: CallOverrides): Promise<BigNumber>;

    totalWhitelist(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateBinanceNFTContract(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateLFWContract(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    validateSignature(
      _binanceNFTId: BigNumberish,
      _binanceNFTAddress: string,
      _lfwId: BigNumberish,
      _signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    whitelistAddress(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    whitelistOperator(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addWhitelistAddress(
      _poolName: string,
      _startId: BigNumberish[],
      _endId: BigNumberish[],
      _addresses: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addWhitelistNft(
      _heroId: string,
      _startId: BigNumberish,
      _endId: BigNumberish,
      _binanceTokenId: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    binanceLFWToken(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    binanceNFTContract(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimBinanceMysteryBox(
      _binanceNFTId: BigNumberish,
      _binanceNFTAddress: string,
      _lfwId: BigNumberish,
      _signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimBinanceNFT(
      _binanceNFTId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimByAddress(
      _poolName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getLFWTokenId(
      _binanceNFTId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolSlotSize(
      _userAddress: string,
      _poolName: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    inititalContract(
      _lfwAddress: string,
      _binanceNFTAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isInitialized(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lfwContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mysteryBoxBalance(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nftSlots(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolLFWToken(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeWhitelistedNft(
      _heroId: string,
      _binanceTokenId: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMaxSupplyBox(
      _address: string,
      _maxSupply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setWhitelistOperator(
      _operator: string[],
      _whitelist: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalMinted(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalWhitelist(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateBinanceNFTContract(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateLFWContract(
      _address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    validateSignature(
      _binanceNFTId: BigNumberish,
      _binanceNFTAddress: string,
      _lfwId: BigNumberish,
      _signature: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    whitelistAddress(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    whitelistOperator(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}