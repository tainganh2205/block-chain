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

export interface TreasuryInterface extends ethers.utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "OPERATOR_ROLE()": FunctionFragment;
    "conversionRate()": FunctionFragment;
    "depositNFT(address,uint256,uint8)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "getRoleMember(bytes32,uint256)": FunctionFragment;
    "getRoleMemberCount(bytes32)": FunctionFragment;
    "getWhitelistChest(uint256,uint256)": FunctionFragment;
    "grantContractRole(string,address)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "initialize()": FunctionFragment;
    "lfwToken()": FunctionFragment;
    "mintChest(address,address,address,uint256[],uint256[],uint256[],uint256)": FunctionFragment;
    "nftTreasury(address,uint256)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeContractRole(string,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "setConversionRate(uint256)": FunctionFragment;
    "setLFWTokenAddress(address)": FunctionFragment;
    "setTreasury(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "swapGem(uint256,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "treasury()": FunctionFragment;
    "whitelistChest(uint256[],uint256[])": FunctionFragment;
    "withdrawLFW()": FunctionFragment;
    "withdrawNFT(address,uint256,uint8)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "OPERATOR_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "conversionRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositNFT",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMember",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMemberCount",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getWhitelistChest",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "grantContractRole",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "lfwToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mintChest",
    values: [
      string,
      string,
      string,
      BigNumberish[],
      BigNumberish[],
      BigNumberish[],
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "nftTreasury",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeContractRole",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setConversionRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setLFWTokenAddress",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setTreasury", values: [string]): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "swapGem",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "whitelistChest",
    values: [BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawLFW",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawNFT",
    values: [string, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "OPERATOR_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "conversionRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "depositNFT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMember",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMemberCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWhitelistChest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "grantContractRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lfwToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintChest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nftTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeContractRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setConversionRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setLFWTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swapGem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "whitelistChest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawLFW",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawNFT",
    data: BytesLike
  ): Result;

  events: {
    "AssetERC20Deposit(address,uint8,uint256)": EventFragment;
    "AssetNFTDeposit(address,uint8,address,uint256)": EventFragment;
    "AssetNFTWithdraw(address,uint8,address,uint256)": EventFragment;
    "ChestOpened(uint256,address,uint256[],uint256[],uint256[])": EventFragment;
    "ConversionRateChange(uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "SwapGem(address,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AssetERC20Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssetNFTDeposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssetNFTWithdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChestOpened"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ConversionRateChange"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SwapGem"): EventFragment;
}

export type AssetERC20DepositEvent = TypedEvent<
  [string, number, BigNumber],
  { owner: string; serverID: number; amount: BigNumber }
>;

export type AssetERC20DepositEventFilter =
  TypedEventFilter<AssetERC20DepositEvent>;

export type AssetNFTDepositEvent = TypedEvent<
  [string, number, string, BigNumber],
  {
    owner: string;
    serverId: number;
    contractAddress: string;
    tokenId: BigNumber;
  }
>;

export type AssetNFTDepositEventFilter = TypedEventFilter<AssetNFTDepositEvent>;

export type AssetNFTWithdrawEvent = TypedEvent<
  [string, number, string, BigNumber],
  {
    owner: string;
    serverId: number;
    contractAddress: string;
    tokenId: BigNumber;
  }
>;

export type AssetNFTWithdrawEventFilter =
  TypedEventFilter<AssetNFTWithdrawEvent>;

export type ChestOpenedEvent = TypedEvent<
  [BigNumber, string, BigNumber[], BigNumber[], BigNumber[]],
  {
    _chestId: BigNumber;
    _receiver: string;
    heroes: BigNumber[];
    items: BigNumber[];
    itemQuantity: BigNumber[];
  }
>;

export type ChestOpenedEventFilter = TypedEventFilter<ChestOpenedEvent>;

export type ConversionRateChangeEvent = TypedEvent<
  [BigNumber],
  { newConversion: BigNumber }
>;

export type ConversionRateChangeEventFilter =
  TypedEventFilter<ConversionRateChangeEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  { role: string; previousAdminRole: string; newAdminRole: string }
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  { role: string; account: string; sender: string }
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  { role: string; account: string; sender: string }
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export type SwapGemEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber],
  {
    swapper: string;
    amountInLFW: BigNumber;
    amountInGem: BigNumber;
    serverId: BigNumber;
  }
>;

export type SwapGemEventFilter = TypedEventFilter<SwapGemEvent>;

export interface Treasury extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TreasuryInterface;

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
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<[string]>;

    conversionRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    depositNFT(
      _nftAddress: string,
      _tokenId: BigNumberish,
      serverId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getWhitelistChest(
      _session: BigNumberish,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    grantContractRole(
      _role: string,
      _wallet: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    lfwToken(overrides?: CallOverrides): Promise<[string]>;

    mintChest(
      _receiver: string,
      _nft721Address: string,
      _nft1155Address: string,
      _heroes: BigNumberish[],
      _items: BigNumberish[],
      _itemQuantities: BigNumberish[],
      _chestId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    nftTreasury(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, number, string, BigNumber] & {
        owner: string;
        serverId: number;
        contractAddress: string;
        tokenId: BigNumber;
      }
    >;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeContractRole(
      _role: string,
      _wallet: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setConversionRate(
      newConversion: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setLFWTokenAddress(
      _lfwToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTreasury(
      _treasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    swapGem(
      amount: BigNumberish,
      serverId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    treasury(overrides?: CallOverrides): Promise<[string]>;

    whitelistChest(
      _fromIds: BigNumberish[],
      _toIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawLFW(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawNFT(
      _nftAddress: string,
      _tokenId: BigNumberish,
      serverId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  OPERATOR_ROLE(overrides?: CallOverrides): Promise<string>;

  conversionRate(overrides?: CallOverrides): Promise<BigNumber>;

  depositNFT(
    _nftAddress: string,
    _tokenId: BigNumberish,
    serverId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  getRoleMember(
    role: BytesLike,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getRoleMemberCount(
    role: BytesLike,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getWhitelistChest(
    _session: BigNumberish,
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  grantContractRole(
    _role: string,
    _wallet: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  lfwToken(overrides?: CallOverrides): Promise<string>;

  mintChest(
    _receiver: string,
    _nft721Address: string,
    _nft1155Address: string,
    _heroes: BigNumberish[],
    _items: BigNumberish[],
    _itemQuantities: BigNumberish[],
    _chestId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  nftTreasury(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, number, string, BigNumber] & {
      owner: string;
      serverId: number;
      contractAddress: string;
      tokenId: BigNumber;
    }
  >;

  onERC721Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeContractRole(
    _role: string,
    _wallet: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setConversionRate(
    newConversion: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setLFWTokenAddress(
    _lfwToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTreasury(
    _treasury: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  swapGem(
    amount: BigNumberish,
    serverId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  treasury(overrides?: CallOverrides): Promise<string>;

  whitelistChest(
    _fromIds: BigNumberish[],
    _toIds: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawLFW(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawNFT(
    _nftAddress: string,
    _tokenId: BigNumberish,
    serverId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<string>;

    conversionRate(overrides?: CallOverrides): Promise<BigNumber>;

    depositNFT(
      _nftAddress: string,
      _tokenId: BigNumberish,
      serverId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWhitelistChest(
      _session: BigNumberish,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    grantContractRole(
      _role: string,
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<void>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(overrides?: CallOverrides): Promise<void>;

    lfwToken(overrides?: CallOverrides): Promise<string>;

    mintChest(
      _receiver: string,
      _nft721Address: string,
      _nft1155Address: string,
      _heroes: BigNumberish[],
      _items: BigNumberish[],
      _itemQuantities: BigNumberish[],
      _chestId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    nftTreasury(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, number, string, BigNumber] & {
        owner: string;
        serverId: number;
        contractAddress: string;
        tokenId: BigNumber;
      }
    >;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeContractRole(
      _role: string,
      _wallet: string,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setConversionRate(
      newConversion: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setLFWTokenAddress(
      _lfwToken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setTreasury(_treasury: string, overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    swapGem(
      amount: BigNumberish,
      serverId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    treasury(overrides?: CallOverrides): Promise<string>;

    whitelistChest(
      _fromIds: BigNumberish[],
      _toIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawLFW(overrides?: CallOverrides): Promise<void>;

    withdrawNFT(
      _nftAddress: string,
      _tokenId: BigNumberish,
      serverId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AssetERC20Deposit(address,uint8,uint256)"(
      owner?: string | null,
      serverID?: null,
      amount?: null
    ): AssetERC20DepositEventFilter;
    AssetERC20Deposit(
      owner?: string | null,
      serverID?: null,
      amount?: null
    ): AssetERC20DepositEventFilter;

    "AssetNFTDeposit(address,uint8,address,uint256)"(
      owner?: string | null,
      serverId?: null,
      contractAddress?: string | null,
      tokenId?: null
    ): AssetNFTDepositEventFilter;
    AssetNFTDeposit(
      owner?: string | null,
      serverId?: null,
      contractAddress?: string | null,
      tokenId?: null
    ): AssetNFTDepositEventFilter;

    "AssetNFTWithdraw(address,uint8,address,uint256)"(
      owner?: string | null,
      serverId?: null,
      contractAddress?: string | null,
      tokenId?: null
    ): AssetNFTWithdrawEventFilter;
    AssetNFTWithdraw(
      owner?: string | null,
      serverId?: null,
      contractAddress?: string | null,
      tokenId?: null
    ): AssetNFTWithdrawEventFilter;

    "ChestOpened(uint256,address,uint256[],uint256[],uint256[])"(
      _chestId?: null,
      _receiver?: string | null,
      heroes?: null,
      items?: null,
      itemQuantity?: null
    ): ChestOpenedEventFilter;
    ChestOpened(
      _chestId?: null,
      _receiver?: string | null,
      heroes?: null,
      items?: null,
      itemQuantity?: null
    ): ChestOpenedEventFilter;

    "ConversionRateChange(uint256)"(
      newConversion?: null
    ): ConversionRateChangeEventFilter;
    ConversionRateChange(newConversion?: null): ConversionRateChangeEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;

    "SwapGem(address,uint256,uint256,uint256)"(
      swapper?: string | null,
      amountInLFW?: null,
      amountInGem?: null,
      serverId?: null
    ): SwapGemEventFilter;
    SwapGem(
      swapper?: string | null,
      amountInLFW?: null,
      amountInGem?: null,
      serverId?: null
    ): SwapGemEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    conversionRate(overrides?: CallOverrides): Promise<BigNumber>;

    depositNFT(
      _nftAddress: string,
      _tokenId: BigNumberish,
      serverId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWhitelistChest(
      _session: BigNumberish,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantContractRole(
      _role: string,
      _wallet: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    lfwToken(overrides?: CallOverrides): Promise<BigNumber>;

    mintChest(
      _receiver: string,
      _nft721Address: string,
      _nft1155Address: string,
      _heroes: BigNumberish[],
      _items: BigNumberish[],
      _itemQuantities: BigNumberish[],
      _chestId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    nftTreasury(
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

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeContractRole(
      _role: string,
      _wallet: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setConversionRate(
      newConversion: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setLFWTokenAddress(
      _lfwToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTreasury(
      _treasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapGem(
      amount: BigNumberish,
      serverId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;

    whitelistChest(
      _fromIds: BigNumberish[],
      _toIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawLFW(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawNFT(
      _nftAddress: string,
      _tokenId: BigNumberish,
      serverId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    OPERATOR_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    conversionRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    depositNFT(
      _nftAddress: string,
      _tokenId: BigNumberish,
      serverId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWhitelistChest(
      _session: BigNumberish,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantContractRole(
      _role: string,
      _wallet: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    lfwToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintChest(
      _receiver: string,
      _nft721Address: string,
      _nft1155Address: string,
      _heroes: BigNumberish[],
      _items: BigNumberish[],
      _itemQuantities: BigNumberish[],
      _chestId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    nftTreasury(
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

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeContractRole(
      _role: string,
      _wallet: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setConversionRate(
      newConversion: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setLFWTokenAddress(
      _lfwToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTreasury(
      _treasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    swapGem(
      amount: BigNumberish,
      serverId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    whitelistChest(
      _fromIds: BigNumberish[],
      _toIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawLFW(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawNFT(
      _nftAddress: string,
      _tokenId: BigNumberish,
      serverId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
