// Media
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >
  const src: string
  export default src
}

interface Window {
  ethereum: any
  BinanceChain?: any
  MSStream?: any
  UnityLoader: any
  UnityProgress: any
}

//Tweets
declare module 'tweet-parser' {
  type TextEntity = { type: 'TEXT'; content: string }
  type LinkEntity = { type: 'LINK'; content: string; url: string }
  type HashEntity = { type: 'HASH'; content: string; url: string }
  type UserEntity = { type: 'USER'; content: string; url: string }

  type Entity = TextEntity | LinkEntity | HashEntity | UserEntity

  function tweetParser(tweet: string): Entity[]
  export = tweetParser
}
