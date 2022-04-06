import React from 'react'
import { useHistory } from 'react-router-dom'
import UnlockButton from '../../components/ButtonV2'

const TopBanner = () => {

  const history = useHistory()
  const typePath = history.location.search.split('?')

  return (
    <div className="main-banner-v3">
      <div className="box-banner-v3-new">
        <div className="box-img">
          <img src="/images/banner1.jpg" alt="" />
        </div>
      </div>
      <div className="launchpad-content">
        <div className="text-l-banner">
          <h3 className="title-v3">Launchpad Pools</h3>
          <p className="desc">Artechain Farms offer multiple farming opportunities to you. Get double rewards by staking your LP tokens in return for additional TAC tokens and earning high income from swap transactions</p>
          <p className="desc">Ethereum and Polygon.</p>
        </div>
      </div>
    </div>
  )
}
export default TopBanner
