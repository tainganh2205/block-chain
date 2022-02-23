import React, { memo } from 'react'
import { isMobile } from 'react-device-detect'

import Info from './components/Info'
import MyArtwork from './components/MyArtwork'

import './index.less'

export default function Nft(props) {
  return (
    <div
      className={`p-bsc-myartwork ${isMobile ? 'p-bsc-myartwork-mobile' : ''}`}
    >
      <Info />
      <MyArtwork />
    </div>
  )
}
