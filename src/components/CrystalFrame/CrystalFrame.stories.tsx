import { storiesOf } from '@storybook/react'
import { CrystalFrame, CrystalFrameProps } from '.'

const data: Array<CrystalFrameProps> = [
  {
    image: '/img/marketplace/crystal/mythical-crystal-5.png',
    name: 'Test',
  },
  {
    image: '/img/marketplace/crystal/mythical-crystal-6.png',
    name: 'Test',
  },
  {
    image: '/img/marketplace/crystal/mythical-crystal-7.png',
    name: 'Test',
  },
  {
    image: '/img/marketplace/crystal/mythical-crystal-8.png',
    name: 'Test',
  },
  {
    image: '/img/marketplace/crystal/mythical-crystal-9.png',
    name: 'Test',
  },
  {
    image: '/img/marketplace/crystal/mythical-crystal-10.png',
    name: 'Test',
  },
  {
    image: '/img/marketplace/crystal/mythical-crystal-11.png',
    name: 'Test',
  },
  {
    image: '/img/marketplace/crystal/mythical-crystal-12.png',
    name: 'Test',
  },
]

storiesOf('components/ConsumableFrame/Crystal', module).add('basic', () => {
  return (
    <div className="flex items-center space-x-4">
      {data.map((item, index) => {
        return <CrystalFrame key={index} name={item.name} image={item.image} />
      })}
    </div>
  )
})
