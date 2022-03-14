import { LinkTabs, TabProps } from 'components/LinkTabs'
import { ImageWithFallback } from 'components/ImageWithFallback'

interface AssetNavTabsProps {
  charactersLink: string
  equipmentLink: string
  consumablesLink: string
  fashionLink: string
  landLink: string
}

export function AssetNavTabs(props: AssetNavTabsProps) {
  const {
    charactersLink,
    consumablesLink,
    equipmentLink,
    fashionLink,
    landLink,
  } = props

  const tabsData: TabProps[] = [
    {
      label: 'Characters',
      icon: (
        <ImageWithFallback
          width={24}
          height={24}
          src="/img/marketplace/tab-character.webp"
          fallback="/img/marketplace/tab-character.png"
          alt="tab-icon"
        />
      ),
      href: charactersLink,
    },
    {
      label: 'Equipment',
      icon: (
        <ImageWithFallback
          width={24}
          height={24}
          src="/img/marketplace/tab-equipment.webp"
          fallback="/img/marketplace/tab-equipment.png"
          alt="tab-icon"
        />
      ),
      href: equipmentLink,
    },
    {
      label: 'Consumables',
      icon: (
        <ImageWithFallback
          width={24}
          height={24}
          src="/img/marketplace/tab-consumables.webp"
          fallback="/img/marketplace/tab-consumables.png"
          alt="tab-icon"
        />
      ),
      href: consumablesLink,
    },
    {
      label: 'Fashion',
      icon: (
        <ImageWithFallback
          width={24}
          height={24}
          src="/img/marketplace/tab-fashions.webp"
          fallback="/img/marketplace/tab-fashions.png"
          alt="tab-icon"
        />
      ),
      href: fashionLink,
    },
    {
      label: 'Land',
      icon: (
        <ImageWithFallback
          width={24}
          height={24}
          src="/img/marketplace/tab-lands.webp"
          fallback="/img/marketplace/tab-lands.png"
          alt="tab-icon"
        />
      ),
      href: landLink,
    },
  ]

  return <LinkTabs tabs={tabsData} />
}
