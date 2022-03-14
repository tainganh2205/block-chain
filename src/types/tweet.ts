export interface TweetsResponse {
  data: TweetDataResponse[]
  includes: TweetIncludesResponse
  meta: TweetMetaResponse
}

export interface TweetDataResponse {
  id: string
  author_id: string
  text: string
  attachments?: TweetAttachment
  created_at: string
}

export interface TweetMetaResponse {
  oldest_id: string
  newest_id: string
  result_count: number
}

export interface TweetIncludesResponse {
  media?: TweetMedia[]
  users: TweetUser[]
}

export interface TweetAttachment {
  media_keys: string[]
}

export interface TweetUser {
  id: string
  name: string
  username: string
  profile_image_url: string
}

export interface TweetMedia {
  media_key: string
  type: string
  url: string
}

export interface Tweet {
  content: string
  createdAt: string
  media: TweetMedia[]
  author: TweetUser
  source: string
  sourceLike: string
}
