import { Heading } from 'components/Heading'
import { Text } from 'components/Text'
import { client, GET_PATHS } from 'libs/apis'
import { Skeleton } from 'components/Skeleton'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { IconShare } from 'components/icons/components/IconShare'
import tweetParser from 'tweet-parser'
import { formatTime } from 'utils/datetime'
import { IconLike } from 'components/icons/components/IconLike'
import { ReactComponent as TweetBg } from './svg/tweet-bg.svg'
import { ReactComponent as TwitterIcon } from './svg/twitter.svg'

const TweetSkeleton = () => {
  return (
    <>
      <div className="flex justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="w-32 h-5 rounded" />
            <Skeleton className="w-20 h-3 rounded" />
          </div>
        </div>
        <Skeleton className="w-8 h-8 rounded-lg" />
      </div>
      <div className="space-y-3">
        <Skeleton className="w-1/3 h-5 rounded" />
        <Skeleton className="w-2/3 h-5 rounded" />
        <Skeleton className="w-1/2 h-5 rounded" />
      </div>
    </>
  )
}

export function TweetBlock() {
  const { data, isFirstLoading } = useFetchWithCache(GET_PATHS.twitter, () =>
    client.getTweets(),
  )

  const tweet = data?.data[0]

  return (
    <div className="sm:px-10 px-3.5 pt-6 pb-16 relative h-full">
      <Heading className="mb-3">Latest Tweet</Heading>
      <TweetBg className="absolute top-0 right-0 pointer-events-none" />
      {isFirstLoading ? (
        <TweetSkeleton />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex space-x-2 items-center">
              <img
                src={tweet?.author.profile_image_url}
                alt=""
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex flex-col leading-snug">
                <Text color="white" as="span" className="text-xl">
                  {tweet?.author.name}
                </Text>
                <a
                  color="gray-200"
                  href={`https://twitter.com/${tweet?.author.username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 cursor-pointer"
                >
                  @{tweet?.author.username}
                </a>
              </div>
            </div>
            <TwitterIcon className="-mr-5" />
          </div>
          <Text size="sm" className="leading-6">
            {tweetParser(tweet?.content ?? ' ').map((i, index) => {
              if (i.type === 'LINK' || i.type === 'HASH' || i.type === 'USER')
                return (
                  <a
                    className="text-blue-400 cursor-pointer"
                    key={index}
                    href={i.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {i.content}
                  </a>
                )
              return i.content
            })}
          </Text>
          <footer className="absolute bottom-0 px-10 h-16 py-4 inset-x-0 flex justify-between items-center">
            <div className="flex items-center space-x-5">
              <a
                href={tweet?.sourceLike}
                target="_blank"
                rel="noreferrer"
                className="text-gray-100 cursor-pointer"
              >
                <IconLike />
              </a>
              <a
                href={tweet?.source}
                target="_blank"
                rel="noreferrer"
                className="text-gray-100 cursor-pointer"
              >
                <IconShare />
              </a>
            </div>
            <Text size="xs" color="gray-300">
              {formatTime(tweet?.createdAt || '', 'HH:mm A · MMM DD, YYYY')}
            </Text>
          </footer>
        </div>
      )}
    </div>
  )
}
