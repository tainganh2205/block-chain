import React from 'react'
import { useHistory, Route } from 'react-router-dom'
import { useHookProjects } from './Store'
import { POOL_WEIGHT } from './index.d'
import UnlockButton from '../../components/ButtonV2'

const TopIDO = () => {
  const [state, actions]: any = useHookProjects()
  const tierText = (() => {
    switch (state.owner?.currentTier) {
      case POOL_WEIGHT.Bronze:
        return POOL_WEIGHT[POOL_WEIGHT.Bronze]
      case POOL_WEIGHT.Diamond:
        return POOL_WEIGHT[POOL_WEIGHT.Diamond]
      case POOL_WEIGHT.Gold:
        return POOL_WEIGHT[POOL_WEIGHT.Gold]
      case POOL_WEIGHT.Platinum:
        return POOL_WEIGHT[POOL_WEIGHT.Platinum]
      case POOL_WEIGHT.Silver:
        return POOL_WEIGHT[POOL_WEIGHT.Silver]
      default:
        return 'N/A'
    }
  })()

  const history = useHistory()
  const typePath = history.location.search.split('?')
  const typeIdo = typePath[1]
  const returnCate = () => {
    let cate: number | null = null

    switch (typeIdo) {
      case 'gamefi':
        cate = 0
        break
      case 'meta':
        cate = 1
        break
      case 'defi':
        cate = 2
        break
      default:
        break
    }

    return cate
  }

  return (
      <div className="main-banner-v3">
        <div className="box-banner-v3-new">
          <div className="box-img">
            <img src="/images/imagesV3/BgIdo.png" alt="" />
          </div>
        </div>
        <div className="box-content-v3">
          <div className="text-l-banner">
            <h3 className="title-v3">IDO Launchpad</h3>
            <p className="desc">The Ultimate Incubation Hub on Binance Smart Chain,</p>
            <p className="desc">Ethereum and Polygon.</p>
            <div className='devCus__bt'>
              <UnlockButton text="EXPLORE" />
            </div>
          </div>

          <div className="text-r-banner">
            <div className="CusAb" />
            {/* <div className="list-staking"> */}
            {/*   <div className="text-flex"> */}
            {/*     <span className="t-left">IDO Pool staked:</span> */}
            {/*     <span className="t-right">0 LFW</span> */}
            {/*   </div> */}
            {/*   <div className="text-flex"> */}
            {/*     <span className="t-left">Tier:</span> */}
            {/*     <span className="t-right">{tierText}</span> */}
            {/*   </div> */}
            {/*   <div className="text-flex"> */}
            {/*     <span className="t-left">NFT Boost:</span> */}
            {/*     <span className="t-right">{state.owner?.nftBoost || 'No'}</span> */}
            {/*   </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
  )
}
export default TopIDO
