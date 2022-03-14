import { ImageWithFallback } from 'components/ImageWithFallback'
import cx from 'classnames'

export type TrustedItemRarity = 'N' | 'R' | 'NR' | 'UR' | 'SR' | 'SSR'

export interface TrustedItemFrameProps {
  image: string
  rarity: TrustedItemRarity
  className?: string
  name: string
}

export const TrustedItemFrame = (props: TrustedItemFrameProps) => {
  const { image, rarity, name, className = '' } = props

  return (
    <div className={cx('relative w-[90px] h-[90px]', className)}>
      <ImageWithFallback
        className="absolute top-[2%] left-[3.5%] w-[94%] h-[95%]"
        src="/img/marketplace/trusted-item/inner-frame-bg.webp"
        fallback="/img/marketplace/trusted-item/inner-frame-bg.png"
        alt=""
        aria-hidden
      />
      <div className="absolute inset-x-0 top-[2%] bottom-[2%] overflow-hidden">
        <img
          className="object-contain object-top w-[90px] h-[140px]"
          src={image}
          alt={name}
        />
      </div>
      <ImageWithFallback
        className="absolute"
        src={`/img/marketplace/trusted-item/rarity/${rarity}.webp`}
        fallback={`/img/marketplace/trusted-item/rarity/${rarity}.png`}
        alt={`Frame of ${name}`}
      />
    </div>
  )
}
