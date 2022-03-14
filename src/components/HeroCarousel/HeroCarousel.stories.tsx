import { storiesOf } from '@storybook/react'
import { HeroCarousel, HeroCarouselProps } from '.'

const heros: HeroCarouselProps['items'] = Array.from({ length: 5 }).map(
  (i) => ({
    id: `${i}`,
    stars: 4,
    attack: 9999,
    level: 12,
    imageUrl: '/img/hero/sample.png',
    gifImageUrl: '/img/hero/sample.png',
    name: `Joe Doe`,
    elemental: 'fire',
    levelBadgeColor: 'green',
    priceUSD: 40,
    lfw: 20,
  }),
)

storiesOf('components/HeroCarousel', module).add('basic', () => {
  return (
    <div className="space-y-4">
      <HeroCarousel items={heros} />
    </div>
  )
})
