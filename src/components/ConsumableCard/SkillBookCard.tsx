import { SkillBookFrame } from 'components/SkillBookFrame'
import { SkillBookQuality } from 'types/skillbook'
import { ConsumableFrame, ConsumableFrameProps } from './ConsumableFrame'

export type SkillBookCardProps = {
  imageUrl: string
  quality: SkillBookQuality
} & ConsumableFrameProps

export const SkillBookCard = (props: SkillBookCardProps) => {
  const { imageUrl, quality, name, ...rest } = props

  return (
    <ConsumableFrame
      name={name}
      {...rest}
      innerFrame={
        <SkillBookFrame name={name} quality={quality} image={imageUrl} />
      }
    />
  )
}
