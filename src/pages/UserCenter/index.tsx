import React from 'react'
import Info from './Info'
import List from './Artwork'
import Body from './Body'
import './index.less'

export default function Nft(props) {
  return (
    <>
      <Body>
        <main className="full-with">
          <div className="p-bsc-myartwork">
            <Info props={props} />
            <List />
          </div>
        </main>
      </Body>
    </>
  )
}
