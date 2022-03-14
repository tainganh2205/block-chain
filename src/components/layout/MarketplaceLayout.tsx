import { ReactNode } from 'react'
import { ROUTES } from 'constant/routes'
import { Footer } from 'components/Footer'
import { useWeb3React } from '@web3-react/core'
import { StickyTabsContainer } from './components/StickyTabsContainer'
import { AssetNavTabs } from './components/AssetNavTabs'

interface MarketplaceLayoutProps {
  children: ReactNode
}

export function MarketplaceLayout({ children }: MarketplaceLayoutProps) {
  const { account } = useWeb3React()
  return (
    <>
      <StickyTabsContainer>
        <AssetNavTabs
          charactersLink={ROUTES.MARKETPLACE_CHARACTERS.getUrl()}
          equipmentLink={ROUTES.MARKETPLACE_EQUIPMENT}
          consumablesLink={ROUTES.MARKETPLACE_CONSUMABLES}
          fashionLink={ROUTES.MARKETPLACE_FASHIONS}
          landLink={ROUTES.MARKETPLACE_LANDS}
        />
      </StickyTabsContainer>
      {children}
      {account && (
        <div className="container mx-auto px-5">
          <Footer />
        </div>
      )}
    </>
  )
}
