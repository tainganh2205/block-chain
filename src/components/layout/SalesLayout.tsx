import { ReactNode } from 'react'
import { ROUTES } from 'constant/routes'
import { Footer } from 'components/Footer'
import { useWeb3React } from '@web3-react/core'
import { AssetNavTabs } from './components/AssetNavTabs'

interface OnSaleLayoutLayoutProps {
  children: ReactNode
  id: string
}

export function SalesLayout({ children, id }: OnSaleLayoutLayoutProps) {
  const { account } = useWeb3React()

  return (
    <>
      <div className="border-b border-gray-500 sticky top-[60px] bg-gray-800 z-[1]">
        <div className="container mx-auto">
          <AssetNavTabs
            charactersLink={ROUTES.MARKETPLACE_SALE.getUrl(id)}
            equipmentLink={ROUTES.MARKETPLACE_SALE_EQUIPMENT.getUrl(id)}
            consumablesLink={ROUTES.MARKETPLACE_SALE_CONSUMABLES.getUrl(
              id,
              'hero_shard',
            )}
            fashionLink={ROUTES.MARKETPLACE_SALE_FASHION.getUrl(id)}
            landLink={ROUTES.MARKETPLACE_SALE_LAND.getUrl(id)}
          />
        </div>
      </div>
      {children}
      {account && (
        <div className="container mx-auto px-5">
          <Footer />
        </div>
      )}
    </>
  )
}
