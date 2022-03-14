import { ImageWithFallback } from 'components/ImageWithFallback'
import cx from 'classnames'

export interface CrystalFrameProps {
  image: string
  className?: string
  name: string
}

export const CrystalFrame = (props: CrystalFrameProps) => {
  const { image, name, className = '' } = props

  return (
    <div className={cx('relative w-[80px] h-[80px]', className)}>
      <div className="absolute inset-x-0 top-0 bottom-[7%] overflow-hidden">
        <img width="100%" height="auto" src={image} alt={name} />
      </div>
      <ImageWithFallback
        className="absolute"
        src="/img/marketplace/crystal/crystal-frame.webp"
        fallback="/img/marketplace/crystal-frame.png"
        alt={`Frame of ${name}`}
      />
    </div>
  )
}
