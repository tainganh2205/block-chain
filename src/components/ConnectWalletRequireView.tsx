import Head from 'next/head'
import { ConnectWalletRequireCard } from './auth/ConnectWalletRequireCard'

interface Props {
  description?: string
}

export const ConnectWalletRequireView = (props: Props) => {
  return (
    <>
      <Head>
        <title>Connect Wallet Required | Legend of Fantasy War</title>
        <meta
          property="og:title"
          content="Connect Wallet Required | Legend of Fantasy War"
        />
      </Head>
      <section className="container mx-auto px-5">
        <ConnectWalletRequireCard
          description={props.description}
          className="sm:my-20 my-10"
        />
      </section>
    </>
  )
}
