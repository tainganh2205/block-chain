import cx from 'classnames'
import { Card } from 'components/Card'
import { ElementalBadge, ElementalType } from 'components/ElementalBadge'
import LevelBadge, { LevelBadgeColor } from 'components/LevelBadge'
import { SketchFabRender } from 'components/SketchFabRender'
import { Stars } from 'components/Stars'
import { Text } from 'components/Text'
import { useRef, useState } from 'react'
import { useImage } from 'hooks/useImage'
import { formatNumber } from 'utils/number'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { AssetStatus, HeroRarity, HeroSource } from 'types/hero'
import { useLegendMiningContext } from '../../../../context/legendMining'

export interface HeroCardProps {
  elemental: ElementalType
  stars: number
  level: number
  name: string
  imageUrl: string
  gifImageUrl?: string
  attack: number
  className?: string
  price?: string
  priceUSD?: number
  symbol?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  levelBadgeColor?: LevelBadgeColor
  sketchFabId?: string
  background?: 'bg-gray-900' | 'bg-gray-800' | 'bg-gray-700'
  id?: string
  onClick?: () => void
  href?: string
  maxStars?: number
  hideFooter?: boolean
  status?: AssetStatus
  tokenId?: number
  previewMode?: boolean
  hoverShowGif?: boolean
  rarity?: HeroRarity
  source?: HeroSource
}

interface GifImageWatcherProps {
  gifSrc: string
  src: string
  hovered: boolean
}

const GifImageWatcher = ({ gifSrc, src, hovered }: GifImageWatcherProps) => {
  const { hasLoaded } = useImage(gifSrc)

  return (
    <>
      {hovered && hasLoaded ? (
        <img
          src={gifSrc}
          alt=""
          draggable={false}
          className={cx(
            'absolute inset-0 object-contain w-full h-full select-none -translate-y-5 scale-150',
          )}
        />
      ) : null}
      <img
        src={src}
        alt=""
        draggable={false}
        className={cx(
          'absolute inset-0 object-contain w-full h-full select-none -translate-y-5 scale-150',
          { 'opacity-0': hovered && hasLoaded },
        )}
      />
    </>
  )
}

export const HeroCard = (props: HeroCardProps) => {
  const {
    id,
    className,
    name,
    level,
    attack,
    elemental,
    imageUrl,
    stars,
    size = 'md',
    priceUSD,
    price,
    levelBadgeColor = 'green',
    sketchFabId,
    background = '!bg-gray-700',
    href,
    maxStars = 7,
    hideFooter = false,
    status,
    previewMode = false,
    hoverShowGif = false,
    gifImageUrl,
    rarity,
    source,
    tokenId = 0,
  } = props
  const { tokenNftId, setTokenNftId, setHeroId } = useLegendMiningContext()

  const rarityImageSuffix = rarity?.toLowerCase()
  const rarityImageSource = source?.toLowerCase()

  const [hovered, setHovered] = useState(false)
  const touched = useRef(false)
  const hasFooter = !hideFooter && (price || priceUSD)
  const indexing = !previewMode && status?.endsWith('ing')

  const handleClickHero = () => {
    setTokenNftId(tokenId)
    setHeroId(id || '')
  }
  const fadeClassName = indexing ? 'opacity-50' : ''

  const frameBg = `/img/hero/${rarityImageSource}/card-rarity-${rarityImageSuffix}`

  const render = (
    <Card
      as={href && !indexing ? 'a' : 'div'}
      className={cx(
        'relative',
        { 'cursor-pointer': href && !indexing },
        background,
        { '!bg-blue-400': tokenId === tokenNftId },
        className,
      )}
      onMouseEnter={
        hoverShowGif
          ? () => {
              touched.current = true
              setHovered(true)
            }
          : undefined
      }
      onMouseLeave={hoverShowGif ? () => setHovered(false) : undefined}
      onClick={handleClickHero}
      spacing={false}
    >
      <LevelBadge size={size} className={fadeClassName} color={levelBadgeColor}>
        Level {level}
      </LevelBadge>
      <div className="pb-[144%]" />
      <div
        className={cx(
          'absolute h-[108%] w-[107%] left-[-3%] flex items-center justify-center bottom-[-3%]',
        )}
      >
        <ImageWithFallback
          src={`${frameBg}.webp`}
          fallback={`${frameBg}.png`}
          className="max-w-full"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center rounded-2xl shadow-hero-card">
        <div
          className={cx(
            'flex w-full items-center space-x-2',
            {
              'p-3': size === 'xs',
              'p-4': size !== 'lg' && size !== 'xs',
              'p-5': size === 'lg',
            },
            fadeClassName,
          )}
        >
          <ImageWithFallback
            src="/img/hero/sword.webp"
            fallback="/img/hero/sword.png"
            alt=""
            width={size === 'lg' ? 31 : 17}
            height={size === 'lg' ? 42 : 23}
          />
          <Text
            as="span"
            className={cx('font-semibold', {
              'text-2xl': size === 'lg',
              'text-xxs': size === 'xs',
            })}
            color="white"
          >
            {formatNumber(attack)}
          </Text>
        </div>
        <div className={cx('w-full px-[7%] text-left', fadeClassName)}>
          <ElementalBadge type={elemental} size={size} />
        </div>
        <div
          className={cx('relative', fadeClassName, {
            'overflow-hidden w-[70%] pb-[96%] mt-[-24%]': sketchFabId,
            'w-[65%] pb-[70%] mt-[-10%]': !sketchFabId,
          })}
        >
          {touched.current && gifImageUrl ? (
            <GifImageWatcher
              src={imageUrl}
              gifSrc={gifImageUrl}
              hovered={hovered}
            />
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {sketchFabId ? (
                <SketchFabRender
                  className={cx('absolute select-none', {
                    'inset-[-20%]': size === 'lg',
                    'inset-[-30%]': size !== 'lg',
                  })}
                  id={sketchFabId}
                />
              ) : (
                <img
                  src={imageUrl}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 object-contain w-full h-full select-none -translate-y-5 scale-150"
                />
              )}
            </>
          )}
        </div>
        <Stars
          max={maxStars}
          value={stars}
          display="vertical"
          size={size}
          className={cx('absolute center-y right-[7%]', fadeClassName)}
        />

        <div
          className={cx(
            'absolute inset-x-0 bottom-0 h-[30%] flex flex-col items-center',
            {
              'justify-center': !hasFooter,
              'justify-between pb-[6%] pt-[4%]': hasFooter,
            },
          )}
        >
          <Text
            as="span"
            className={cx(
              'font-semibold truncate w-full text-center px-5 block',
              fadeClassName,
              {
                'text-4xl pt-3 pb-6': size === 'lg',
                'text-lg pt-3': size !== 'lg' && size !== 'xs',
                'text-[12px] pt-2': size === 'xs',
              },
            )}
            color="white"
          >
            {name}
          </Text>
        </div>
        {indexing && (
          <div className="center-xy absolute text-white bg-gray-900 px-8 font-medium py-1 rounded-full tracking-wide">
            Processing
          </div>
        )}
      </div>
    </Card>
  )

  if (href && !indexing) {
    return render
  }

  return render
}
