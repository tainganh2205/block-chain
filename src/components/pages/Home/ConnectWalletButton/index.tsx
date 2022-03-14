import React, { HTMLAttributes } from 'react'
import cx from 'classnames'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Button } from 'components/Button'
import { truncate } from '@dwarvesf/react-utils'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalTitle,
} from 'components/Modal'
import { ClipboardInput } from 'components/ClipboardInput'
import { Text } from 'components/Text'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { IconViewTransaction } from 'components/icons/components/IconViewTransaction'
import { useConnectWallet } from 'hooks/useConnectWallet'
import { useGetBnbBalance, useTokenBalance } from 'hooks/useTokenBalance'
import { getConnectedWallet } from 'utils/wallet'
import { getBalanceAmount } from 'utils/formatBalance'
import { formatNumber } from 'utils/number'
import { useTransactionContext } from 'hooks/useTransactions'
import { IconTransactionPending } from 'components/icons/components/IconTransactionPending'
import { getScanLink } from 'utils/connector'
import { TransactionList } from './TransactionList'

interface ConnectWalletButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const ConnectWalletButton = (props: ConnectWalletButtonProps) => {
  const { account, error, chainId } = useWeb3React()
  const { disconnect } = useConnectWallet()
  const { className, ...rest } = props
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { balance: bnbBalance } = useGetBnbBalance()
  const { balance: lfwBalance } = useTokenBalance()
  const { pending } = useTransactionContext()

  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError

  const commonClass =
    'max-w-[176px] rounded-full px-5 flex items-center justify-center h-10 py-0'

  const handleDisconnect = () => {
    disconnect()
    onClose()
  }

  return account ? (
    <>
      <Button
        className={cx(commonClass, 'bg-green-800 text-gray-100 font-semibold')}
        data-testid="open-wallet-modal"
        onClick={onOpen}
        aria-label="Open Wallet modal"
      >
        <span className="flex items-center" aria-hidden>
          {pending ? (
            <>
              <IconTransactionPending className="w-4 h-4 animate-spin mr-2" />
              Pending...
            </>
          ) : (
            truncate(account, 10, true)
          )}
        </span>
      </Button>

      <Modal isOpen={isOpen && !error} onClose={onClose}>
        <ModalContent className="!px-0" size="max-w-md">
          <ModalCloseButton />
          <div className="flex flex-col items-center text-center">
            <ModalTitle className="text-2xl font-bold mb-1">
              Your wallet
            </ModalTitle>
            <Text color="gray-300">Connect with {getConnectedWallet()}</Text>

            <div className="w-full text-left mt-5 sm:px-10 px-6">
              <div className="space-y-2">
                <Text color="white">Your address:</Text>
                <ClipboardInput value={account} />
              </div>
              <div className="grid grid-cols-2 gap-y-2 mt-4">
                <Text className="font-semibold" color="gray-200">
                  BNB Balance
                </Text>
                <Text className="font-semibold justify-self-end" color="white">
                  {formatNumber(
                    Number(getBalanceAmount(bnbBalance).toFixed(5)),
                  )}
                </Text>
                <Text className="font-semibold" color="gray-200">
                  LFW Balance
                </Text>
                <Text className="font-semibold justify-self-end" color="white">
                  {formatNumber(getBalanceAmount(lfwBalance) || 0)}
                </Text>
              </div>
              <Button
                Icon={IconViewTransaction}
                appearance="link"
                className="px-0 !mb-6"
                as="a"
                target="_blank"
                href={getScanLink(account, 'address', chainId)}
              >
                View on BSCScan
              </Button>
              <Button
                appearance="border-primary"
                onClick={handleDisconnect}
                data-testid="disconnect-wallet-button"
                fullWidth
              >
                Disconnect Wallet
              </Button>
            </div>
            <TransactionList />
          </div>
        </ModalContent>
      </Modal>
    </>
  ) : (
    <Button
      {...rest}
      className={cx(
        commonClass,
        className,
        isUnsupportedChainIdError ? 'bg-red-600 pb-0.5' : 'bg-green-800',
      )}
      data-testid="connect-wallet-button"
    >
      {isUnsupportedChainIdError ? 'Wrong Network' : 'Connect Wallet'}
    </Button>
  )
}
