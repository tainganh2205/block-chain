import { Heading } from 'components/Heading'
import { Text } from 'components/Text'
import { ReactComponent as PanCakeSwap } from './svg/pancakeswap.svg'
import { ReactComponent as GateIO } from './svg/gateio.svg'
import { ReactComponent as Hoo } from './svg/hoo.svg'
import { ReactComponent as Bybit } from './svg/bybit.svg'
import { ReactComponent as BitMart } from './svg/bitmart.svg'

interface ExChangeItem {
  name: string
  url: string
  icon: JSX.Element
}

const ExChangeItems: Array<ExChangeItem> = [
  {
    icon: <PanCakeSwap />,
    url: 'https://pancakeswap.finance/swap?outputCurrency=0xd71239a33c8542bd42130c1b4aca0673b4e4f48b',
    name: 'PancakeSwap',
  },
  {
    icon: <GateIO />,
    url: 'https://www.gate.io/en/trade/LFW_USDT',
    name: 'Gate.io',
  },
  {
    icon: <Hoo />,
    url: 'https://hoo.com/innovation/lfw-usdt',
    name: 'Hoo.com',
  },
  {
    icon: <Bybit />,
    url: 'https://www.bybit.com/en-US/trade/spot/LFW/USDT',
    name: 'Bybit.com',
  },
  {
    icon: <BitMart />,
    url: 'https://www.bitmart.com/trade/en?layout=basic&symbol=LFW_USDT',
    name: 'BitMart',
  },
]

const ExChange = (props: ExChangeItem) => {
  return (
    <a
      className="cursor-pointer flex space-x-3 font-medium text-white"
      href={props.url}
      target="_blank"
      rel="noreferrer"
    >
      {props.icon}
      <span>{props.name}</span>
    </a>
  )
}

export function BuyLFWBlock() {
  return (
    <div className="sm:px-10 px-3.5 pt-6 pb-16 relative h-full">
      <Heading className="mb-3">Buy LFW Token</Heading>
      <Text>
        $LFW is officially available on Binance Smart Chain (BSC), other chains
        will come in near future. Happy trading on following DEX and CEX.
      </Text>
      <div className="mt-9 grid grid-cols-2 max-w-xs gap-4">
        {ExChangeItems.map((item, index) => (
          <ExChange
            key={index}
            name={item.name}
            url={item.url}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  )
}
