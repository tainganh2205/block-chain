import React, { useState } from 'react'
import { Heading } from 'components/Heading'
import { Text } from 'components/Text'
import { ElementalBadge, ElementalType } from 'components/ElementalBadge'
import { Stars } from 'components/Stars'
import { ModelHeroDetail } from 'types/schema'
import { LevelBadgeColor } from 'components/LevelBadge'
import { AttributeBlock } from 'components/AttributeBlock'
import { RarityBadge, RarityType } from 'components/RarityBadge'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { truncate } from '@dwarvesf/react-utils'
import { Card } from 'components/Card'
import { Button } from 'components/Button'
import Link from 'next/link'
import { ROUTES } from 'constant/routes'
import { formatSyncDate, isSyncAble } from 'utils/datetime'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import cx from 'classnames'
import { toast } from 'components/Toast'
import { client } from 'libs'
import { RequireSignatureHOC } from 'components/RequireSignatureHOC'
import { ASSET_STATUS } from '../../../constant/hero'

dayjs.extend(relativeTime)

export interface AboutSectionProps {
  data?: ModelHeroDetail
  mutate?: () => void
  extra?: React.ReactNode
}

const ReloadIcon = (props: { isSync: boolean }) => {
  return (
    <ImageWithFallback
      src="/img/profile/reload.webp"
      fallback="/img/profile/reload.png"
      alt="reload-icon"
      height={24}
      width={24}
      className={cx({
        'animate-spin grayscale': props.isSync === true,
      })}
    />
  )
}

export const AboutSection = (props: AboutSectionProps) => {
  const { data, extra, mutate = () => {} } = props

  const colorName = data?.heroInfo?.colorName as LevelBadgeColor
  const elemental = data?.heroInfo?.elementSlug as ElementalType
  const level = data?.heroInfo?.level || 0
  const stars = data?.heroInfo?.star || 0
  const maxStars = data?.heroInfo?.maxStar || 0
  const server = data?.heroInfo?.gameServerName || ''
  const rarity = data?.heroInfo?.rarity || 'N/A'
  const source = data?.heroInfo?.source || 'N/A'
  const owner = data?.heroInfo?.ownerAddress || 'N/A'
  const [isSync, setIsSync] = useState(false)
  const heroLogTime = formatSyncDate(data?.heroInfo?.logTime as string)

  const handleSync = async () => {
    try {
      setIsSync(true)
      await client.syncHero({
        id: data?.heroInfo?.id as string,
        ownerAddress: data?.heroInfo?.ownerAddress as string,
      })
      mutate()
      setIsSync(false)
    } catch (error: any) {
      toast.error({
        title: 'Sync error',
        message: error?.message,
      })
    }
  }

  const sourceBlock = (
    <AttributeBlock title="Source">
      {source === 'Legend' ? (
        <div className="flex items-center space-x-2">
          <ImageWithFallback
            width={25.31}
            height={11.73}
            src="/img/icon/branding/icon-lfw.webp"
            fallback="/img/icon/branding/icon-lfw.png"
          />
          <Text as="span" className="text-primary">
            Legend
          </Text>
        </div>
      ) : (
        <Text as="span" className="text-primary">
          Legacy
        </Text>
      )}
    </AttributeBlock>
  )

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Heading as="h3">About</Heading>
        {data?.heroInfo?.status === ASSET_STATUS.IMPORTED ? (
          <RequireSignatureHOC>
            <Button
              appearance="borderless"
              onClick={handleSync}
              disabled={isSyncAble(heroLogTime.remainingTime) || isSync}
            >
              <Text
                as="span"
                className={cx('pr-2 text-primary', {
                  grayscale:
                    isSync === true || isSyncAble(heroLogTime.remainingTime),
                })}
                size="base"
              >
                Last sync time: {dayjs(data.heroInfo.logTime).fromNow()}
              </Text>
              <ReloadIcon isSync={isSync} />
            </Button>
          </RequireSignatureHOC>
        ) : null}
      </div>
      <Card className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 md:grid-cols-4 gap-y-6 lg:gap-y-10 sm:px-8 px-4 lg:px-10 py-8">
        <AttributeBlock title="Elemental">
          <ElementalBadge showText type={elemental} />
        </AttributeBlock>
        <AttributeBlock title="Level">
          <Text className="text-lg" color="white" as="b">
            {level}
          </Text>
        </AttributeBlock>
        <AttributeBlock title="Quality">
          <Text className="text-lg capitalize" color="white" as="b">
            {colorName}
          </Text>
        </AttributeBlock>
        <AttributeBlock title="Rank">
          <Stars max={maxStars} value={stars} />
        </AttributeBlock>
        <AttributeBlock title="Server">
          <Text color="white">{server || 'N/A'}</Text>
        </AttributeBlock>
        <AttributeBlock title="Rarity">
          <RarityBadge size="md" type={rarity as RarityType} />
        </AttributeBlock>
        {sourceBlock}
        {extra && <div className="col-span-1">{extra}</div>}
        <AttributeBlock title="Owner" className="col-span-2">
          <Link href={ROUTES.MARKETPLACE_SALE.getUrl(owner)}>
            <Button
              as="a"
              appearance="link"
              className="px-0 !text-white hover:!text-primary transition duration-200"
              href={ROUTES.MARKETPLACE_SALE.getUrl(owner)}
            >
              {truncate(owner, 32, true)}
            </Button>
          </Link>
        </AttributeBlock>
      </Card>
    </div>
  )
}
