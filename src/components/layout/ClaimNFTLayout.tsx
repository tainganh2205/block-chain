import React from 'react'
import { Text } from 'components/Text'
import { Footer } from 'components/Footer'
import { LinkTabs } from 'components/LinkTabs'
import { ConnectWalletRequireView } from 'components/ConnectWalletRequireView'
import { useAuthContext } from 'context/auth'
import { ROUTES } from 'constant/routes'

interface ClaimNFTLayoutProps {
  children: React.ReactNode
}

const ClaimNFTLayout = ({ children }: ClaimNFTLayoutProps) => {
  const { isWalletConnected, walletId } = useAuthContext()

  if (!isWalletConnected) {
    return <ConnectWalletRequireView />
  }

  const tabsData = [
    {
      label: 'Binance NFT',
      content: <Text className="text-gray-100 p-6">Binance NFT</Text>,
      href: ROUTES.BINANCE_NFT_CLAIM,
    },
    {
      label: 'Apollo-X',
      content: <Text className="text-gray-100 p-6">Apollo-X</Text>,
      href: ROUTES.APOLLO_X_NFT_CLAIM,
    },
  ]

  return (
    <div className="container mx-auto px-5">
      <div className="w-full sm:mt-6 my-5">
        <Text className="text-32 font-bold" color="white">
          Claim your NFT
        </Text>
        <Text className="mt-2" color="gray-300">
          This page is for those who purchased LFW NFT from Binance NFT and
          Apollo-X to claim their LFW NFTs.
        </Text>
      </div>
      <div className="border-b border-gray-500 sticky top-[60px] bg-gray-800 z-[1]">
        <LinkTabs tabs={tabsData} />
      </div>
      <div className="sm:mt-6 mt-5">{children}</div>
      {walletId && (
        <div className="mt-20">
          <Footer />
        </div>
      )}
    </div>
  )
}

export default ClaimNFTLayout
