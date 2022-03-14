import { SwitchTabs } from 'components/SwitchTabs'
import { TrustedItemListing } from 'components/pages/marketplace/consumables/TrustedItemsListing'
import { ChestListing } from 'components/pages/marketplace/consumables/ChestListing'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ConsumableType, ConsumableMarketType } from 'types/consumable'

interface ConsumablesNavTabsProps {
  area: ConsumableMarketType
  type: ConsumableType
  id?: string
}

const types: ConsumableType[] = ['hero_shard', 'chest']

export function ConsumablesNavTabs(props: ConsumablesNavTabsProps) {
  const { area, type: typeProp, id = '' } = props
  const { push, pathname } = useRouter()
  const type = types.includes(typeProp) ? typeProp : types[0]

  const tabsData = [
    {
      label: 'Trusted items',
      content: <TrustedItemListing marketType={area} />,
    },
    {
      label: 'Chests',
      content: <ChestListing marketType={area} />,
    },
  ]

  const handleChange = (index: number) => {
    const query: Record<string, string> = { type: types[index] }
    if (id) {
      query.id = id
    }
    push({
      pathname,
      query,
    })
  }

  return (
    <>
      <Head>
        <title>Consumables | {area} | Legend of Fantasy War</title>
        <meta
          property="og:title"
          content="Consumables | Legend of Fantasy War"
        />
        <meta
          name="descripion"
          content="A unique vertical fantasy multiplayer 3D game with Blockchain Features."
        />
      </Head>
      <SwitchTabs
        className="mb-6"
        defaultIndex={types.indexOf(type)}
        tabs={tabsData}
        onChange={handleChange}
      />
    </>
  )
}
