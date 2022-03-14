import {
  TrustedItemFrame,
  TrustedItemRarity,
} from 'components/TrustedItemFrame'
import { ConsumableFrame, ConsumableFrameProps } from './ConsumableFrame'

export type TrustedItemCardProps = {
  rarity: TrustedItemRarity
  imageUrl: string
} & ConsumableFrameProps

export const TrustedItemCard = (props: TrustedItemCardProps) => {
  const { rarity, imageUrl, name, ...rest } = props

  return (
    <ConsumableFrame
      name={name}
      {...rest}
      innerFrame={
        <TrustedItemFrame rarity={rarity} name={name} image={imageUrl} />
      }
    />
  )
}
