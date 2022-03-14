import { Heading } from 'components/Heading'
import IconGem from 'components/IconGem'
import { Text } from 'components/Text'
import cx from 'classnames'
import { Button } from 'components/Button'
import { useAuthContext } from 'context/auth'

interface ConnectWalletRequireCardProps {
  className?: string
  description?: string
}

export const ConnectWalletRequireCard = ({
  className,
  description = 'You need to connect a wallet to view your profile dashboard',
}: ConnectWalletRequireCardProps) => {
  const { openWalletModal } = useAuthContext()

  return (
    <div
      className={cx(
        'flex flex-col justify-between items-center text-center',
        className,
      )}
    >
      <IconGem />

      <Heading className="mb-4" as="h1">
        Connect wallet required
      </Heading>
      <Text className="mb-10">{description}</Text>

      <Button className="w-40" onClick={openWalletModal}>
        Connect Wallet
      </Button>
    </div>
  )
}
