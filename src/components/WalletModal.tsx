import {
  ConnectorNames,
  walletLocalStorageKey,
  connectorLocalStorageKey,
} from 'utils/connector'
import { WHAT_IS_A_WALLET_LINK } from 'constant/link'
import { useConnectWallet } from 'hooks/useConnectWallet'
import { isIOS } from 'utils/isIos'
import { WalletButton, WalletNameType } from './WalletButton'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalProps,
  ModalTitle,
} from './Modal1'
import { Button } from './Button1'

type connectorConfigType = { name: WalletNameType; connectorId: ConnectorNames }

const connectorsConfig: connectorConfigType[] = [
  {
    name: 'MetaMask',
    connectorId: ConnectorNames.Injected,
  },
  {
    name: 'SafePal Wallet',
    connectorId: ConnectorNames.Injected,
  },
  {
    name: 'Wallet Connect',
    connectorId: ConnectorNames.WalletConnect,
  },
  {
    name: 'Binance chain Wallet',
    connectorId: ConnectorNames.BscConnector,
  },
]

export const WalletModal = ({ isOpen, onClose }: ModalProps) => {
  const { connect } = useConnectWallet()

  const handleConnectWallet = (connector: connectorConfigType) => {
    // Since iOS does not support Trust Wallet we fall back to WalletConnect
    if (connector.name === 'Trust Wallet' && isIOS) {
      connect(ConnectorNames.WalletConnect)
    } else {
      connect(connector.connectorId)
    }
    localStorage.setItem(walletLocalStorageKey, connector.name)
    localStorage.setItem(connectorLocalStorageKey, connector.connectorId)
    onClose()
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalContent className="relative text-center max-h-screen md:min-w-[720px] mx-0 !pb-5 !px-3 !sm:px-10">
        <ModalCloseButton />
        <ModalTitle className="hidden md:block text-[32px] font-bold text-gray-100 mb-8">
          Select a wallet to connect
        </ModalTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          {connectorsConfig.map((connector) => (
            <WalletButton
              key={connector.name}
              onClick={() => handleConnectWallet(connector)}
              name={connector.name as WalletNameType}
            />
          ))}
        </div>
        <footer className="mt-8">
          <Button
            as="a"
            className="text-primary text-sm font-semibold"
            appearance="link"
            target="_blank"
            rel="noreferrer"
            href={WHAT_IS_A_WALLET_LINK}
          >
            What is a wallet?
          </Button>
        </footer>
      </ModalContent>
    </Modal>
  )
}

export default WalletModal
