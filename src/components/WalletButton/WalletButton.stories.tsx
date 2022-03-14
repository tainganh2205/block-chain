import { storiesOf } from '@storybook/react'
import React from 'react'
import { WalletButton } from '.'

storiesOf('components/WalletButton', module).add('basic', () => (
  <div className="space-y-2 gap-4 grid grid-cols-3 max-w-5xl">
    <WalletButton name="MetaMask" />
    <WalletButton name="Binance chain Wallet" />
    <WalletButton name="SafePal Wallet" />
    <WalletButton name="Token Pocket" />
    <WalletButton name="Trust Wallet" />
    <WalletButton name="Wallet Connect" />
  </div>
))
