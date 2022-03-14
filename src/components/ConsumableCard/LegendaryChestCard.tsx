import { ConsumableFrame, ConsumableFrameProps } from './ConsumableFrame'

export type LegendaryChestCardProps = {
  imageUrl?: string
} & ConsumableFrameProps

export const LegendaryChestCard = (props: LegendaryChestCardProps) => {
  const { name, imageUrl, ...rest } = props

  return (
    <ConsumableFrame
      name={name}
      {...rest}
      innerFrame={<img src={imageUrl} width={120} height={120} alt={name} />}
    />
  )
}
