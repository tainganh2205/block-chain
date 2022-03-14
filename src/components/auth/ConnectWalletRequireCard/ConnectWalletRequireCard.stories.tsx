import { storiesOf } from '@storybook/react'
import { AuthContextProvider } from 'context/auth'
import React from 'react'
import { ConnectWalletRequireCard } from '.'

storiesOf('components/auth/ConnectWalletRequireCard', module).add(
  'basic',
  () => (
    <AuthContextProvider>
      <ConnectWalletRequireCard />
    </AuthContextProvider>
  ),
)
