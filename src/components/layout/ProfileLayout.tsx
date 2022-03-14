import { ReactNode } from 'react'
import { ROUTES } from 'constant/routes'
import { LinkTabs, TabProps } from 'components/LinkTabs'
import { Footer } from 'components/Footer'
import { useWeb3React } from '@web3-react/core'
import { StickyTabsContainer } from './components/StickyTabsContainer'

interface ProfileLayoutProps {
  children: ReactNode
  hasFooter?: boolean
}

export function ProfileLayout({
  children,
  hasFooter = true,
}: ProfileLayoutProps) {
  const { account } = useWeb3React()

  const tabsData: TabProps[] = [
    {
      label: 'Dashboard',
      href: ROUTES.PROFILE_DASHBOARD,
    },
    {
      label: 'My assets',
      href: ROUTES.PROFILE_MY_ASSETS_CHARACTERS,
      activePaths: [
        ROUTES.PROFILE_MY_ASSETS,
        ROUTES.PROFILE_MY_ASSETS_CHARACTERS,
        ROUTES.PROFILE_CHARACTERS,
      ],
    },
    {
      label: 'On Sale',
      href: ROUTES.PROFILE_ON_SALE_CHARACTERS,
      activePaths: [ROUTES.PROFILE_ON_SALE, ROUTES.PROFILE_ON_SALE_CHARACTERS],
    },
    {
      label: 'Referral',
      href: ROUTES.PROFILE_REFERRAL,
    },
  ]

  return (
    <>
      <StickyTabsContainer>
        <LinkTabs tabs={tabsData} />
      </StickyTabsContainer>
      {children}
      {account && hasFooter && (
        <div className="container mx-auto px-5">
          <Footer />
        </div>
      )}
    </>
  )
}
