import { IconBNB } from 'components/icons/components/IconBNB'
import { ImageWithFallback } from 'components/ImageWithFallback1'

export interface IconCurrencyProps {
  symbol?: string
  className?: string
  width?: string | number
  height?: string | number
}

export const IconCurrency = (props: IconCurrencyProps) => {
  const { className = '', symbol = 'BNB', width, height } = props

  switch (symbol) {
    case 'LFW':
      return (
        <ImageWithFallback
          className={className}
          src="/img/profile/icon-nft.webp"
          fallback="/img/profile/icon-nft.png"
          width={width}
          height={height}
        />
      )
    default:
      return <IconBNB className={className} width={width} height={height} />
  }
}
