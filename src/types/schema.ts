/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ErrorsError {
  code?: number
  message?: string
}

export interface GameplatformServerData {
  code?: string
  id?: number
  name?: string
}

export interface HandlerChallengeData {
  challenge?: string
}

export interface HandlerAddGemRequest {
  gameServerId?: number
  spendAmount?: number
  token?: string
  walletAddress?: string
}

export interface HandlerAddResourceRequest {
  amount?: number
  game_server_id?: number
  id?: number
  reason?: string
  sign?: string
  type?: string
  username?: string
}

export interface HandlerApolloClaimNFTRequest {
  contractAddress?: string
  lfwTokenId?: number
  poolName?: string
  txHash?: string
  walletAddress?: string
}

export interface HandlerApolloClaimNFTResponse {
  data?: HandlerHeroClaimDrop
}

export interface HandlerAssetAllocatorData {
  gameServerId?: number
  numOfHeroes?: number
}

export interface HandlerAssetAllocatorResponse {
  data?: HandlerAssetAllocatorData[]
}

export interface HandlerAssetFilterRequest {
  element?: string[]
  growthFrom?: number
  growthTo?: number
  inGame?: boolean
  name?: string
  pageNumber?: number
  pageSize?: number
  quality?: string[]
  rank?: number
  rarity?: string[]
  serverId?: number
}

export interface HandlerAttributes {
  trait_type?: string
  value?: any
}

export interface HandlerBinanceClaimNFTRequest {
  contractAddress?: string
  lfwTokenId?: number
  slug?: string
  tokenId?: number
  txHash?: string
  walletAddress?: string
}

export interface HandlerBinanceClaimNFTResponse {
  data?: HandlerResponseData
}

export interface HandlerBinanceClaimRequest {
  ownerAddress?: string
  session?: HandlerBinanceClaimSession[]
}

export interface HandlerBinanceClaimSession {
  contractAddress?: string
  tokenIdList?: number[]
}

export interface HandlerBuyRequest {
  buyType?: string
  heroId?: string
  price?: number
  txHash?: string
  walletAddress?: string
}

export interface HandlerBuyResponse {
  data?: HandlerResponseData
}

export interface HandlerCanBuyConsumablesRequest {
  listingId?: number
}

export interface HandlerCanBuyHeroRequest {
  heroId?: string
  source?: string
}

export interface HandlerCanBuyResponse {
  data?: HandlerResponseData
}

export interface HandlerCanImportHeroRequest {
  heroId?: string
  serverId?: number
  walletAddress?: string
}

export interface HandlerCanImportHeroResponse {
  data?: HandlerResponseData
}

export interface HandlerCanImportServerResponse {
  data?: GameplatformServerData[]
}

export interface HandlerCanWithdrawHeroRequest {
  heroId?: string
  walletAddress?: string
}

export interface HandlerCanWithdrawHeroResponse {
  data?: HandlerResponseData
}

export interface HandlerCheckCanAddGem {
  canAddGem?: boolean
}

export interface HandlerCheckCanAddGemReponse {
  data?: HandlerCheckCanAddGem
}

export interface HandlerChestResultResponse {
  data?: ModelChestResultData[]
}

export interface HandlerClaimReferralBonusResponse {
  data?: HandlerResponseData
}

export interface HandlerClaimRewardRequest {
  ownerAddress?: string
}

export interface HandlerClaimSuperFarmRequest {
  gameServerId?: number
  campaign: string
  claimItem: string
}

export interface HandlerClaimRewardResponse {
  data?: HandlerResponseData
}

export interface HandlerClaimSuperFarmResponse {
  data?: HandlerResponseData
}

export interface HandlerConsumablesBuyRequest {
  listingId?: number
  tokenId?: number
  txHash?: string
  walletAddress?: string
}

export interface HandlerConsumablesBuyResponse {
  data?: HandlerResponseData
}

export interface HandlerConsumablesCanImportRequest {
  itemId?: string
  quantity?: number
  serverId?: number
  walletAddress?: string
}

export interface HandlerConsumablesCanImportResponse {
  data?: HandlerResponseData
}

