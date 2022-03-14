import { HTMLAttributes } from 'react'
import cx from 'classnames'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { Text } from 'components/Text'

export type WalletNameType =
  | 'MetaMask'
  | 'Trust Wallet'
  | 'SafePal Wallet'
  | 'Binance chain Wallet'
  | 'Wallet Connect'
  | 'Token Pocket'
interface WalletButtonProps extends HTMLAttributes<HTMLButtonElement> {
  name: WalletNameType
}

function getIcon(name: WalletButtonProps['name']) {
  if (name === 'MetaMask') {
    return 'ic-metamask'
  }

  if (name === 'Trust Wallet') {
    return 'ic-trust-wallet'
  }

  if (name === 'SafePal Wallet') {
    return 'ic-safepal-wallet'
  }

  if (name === 'Wallet Connect') {
    return 'ic-wallet-connect'
  }

  if (name === 'Binance chain Wallet') {
    return 'ic-binance-chain-wallet'
  }

  if (name === 'Token Pocket') {
    return 'ic-token-pocket'
  }
}

export const WalletButton = (props: WalletButtonProps) => {
  const { name, className, ...rest } = props
  const icon = getIcon(name)

  return (
    <button
      className={cx(
        'w-full flex items-center bg-transparen px-6 h-16 rounded-[10px] hover:bg-gray-800 duration-200 transition-all text-lg tracking-[1px]',
        className,
      )}
      data-testid={`${name.toLowerCase().replace(/ /g, '-')}-button`}
      {...rest}
    >
      <div className="h-12 w-12 relative flex-none">
        <ImageWithFallback
          src={`/img/${icon}.png`}
          fallback={`/img/${icon}.png`}
          className="absolute inset-0 object-contain"
        />
      </div>
      <Text
        as="span"
        color="white"
        className="ml-3 font-semibold whitespace-nowrap"
      >
        {name}
      </Text>
    </button>
  )
}
