import WalletModal from 'components/WalletModal'
import { useAuthContext } from 'context/auth'

export const AuthConnector = () => {
  const { isWalletModalOpen, closeWalletModal } = useAuthContext()

  return <WalletModal isOpen={isWalletModalOpen} onClose={closeWalletModal} />
}
