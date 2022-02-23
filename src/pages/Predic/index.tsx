import React from 'react'
import Predict from './Predict'
import './styless.css'
import ShowModalBeta from './ShowModalBeta'
import ShowNotifiClaimWin from './ShowNotifiClaimWin'

const Index = () => {
  return (
    <>
      <ShowModalBeta type={1} />
        <>
          <Predict />
          <ShowNotifiClaimWin />
        </>
    </>
  )
}

export default Index
