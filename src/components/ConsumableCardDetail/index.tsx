import { Card } from 'components/Card'
import {
  TrustedItemFrame,
  TrustedItemRarity,
} from 'components/TrustedItemFrame'
import cx from 'classnames'
import { Text } from 'components/Text'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { ConsumableAssetStatus, ConsumableType } from 'types/consumable'
import { useMemo } from 'react'

export type ConsumableDetailCardSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ConsumableCardDetailProps {
  imageUrl: string
  name: string
  className?: string
  rarity?: TrustedItemRarity
  size?: ConsumableDetailCardSize
  quantity: number
  status?: ConsumableAssetStatus
  itemType: ConsumableType
}

export const ConsumableCardDetail = (props: ConsumableCardDetailProps) => {
  const {
    itemType,
    imageUrl,
    name,
    size = 'md',
    className = '',
    rarity,
    status = 'idle',
  } = props

  const indexing = status?.endsWith('ing')

  const fadeClassName = indexing ? 'opacity-50' : ''

  const itemFrame = useMemo(() => {
    if (itemType === 'hero_shard') {
      return (
        <TrustedItemFrame
          className={cx('w-1/4 left-[-2%] top-[5%]', fadeClassName)}
          rarity={rarity as TrustedItemRarity}
          name={name}
          image={imageUrl}
        />
      )
    }
    if (itemType === 'chest') {
      return (
        <img
          className="w-[256] h-[256]"
          src={imageUrl}
          alt={name}
          width="256px"
          height="256px"
        />
      )
    }
    return null
  }, [itemType, fadeClassName, rarity, imageUrl, name])

  return (
    <Card
      className={cx(
        'relative border-2 border-gray-200 flex flex-col justify-center items-center',
        className,
      )}
    >
      <ImageWithFallback
        className={cx('absolute inset-0', fadeClassName)}
        src="/img/marketplace/trusted-item/foundation.webp"
        fallback="/img/marketplace/trusted-item/foundation.png"
        alt=""
        aria-hidden
      />
      {itemFrame}
      <div className="pb-[60%]" />
      <div
        className={cx('text-center absolute bottom-[8%] px-10', fadeClassName, {
          'max-w-md': size === 'md',
          'max-w-sm': size === 'sm',
        })}
      >
        <Text
          className={cx({
            'text-base': size === 'md',
            'text-2xl': size === 'lg',
            'text-xs': size === 'sm',
            'text-32 leading-tight': size === 'xl',
          })}
          as="b"
          color="white"
        >
          {name}
        </Text>
      </div>
      {indexing && (
        <div className="text-2xl center-xy absolute text-white bg-gray-900 px-8 font-medium py-1 rounded-full tracking-wide">
          Processing
        </div>
      )}
    </Card>
  )
}