export interface HandlerConsumablesCanWithdrawRequest {
  itemId?: string
  walletAddress?: string
}

export interface HandlerConsumablesCanWithdrawResponse {
  data?: HandlerResponseData
}

export interface HandlerConsumablesDetailResponse {
  data?: ModelConsumableItemData
}

export interface HandlerConsumablesFilterRequest {
  chestType?: string[]
  element?: string[]
  growthFrom?: number
  growthTo?: number
  inGame?: boolean
  name?: string
  ownerAddress?: string
  pageNumber?: number
  pageSize?: number
  rarity?: string[]
  serverId?: number
  sort?: string
  type?: string
}

export interface HandlerConsumablesImportRequest {
  currentQuantity?: number
  importQuantity?: number
  tokenId?: number
  txHash?: string
  walletAddress?: string
}

export interface HandlerConsumablesImportResponse {
  data?: HandlerResponseData
}

export interface HandlerConsumablesResponse {
  data?: ModelConsumableItemData[]
  metadata?: ModelPagination
}

export interface HandlerClaimChestResourceResponse {
  data?: ModelConsumableItemData[]
}

export interface HandlerConsumablesSellRequest {
  listingId?: number
  price?: string
  quantity?: number
  tokenId?: number
  txHash?: string
  walletAddress?: string
}

export interface HandlerConsumablesSellResponse {
  data?: HandlerResponseData
}

export interface HandlerConsumablesTransferRequest {
  quantity?: number
  receiverAddress?: string
  tokenId?: number
  txHash?: string
  walletAddress?: string
}

export interface HandlerConsumablesTransferResponse {
  data?: HandlerResponseData
}

export interface HandlerConsumablesUnlistRequest {
  listingId?: number
  tokenId?: number
  txHash?: string
  walletAddress?: string
}

export interface HandlerConsumablesUnlistResponse {
  data?: HandlerResponseData
}

export interface HandlerConsumablesUpdatePriceRequest {
  listingId?: number
  txHash?: string
  updatedPrice?: string
  walletAddress?: string
}

export interface HandlerConsumablesWithdrawRequest {
  quantity?: number
  tokenId?: number
  walletAddress?: string
}

export interface HandlerConsumablesWithdrawResponse {
  data?: HandlerResponseData
}

export interface HandlerConvertToken {
  convertAmount?: number
  convertRate?: number
}

export interface HandlerConvertTokenRequest {
  amount?: number
  token?: string
}

export interface HandlerConvertTokenResponse {
  data?: HandlerConvertToken
}

export interface HandlerCreateHeroRequest {
  game_server_id?: number
  resource_category?: string
  resource_id?: string
  sign?: string
  username?: string
}

export interface HandlerGameInfo {
  gemConsumed?: number
  gemIssued?: number
  lfwPrice?: number
  treasuryWallet?: number
}

export interface HandlerGameInfoResponse {
  data?: HandlerGameInfo
}

export interface HandlerGetChallengeResponse {
  data?: HandlerChallengeData
}

export interface HandlerGetGameURLData {
  gameUrl?: string
  token?: string
}

export interface HandlerGetGameURLResponse {
  data?: HandlerGetGameURLData
}

export interface HandlerGetServer {
  code?: string
  id?: number
  name?: string
}

export interface HandlerGetServerResponse {
  data?: HandlerGetServer[]
}

export interface HandlerGetUserGemBalance {
  totalGem?: number
  totalHeroes?: number
}

export interface HandlerGetUserGemBalanceResponse {
  data?: HandlerGetUserGemBalance
}

export interface HandlerGetUserInfo {
  referralCode?: string
  status?: string
  walletAddress?: string
}

export interface HandlerGetUserInfoResponse {
  data?: HandlerGetUserInfo
}

export interface HandlerHeroBinanceClaimResponse {
  data?: HandlerHeroClaimDrop[]
}

