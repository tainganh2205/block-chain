import React, { Fragment, useMemo } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import cx from 'classnames'
import { TrustedItemCard } from 'components/ConsumableCard'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { Heading } from 'components/Heading'
import { Button } from 'components/Button'
import { ROUTES } from 'constant/routes'
import { IconClose } from 'components/icons/components/IconClose'
import { ModelChestResultData } from 'types/schema'
import { mapConsumableData, mapHeroData } from 'utils/data'
import { HeroCard } from 'components/HeroCard'

type AssetCardProps = {
  index: number
  asset: ModelChestResultData
}

const AssetCard = ({ asset, index }: AssetCardProps) => {
  const assetCard = useMemo(() => {
    if (asset.resultType === 'hero') {
      const heroData = mapHeroData(asset)
      return (
        <HeroCard
          className="flip-card-back w-[180px] absolute inset-0 backface-invisible"
          hideFooter
          {...heroData}
        />
      )
    }
    const consumableData = mapConsumableData(asset)
    return (
      <TrustedItemCard
        {...consumableData}
        className="flip-card-back w-[180px] absolute inset-0 backface-invisible"
        hidePrice
      />
    )
  }, [asset])

  return (
    <div className="w-full sm:w-[40%] md:w-[30%] lg:w-[25%] xl:w-[18%] min-h-[300px] flex flex-col items-center justify-center">
      <div className="flip-card w-[180px]">
        <div
          className="relative w-full h-full flip-card-inner"
          style={{
            transformStyle: 'preserve-3d',
            animation: `flip-card 0.5s ease-in-out ${index * 0.15}s both`,
          }}
        >
          <div className="w-full h-full inset-0 absolute backface-invisible">
            <ImageWithFallback
              className="w-[180px]"
              src="/img/marketplace/nftdrop/unknowhero.webp"
              fallback="/img/marketplace/nftdrop/unknowhero.png"
              alt=""
            />
          </div>
          {assetCard}
        </div>
      </div>
    </div>
  )
}

export interface OpenChestSuccessProps {
  isOpen?: boolean
  onClose: () => void
  assets: ModelChestResultData[]
}

// If all assets are hero_shard, navigate to consumable route otherwise go to hero route
const getRedirectUrl = (assets: ModelChestResultData[]) => {
  const numOfHeroShards = assets.filter(
    (asset) => asset.itemType === 'hero_shard',
  ).length
  if (numOfHeroShards === assets.length) {
    return ROUTES.PROFILE_MY_ASSETS_CONSUMABLES
  }
  return ROUTES.PROFILE_MY_ASSETS_CHARACTERS
}

export const OpenChestSuccess = ({
  isOpen = false,
  onClose,
  assets,
}: OpenChestSuccessProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className={cx('min-h-screen px-4 relative')}>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className={cx('fixed flex items-center justify-center inset-0')}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className="fixed inset-0 backdrop-filter backdrop-blur bg-black bg-opacity-25"
                onClick={onClose}
              />
            </Transition.Child>

            <div className="w-full h-full flex flex-col items-center py-8 z-20">
              <button
                className={cx(
                  'absolute right-10 top-10 hover:text-gray-100 text-white transition-all duration-200',
                  'outline-none focus:ring-4 focus:ring-gray-100 rounded-md focus:ring-opacity-25',
                )}
                onClick={onClose}
                aria-label="Close"
              >
                <IconClose className="w-10 h-10" aria-hidden />
              </button>
              <Heading color="white">Open successfully!</Heading>
              <div className="w-full flex-1 overflow-y-auto container	flex flex-wrap justify-center items-center py-10">
                {assets.map((asset, idx) => (
                  <AssetCard key={asset.id} asset={asset} index={idx} />
                ))}
              </div>
              <Link href={getRedirectUrl(assets)}>
                <Button as="a">View in My assets</Button>
              </Link>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
