import React, { useEffect, useCallback, useState, useContext, useMemo } from 'react'
import { ButtonArt } from 'components/Art'
import { useHookNft as useHookNftDetail } from './Store'
import { _cancelBidToken, _sellTokenTo, _getAsks, _cancelTokenTo } from '../Nft/utils'
import { useNftContract, useNftMarketContract } from '../../hooks/useContract'
import { GetAsksByUser } from '../../data/Nft'
import { useActiveWeb3React } from '../../hooks'
import { useHookNft } from '../Nft/Store-Nft'
import { useTransactionAdder, isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

const ItemProduct = ({ bidContract, account, tokenId, item }) => {
  const [state, actions]: any = useHookNft()
  const [stateDetail, actionsDetail]: any = useHookNftDetail()
  const addTransaction = useTransactionAdder()

  const sellTo = (to) => {
    _sellTokenTo(bidContract, stateDetail.objData.tokenId, to).then((response: any) => {
      addTransaction(response, {
        summary: 'Sell NFT successfully!',
        attr1: `${stateDetail.objData.tokenId}-sell`,
      })
      actions.updatelBiding({ account: to, code: stateDetail.objData.code })
    })
  }
  // const onApprove = useCallback(async () => {
  //   return await approval()
  // }, [approval])

  const cancel = async () => {
    _cancelBidToken(bidContract, stateDetail.objData.tokenId).then((response: any) => {
      addTransaction(response, {
        summary: 'Cancel NFT successfully!',
        attr1: `${stateDetail.objData.tokenId}-cancel`,
      })

      actions.cancelBiding({ account, code: stateDetail.objData.code })
    })
  }

  const updateInfoData = (id, amount, ownerAddress = '') => {
    let obj: any = { id, price: parseFloat(amount) }
    if (ownerAddress) {
      obj = { ...obj, ownerAddress }
    }
    actions.updateInfo(obj).then(() => {
      actionsDetail.getProductsDetail(id)
    })
  }

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const getStatus = (type) => {
    const pending = sortedRecentTransactions
      .filter((tx) => !tx.receipt && tx.attr1 === `${stateDetail.objData.tokenId}-${type}`)
      .map((tx) => tx.hash)
    return !!pending.length
  }

  const hasAction = stateDetail.asks.find((x) => parseInt(x.tokenId) === tokenId) || item.bidder && item.bidder === account


  return (
    <tr>
      <td className="cl-primary fw-bold">
        {item.bidder && item.bidder.substring(0, 8)}.....{item.bidder && item.bidder.substring(38, item.bidder.length)}
        <span className="under-title">Owner</span>
      </td>
      <td className="cl-primary fw-bold">
        {item.bidder && item.bidder.substring(0, 8)}.....{item.bidder && item.bidder.substring(38, item.bidder.length)}
        <span className="under-title">TxHash</span>
      </td>
      <td className="bid-price cl-white fw-bold">{item.price && item.price.toString() / 1e18} ATF
      <span className="under-title">TxHash</span>
      </td>
      {
        hasAction && (
          <td className="flex">
          {stateDetail.asks.find((x) => parseInt(x.tokenId) === tokenId) ? (
            <ButtonArt onClick={() => sellTo(item.bidder)} className="btn-bidding" type="button">
              Sell
            </ButtonArt>
          ) : (
            ''
          )}
  
          {item.bidder && item.bidder === account ? (
            <ButtonArt
              data-variant="danger"
              disabled={getStatus('cancel')}
              onClick={() => cancel()}
              className="btn-bidding"
              type="button"
            >
              Cancel {getStatus('cancel') ? <i className="fa fa-spinner fa-spin" /> : ''}
            </ButtonArt>
          ) : (
            ''
          )}
        </td>
        )
      }
    </tr>
  )
}

export default function BinTrad() {
  const [stateDetail, actionsDetail]: any = useHookNftDetail()
  const { tokenId } = stateDetail.objData
  const bidContract = useNftMarketContract()
  const { account } = useActiveWeb3React()
  useEffect(() => {
    if (account) {
      _getAsks(bidContract, account).then((res: any) => {
        const asks = res.map((item) => {
          return {
            tokenId: item.tokenId.toString(),
            price: item.price.toString(),
          }
        })
        actionsDetail.updateListAsk(asks)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidContract, stateDetail.bids, tokenId, account])
  return (
    <>
      <div className="p-market__table">
        <div className="l-container">
          <div className="c-table">
            <h3 className="c-title c-title--detail text-custom bidding-title">
              <img src="/images/biding.svg" alt="..." />
              Bidding
            </h3>

            <div className="table-reponse table-reponse-biding">
              <table>
                <thead className='headerTable'>
                  <tr>
                    <th>No.</th>
                    <th>Address</th>
                    <th>Price</th>
                    <th>
                      {' '}
                      {stateDetail.asks.find((x) => x.tokenId === tokenId && tokenId.toString()) ? 'Sell' : 'Action'}
                    </th>
                  </tr>
                </thead>

                {stateDetail.bids <= 0 ? (
                  <tbody className="custom-row-table">
                    <tr>
                      <td colSpan={4}>
                        <div className="box-message">
                          <img
                            src="/images/imagesSwap/not-found-token.png"
                            style={{
                              width: '100px',
                              marginBottom: 0,
                            }}
                            alt="unknown-artwork"
                            className="img-message"
                          />
                          <div className="cl-gray">No results found</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className="custom-row-table">
                    <tr>
                      <td colSpan={4}>
                        <div className="box-message">
                          <img
                            src="/images/imagesSwap/not-found-token.png"
                            style={{
                              width: '100px',
                              marginBottom: 0,
                            }}
                            alt="unknown-artwork"
                            className="img-message"
                          />
                          <div className="cl-gray">No results found</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  //
                  // phan logic dc coment o phia duoi
                  //
                  // <tbody className="custom-row-table table-biding">
                  //   {stateDetail.bids.map((item) => {
                  //     return (
                       
                  //       <ItemProduct
                  //         bidContract={bidContract}
                  //         tokenId={tokenId}
                  //         account={account}
                  //         item={item}
                  //         key={`bidder_${item.bids}`}
                  //       />
                  //     )
                  //   })}
                  // </tbody>
                )}
              </table>
            </div>
          </div>
          {/* <div className="c-table c-table--big">
            <h3 className="c-title c-title--detail">Trading History</h3>
            <div className="table-reponse">
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Price</th>
                    <th>History</th>
                    <th>To</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>{}</tr>
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
