import { storiesOf } from '@storybook/react'
import { ConsumableCardDetail } from '.'

storiesOf('components/ConsumableCardDetail', module).add('basic', () => {
  return (
    <div className="flex space-x-4 items-center">
      <ConsumableCardDetail
        quantity={20}
        className="w-[200px] h-[280px]"
        name="Mongol Chaplain Trusted Item"
        size="md"
        rarity="N"
        imageUrl="/img/marketplace/trusted-item/test_character.png"
        itemType="hero_shard"
      />
      <ConsumableCardDetail
        quantity={20}
        className="w-[300px] h-[420px]"
        name="Mongol Chaplain Trusted Item"
        size="lg"
        rarity="N"
        imageUrl="/img/marketplace/trusted-item/test_character.png"
        itemType="hero_shard"
      />
      <ConsumableCardDetail
        quantity={20}
        className="w-[400px] h-[580px]"
        name="Mongol Chaplain Trusted Item"
        size="xl"
        rarity="N"
        imageUrl="/img/marketplace/trusted-item/test_character.png"
        itemType="hero_shard"
      />
    </div>
  )
})
