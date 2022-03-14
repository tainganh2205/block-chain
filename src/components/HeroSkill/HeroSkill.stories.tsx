import { storiesOf } from '@storybook/react'
import { HeroSkill } from '.'

storiesOf('components/HeroSkill', module).add('basic', () => {
  return (
    <HeroSkill
      icon="/img/hero/skill-sample.png"
      name="cungbinh_skill_1"
      description="Increase the chance of counterattack when one’s suffer a debuff."
    />
  )
})
