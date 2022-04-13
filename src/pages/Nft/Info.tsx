import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Currency } from '@lfwfinance/sdk-dev'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { useHookNft } from './Store-Nft'


export default function Info() {
  const [state, actions]: any = useHookNft()
  const { marketInfo,yourBalanceBSCS,BSCSBurned,totalValueLock } = state
  const { account } = useActiveWeb3React()
 
  
  useEffect(() => {
    actions.getMarketInfo()
    actions.getTotalValueLock()
    actions.getBSCSBurned()
   
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 
  useEffect(() => {
    actions.getBalanceByWallet(account)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  
    return (
      <>
        <div className="p-home__info">
          <div className="d-flex-jbetween l-container">
            <ul className="c-info c-info--big dark_light">
              <li>
                <p className="c-info__ttl">Your ATF balance</p>
                <h3 className="c-info__price">
                  <span className="c-info__icon">
                    <img src="/assets/images/icon01.svg" alt="" />
                  </span>
               
                  {yourBalanceBSCS && (yourBalanceBSCS.result/1e18).toLocaleString() }
                </h3>
              </li>
              <li>
                <p className="c-info__ttl">ATF in circulation</p>
                <h3 className="c-info__price">
                  <span className="c-info__icon">
                    <img src="/assets/images/icon01.svg" alt="" />
                  </span>
                  38,866,314
                  {/* {marketInfo && marketInfo.circulating_supply} */}
                </h3>
              </li>
              
              <li>
                <p className="c-info__ttl">ATF price</p>
                <h3 className="c-info__price">$ {marketInfo && marketInfo.price}</h3>
              </li>
              <li>
                <p className="c-info__ttl">ATF Market Cap</p>
                <h3 className="c-info__price">$ {marketInfo && marketInfo.market_cap}</h3>
              </li>
              <li>
                <p className="c-info__ttl">NFT Trading vol</p>
                <h3 className="c-info__price">
                  <span className="c-info__icon">
                    <img src="/assets/images/icon01.svg" alt="" />
                  </span>
                  {marketInfo && marketInfo.trading_vol_nft}
                </h3>
              </li>
              <li>
                <p className="c-info__ttl">ATF burned</p>
                <h3 className="c-info__price">
                  <span className="c-info__icon">
                    <img src="/assets/images/icon01.svg" alt="" />
                  </span>
                  {BSCSBurned && (BSCSBurned.result/1e18).toLocaleString() }
                </h3>
              </li>
              <li>
                <p className="c-info__ttl">Pending harvest</p>
                <h3 className="c-info__price number">
                  <span className="c-info__icon">
                    <img src="/assets/images/icon01.svg" alt="" />
                  </span>
                  0.00
                </h3>
              </li>
              <li>
                <p className="c-info__ttl">TVL</p>
                <h3 className="c-info__price number">$ {marketInfo && totalValueLock && (totalValueLock.result/1e18*marketInfo.price).toLocaleString()}</h3>
              </li>
              <li>
                <p className="c-info__ttl">Volume(24hr)</p>
                <h3 className="c-info__price ">$ {marketInfo && marketInfo.volume_24h}</h3>
              </li>

              
              <li>
                <p className="c-info__ttl">ATF Locked by NFT</p>
                <h3 className="c-info__price">
                  <span className="c-info__icon">
                    <img src="/assets/images/icon01.svg" alt="" />
                  </span>
                  {marketInfo && marketInfo.bake_locked_by_nft}
                </h3>
              </li>
            </ul>
            {/* <ul className="c-info c-info--small dark_light">
              
              <li>
                <p className="c-info__ttl">NFT Trading vol</p>
                <h3 className="c-info__price">
                  <span className="c-info__icon">
                    <img src="/assets/images/icon01.svg" alt="" />
                  </span>
                  {marketInfo && marketInfo.trading_vol_nft}
                </h3>
              </li>
              <li>
                <p className="c-info__ttl">ATF Locked by NFT</p>
                <h3 className="c-info__price">
                  <span className="c-info__icon">
                    <img src="/assets/images/icon01.svg" alt="" />
                  </span>
                  {marketInfo && marketInfo.bake_locked_by_nft}
                </h3>
              </li>
              <li>
                <p className="c-info__ttl">Mint NFT</p>
                <h3 className="c-info__price">{marketInfo && marketInfo.minted_nft}</h3>
              </li>
              <li>
                <p className="c-info__ttl">NFT Transactions</p>
                <h3 className="c-info__price">$ {marketInfo && marketInfo.transactions_nft}</h3>
              </li>
            </ul> */}
          </div>
        </div>
      </>
    )
}