export interface HandlerSuperFarmUpdateResponse {
  data?: HandlerResponseData
}
export interface HandlerMiningUpdateResponse {
  data?: HandlerResponseData
}
export interface HandlerAddWhitelistChestResponse {
  message?: string
}
export interface HandlerHeroClaimDrop {
  claimVersion?: string
  color?: string
  colorLevel?: number
  colorName?: string
  contractAddress?: string
  dexterity?: number
  element?: string
  elementSlug?: string
  growth?: number
  heroAvatar?: string
  heroGif?: string
  intelligence?: number
  level?: number
  lfwTokenId?: number
  maxGrowth?: number
  maxStar?: number
  name?: string
  power?: number
  rarity?: string
  signature?: string
  slug?: string
  source?: string
  star?: number
  status?: string
  strength?: number
  tokenId?: number
  type?: string
  vitality?: number
}

export interface HandlerHeroFilterRequest {
  element?: string[]
  growthFrom?: number
  growthTo?: number
  name?: string
  ownerAddress?: string
  pageNumber?: number
  pageSize?: number
  quality?: string[]
  rank?: number
  rarity?: string[]
  serverId?: number
  sort?: string
}

export interface HandlerHeroMarketPlaceDetailResponse {
  data?: ModelHeroDetail
}

export interface HandlerHeroNftDrop {
  dexterity?: number
  element?: string
  growth?: number
  heroAvatar?: string
  heroGif?: string
  intelligence?: number
  maxGrowth?: number
  mintedAmount?: number
  name?: string
  quantity?: number
  skill?: ModelSkillData[]
  strength?: number
  vitality?: number
}

export interface HandlerHeroNftDropResponse {
  data?: HandlerHeroNftDrop[]
}

export interface HandlerHeroProfileDetailResponse {
  data?: ModelHeroDetail
}

export interface HandlerImportHeroRequest {
  heroId?: string
  serverId?: number
  txHash?: string
  walletAddress?: string
}

export interface HandlerImportHeroResponse {
  data?: HandlerResponseData
}

export interface HandlerListHeroResponse {
  data?: ModelHeroData[]
  metadata?: ModelPagination
}

export interface HandlerMintDropRequest {
  tokenId?: number
  txHash?: string
  walletAddress?: string
}

export interface HandlerMintDropResponse {
  data?: ModelHeroData
}

export interface HandlerMyAssetsResponse {
  data?: ModelHeroData[]
  metadata?: ModelPagination
}

export interface HandlerNftOpenseaResponse {
  attributes?: HandlerAttributes[]
  description?: string
  external_url?: string
  image?: string
  name?: string
}

export interface HandlerOnSaleFilterRequest {
  element?: string[]
  growthFrom?: number
  growthTo?: number
  name?: string
  pageNumber?: number
  pageSize?: number
  quality?: string[]
  rank?: number
  rarity?: string[]
  serverId?: number
}

export interface HandlerOpenChestRequest {
  amount?: number
  chestId?: number
  txHash?: string
  walletAddress?: string
}

export interface HandlerPlatformInfo {
  gemConsumed?: number
  gemIssued?: number
  treasuryWallet?: number
}

export interface HandlerPlatformInfoResponse {
  data?: HandlerPlatformInfo
}

export interface HandlerReferralData {
  content?: string
  description?: string
}

export interface HandlerReferralEarned {
  actionName?: string
  amount?: number
  bonus?: number
  date?: string
  isClaimed?: boolean
  walletAddress?: string
}

export interface HandlerReferralEarnedData {
  referralEarned?: HandlerReferralEarned[]
  totalReferralEarned?: number
}

export interface HandlerReferralEarnedResponse {
  data?: HandlerReferralEarnedData
  metadata?: ModelPagination
}

export interface HandlerReferralFriend {
  invitedFriends?: HandlerReferredFriendData[]
  totalActiveFriends?: number
  totalInvitedFriends?: number
}

export interface HandlerReferralFriendResponse {
  data?: HandlerReferralFriend
}

export interface HandlerReferralResponse {
  data?: HandlerReferralData[]
}

export interface HandlerReferredFriendData {
  id?: string
  status?: string
  walletAddress?: string
}

export interface HandlerResponseData {
  message?: string
  quantity?: number
}

export interface HandlerRewardHistory {
  claimed?: number
  date?: string
  from?: string
  txHash?: string
}

