import { ElementalBadge } from 'components/ElementalBadge'
import { RarityBadge } from 'components/RarityBadge'

export const qualityList = [
  {
    text: 'White',
    value: '#ffffff',
    color: 'bg-gray-300',
  },
  {
    text: 'Yellow',
    value: '#dec62a',
    color: 'bg-yellow-600',
  },
  {
    text: 'Green',
    value: '51951b',
    color: 'bg-green-600',
  },
  {
    text: 'Orange',
    value: '#de6200',
    color: 'bg-orange-500',
  },
  {
    text: 'Blue',
    value: '#178cde',
    color: 'bg-blue-500',
  },
  {
    text: 'Red',
    value: '#c02525',
    color: 'bg-red-600',
  },
  {
    text: 'Violet',
    value: '#c909bc',
    color: 'bg-violet-500',
  },
]

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
