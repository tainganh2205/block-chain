import { Heading } from 'components/Heading'
import { Text } from 'components/Text'
import cx from 'classnames'
import { useIsMobile } from 'hooks/useIsMobile'
import React from 'react'
import { IconRightArrow } from '../../icons/components/IconRightArrow'
import { Tooltip } from '../../Tooltip'

export default function IntroductionBlock() {
  const isMobile = useIsMobile()
  return (
    <div className="sm:px-10 px-3.5 mt-4 pt-6 pb-16 relative h-full rounded-lg bg-gray-700 sm:h-[300px]">
      <Heading className="mb-3">What To Expect?</Heading>
      <Text>
        The Mining Pool is a means to generate profits for investors as well as
        players of Legend of Fantasy War. Although the Reward Pool is unlimited,
        we will adjust it if necessary.
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
                src="/img/icon/NFT.png"
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
              1 NFT 15000PB
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
              100 LFW
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
                src="/img/icon/NFT.png"
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
              <Text as="span" className="text-primary">
                1
              </Text>{' '}
              NFT Legacy LV1
            </Text>
          </span>
          <div className="relative w-[120px]">
            <Tooltip
              className="w-56 text-center text-sm font-semibold"
              triggerType="click"
              classNameChildren={cx(
                'absolute cursor-pointer bg-primary top-[5px] w-[25px] h-[25px] p-1 leading-3  rounded-full text-small font-bold text-white right-[5px]',
              )}
              label={
                <>
                  The amount of LFW Tokens awarded varies based on the NFT's
                  Battle Power and rarity as well as the number of Legendary
                  Chest submitted.{' '}
                  <a
                    href="https://legendfantasy.substack.com/p/lfw-mining-pool-easily-join-for-a?utm_source=url"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-primary"
                  >
                    Detail here
                  </a>
                </>
              }
            >
              i
            </Tooltip>
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
                <Text as="span" className="text-primary">
                  200
                </Text>{' '}
                LFW &#8645;
              </Text>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
