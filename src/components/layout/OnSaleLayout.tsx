import { ReactNode } from 'react'
import { ROUTES } from 'constant/routes'
import { AssetNavTabs } from './components/AssetNavTabs'

interface OnSaleLayoutLayoutProps {
  children: ReactNode
}

export function OnSaleLayout({ children }: OnSaleLayoutLayoutProps) {
  return (
    <>
      <div className="border-b border-gray-500 sticky top-[60px] bg-gray-800 z-[1]">
        <div className="container mx-auto">
          <AssetNavTabs
            charactersLink={ROUTES.PROFILE_ON_SALE_CHARACTERS}
            equipmentLink={ROUTES.PROFILE_ON_SALE_EQUIPMENT}
            consumablesLink={ROUTES.PROFILE_ON_SALE_CONSUMABLES}
            fashionLink={ROUTES.PROFILE_ON_SALE_FASHIONS}
            landLink={ROUTES.PROFILE_ON_SALE_LANDS}
          />
        </div>
      </div>
      {children}
    </>
  )
}
