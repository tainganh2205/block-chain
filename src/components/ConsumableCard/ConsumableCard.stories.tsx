import { storiesOf } from '@storybook/react'
import {
  TrustedItemCard,
  CrystalCard,
  SkillBookCard,
  LegendaryChestCard,
} from '.'

storiesOf('components/ConsumableCard', module).add('TrustedItems', () => {
  return (
    <div className="flex space-x-4 items-center">
      <TrustedItemCard
        name="Mongol Chaplain Trusted Item"
        size="sm"
        rarity="N"
        price="80000000000000000"
        priceUSD={50}
        quantity={2}
        symbol="LFW"
        imageUrl="/img/marketplace/trusted-item/test_character.png"
      />
      <TrustedItemCard
        name="Mongol Chaplain Trusted Item"
        size="md"
        rarity="N"
        price="80000000000000000"
        priceUSD={50}
        quantity={2}
        symbol="LFW"
        imageUrl="/img/marketplace/trusted-item/test_character.png"
      />
      <TrustedItemCard
        size="lg"
        name="Mongol Chaplain Trusted Item"
        rarity="N"
        price="80000000000000000"
        priceUSD={50}
        quantity={2}
        symbol="LFW"
        imageUrl="/img/marketplace/trusted-item/test_character.png"
      />
    </div>
  )
})

storiesOf('components/ConsumableCard', module).add('Crystal', () => {
  return (
    <div className="flex space-x-4 items-center">
      <CrystalCard
        name="Crystal"
        size="sm"
        price="80000000000000000"
        priceUSD={50}
        quantity={2}
        symbol="LFW"
        imageUrl="/img/marketplace/crystal/mythical-crystal-5.png"
      />
      <CrystalCard
        name="Crystal"
        size="md"
        price="80000000000000000"
        priceUSD={50}
        quantity={2}
        symbol="LFW"
        imageUrl="/img/marketplace/crystal/mythical-crystal-5.png"
      />
      <CrystalCard
        size="lg"
        name="Crystal"
        price="80000000000000000"
        priceUSD={50}
        quantity={2}
        symbol="LFW"
        imageUrl="/img/marketplace/crystal/mythical-crystal-5.png"
      />
    </div>
  )
})

storiesOf('components/ConsumableCard', module).add('SkillBook', () => {
  return (
    <div className="flex space-x-4 items-center">
      <SkillBookCard
        name="SkillBook"
        size="sm"
        price="80000000000000000"
        priceUSD={50}
        quantity={2}
        symbol="LFW"
        imageUrl="/img/marketplace/skill-book/book/reduce-injure.png"
        quality="blue"
      />
      <SkillBookCard
        name="SkillBook"
        size="md"
        price="80000000000000000"
        priceUSD={50}
        quantity={2}
        symbol="LFW"
        imageUrl="/img/marketplace/skill-book/book/reduce-injure.png"
        quality="green"
      />
      <SkillBookCard
        size="lg"
        name="SkillBook"
        price="80000000000000000"
        priceUSD={50}
        quantity={2}
        symbol="LFW"
        imageUrl="/img/marketplace/skill-book/book/reduce-injure.png"
        quality="violet"
      />
    </div>
  )
})

storiesOf('components/ConsumableCard', module).add('Legendary Chest', () => {
  return (
    <div className="flex space-x-4 items-center">
      <LegendaryChestCard
        name="Legendary Chest"
        size="sm"
        price="80000000000000000"
        priceUSD={50}
        quantity={2}
        symbol="LFW"
      />
      <LegendaryChestCard
        name="Legendary Chest"
        size="md"
        price="80000000000000000"
        priceUSD={50}
        quantity={2}
        symbol="LFW"
      />
      <LegendaryChestCard
        size="lg"
        name="Legendary Chest"
        price="80000000000000000"
        priceUSD={50}
        quantity={2}
        symbol="LFW"
      />
    </div>
  )
})
