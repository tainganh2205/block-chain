import { ReactNode } from 'react'
import { ROUTES } from 'constant/routes'
import { LinkTabs, TabProps } from 'components/LinkTabs'
import { IS_PRODUCTION } from 'constant/env'
import { Stars } from 'components/Stars'
import { StickyTabsContainer } from './components/StickyTabsContainer'

interface GemCenterLayoutProps {
  children: ReactNode
}

export function GemCenterLayout({ children }: GemCenterLayoutProps) {
  // Temporary switch `Reward Portal` and `Gem Shop` order for IDO
  const tabsData: TabProps[] = IS_PRODUCTION
    ? [
        {
          label: 'Reward Portal',
          href: ROUTES.GEM_REWARD_CLAIMS,
        },
        {
          label: 'Gem Shop',
          href: ROUTES.GEM_SHOP,
        },
        {
          label: 'Staking',
          href: ROUTES.GEM_STAKING,
        },
        {
          label: 'Super Farm',
          href: ROUTES.SUPER_FARM,
        },
        {
          label: 'Mining Pool',
          href: ROUTES.LEGEND_MINING,
          icon: <Stars max={1} value={1} size="sm" />,
        },
      ]
    : [
        {
          label: 'Gem Shop',
          href: ROUTES.GEM_SHOP,
        },
        {
          label: 'Reward Portal',
          href: ROUTES.GEM_REWARD_CLAIMS,
        },
        {
          label: 'Staking',
          href: ROUTES.GEM_STAKING,
        },
        {
          label: 'Super Farm',
          href: ROUTES.SUPER_FARM,
        },
        {
          label: 'Mining Pool',
          href: ROUTES.LEGEND_MINING,
          icon: <Stars max={1} value={1} size="sm" />,
        },
      ]

  return (
    <>
      <StickyTabsContainer>
        <LinkTabs tabs={tabsData} />
      </StickyTabsContainer>
      {children}
    </>
  )
}
