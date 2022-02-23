import React, { memo } from 'react'
import { useLocation } from 'react-router'

import Slide from './Slide'
import Info from './Info'
import List from './List'
import Body from './Body'

const Nft = memo((props) => {
  const { search } = useLocation()
  
  return (
    <Body>
      <main>
        {!search && 
          <>
            <Info />
          </>
        }
        <List />
      </main>
    </Body>
  )
})


export default Nft