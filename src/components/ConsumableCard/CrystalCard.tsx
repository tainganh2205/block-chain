import { CrystalFrame } from 'components/CrystalFrame'
import { ConsumableFrame, ConsumableFrameProps } from './ConsumableFrame'

export type CrystalCardProps = {
  imageUrl: string
} & ConsumableFrameProps

export const CrystalCard = (props: CrystalCardProps) => {
  const { imageUrl, name, ...rest } = props

  return (
    <ConsumableFrame
      name={name}
      {...rest}
      innerFrame={<CrystalFrame name={name} image={imageUrl} />}
    />
  )
}
