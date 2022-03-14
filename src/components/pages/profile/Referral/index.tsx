import React, { useEffect, useState } from 'react'
import { Heading } from 'components/Heading'
import { Skeleton } from 'components/Skeleton'
import { Text } from 'components/Text'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { ClipboardInput } from 'components/ClipboardInput'
import { Card } from 'components/Card'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs'
import { ReferralActivities } from 'components/referral/ReferralActivities'
import { InvitedFriendTable } from 'components/referral/InvitedFriendsTable'
import { ReferralEarnedTable } from 'components/referral/ReferralEarnedTable'
import { ROUTES } from 'constant/routes'
import { Empty } from 'components/Empty'

const SkeletonLoader = () => {
  return (
    <div className="container mx-auto px-5 pb-16">
      <div className="w-full sm:w-1/3 mx-auto">
        <div className="rounded-lg bg-gray-700 h-[100px] px-10 mb-20">
          <div className="pt-2">
            <Skeleton className="mb-5 w-full h-8 rounded" />
          </div>
          <div className="flex justify-center space-x-5">
            <Skeleton className="w-full h-8 rounded" />
            <Skeleton className="w-32 h-8 rounded" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-15 lg:mx-44">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="w-full sm:w-1/3 px-5 mb-5 sm:mb-10" key={index}>
            <div className="rounded-lg bg-gray-700 h-[200px] px-10 flex items-center justify-center">
              <Skeleton className="w-32 h-20 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReferralPage() {
  const isFirstLoading = false
  const [domain, setDomain] = useState('')
  const { data } = useFetchWithCache(GET_PATHS.userInfo, () =>
    client.getUserInfo(),
  )

  const { data: referralData } = useFetchWithCache(
    GET_PATHS.profileReferralFriend,
    () => client.getProfileReferralFriend(),
  )

  const referralLink = `${domain}${ROUTES.REFERRAL.getUrl(
    data?.data.referralCode as string,
  )}`

  const items = [
    {
      label: 'PaperPlane',
      image: '/img/profile/icon-paper-plane',
      width: 120,
      height: 120,
      content: 'Copy and send the link to invite your friend to play game.',
    },
    {
      label: 'GemBox',
      image: '/img/profile/icon-lfw-box',
      width: 120,
      height: 120,
      content: (
        <Text color="white">
          Receive{' '}
          <Text as="strong" className="text-primary">
            5.0 LFW
          </Text>{' '}
          when your friend buy a character for the first time successfully
        </Text>
      ),
    },
    {
      label: 'GemsBox',
      image: '/img/profile/icon-gems-box',
      width: 120,
      height: 120,
      content: (
        <Text color="white">
          Get{' '}
          <Text as="strong" className="text-primary">
            1.0% (in LFW)
          </Text>{' '}
          of your friends's GEM purchases after your first 3 friends buy leader
          successfull
        </Text>
      ),
    },
  ]

  useEffect(() => {
    setDomain(window.location.origin)
  }, [])

  return (
    <>
      <div className="sm:pt-14">
        {isFirstLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className="mb-14">
              <Heading className="mb-5 text-center">
                Invite 3 friends and earn more LFW
              </Heading>
              <div className="w-full sm:w-[485px] mx-auto">
                <ClipboardInput
                  value={referralLink}
                  appearance="button"
                  max={40}
                  midTruncate={false}
                  label="Copy link"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-evenly lg:justify-center ">
              {items.map(({ label, content, image, height, width }) => (
                <div
                  className="flex flex-col items-center mb-14 lg:mx-[60px]"
                  key={label}
                >
                  <Card
                    className="w-[280px] flex justify-center items-center"
                    color="gray-650"
                  >
                    <ImageWithFallback
                      src={`${image}.webp`}
                      fallback={`${image}.png`}
                      width={width}
                      height={height}
                    />
                  </Card>
                  <div className="text-center w-[280px] md:w-[200px] xl:w-[280px] leading-6 mt-5">
                    <Text color="white" size="base" as="span">
                      {content}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <ReferralActivities
        activeFriends={referralData?.data.totalActiveFriends ?? 0}
        invitedFriends={referralData?.data.totalInvitedFriends ?? 0}
      />
      <div className="mb-10">
        {referralData?.data.totalInvitedFriends ? (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
            <Card color="gray-900">
              <Heading as="h3" className="mb-5">
                Invited friends
              </Heading>
              <InvitedFriendTable />
            </Card>

            <Card>
              <ReferralEarnedTable />
            </Card>
          </div>
        ) : (
          <Empty
            className="mt-14 lg:mt-28"
            message=""
            title="You haven't invited any friends"
            image={
              <ImageWithFallback
                src="/img/icon/empty-referral.webp"
                fallback="/img/icon/empty-referral.png"
                width={118}
                height={118}
              />
            }
          />
        )}
      </div>
    </>
  )
}
