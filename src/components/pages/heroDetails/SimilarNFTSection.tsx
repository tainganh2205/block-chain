import React from 'react'
import { Heading } from 'components/Heading'
import { Button } from 'components/Button'
import Link from 'next/link'
import { ROUTES } from 'constant/routes'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs'
import cx from 'classnames'
import { HeroCardList } from 'components/HeroCardList'
import { useIsMobile } from 'hooks/useIsMobile'
import { Empty } from 'components/Empty'

export interface SimilarNFTSectionProps {
  heroId: string
  className?: string
}

export const SimilarNFTSection = (props: SimilarNFTSectionProps) => {
  const { heroId, className } = props
  const isMobile = useIsMobile()
  const display = isMobile ? 4 : 3

  const { data: similarData, isFirstLoading } = useFetchWithCache(
    [GET_PATHS.marketplaceSimilarHeroes, heroId],
    (_, heroId) => client.getMarketplaceSimilarHeroes(heroId as string),
  )

  const similar = similarData?.data || []

  return (
    <div className={cx('space-y-2', className)}>
      <div className="flex">
        <Heading as="h3">Similar NFT</Heading>
        <Link href={ROUTES.MARKETPLACE_CHARACTERS.getUrl()}>
          <Button appearance="link">
            {!similar.length ? 'Visit marketplace' : 'View all'}
          </Button>
        </Link>
      </div>
      <HeroCardList
        column={display === 3 ? '3' : '4'}
        limit={display}
        count={display}
        page={1}
        isLoading={isFirstLoading}
        data={similar?.slice(0, display)}
        getUrl={ROUTES.MARKETPLACE_CHARACTERS_DETAIL.getUrl}
        hoverShowGif
      />
      {!similarData?.data.length && <Empty type="data" className="py-10" />}
    </div>
  )
}
