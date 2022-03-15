import { ChainId, JSBI, Percent, Token, WETH } from '@artechain/sdk'

// export const ROUTER_ADDRESS = '0x3041B4FDF86006B0A87415A93929e8F617F0DAE7'
export const ROUTER_ADDRESS = '0xFF43Ab0e317b18e208a6ecE0520D5D6558DD3eb5'
export const BSCS_REWARD_ADDRESS = '0xbC3AcF6ce2FFF5692a8f0DD9ED28014c8E44115B'
// export const STAKE_NFT_CONTRACT = '0xd16f97870e40ae90b0c65ca62239c3c0d25dd1e8'
// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const DAI = new Token(ChainId.MAINNET, '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', 18, 'DAI', 'Dai Stablecoin')
export const BUSD = new Token(ChainId.MAINNET, '0xe9e7cea3dedca5984780bafc599bd69add087d56', 18, 'BUSD', 'Binance USD')
export const USDT = new Token(ChainId.MAINNET, '0x55d398326f99059ff775485246999027b3197955', 18, 'USDT', 'Tether USD')
export const UST = new Token(
  ChainId.MAINNET,
  '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
  18,
  'UST',
  'Wrapped UST Token'
)

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.BSCTESTNET]: [WETH[ChainId.BSCTESTNET]],
}

export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT, UST],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0x43bd1Db5b882b081cCbA03CA26311e3Fa9f69924', 18, 'BSCS', 'BSCSswap-Test Token'),
      new Token(ChainId.MAINNET, '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'),
    ],
    [BUSD, USDT],
    [DAI, USDT],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '56')

export const STATKE_NFTS = {
  // 56: '0x2bf314b388935fB9b4a0F568939a663f22e99b33',
  56: '0x1e3fA6a96C20259E030a105308a9a09d1B6d150F',
  97: '0xD6B35471f4a35F4E93c42E7D145C6f865c84CC52',
}

const NFTs = {
  56: '0x2433bE070fAeE3F960C435fb91e9f320986DdE34',
  97: '0x341EAd06CbcfA919Ef2bD902DF6f536d730E0456',
}

const Bids = {
  56: '0x1B02D6E3BD9B2C812ACeE4068195fE29680f0c0C',
  97: '0x1e288b14a3e78433609aFF438Bae2cB15c65b761',
}
const BSCSs = {
  56: '0xbcb24afb019be7e93ea9c43b7e22bb55d5b7f45d',
  97: '0xE1068958C357e84f2C065D8C9b9f15C70028B546',
}

export const CONTRACT_BID_VERSION = {
  0: '0xF6155243b3649b0957A9c11620D8EA62E11a59C4', // contract bid old
  1: '0x1B02D6E3BD9B2C812ACeE4068195fE29680f0c0C', // contract bid new
}

export const STAKE_NFT = STATKE_NFTS[NETWORK_CHAIN_ID]
export const TOKEN_BSCS = BSCSs[NETWORK_CHAIN_ID]
export const BSCS_BURNED_ADDRESS = '0x000000000000000000000000000000000000dead'
export const FARM_CONTRACT_BSCS = '0x6bf10f6b156aaa1508765fe5f531ea510165a8ff'
export const CONTRACT_NFT = NFTs[NETWORK_CHAIN_ID]
export const CONTRACT_BID = Bids[NETWORK_CHAIN_ID]
export const MINT_PRICE = '1000000000000000' // 0,01BNB

export const NFT_CONTRACTID = '0x2433bE070fAeE3F960C435fb91e9f320986DdE34'
export const API_NFT = 'https://api.artinfinity.app/api'
export const API_TEST = 'https://api.artinfinity.app/api'
export const API_IMAGE = 'https://api.artinfinity.app/img/nft/'
export const BSCSCAN_APIKEY = 'T2IXE481IAX4947JTMHSB7482992S7VE1W'
export const API_VIDEO = 'https://api.artinfinity.app/video/'
export const TOKEN_BSCS_TESTNET = BSCSs[NETWORK_CHAIN_ID]
export const BSCSCAN_API_MAINNET = 'https://api.bscscan.com'

export const FILE_TYPE = {
  IMAGE: 1,
  VIDEO: 2,
  GIF: 3,
}
export const FILE_TYPE_LIST = [
  {
    label: 'All',
    value: 0,
  },
  {
    label: 'Image',
    value: 1,
  },
  {
    label: 'Video',
    value: 2,
  },
  {
    label: 'Gif',
    value: 3,
  },
]

export const KEY_CRYPTOJS = '4kHlZXyYTew38QnxvWFnag=='
export const ADDRESS_ADMIN_BSCS = '0xe806Aa2470D4922C7C7e7fA7C05025508E592b2F'
export const ADDRESS_ADMIN_BNB = '0x793101bB7a0001F5bC579A541E8F8124432383DA'
export const CONTRACT_JOIN_POOL = '0xa4319680d9bF208CeB32d019A4F45503F58ABB44'
export const CONTRACT_BOX_MYSTERY = '0x77d5feb1cd060914D45e99ff6555f32Fc4D87BeC'
export const CONTRACT_BOX_MARKET= '0x52318cFaC6D199DE0D703B3470eF3865af3AB3AA'

const idoSC = {
  56: '0x32c0fc73d084a7D830d033264d14945E60e0314e',
  97: '',
}
export const IDO_CONTRACT_ADDR = idoSC[NETWORK_CHAIN_ID]

