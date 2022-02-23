import { MenuEntry } from '@artechain/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: false,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
    ],
  },
  {
    label: 'NFT',
    icon: 'NftIcon',
    initialOpenState: false,
    items: [
      {
        label: 'Market NFT',
        href: '/marketNFT',
      },
      {
        label: 'Genesis Market',
        href: '/genesisMarket',
      },
      {
        label: 'My NFT Artworks',
        href: '/collections',
      },
      {
        label: 'Mint NFT',
        href: '/mintNFT',
      },
     
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/',
  },
  {
    label: 'Start Pools',
    icon: 'StakingIcon',
    href: '/',
  },
  {
    label: 'IDO Pools',
    icon: 'IDOPoolIcon',
    href: '/',
  },
  {
    label: 'Launchpad',
    icon: 'TicketIcon',
    href: '/launchpad',
  },
  {
    label: 'Prediction',
    icon: 'PredictionIcon',
    href: '/prediction',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: '/',
      },
      {
        label: 'Docs',
        href: '/',
      },
      {
        label: 'Blog',
        href: '/',
      },
    ],
  },
]

export default config