export interface HandlerSuperFarmHistory {
  owner_address: string
  campaign: string
  status: string
  lfw: number
  vesting: number
  hero: string
  consumable: string
  claim_lfw: string
  claim_vesting: string
  claim_hero?: string
  claim_consumable: string
}

export interface HandlerRewardHistoryResponse {
  data?: HandlerRewardHistory[]
}

export interface HandlerSuperFarmHistoryResponse {
  data?: HandlerSuperFarmHistory
}

export interface HandlerRewardRequest {
  amount?: number
  sign?: string
  token?: string
  username?: string
}

export interface HandlerSellRequest {
  heroId?: string
  txHash?: string
  walletAddress?: string
}

export interface HandlerSellResponse {
  data?: HandlerResponseData
}

export interface HandlerStakingInfo {
  apr?: number
  dailyRewards?: number
  feePeriod?: number
  feePeriodSeconds?: number
  getTokenUrl?: string
  name?: string
  poolAddress?: string
  poolName?: string
  rewardToken?: HandlerStakingTokenData
  roi?: UtilROIResults[]
  token?: HandlerStakingTokenData
  totalStaked?: number
  unstakingFeePercentage?: number
  lockTimeStamp?: number
}

export interface HandlerStakingInfoResponse {
  data?: HandlerStakingInfo[]
}

export interface HandlerStakingTokenData {
  address?: string
  decimals?: number
  image?: string
  imagePair?: string
  priceUSD?: number
  symbol?: string
}

export interface HandlerStopBuyConsumablesRequest {
  listingId?: number
}

export interface HandlerStopBuyHeroRequest {
  heroId?: string
}

export interface HandlerStopBuyResponse {
  data?: HandlerResponseData
}

export interface HandlerSyncHeroDataRequest {
  id?: string
  ownerAddress?: string
}

export interface HandlerSyncHeroDataResponse {
  data?: HandlerResponseData
}

export interface HandlerTokenInfoData {
  circulatingSupply?: number
  gateURL?: string

  /**
   * PancakePrice         float64 `json:"pancakePrice"`
   * PancakePriceChange   float64 `json:"pancakePriceChange"`
   * UniswapPrice         float64 `json:"uniswapPrice"`
   * UniswapPriceChange   float64 `json:"uniswapPriceChange"`
   * TotalLiquidity       float64 `json:"totalLiquidity"`
   * TotalLiquidityChange float64 `json:"totalLiquidityChange"`
   * Volume               float64 `json:"volume"`
   * VolumeChange         float64 `json:"volumeChange"`
   * Transaction          int     `json:"transaction"`
   * TransactionChange    float64 `json:"transactionChange"`
   */
  pancakeURL?: string
  price?: number
  priceChange?: number
  totalSupply?: number
  totalVolume?: number
  totalVolumeChange?: number
}

export interface HandlerTokenInfoResponse {
  data?: HandlerTokenInfoData
}

export interface HandlerTransferRequest {
  heroId?: string
  txHash?: string
  walletAddress?: string
}
export interface HandlerTransferNftMiningRequest {
  campaign?: string
  txHash?: string
  ownerAddress?: string
  tokenId: number
}

export interface HandlerTransferResponse {
  data?: HandlerResponseData
}

export interface HandlerUnlistRequest {
  heroId?: string
  txHash?: string
  walletAddress?: string
}

export interface HandlerUnlistResponse {
  data?: HandlerResponseData
}

export interface HandlerUpdatePriceRequest {
  heroId?: string
  txHash?: string
  updatedPrice?: string
  walletAddress?: string
}

export interface HandlerUpdatePriceResponse {
  data?: HandlerResponseData
}

export interface HandlerUpdateUserResourceId {
  hero_id?: string
  user_resource_id?: string
}

export interface HandlerUpdateUserResourceIdRequest {
  game_server_id?: number
  resource_info?: HandlerUpdateUserResourceId[]
  sign?: string
  username?: string
}

export interface HandlerUpsertWalletResponse {
  data?: HandlerResponseData
}

export interface HandlerUserBalance {
  LFW?: number
  NFT?: number
  gem?: number
}

export interface HandlerUserBalanceResponse {
  data?: HandlerUserBalance
}

