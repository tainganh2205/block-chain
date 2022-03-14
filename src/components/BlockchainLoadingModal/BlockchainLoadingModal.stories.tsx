import { noop } from '@dwarvesf/react-utils'
import { storiesOf } from '@storybook/react'
import { Button } from 'components/Button'
import { ModalTitle } from 'components/Modal'
import { Text } from 'components/Text'
import React from 'react'
import { BlockchainLoadingModal } from '.'

const stories = storiesOf('components/BlockchainLoadingModal', module)

stories.add('buy asset', () => (
  <BlockchainLoadingModal
    isOpen
    onClose={noop}
    disabledCloseButton
    topRender={
      <ModalTitle className="text-white text-32 font-semibold">
        Buy Asset
      </ModalTitle>
    }
    bottomRender={
      <div className="space-y-1.5">
        <Text color="white" className="text-2xl">
          Waiting for Blockchain Confirmation
        </Text>
        <Text size="sm">
          Confirm this transaction in your connected wallet.
        </Text>
      </div>
    }
  />
))

stories.add('initialize account', () => (
  <BlockchainLoadingModal
    isOpen
    onClose={noop}
    disabledCloseButton
    topRender={
      <div className="px-8 space-y-4">
        <ModalTitle className="text-white text-32 font-semibold">
          Initialize your account
        </ModalTitle>
        <Text>
          To allow LFW sell your assets, you must confirm and complete a
          transaction (with gas fee) first. This only needs to be done once for
          your account!
        </Text>
      </div>
    }
    bottomRender={
      <div className="space-y-1.5">
        <Text color="white" className="text-2xl">
          Waiting for Blockchain Confirmation
        </Text>
        <Text size="sm">Confirm in your connected wallet.</Text>
      </div>
    }
  />
))

stories.add('transfer asset', () => (
  <BlockchainLoadingModal
    isOpen
    onClose={noop}
    disabledCloseButton
    topRender={
      <ModalTitle className="text-white text-32 font-semibold">
        Transfer asset
      </ModalTitle>
    }
    bottomRender={
      <div className="space-y-1.5">
        <Text color="white" className="text-2xl">
          Waiting for Blockchain Confirmation
        </Text>
        <Text size="sm">
          Confirm this transaction in your connected wallet.
        </Text>
        <Button appearance="link">Cancel transaction</Button>
      </div>
    }
  />
))

stories.add('transfering your asset...', () => (
  <BlockchainLoadingModal
    isOpen
    onClose={noop}
    disabledCloseButton
    bottomRender={
      <ModalTitle className="text-white text-30 font-semibold pb-10 pt-5">
        Transfering your asset...
      </ModalTitle>
    }
  />
))

stories.add('listing your asset...', () => (
  <BlockchainLoadingModal
    isOpen
    onClose={noop}
    disabledCloseButton
    bottomRender={
      <ModalTitle className="text-white text-30 font-semibold pb-10 pt-5">
        Listing your asset...
      </ModalTitle>
    }
  />
))
