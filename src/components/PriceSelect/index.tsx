import { Select } from 'components/Select'
import { HeroSortType } from 'types/hero'

interface PriceSelectProps {
  className?: string
  value: HeroSortType
  onChange: (value: HeroSortType) => void
  appearance?: 'default' | 'borderless'
}

const options: { text: string; value: HeroSortType }[] = [
  {
    text: 'Relevance',
    value: '',
  },
  {
    text: 'By lowest price',
    value: 'lowest-price',
  },
  {
    text: 'By highest price',
    value: 'highest-price',
  },
]

export const PriceSelect = (props: PriceSelectProps) => {
  const { className, value, onChange, appearance = 'default' } = props

  return (
    <Select
      className={className}
      appearance={appearance}
      value={value}
      onChange={onChange}
      options={options}
      align="right"
    />
  )
}
