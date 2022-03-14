import { storiesOf } from '@storybook/react'
import { TrustedItemFrameProps, TrustedItemFrame } from '.'

const data: Array<TrustedItemFrameProps> = [
  {
    image: '/img/marketplace/trusted-item/test_character.png',
    rarity: 'N',
    name: 'Test',
  },
  {
    image: '/img/marketplace/trusted-item/test_character.png',
    rarity: 'R',
    name: 'Test',
  },
  {
    image: '/img/marketplace/trusted-item/test_character.png',
    rarity: 'UR',
    name: 'Test',
  },
  {
    image: '/img/marketplace/trusted-item/test_character.png',
    rarity: 'NR',
    name: 'Test',
  },
  {
    image: '/img/marketplace/trusted-item/test_character.png',
    rarity: 'SR',
    name: 'Test',
  },
  {
    image: '/img/marketplace/trusted-item/test_character.png',
    rarity: 'SSR',
    name: 'Test',
  },
]

storiesOf('components/ConsumableFrame/TrustedItem', module).add('basic', () => {
  return (
    <div className="flex items-center space-x-4">
      {data.map((item, index) => {
        return (
          <TrustedItemFrame
            className="h-[90px] w-[90px]"
            key={index}
            rarity={item.rarity}
            name={item.name}
            image={item.image}
          />
        )
      })}
    </div>
  )
})
