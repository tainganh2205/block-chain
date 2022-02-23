/* eslint-disable jsx-a11y/media-has-caption */
import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react'
import Modal from 'react-modal'
import { useNftContract, useNftMarketContract } from '../../hooks/useContract'
import { API_VIDEO } from '../../constants'
import { useHookNft } from './Store-Nft'
import ButtonCustom from './ButtonCustom'

Modal.setAppElement('#root')

const ModalPreview = memo(
  forwardRef<any, any>(({ balance, allowanceApplyBSCS, onApprove, getStatus, getStatusAprrove }: any, ref: any) => {
    const [modal, setModal] = useState<any>({
      isOpen: false,
      item: {},
    })
    const bidContract = useNftMarketContract()
    const nftContract = useNftContract()
    const [state, actions] = useHookNft()

    const handleApprove = useCallback(async () => {
      try {
        await onApprove()
      } catch (e) {
        console.log({ '[Nft - ModalPreview] -> handleApprove': e })
      }
    }, [onApprove])

    useImperativeHandle(
      ref,
      () => ({
        toggle: (item) =>
          setModal((prev) => ({
            isOpen: !prev.isOpen,
            item,
          })),
      }),
      []
    )

    return (
      <Modal
        isOpen={modal.isOpen}
        onRequestClose={() => setModal((p) => ({ ...p, isOpen: false }))}
        overlayClassName={{
          base: 'overlay-base',
          afterOpen: 'overlay-after',
          beforeClose: 'overlay-before',
        }}
        className={{
          base: 'content-base',
          afterOpen: 'content-after',
          beforeClose: 'content-before',
        }}
        closeTimeoutMS={100}
      >
        <ul key={`products_${modal.item.id}`} className="c-list__item_video">
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
            <video className="border-video lazy-loading-bsc" width="100%" controls autoPlay>
              <source
                data-src={`${modal.item.fileName && modal.item.fileName.indexOf('amazonaws') !== -1 ? '' : API_VIDEO}${
                  modal.item.fileName
                }?v=122`}
                type="video/mp4"
              />
            </video>
            {/* </a> */}
          </div>
          <div className="c-list__body">
            <h3 className="c-list__ttl text-white">
              {modal.item.name} -
              <a
                className="edit-product a-bsc"
                href={`#/usercenter/${modal.item.author}`}
              >
                <span> {modal.item.authorName}</span>
              </a>
            </h3>
            <div className="c-list__box">
              <p className="c-list__number">{modal.item.price}</p>
              <p className="amount">Amount: {modal.item.totalItems}</p>
            </div>
            <div className="row-btn">
              {balance && balance >= 0 ? (
                <>
                  {allowanceApplyBSCS && allowanceApplyBSCS.toString() !== '0' ? (
                    <>
                      {balance && balance >= modal.item.price ? (
                        <>
                          <ButtonCustom
                            data={{ ...modal.item, nftContract, bidContract, type: 'bid' }}
                            className="w50 btn-default green"
                            text="Place Bid"
                            type="bidding"
                            isLoading={getStatus('bid')}
                          />
                          <ButtonCustom
                            data={{ ...modal.item, nftContract, bidContract, type: 'buy' }}
                            className="w50 btn-default green"
                            text="Buy"
                            type="buy"
                            isLoading={getStatus('buy')}
                            isProcessing={modal.item.isProcessing}
                          />
                        </>
                      ) : (
                        <ButtonCustom
                          data={{ ...modal.item, nftContract, bidContract, type: 'bid' }}
                          className="w50 btn-default green full-with"
                          text="Place Bid"
                          type="bidding"
                          isLoading={getStatus('bid')}
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
            <div className="row-button">
              <button
                className="close-popup-video"
                type="button"
                onClick={() => setModal((p) => ({ ...p, isOpen: false }))}
              >
                Close
              </button>
              <a className="moreDetailNft a-bsc" href={`/#/NFTdetail/${modal.item.id}`}>
                More <i className="fa fa-arrow-right" aria-hidden="true" />
              </a>
            </div>
          </div>
        </ul>
      </Modal>
    )
  })
)

export default ModalPreview
