import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ROUTES } from 'constant/routes'
import { ImageWithFallback } from './ImageWithFallback'
import { Heading } from './Heading'
import { Text } from './Text'
import { Button } from './Button'

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Page not found | Legend of Fantasy War</title>
        <meta
          property="og:title"
          content="Page not found | Legend of Fantasy War"
        />
      </Head>
      <div className="container mx-auto relative">
        <ImageWithFallback
          src="/img/404.webp"
          fallback="/img/404.png"
          className="mx-auto max-w-full"
          width="1099"
          height="609"
          aria-hidden
        />
        <div className="lg:absolute inset-0 flex flex-col items-center justify-center lg:pt-40 lg:mt-0 -mt-8 sm:-mt-12 px-5 text-center">
          <Heading className="mb-2" as="h1">
            Ops, something went wrong!
          </Heading>
          <Text className="lg:mb-32 sm:mb-12 mb-10">
            We can't find the page you're looking for.
          </Text>

          <Link href={ROUTES.HOME}>
            <Button as="a">Back to home</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
