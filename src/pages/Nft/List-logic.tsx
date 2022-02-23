import React, { useMemo, useEffect, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useApproveCallbackCustom, useApproveNFTCallbackCustom } from '../../hooks/useApproveCallback'
import { useNftContract, useNftMarketContract } from '../../hooks/useContract'
import { useActiveWeb3React } from '../../hooks'
import { useTokenAllowanceNFTCustom, useTokenAllowanceCustom } from '../../data/Allowances'
import { useOwnerTokenFT } from '../../data/Nft'
import { TOKEN_BSCS, CONTRACT_NFT, CONTRACT_BID } from '../../constants'
import _mintToken, { _getOwnerToken, _sellTokenTo, _getBids, _bidToken, _buyToken, _readyToSellToken } from './utils'
import { useTransactionAdder, isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

const ItemData = ({ bidContract, allowance, item }) => {
  const tokenIDTemp = item.tokenId

  const [requestedApproval, setRequestedApproval] = useState(false)
  const { account } = useActiveWeb3React()

  const [earn, setEarn] = useState(0)

  const allowanceNFT = useTokenAllowanceNFTCustom(CONTRACT_NFT, account ?? undefined, tokenIDTemp)

  const allowanceBid = useTokenAllowanceCustom(TOKEN_BSCS, account ?? undefined, CONTRACT_BID)

  const [approval] = useApproveCallbackCustom(TOKEN_BSCS, CONTRACT_BID)

  const [attempting, setAttempting] = useState(false)

  async function onAttemptToApprove() {
    const result = approval().then((res) => {
      console.log('res.>', res)
    })
    return result
  }
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onAttemptToApprove()
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approval, setRequestedApproval])

  const nftContract = useNftContract()

  const addTransaction = useTransactionAdder()

  async function mint(
    url: any = `https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/fe501fb1752a48aca4f9a3c6458d01de.gif`
  ) {
    if (nftContract) {
      await setAttempting(true)
      await _mintToken(nftContract, account, url).then((response: any) => {
        console.log('response>>', response)
        setAttempting(false)
        addTransaction(response, {
          summary: '_mintToken',
        })
      })
    }
  }
  async function buy(tokenId) {
    if (nftContract) {
      await setAttempting(true)
      await _buyToken(bidContract, tokenId).then((response: any) => {
        setAttempting(false)
        addTransaction(response, {
          summary: tokenId,
        })
      })
    }
  }

  async function bid(tokenId, price = '200000000000000000') {
    if (bidContract) {
      await setAttempting(true)
      await _bidToken(bidContract, tokenId, price).then((response: any) => {
        setAttempting(false)
        addTransaction(response, {
          summary: tokenId,
        })
      })
    }
  }

  async function readyToSell(tokenId, price = '1000000000000000000') {
    if (nftContract) {
      await setAttempting(true)
      await _readyToSellToken(bidContract, tokenId, price).then((response: any) => {
        setAttempting(false)
        addTransaction(response, {
          summary: tokenId,
        })
      })
    }
  }

  const [approvalSell] = useApproveNFTCallbackCustom(CONTRACT_NFT, CONTRACT_BID, tokenIDTemp)

  async function onAttemptToApproveSell() {
    return approvalSell()
  }
  const handleApproveSell = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onAttemptToApproveSell()
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalSell, setRequestedApproval])

  async function sellTO(tokenId) {
    if (bidContract) {
      await setAttempting(true)
      // const estimatedGas = await bidContract.estimateGas.sellTokenTo(...[tokenId, '0x2b2512B318785aE77e014ab413855fA60F805fFA'], { from: account })
      // console.log('estimatedGas>>', estimatedGas)
      await _sellTokenTo(bidContract, tokenId, '0x2b2512B318785aE77e014ab413855fA60F805fFA').then((response: any) => {
        setAttempting(false)
        addTransaction(response, {
          summary: tokenId,
        })
      })
    }
  }

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions
    .filter((tx) => !tx.receipt && tx.summary === tokenIDTemp)
    .map((tx) => tx.hash)

  const hasPendingTransactions = !!pending.length
  console.log('hasPendingTransactions.>', hasPendingTransactions)

  return (
    <li key={`id_${item.id}`} className="c-list__item">
      {allowance && allowance.toString() ? (
        <>
          <button disabled={hasPendingTransactions} onClick={() => mint()} type="button">
            Mint
          </button>
          {allowanceNFT && allowanceNFT.toString() !== '0x0000000000000000000000000000000000000000' ? (
            <button onClick={() => readyToSell(item.tokenId)} type="button">
              Ready To Sell
            </button>
          ) : (
            <button onClick={() => handleApproveSell()} type="button">
              Approve NFT To Market
            </button>
          )}

          <button disabled={hasPendingTransactions} onClick={() => bid(item.tokenId)} type="button">
            Bid
          </button>
          <button onClick={() => buy(item.tokenId)} type="button">
            Buy
          </button>
          <button onClick={() => sellTO(item.tokenId)} type="button">
            Sell to
          </button>
        </>
      ) : (
        <button type="button" onClick={() => handleApprove()} className="c-list__label">
          Approve
        </button>
      )}
      <div className="c-list__img">
        <a className="a-bsc" href={`/#/NFTdetail/${item.id}`}>
          <img src={item.img} alt="" />
        </a>
      </div>
      <div className="c-list__body">
        <h3 className="c-list__ttl">{item.name}</h3>
        <div className="c-list__box">
          <p className="c-list__number">{item.price}</p>
          {/* <p >231</p> */}
        </div>
      </div>
    </li>
  )
}

