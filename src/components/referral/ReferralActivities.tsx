import { Heading } from 'components/Heading'
import { ImageWithFallback } from 'components/ImageWithFallback'
import { Text } from 'components/Text'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs'
import { formatNumber } from 'utils/number'

interface Props {
  activeFriends: number
  invitedFriends: number
}

const ActiveAndTotalFriends = ({ activeFriends, invitedFriends }: Props) => {
  return (
    <div className="flex space-x-3">
      <ImageWithFallback
        src="/img/profile/icon-group.webp"
        fallback="/img/profile/icon-group.png"
        width={56}
        height={56}
      />
      <div>
        <Text>Active friends / Total invited </Text>
        <div className="flex">
          <Heading as="h2" className="text-primary">
            {activeFriends}
          </Heading>
          <Text className="mt-3" as="b" size="base" color="white">
            /{invitedFriends}
          </Text>
        </div>
      </div>
    </div>
  )
}

const TotalReferralEarned = () => {
  const { data } = useFetchWithCache(GET_PATHS.profileReferralEarned, () =>
    client.getProfileReferralEarned(),
  )

  return (
    <div className="flex space-x-6">
      <ImageWithFallback
        src="/img/profile/icon-nft.webp"
        fallback="/img/profile/icon-nft.png"
        width={33}
        height={57}
      />
      <div>
        <Text>Total referral earned (LFW)</Text>
        <Heading as="h2" className="text-primary text-30">
          {formatNumber(Number(data?.data.totalReferralEarned))}
        </Heading>
      </div>
    </div>
  )
}

export const ReferralActivities = ({
  activeFriends,
  invitedFriends,
}: Props) => {
  return (
    <div className="max-w-6xl px-5 mx-auto mb-10 mt-20">
      <Heading>Referral activities</Heading>
      <div className="grid sm:grid-cols-3 sm:gap-20 gap-10">
        <Text className="mt-4" size="sm">
          Invite at least 3 friends to play and receive 1% referral bonus for
          your friends’ GEM purchases
        </Text>
        <ActiveAndTotalFriends
          activeFriends={activeFriends}
          invitedFriends={invitedFriends}
        />
        <TotalReferralEarned />
      </div>
    </div>
  )
}