export interface HandlerUserReward {
  claimableReward?: number
  token?: string
}

export interface HandlerStatusWhitelistMining {
  message?: string
  status?: string
}

export interface HandlerRewardMining {
  lfw?: number
}

export interface HandlerUserRewardResponse {
  data?: HandlerUserReward
}

export interface HandlerGetStatusAddWhitelistMiningResponse {
  data?: HandlerStatusWhitelistMining
}

export interface HandlerGetRewardMiningResponse {
  data?: HandlerRewardMining
}

export interface HandlerWithdrawHeroRequest {
  heroId?: string
  txHash?: string
  walletAddress?: string
}

export interface HandlerWithdrawHeroResponse {
  data?: HandlerResponseData
}

export interface ModelChestResultData {
  avatar?: string
  category?: string
  color?: string

  /** Hero */
  colorLevel?: number
  colorName?: string
  currencyAddress?: string
  currencyImage?: string
  description?: string
  elementName?: string
  elementSlug?: string
  growth?: number
  heroAvatar?: string
  heroGif?: string
  id?: string
  itemType?: string
  level?: number
  maxGrowth?: number
  maxStar?: number
  name?: string
  power?: number
  price?: string
  priceUSD?: number

  /** Hero Shard */
  quantity?: number
  rarity?: string

  /** Common */
  resultType?: string
  sketchFabId?: string
  source?: string
  star?: number
  symbol?: string
  tokenId?: number
}

export interface ModelConsumableItemData {
  avatar?: string
  category?: string
  color?: string
  colorLevel?: number
  colorName?: string
  currencyAddress?: string
  currencyImage?: string
  description?: string
  elementName?: string
  elementSlug?: string
  gameServerId?: number
  gameServerName?: string
  growth?: number
  id?: string
  itemType?: string
  listingId?: number
  maxGrowth?: number
  maxStar?: number
  name?: string
  ownerAddress?: string
  price?: string
  priceUSD?: number
  quantity?: number
  rarity?: string
  star?: number
  status?: string
  symbol?: string
  tokenId?: number
  type?: string
}

export interface ModelGameResponse {
  data?: number[]
  status?: number
}

export interface ModelHeroData {
  available?: number
  color?: string
  colorLevel?: number
  colorName?: string
  currencyAddress?: string
  currencyImage?: string
  elementName?: string
  elementSlug?: string
  gameServerId?: number
  gameServerName?: string
  heroAvatar?: string
  heroGif?: string
  id?: string
  isLocked?: boolean
  level?: number
  logTime?: string
  marketplaceType?: string
  maxStar?: number
  name?: string
  ownerAddress?: string
  power?: number
  price?: string
  priceUSD?: number
  rarity?: string
  remaining?: number
  sketchFabId?: string
  source?: string
  star?: number
  status?: string
  symbol?: string
  tokenId?: number
  totalCap?: number
}

export interface ModelHeroDetail {
  heroError?: ModelHeroError
  heroInfo?: ModelHeroData
  heroSkill?: ModelSkillData[]
  heroSkillbook?: ModelSkillbookData[]
  heroStat?: ModelHeroStatData
  history?: ModelUserTransaction[]
}

export interface ModelHeroError {
  code?: number
  isLock?: boolean
  message?: string
}

export interface ModelHeroStatData {
  dexterity?: number
  growth?: number
  intelligence?: number
  maxGrowth?: number
  strength?: number
  vitality?: number
}

export interface ModelPagination {
  pageCount?: number
  pageNumber?: number
  pageSize?: number
  totalCount?: number
}

export interface ModelSkillData {
  description?: string
  id?: string
  name?: string
  skillAvatar?: string
}

export interface ModelSkillbookData {
  id?: string
  info?: ModelSkillbookProperty[]
  name?: string
  total?: number
}

export interface ModelSkillbookProperty {
  name?: string
  value?: number
}

export interface ModelUserTransaction {
  activity?: string
  date?: string
  from?: string
  price?: number
  to?: string
}

export interface UtilROIResults {
  rewardTokenPer1k?: number
  roi?: number
  timeframe?: string
}
