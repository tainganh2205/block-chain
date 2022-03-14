
import { ConnectWalletRequireCard } from './auth/ConnectWalletRequireCard'

interface Props {
  description?: string
}

export const ConnectWalletRequireView = (props: Props) => {
  return (
    <>
      <section className="container mx-auto px-5">
        <ConnectWalletRequireCard
          description={props.description}
          className="sm:my-20 my-10"
        />
      </section>
    </>
  )
}
