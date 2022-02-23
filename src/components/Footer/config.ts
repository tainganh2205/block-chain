import Title from 'antd/lib/skeleton/Title'
import { FooterItem } from './index.d'

const config: FooterItem[] = [
  {
    id: '1',
    title: 'About',
    items: [
      {
        title: 'Docs',
        href: 'https://docs.artinfinity.app/welcome-to-artinfinity/',
      },
      {
        title: 'Team',
        href: 'https://docs.artinfinity.app/welcome-to-artinfinity/team/our-team',
      },
      {
        title: 'Roadmap',
        href: 'https://docs.artinfinity.app/welcome-to-artinfinity/roadmap',
      },
      {
        title: 'Github',
        href: 'https://github.com/artinfinityofficial',
      },
    ],
  },
  {
    id: '2',
    title: 'Product',
    items: [
      {
        title: 'Exchange',
        href: '/swap',
      },
      {
        title: 'Add liquidity',
        href: '/pool',
      },
      {
        title: 'Start Pools',
        href: 'https://stake.artinfinity.app/#/',
      },
      {
        title: 'Farms',
        href: 'https://stake.artinfinity.app/#/Farms',
      },
      {
        title: 'NFT',
        href: '/NFTmarket',
      },
    ],
  },
  {
    id: '3',
    title: 'Developer',
    items: [
      {
        title: 'GameFi',
        href: 'https://docs.artinfinity.app/welcome-to-artinfinity/core-products/gamefi',
      },
      {
        title: 'Metaverse',
        href: 'https://docs.artinfinity.app/welcome-to-artinfinity/core-products/gamefi/phase-3-metaverse',
      },
    ],
  },
]

export default config


