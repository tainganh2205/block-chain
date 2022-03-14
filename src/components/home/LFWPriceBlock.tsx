import { Button } from 'components/Button'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { Text } from 'components/Text'
import { UpDownChange } from 'components/UpDownChange'
import { HandlerTokenInfoResponse } from 'types/schema'
import { formatCurrency } from 'utils/currency'
import { formatNumber } from 'utils/number'
import { IconViewTransaction } from 'components/icons/components/IconViewTransaction'
import { addTokenToWallet, TokenProps } from 'utils/token'
import { HomeBlockSkeleton } from './HomeBlockSeleton'

interface Props {
  data?: HandlerTokenInfoResponse['data']
  isLoading?: boolean
}

export const LFWPriceBlock = ({ data, isLoading }: Props) => {
  if (isLoading) {
    return <HomeBlockSkeleton />
  }

  const LFWToken: TokenProps = {
    image: 'https://storage.googleapis.com/lfw-resources/images/1640.png',
    address: String(process.env.LFW_TOKEN_CONTRACT),
    symbol: 'LFW',
    decimals: 18,
  }

  return (
    <div className="py-6 sm:px-10 px-3.5">
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <ImageWithFallback
            src="/img/profile/icon-nft.webp"
            fallback="/img/profile/icon-nft.png"
            height={38}
            width={19}
          />
          <div className="flex items-center space-x-3">
            <Text color="white" as="span">
              LFW Price
            </Text>
            <a
              className="cursor-pointer"
              href="https://coinmarketcap.com/currencies/legend-of-fantasy-war"
              target="_blank"
              rel="noreferrer"
            >
              <IconViewTransaction className="text-white" />
            </a>
          </div>
        </div>
        <Button
          onClick={() => addTokenToWallet(LFWToken)}
          className="-mr-4"
          data-testid="add-lfw-to-metamask-button"
          appearance="link"
        >
          Add LFW to MetaMask
        </Button>
      </div>

      <div className="mb-10 mt-2">
        <Text color="white" as="span" className="text-40 font-semibold">
          {formatCurrency(data?.price ?? 0)}
        </Text>
        <UpDownChange className="font-semibold ml-3">
          {data?.priceChange || 0}
        </UpDownChange>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between font-semibold">
          <Text as="span" color="gray-200">
            Total Supply:
          </Text>
          <Text as="span" color="white">
            {formatNumber(data?.totalSupply || 0)} LFW
          </Text>
        </div>
        <div className="flex justify-between font-semibold">
          <Text as="span" color="gray-200">
            Circulating Supply:
          </Text>
          <Text as="span" color="white">
            {formatNumber(data?.circulatingSupply || 0)} LFW
          </Text>
        </div>
        <div className="flex justify-between font-semibold">
          <Text as="span" color="gray-200">
            Total Volume (24h):
          </Text>
          <div>
            <Text as="span" color="white">
              {formatCurrency(data?.totalVolume || 0)}
            </Text>
            <UpDownChange className="font-semibold ml-1 text-xs leading-5">
              {data?.totalVolumeChange || 0}
            </UpDownChange>
          </div>
        </div>
      </div>
    </div>
  )
}
