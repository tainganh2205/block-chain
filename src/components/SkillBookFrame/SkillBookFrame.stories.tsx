import { storiesOf } from '@storybook/react'
import { SkillBookFrame, SkillBookFrameProps } from '.'

const data: Array<SkillBookFrameProps> = [
  {
    image: '/img/marketplace/skill-book/book/physic-atk.png',
    quality: 'blue',
    name: 'Test',
  },
  {
    image: '/img/marketplace/skill-book/book/reduce-injure.png',
    quality: 'green',
    name: 'Test',
  },
  {
    image: '/img/marketplace/skill-book/book/passive.png',
    quality: 'orange',
    name: 'Test',
  },
  {
    image: '/img/marketplace/skill-book/book/ki.png',
    quality: 'violet',
    name: 'Test',
  },
  {
    image: '/img/marketplace/skill-book/book/physic-atk.png',
    quality: 'white',
    name: 'Test',
  },
  {
    image: '/img/marketplace/skill-book/book/physic-atk.png',
    quality: 'yellow',
    name: 'Test',
  },
]

storiesOf('components/ConsumableFrame/SkillBook', module).add('basic', () => {
  return (
    <div className="flex items-center space-x-4">
      {data.map((item, index) => {
        return (
          <SkillBookFrame
            key={index}
            quality={item.quality}
            name={item.name}
            image={item.image}
          />
        )
      })}
    </div>
  )
})
