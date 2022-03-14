import cx from 'classnames'
import Link from 'next/link'
import { Card } from 'components/Card'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { Text } from 'components/Text'
import { convertEtherToWei } from 'utils/wallet'
import { ConsumableAssetStatus } from 'types/consumable'
import { IconCurrency } from 'components/IconCurrency'
import { formatCurrency } from 'utils/currency'
import { formatNumber } from 'utils/number'

export type ConsumableFrameSize = 'sm' | 'md' | 'lg'

export interface ConsumableFrameProps {
  size?: ConsumableFrameSize
  children?: React.ReactNode
  className?: string
  quantity: number
  name: string
  price?: string
  priceUSD?: number
  symbol?: string
  href?: string
  status?: ConsumableAssetStatus
  onClick?: () => void
  hidePrice?: boolean
  innerFrame?: React.ReactNode
}

const getCardSize = (size: ConsumableFrameSize) => {
  switch (size) {
    case 'lg':
      return 'w-[213px]'
    case 'sm':
      return 'w-[149px]'
    default:
      return 'w-[181px]'
  }
}

const getBadgeSize = (size: ConsumableFrameSize) => {
  switch (size) {
    case 'md':
      return 'h-[25px] w-[60px]'
    case 'sm':
      return 'h-[20px] w-[48px]'
    default:
      return 'h-[30px] w-[72px]'
  }
}

const getFontBySize = (size: ConsumableFrameSize) => {
  switch (size) {
    case 'lg':
      return 'text-lg'
    case 'sm':
      return 'text-xs'
    default:
      return 'text-sm'
  }
}

export const ConsumableFrame = (props: ConsumableFrameProps) => {
  const {
    size = 'md',
    quantity = 0,
    className = '',
    name,
    price,
    priceUSD,
    symbol,
    innerFrame,
    href,
    status,
    hidePrice = false,
    onClick,
  } = props
  const badgeSize = getBadgeSize(size)

  const indexing = status?.endsWith('ing')
  const fadeClassName = indexing ? 'opacity-50' : ''

  const content = (
    <Card
      as={href && !indexing ? 'a' : 'div'}
      className={cx(
        'relative border-2 border-gray-200 pt-9 px-7 pb-[10px] flex flex-col justify-center items-center',
        { 'cursor-pointer': href && !indexing },
        getCardSize(size),
        className,
      )}
      onClick={() => {
        if (!indexing && onClick) {
          onClick()
        }
      }}
    >
      <div className="absolute top-0 left-0">
        <ImageWithFallback
          className={cx(badgeSize, fadeClassName)}
          src="/img/marketplace/trusted-item/gray-badge.webp"
          fallback="/img/marketplace/trusted-item/gray-badge.png"
          alt="level-badge"
        />
        <Text
          as="span"
          className={cx(
            'leading-snug text-gray-100 pr-2 font-bold absolute inset-0 flex items-center justify-center',
            fadeClassName,
            getFontBySize(size),
          )}
        >
          x {quantity}
        </Text>
      </div>
      <div className={cx('mb-3', fadeClassName)}>{innerFrame}</div>
      <div
        className={cx('text-center', fadeClassName, {
          'w-[125px]': size === 'md',
          'w-[90px]': size === 'sm',
        })}
      >
        <Text
          className={cx({
            'text-base': size === 'md',
            'text-lg': size === 'lg',
            'text-xs': size === 'sm',
          })}
          as="b"
          color="white"
        >
          {name}
        </Text>
        {hidePrice ? null : (
          <div>
            <div className="flex justify-center items-center space-x-1 mt-1">
              <IconCurrency
                className="h-4 w-4 object-scale-down"
                symbol={symbol}
              />
              <Text
                className={cx({
                  'text-sm': size === 'md',
                  'text-base': size === 'lg',
                  'text-[10px]': size === 'sm',
                })}
                as="b"
                color="white"
              >
                {formatNumber(Number(convertEtherToWei(price || '0')))} {symbol}
              </Text>
            </div>
            <Text
              className={cx('mt-1', {
                'text-xs': size === 'md',
                'text-sm': size === 'lg',
                'text-[8px]': size === 'sm',
              })}
              as="b"
              color="gray-300"
            >
              ~{formatCurrency(priceUSD || 0)}
            </Text>
          </div>
        )}
      </div>
      {indexing && (
        <div className="center-xy absolute text-white bg-gray-900 px-8 font-medium py-1 rounded-full tracking-wide">
          Processing
        </div>
      )}
    </Card>
  )

  if (href && !indexing) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
