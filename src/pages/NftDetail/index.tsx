import React, { useContext, useMemo } from 'react'
import BidTrad from './Bin-trad'
import MarketList from './MarketList'
import InfoDetail from './InfoDetail'
import Body from '../Nft/Body'
import './Page-style.less'
import './index.less'

export default function Nft(props) {
  return (
    <>
     
        <Body>
        <main className="full-with">
          <InfoDetail props={props} />
          {/* <BidTrad /> */}
          {/* <MarketList /> */}
          </main>
        </Body>
     
    </>
  )
}
