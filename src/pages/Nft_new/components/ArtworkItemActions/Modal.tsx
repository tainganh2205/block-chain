/* eslint-disable import/no-cycle */
import React, { forwardRef, memo, useState, useMemo, useImperativeHandle, useContext } from 'react'
import Modal from 'react-modal'
import { Store } from 'react-notifications-component'
import _mintToken, {
  _cancelTokenTo,
  _getOwnerToken,
  _sellTokenTo,
  _getBids,
  _bidToken,
  _buyToken,
  _readyToSellToken,
  _transferNFT,
  _setCurrentPrice,
} from 'pages/Nft/utils'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useHookNft } from 'pages/Nft/Store-Nft'
import { useHookNft as useHookDetail } from 'pages/NftDetail/Store'
import { useActiveWeb3React } from 'hooks'
import { ListArtworkContext } from 'pages/Nft_new/components/ArtworkList'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const types = ['auction', 'sell', 'transfer', 'bid', 'update', 'editInfo']

Modal.setAppElement('#root')

const defaultInnerState = {
  visible: false,
  loading: false,
  type: "",
  artwork: {}
}

const ArtworkItemModal = memo(forwardRef((props: any, ref: any) => {
  const [innerState, setInnerState] = useState<any>(defaultInnerState)
  const [state, actions] = useHookNft()
  const [stateDetail, actionsDetail] = useHookDetail()
  const [objInfo, setObjInfo]: any = useState({ name: '', descriptions: '' })
  const addTransaction = useTransactionAdder()
  const { account } = useActiveWeb3React()
  const { convertedBalance, nftContract, bidContract } = useContext(ListArtworkContext)

  const handleCloseModal = () => {
    setInnerState(defaultInnerState)
    actions.updateTokenId('')
    actions.onChangeAmount('')
    actions.onChangeAddess('')
  }

  const _changeInputInfo = (e) => {
    setObjInfo({ ...objInfo, [e.target.id]: e.target.value })
  }

  const updateInfoNFT = async () => {
    actions.updateInfo({ id: innerState.artwork.id, name: objInfo.name, descriptions: objInfo.descriptions }).then(() => {
      alert('Update Info successfully!')
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

  const updatePriceNFT = async () => {
    _setCurrentPrice(bidContract, innerState.artwork.tokenId, state.amount).then((response: any) => {
      addTransaction(response, {
        summary: 'Update price successfully!',
        attr1: `${state.tokenId}-update`,
      })
      updateInfoData(innerState.artwork.id, state.amount, account || '')
    })
  }
  const bindingNFT = async () => {
    if (state.amount > convertedBalance) {
      Store.addNotification({
        title: 'Warning !',
        message: (
          <div className="custom-fontsize">
            <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true" /> the balance bid amount is
            greater than the current balance
          </div>
        ),
        type: 'warning',
        width: 300,
        insert: 'top',
        container: 'top-center',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 3000,
          onScreen: true,
          pauseOnHover: true,
          click: true,
          touch: true,
        },
      })
      return
    }
    _bidToken(bidContract, innerState.artwork.tokenId, state.amount).then((response: any) => {
      addTransaction(response, {
        summary: 'Biding successfully!',
        attr1: `${state.tokenId}-bid`,
      })
      actions.insertBiding({ amount: state.amount, account, hash: response.hash, code: innerState.artwork.code })
    })
  }

  const transferNFT = async () => {
    _transferNFT(nftContract, account, state.addressReceive, innerState.artwork.tokenId).then((response: any) => {
      addTransaction(response, {
        summary: 'Transfer NFT successfully!',
        attr1: `${state.tokenId}-transfer`,
      })
      actions.updateInfo({ id: innerState.artwork.id, ownerAddress: state.addressReceive, price: 0 })
    })
  }

  const readyToSellToken = async () => {
    _readyToSellToken(bidContract, state.tokenId, state.amount).then((response: any) => {
      addTransaction(response, {
        summary: 'Sold NFT successfully!',
        attr1: `${state.tokenId}-sell`,
      })
      updateInfoData(innerState.artwork.id, state.amount, account || '')
    })
  }
  const autionToSellToken = async () => {
    _readyToSellToken(bidContract, state.tokenId, state.amount).then((response: any) => {
      addTransaction(response, {
        summary: 'Sold NFT successfully!',
        attr1: `${state.tokenId}-auction`,
      })
      updateInfoData(innerState.artwork.id, state.amount, account || '')
    })
  }

  const _onSubmit = () => {
    switch (innerState.type) {
      case 'sell':
        readyToSellToken()
        break
      case 'auction':
        autionToSellToken()
        break
      case 'transfer':
        transferNFT()
        break
      case 'bid':
        bindingNFT()
        break
      case 'update':
        updatePriceNFT()
        break
      case 'editInfo':
        updateInfoNFT()
        break
      default:
        break
    }
  }

  useImperativeHandle(ref, () => ({
    open: (params) => {
      setInnerState({
        ...params
      })
    }
  }), [])

  return (
    <Modal isOpen={innerState.visible} onRequestClose={handleCloseModal} style={customStyles}>
        <div className="c-popup__box">
          <div className="c-popup__inner">
            <h3 className="c-popup__ttl custom">{(() => {
              switch (innerState.type) {
                case types[0]:
                  return 'Please set the opening price'
                  break
                case types[1]:
                  return 'Please set the selling price'
                  break
                case types[2]:
                  return 'Input the Address'
                  break
                case types[3]:
                  return 'Bidding'
                  break
                case types[4]:
                  return 'Please set new price'
                  break
                case types[5]:
                  return 'Update Info Artworks'
                default:
                  return 'Unknow'
              }
            })()}</h3>
            {innerState.type === 'editInfo' ? (
              <>
                <div className="c-popup__input">
                  {/* <input
                    type="text"
                    id="name"
                    placeholder="name"
                    value={objInfo.name}
                    onChange={(e) => _changeInputInfo(e)}
                  /> */}
                  <textarea
                    id="descriptions"
                    className="edit-decs custom"
                    placeholder="descriptions"
                    value={objInfo.descriptions}
                    onChange={(e) => _changeInputInfo(e)}
                  />
                </div>
              </>
            ) : (
              <div className="c-popup__input">
                {innerState.type === 'transfer' ? (
                  <input
                  className="custom"
                    readOnly={innerState.loading}
                    type="text"
                    value={state.addressReceive}
                    onChange={(e) => actions.onChangeAddess(e.target.value)}
                  />
                ) : (
                  <input
                  className="custom"
                    readOnly={innerState.loading}
                    type="number"
                    value={state.amount}
                    onChange={(e) => actions.onChangeAmount(e.target.value)}
                  />
                )}
              </div>
            )}

            <br />
            <div className="c-popup__btn">
              <button className="green" type="button" onClick={handleCloseModal}>
                Cancel
              </button>
              {convertedBalance && convertedBalance < state.amount && innerState.type === 'bid' ? (
                <button
                  className="green"
                  disabled={innerState.loading}
                  type="button"
                  onClick={() =>
                    Store.addNotification({
                      title: 'Warning !',
                      message: (
                        <div className="custom-fontsize">
                          <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true" /> Insufficient balance !
                        </div>
                      ),
                      type: 'warning',
                      width: 300,
                      insert: 'top',
                      container: 'top-center',
                      animationIn: ['animate__animated', 'animate__fadeIn'],
                      animationOut: ['animate__animated', 'animate__fadeOut'],
                      dismiss: {
                        duration: 2000,
                        onScreen: true,
                        pauseOnHover: true,
                        click: true,
                        touch: true,
                      },
                    })
                  }
                >
                  Submit
                </button>
              ) : (
                <button
                  className="green"
                  disabled={innerState.loading}
                  type="button"
                  onClick={() => {
                    _onSubmit()
                    handleCloseModal()
                  }}
                >
                  Submit
                </button>
                // acb 2
              )}
            </div>
          </div>
        </div>
      </Modal>
  )
}))

export default ArtworkItemModal
