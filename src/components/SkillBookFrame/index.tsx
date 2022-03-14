import { ImageWithFallback } from 'components/ImageWithFallback'
import cx from 'classnames'
import { SkillBookQuality } from 'types/skillbook'

export interface SkillBookFrameProps {
  image: string
  quality: SkillBookQuality
  className?: string
  name: string
}

export const SkillBookFrame = (props: SkillBookFrameProps) => {
  const { image, quality, name, className = '' } = props

  return (
    <div className={cx('relative w-[80px] h-[80px]', className)}>
      <div className="absolute inset-0 overflow-hidden">
        <img width="100%" height="auto" src={image} alt={name} />
      </div>
      <ImageWithFallback
        className="absolute"
        src={`/img/marketplace/skill-book/frame/${quality}.webp`}
        fallback={`/img/marketplace/skill-book/frame/${quality}.png`}
        alt={`Frame of ${name}`}
      />
    </div>
  )
}