export default function List() {
  const { account } = useActiveWeb3React()

  const [dataBids, setDataBids] = useState([])
  const allowance = useTokenAllowanceCustom(TOKEN_BSCS, account ?? undefined, CONTRACT_BID)
  const bidContract = useNftMarketContract()
  const nftContract = useNftContract()

  // TODO: will get from API
  const listItem = [
    { tokenId: '8', id: 1, img: '/assets/images/img01.png', name: 'Assault commando S02', price: '321,321' },
    { tokenId: '9', id: 2, img: '/assets/images/img02.png', name: `L'Indépendance`, price: '321,321' },
    // { tokenId: 6, id: 3, img: "/assets/images/img03.png", name: 'French chateau', price: '321,321' },
    // { tokenId: 7, id: 4, img: "/assets/images/img04.png", name: 'Mage duel', price: '321,321' },
    // { tokenId: 8, id: 5, img: "/assets/images/img05.png", name: 'Envivornment Collection I', price: '321,321' }
  ]

  useEffect(() => {
    // _getBids(bidContract, tokenIDTemp).then((res: any) => {
    //     const listBid = res.map(item => {
    //         return {
    //             bidder: item.bidder,
    //             price: item.price
    //         }
    //     });
    //     setDataBids(listBid)
    // })
  }, [bidContract, nftContract, account])

  const addTransaction = useTransactionAdder()
  // const _sellTo = async (bidder) => {
  //     await _sellTokenTo(bidContract, tokenIDTemp, bidder).then((response: any) => {
  //         addTransaction(response, {
  //             summary: '_buyToken',
  //         })
  //     })
  // }
  // const ownerNFT = useOwnerTokenFT(tokenIDTemp)

  return (
    <>
      <div className="p-home__list">
        <div className="l-container">
          <div>
            <h3 className="c-title">
              Hottest Artworks -{' '}
              <a href="/#/mintNFT" className="btn-upload a-bsc">
                Mint Artworks
              </a>
            </h3>
          </div>
          <h2>Bids</h2>
          {dataBids.map((item: any) => {
            return (
              <p key={item.bidder}>
                {item.bidder}
                <button type="button">Sell</button>
              </p>
            )
          })}
          <br />
          <ul className="c-list">
            {listItem.map((item) => (
              <ItemData bidContract={bidContract} allowance={allowance} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
