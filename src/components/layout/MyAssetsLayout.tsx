import { ReactNode } from 'react'
import { ROUTES } from 'constant/routes'
import { AssetNavTabs } from './components/AssetNavTabs'

interface MarketplaceLayoutProps {
  children: ReactNode
}

export function MyAssetsLayout({ children }: MarketplaceLayoutProps) {
  return (
    <>
      <div className="border-b border-gray-500 sticky top-[60px] bg-gray-800 z-[1]">
        <div className="container mx-auto">
          <AssetNavTabs
            charactersLink={ROUTES.PROFILE_MY_ASSETS_CHARACTERS}
            equipmentLink={ROUTES.PROFILE_MY_ASSETS_EQUIPMENT}
            consumablesLink={ROUTES.PROFILE_MY_ASSETS_CONSUMABLES}
            fashionLink={ROUTES.PROFILE_MY_ASSETS_FASHIONS}
            landLink={ROUTES.PROFILE_MY_ASSETS_LANDS}
          />
        </div>
      </div>
      {children}
    </>
  )
}
