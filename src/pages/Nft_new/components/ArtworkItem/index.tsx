/* eslint-disable no-return-await, import/no-cycle, react-hooks/exhaustive-deps, no-return-assign, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { memo, useCallback, useMemo, useContext, useState } from 'react'
import { useApproveCallbackCustom, useApproveNFTCallbackCustom } from 'hooks/useApproveCallback'
import { TOKEN_BSCS_TESTNET, CONTRACT_BID, API_IMAGE, CONTRACT_NFT } from 'constants/index'
import { useActiveWeb3React } from 'hooks'
import { useHookNft } from 'pages/Nft/Store-Nft'
import { useTokenAllowanceNFTCustom } from 'data/Allowances'
import { useOwnerTokenFT } from 'data/Nft'
import { ListArtworkContext } from '../ArtworkList'
import { ArtworkItemProps } from './index.d'
import { STATUS_ARTWORK } from '../ArtworkList/index.d'
import './index.less'

const ItemArtwork = memo<ArtworkItemProps>((props) => {
  const {
    allowanceApplyBSCS,
    convertedBalance,
    sortedRecentTransactions,

    biding,
    approveSell,
    cancelTokenTo,
    buyToken,
    gotoDetail,
  } = useContext(ListArtworkContext)

  const [approval] = useApproveCallbackCustom(TOKEN_BSCS_TESTNET, CONTRACT_BID)
  const [state, actions] = useHookNft()
  const { account } = useActiveWeb3React()
  // const account = '0x81B310F06Cb1A6dEfaa9d877a93Cb3C347CCe687'
  const [_approvalSell] = useApproveNFTCallbackCustom(
    CONTRACT_NFT,
    CONTRACT_BID,
    props.artwork?.tokenId,
    props.artwork?.tokenId
  )
  const allowanceNFT = useTokenAllowanceNFTCustom(CONTRACT_NFT, account ?? undefined, props.artwork?.tokenId)
  const ownerNFT = useOwnerTokenFT(props.artwork.tokenId)

  const getStatus = useCallback(
    (type) => {
      // TODO: check item undefined
      if (!props.artwork) {
        return false
      }
      const pending = sortedRecentTransactions
        .filter((tx) => !tx.receipt && tx.attr1 === `${props.artwork?.tokenId}-${type}`)
        .map((tx) => tx.hash)

      return !!pending.length
    },
    [props.artwork, sortedRecentTransactions]
  )
  const getStatusAprrove = () => {
    const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
    return !!pending.length
  }
  const isBidLoading = useMemo(() => getStatus('bid'), [getStatus])
  const isBuyLoading = useMemo(() => getStatus('buy'), [getStatus])
  const isApproveNFTLoading = useMemo(() => getStatus('approve'), [getStatus])
  const isRevokeLoading = useMemo(() => getStatus('revoke'), [getStatus])
  const isUpdateLoading = useMemo(() => getStatus('update'), [getStatus])
  const isSellLoading = useMemo(() => getStatus('sell'), [getStatus])
  const isAuctionLoading = useMemo(() => getStatus('auction'), [getStatus])
  const isTransferLoading = useMemo(() => getStatus('transfer'), [getStatus])
  const [statusUnStake, setStatusUnStake] = useState(true)

  const onApprove = useCallback(async () => {
    return await approval()
  }, [approval])

  const openModal = useCallback((_type) => {
    if (props.toggleModal) {
      props.toggleModal({
        typeModal: _type,
        artwork: props.artwork,
      })
    }
  }, [])

  const ownerNFTTemp = ownerNFT && ownerNFT.toLowerCase()
  const accountTemp = account && account.toLowerCase()
  const allowanceNFTTemp = (allowanceNFT && allowanceNFT.toString().toLowerCase()) || ''
  console.log('props.artwork:', props.artwork)
  return (
    <li className="bsc-artwork-item">
      <div onClick={() => gotoDetail(props.artwork)} className="bsc-artwork-item-top">
        {props.artwork?.fileType === 2 && (
          <span className="wrapper-play-video">
            <img src="/assets/images/play-video.svg" alt="play-video" />
          </span>
        )}
        {props.artwork.fileType === 2 ? (
          <img
            loading="lazy"
            className="lazy-loading-bsc"
            data-src={
              props.artwork.fileType === 2
                ? props.artwork.thumbnail
                : `${props.artwork.fileName && props.artwork.fileName.indexOf('amazonaws') !== -1 ? '' : API_IMAGE}${
                    props.artwork.fileName
                  }?v=122`
            }
            alt={props.artwork?.name}
          />
        ) : (
          <img
            loading="lazy"
            className="lazy-loading-bsc"
            data-src={`${
              props.artwork.fileName && props.artwork.fileName.indexOf('amazonaws') !== -1 ? '' : API_IMAGE
            }${props.artwork.fileName}?v=122`}
            alt={props.artwork?.name}
          />
        )}
      </div>
      <div className="bsc-artwork-item-bottom">
        <div>
          <p className="wrapper-type">
            <span className="file-type">{props.artwork?.fileType === 2 ? 'Video' : 'Image'}</span>
            {/* <img src="/images/checked.png" alt="..." /> */}

          </p>
          <div>
            {(() => {
              switch (props.artwork?.status) {
                case STATUS_ARTWORK.REVIEWED:
                  return <img src="/images/checked.png" alt="" />
                case STATUS_ARTWORK.PENDING:
                  return <img src="/images/peding.svg" alt="" />
                case STATUS_ARTWORK.REJECT:
                  return <img src="/images/reject.svg" alt="" />
                default:
                  return true
              }
            })()}
          </div>
        </div>

        <div>
          <section className="title-name">
            <span className="name">{props.artwork?.name || 'Unknow'}</span>
            <span className="id">{`#${props.artwork?.id}`}</span>
          </section>
          <span className="authorName">{props.artwork?.authorName || ''}</span>
        </div>

        <div className="wrapper-footer-item">
          <span className="price">Price</span>
          <div>
            <img src="/images/Logo-art.png" alt="..." />
            <span className="price-art">{props.artwork?.price.toLocaleString() || '0.00'}</span>
          </div>
        </div>


      </div>
    </li>
  )
})

export default ItemArtwork
