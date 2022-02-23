/* eslint-disable jsx-a11y/media-has-caption */
import React, { memo, useCallback } from 'react'
import { useNftContract, useNftMarketContract } from '../../hooks/useContract'
import { API_IMAGE } from '../../constants'
import { useHookNft } from './Store-Nft'
import ButtonCustom from './ButtonCustom'

const ItemProduct = memo(
  ({ balance, allowanceApplyBSCS, item, onApprove, getStatus, getStatusAprrove, toggleModal }: any) => {
    const [state, actions] = useHookNft()

    // pupup

    const bidContract = useNftMarketContract()
    const nftContract = useNftContract()

    const handleApprove = useCallback(async () => {
      try {
        await onApprove()
      } catch (e) {
        console.log({ '[Nft - ItemProduct] -> handleApprove': e })
      }
    }, [onApprove])

    return (
      <li key={`products_${item.id}`} className="c-list__item">
        <span className="lbl-typefile"> {item.fileType === 2 ? 'Video' : 'Image'}</span>
        <button
          type="button"
          className="c-list__label"
          disabled={allowanceApplyBSCS && allowanceApplyBSCS.toString() !== '0'}
          onClick={() => handleApprove()}
        >
          Approve
          {getStatusAprrove() ? <i className="fa fa-spinner fa-spin" /> : ''}
        </button>
        <div className="c-list__img">
          {item.fileType === 2 ? (
            <>
              <button type="button" onClick={() => toggleModal(item)} className="thumbnail-card">
                <img className="lazy-loading-bsc" data-src={item.thumbnail} alt="" />
                <div className="cover">
                  <img className="bgImg lazy-loading-bsc" data-src="/images/play-button.png" alt="" />
                </div>
              </button>
            </>
          ) : (
            <>
              <a href={`/#/NFTdetail/${item.id}`} className="item-bg a-bsc">
                <img
                  className="lazy-loading-bsc"
                  data-src={`${item.fileName && item.fileName.indexOf('amazonaws') !== -1 ? '' : API_IMAGE}${
                    item.fileName
                  }?v=122`}
                  alt=""
                />
              </a>
            </>
          )}
        </div>
        <div className="c-list__body">
          <h3 className="c-list__ttl">
            {item.name} -
            <a className="edit-product a-bsc" href={`#/usercenter/${item.author}`}>
              <span> {item.authorName}</span>
            </a>
          </h3>
          <div className="c-list__box">
            <p className="c-list__number">{item.price.toLocaleString()}</p>
            <p className="number">Amount: {item.totalItems}</p>
          </div>
          <div className="row-btn">
            {balance && balance >= 0 ? (
              <>
                {allowanceApplyBSCS && allowanceApplyBSCS.toString() !== '0' ? (
                  <>
                    {balance && balance >= item.price ? (
                      <>
                        <ButtonCustom
                          data={{ ...item,balance, nftContract, bidContract, type: 'bid' }}
                          className="w50 btn-default green"
                          text="Place Bid"
                          type="bidding"
                          isLoading={getStatus('bid', item)}
                        />
                        <ButtonCustom
                          data={{ ...item, balance,nftContract, bidContract, type: 'buy' }}
                          className="w50 btn-default green"
                          text="Buy"
                          type="buy"
                          isLoading={getStatus('buy', item)}
                          isProcessing={item.isProcessing}
                        />
                      </>
                    ) : (
                      <ButtonCustom
                          data={{ ...item, balance,nftContract, bidContract, type: 'bid' }}
                          className="w50 btn-default green full-with"
                          text="Place Bid"
                          type="bidding"
                          isLoading={getStatus('bid', item)}
                        />
                    )}

                  </>
                ) : (
                  ''
                )}
              </>
            ) : (
              <button disabled className="btn-default green full-with" type="button">
                Insufficient balance
              </button>
            )}
          </div>
        </div>
      </li>
    )
  }
)

export default ItemProduct
