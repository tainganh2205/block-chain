import { Heading } from 'components/Heading'
import { Text } from 'components/Text'
import cx from 'classnames'
import { useIsMobile } from 'hooks/useIsMobile'
import { IconRightArrow } from '../../icons/components/IconRightArrow'

export default function IntroductionBlock() {
  const isMobile = useIsMobile()
  return (
    <div className="sm:px-10 px-3.5 mt-4 pt-6 pb-16 relative h-full rounded-lg bg-gray-700 sm:h-[300px]">
      <Heading className="mb-3">Super Farm Campaign</Heading>
      <Text>
        200 slots only - First come First serve. Not only for gamers but for
        investors also, you can both enjoy the game and increase your profits at
        the same time!
      </Text>
      <div
        className={cx('flex justify-center items-center mt-4', {
          'gap-4': !isMobile,
        })}
      >
        <div
          className={cx(
            'flex flex-wrap justify-around gap-3 text-center w-6/12 rounded-2xl border-primary border',
            {
              'p-4': !isMobile,
              'p-2': isMobile,
              'h-32': !isMobile,
            },
          )}
        >
          <span>
            <div className="h-16 object-contain flex justify-center items-center">
              <img
                src="/img/icon/busd.png"
                alt=""
                className="h-14 object-contain"
              />
            </div>
            <Text
              className={cx({
                'text-sm': !isMobile,
                'text-xs': isMobile,
              })}
              as="b"
              color="white"
            >
              100 BUSD
            </Text>
          </span>
          <span>
            <div className="h-16 object-contain flex items-center justify-center">
              <img
                src="/img/marketplace/chest.png"
                alt=""
                className="h-16 object-contain"
              />
            </div>
            <Text
              className={cx({
                'text-sm': !isMobile,
                'text-xs': isMobile,
              })}
              as="b"
              color="white"
            >
              X5
            </Text>
          </span>
          <span>
            <div className="h-16 object-contain flex items-center justify-center">
              <img
                src="/img/icon/lfw-logo.png"
                alt=""
                className="h-12 object-contain"
              />
            </div>
            <Text
              className={cx({
                'text-sm': !isMobile,
                'text-xs': isMobile,
              })}
              as="b"
              color="white"
            >
              1000 LFW
            </Text>
          </span>
          <span>
            <div className="h-16 object-contain flex items-center justify-center">
              <img
                src="/img/icon/rarity/N.png"
                alt=""
                className="h-16 object-contain"
              />
            </div>
            <Text
              className={cx({
                'text-sm': !isMobile,
                'text-xs': isMobile,
              })}
              as="b"
              color="white"
            >
              1 NFT Legend
            </Text>
          </span>
        </div>
        <IconRightArrow className="h-10 w-20" />
        <div
          className={cx(
            'flex flex-wrap justify-around gap-3 text-center w-6/12 rounded-2xl border-primary border',
            {
              'p-4': !isMobile,
              'p-2': isMobile,
              'h-32': !isMobile,
            },
          )}
        >
          <span>
            <div className="h-16 object-contain flex items-center justify-center">
              <img
                src="/img/icon/rarity/N.png"
                alt=""
                className="h-16 object-contain"
              />
            </div>
            <Text
              className={cx({
                'text-sm': !isMobile,
                'text-xs': isMobile,
              })}
              as="b"
              color="white"
            >
              1 NFT Legend
            </Text>
          </span>
          <span>
            <div className="h-16 object-contain flex items-center justify-center">
              <img
                src="/img/icon/rarity/N.png"
                alt=""
                className="h-16 object-contain"
              />
            </div>
            <Text
              className={cx({
                'text-sm': !isMobile,
                'text-xs': isMobile,
              })}
              as="b"
              color="white"
            >
              1 NFT Legacy N
            </Text>
          </span>
          <span>
            <div className="h-16 object-contain flex items-center justify-center">
              <img
                src="/img/super-farm/item.png"
                alt=""
                className="h-16 object-contain"
              />
            </div>
            <Text
              className={cx({
                'text-sm': !isMobile,
                'text-xs': isMobile,
              })}
              as="b"
              color="white"
            >
              10 Game Items
            </Text>
          </span>
          <span>
            <div className="h-16 object-contain flex items-center justify-center">
              <img
                src="/img/icon/lfw-logo.png"
                alt=""
                className="h-12 object-contain"
              />
            </div>
            <Text
              className={cx({
                'text-sm': !isMobile,
                'text-xs': isMobile,
              })}
              as="b"
              color="white"
            >
              1500 LFW
            </Text>
          </span>
        </div>
      </div>
    </div>
  )
}
