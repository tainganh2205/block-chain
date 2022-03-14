import { ElementalBadge } from 'components/ElementalBadge'
import { RarityBadge } from 'components/RarityBadge'

export const rarityList = [
  {
    value: 'N',
    icon: <RarityBadge className="mt-2 ml-1" type="N" />,
  },
  {
    value: 'NR',
    icon: <RarityBadge className="mt-2 ml-1" type="NR" />,
  },
  {
    value: 'R',
    icon: <RarityBadge className="mt-2 ml-1" type="R" />,
  },
  {
    value: 'SR',
    icon: <RarityBadge className="mt-2 ml-1" type="SR" />,
  },
  {
    value: 'UR',
    icon: <RarityBadge className="mt-2 ml-1" type="UR" />,
  },
  {
    value: 'SSR',
    icon: <RarityBadge className="mt-2 ml-1" type="SSR" />,
  },
]

export const elementalList = [
  {
    text: 'Wood',
    value: 'wood',
    icon: <ElementalBadge className="mt-2 ml-1" showText type="wood" />,
  },
  {
    text: 'Earth',
    value: 'earth',
    icon: <ElementalBadge className="mt-2 ml-1" showText type="earth" />,
  },
  {
    text: 'Fire',
    value: 'fire',
    icon: <ElementalBadge className="mt-2 ml-1" showText type="fire" />,
  },
  {
    text: 'Water',
    value: 'water',
    icon: <ElementalBadge className="mt-2 ml-1" showText type="water" />,
  },
  {
    text: 'Metal',
    value: 'metal',
    icon: <ElementalBadge className="mt-2 ml-1" showText type="metal" />,
  },
]
