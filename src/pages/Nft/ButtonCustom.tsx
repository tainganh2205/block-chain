import React, { useState, useCallback } from 'react'
import Modal from 'react-modal'
import { store } from 'react-notifications-component'
import { ButtonArt } from 'components/Art'
import 'react-notifications-component/dist/theme.css'
import { useApproveNFTCallbackCustom } from '../../hooks/useApproveCallback'
import { useTokenAllowanceCustom, useBalanceBSCS, useTokenAllowanceNFTCustom } from '../../data/Allowances'
import { useActiveWeb3React } from '../../hooks'
import { CONTRACT_NFT, CONTRACT_BID } from '../../constants'
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
} from './utils'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { useHookNft } from './Store-Nft'
import { useHookNft as useHookDetail } from '../NftDetail/Store'

const types = ['auction', 'sell', 'transfer', 'bid', 'update', 'editInfo']

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

Modal.setAppElement('#root')

const ButtonCustom = (props) => {
  const [objInfo, setObjInfo]: any = useState({ name: '', descriptions: '' })
  const [state, actions]: any = useHookNft()
  const [stateDetail, actionsDetail]: any = useHookDetail()
  const { account } = useActiveWeb3React()
  const [loadingCustom, setLoadingCustom] = useState(false)
  const { data, className, type, isProcessing, text, isLoading = false } = props
  const addTransaction = useTransactionAdder()

  const [approvalSell] = useApproveNFTCallbackCustom(CONTRACT_NFT, CONTRACT_BID, data.tokenId, data.tokenId)

  async function onAttemptToApproveSell() {
    return approvalSell()
  }
  const handleApproveSell = useCallback(async () => {
    try {
      await onAttemptToApproveSell()
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalSell])

  const _onCick = () => {
    // if (data.type === 'bid' ||  data.type === 'buy' || data.type === 'transfer') {
    //   alert('Coming soon!')
    //   return
    // }
    if (data.type === 'bid' && data.ownerAddress === account) {
      // alert('Owner cannot bid')
      store.addNotification({
        title: 'Warning !',
        message: (
          <div className="custom-fontsize">
            <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true" /> Owner cannot bid
          </div>
        ),
        type: 'warning',
        width: 300,
        insert: 'center',
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
    biding()
    switch (type) {
      case 'approveNFT':
        handleApproveSell()
        break
      case 'revoke':
        cancelTokenTo()
        break
      case 'buy':
        buyToken()
        break
        break
      default:
        break
    }
  }

  const _onSubmit = () => {
    switch (data.type) {
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
  const buyToken = async () => {
    setLoadingCustom(true)
    actions.checkNftAvailable({ id: data.id, account }).then((res) => {
      if (res.data.data) {
        _buyToken(data.bidContract, data.tokenId).then((response: any) => {
          addTransaction(response, {
            summary: 'Buy NFT successfully!',
            attr1: `${data.tokenId}-buy`,
          })
          if (account) {
            // TODO: update buy
            // updateInfoData(data.id, 0, account)
            //
            // insert BUY log
            actions
              .insertBuyToDB({
                artworkId: data.id,
                ownerAddress: account,
                totalSold: 1,
                transactionHash: response.hash,
              })
              .then(() => {
                setLoadingCustom(false)
              })
          }
        })
      }
    })
  }

  const updateInfoNFT = async () => {
    actions.updateInfo({ id: data.id, name: objInfo.name, descriptions: objInfo.descriptions }).then(() => {
      alert('Update Info successfully!')
    })
  }
  const updatePriceNFT = async () => {
    _setCurrentPrice(data.bidContract, data.tokenId, state.amount).then((response: any) => {
      addTransaction(response, {
        summary: 'Update price successfully!',
        attr1: `${state.tokenId}-update`,
      })
      updateInfoData(data.id, state.amount, account || '')
    })
  }
  const bindingNFT = async () => {
    if (state.amount > data.balance) {
      store.addNotification({
        title: 'Warning !',
        message: (
          <div className="custom-fontsize">
            <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true" /> the balance bid amount is
            greater than the current balance
          </div>
        ),
        type: 'warning',
        width: 300,
        insert: 'center',
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

    _bidToken(data.bidContract, data.tokenId, state.amount).then((response: any) => {
        addTransaction(response, {
          summary: 'Biding successfully!',
          attr1: `${state.tokenId}-bid`,
        })
        actions.insertBiding({ amount: state.amount, account, hash: response.hash, code: data.code })       
    })
  }

  const transferNFT = async () => {
    _transferNFT(data.nftContract, account, state.addressReceive, data.tokenId).then((response: any) => {
      addTransaction(response, {
        summary: 'Transfer NFT successfully!',
        attr1: `${state.tokenId}-transfer`,
      })
      actions.updateInfo({ id: data.id, ownerAddress: state.addressReceive, price: 0 })
    })
  }
  const cancelTokenTo = async () => {
    _cancelTokenTo(data.bidContract, data.tokenId).then((response: any) => {
      addTransaction(response, {
        summary: 'Revoke NFT successfully!',
        attr1: `${state.tokenId}-revoke`,
      })
      updateInfoData(data.id, 0, account || '')
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
  const readyToSellToken = async () => {
    _readyToSellToken(data.bidContract, state.tokenId, state.amount).then((response: any) => {
      addTransaction(response, {
        summary: 'Sold NFT successfully!',
        attr1: `${state.tokenId}-sell`,
      })
      updateInfoData(data.id, state.amount, account || '')
    })
  }
  const autionToSellToken = async () => {
    _readyToSellToken(data.bidContract, state.tokenId, state.amount).then((response: any) => {
      addTransaction(response, {
        summary: 'Sold NFT successfully!',
        attr1: `${state.tokenId}-auction`,
      })
      updateInfoData(data.id, state.amount, account || '')
    })
  }

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [typeButton, setTypeButton] = useState('')
  const closeModal = (): boolean => {
    setModalIsOpen(false)
    actions.updateTokenId('')
    actions.onChangeAmount('')
    actions.onChangeAddess('')
    return true
  }

  const biding = () => {
    if (types.indexOf(data.type) === -1) {
      return
    }
    if (data.balance <= 0) {
      store.addNotification({
        title: 'Warning !',
        message: (
          <div className="custom-fontsize">
            <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true" /> Not enough amount ATF
          </div>
        ),
        type: 'warning',
        width: 300,
        insert: 'center',
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
    setModalIsOpen(true)
    setTypeButton(data.type)
    actions.updateTokenId(data.tokenId)
    switch (data.type) {
      case types[0]:
        setTitleModal('Please set the opening price')
        break
      case types[1]:
        setTitleModal('Please set the selling price')
        break
      case types[2]:
        setTitleModal('Input the Address')
        break
      case types[3]:
        setTitleModal('Place Bid')
        break
      case types[4]:
        setTitleModal('Please set new price')
        break
      case types[5]:
        setTitleModal('Update Info Artworks')
        break
      default:
        break
    }
  }
  const _changeInputInfo = (e) => {
    setObjInfo({ ...objInfo, [e.target.id]: e.target.value })
  }

  let textLabel = text
  if (isProcessing && !isLoading) {
    textLabel = 'Paying'
  } else if (isLoading) {
    textLabel = 'Pending'
  }
  let balance = useBalanceBSCS()
  balance = parseFloat((balance && balance.toString() / 1e18) || 0)
  return (
    <>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <div className="c-popup__box">
          <div className="c-popup__inner">
            <h3 className="c-popup__ttl custom">{titleModal}</h3>
            {data.type === 'editInfo' ? (
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
                {data.type === 'transfer' ? (
                  <input
                    className="custom"
                    readOnly={isLoading}
                    type="text"
                    value={state.addressReceive}
                    onChange={(e) => actions.onChangeAddess(e.target.value)}
                  />
                ) : (
                  <input
                    className="custom"
                    readOnly={isLoading}
                    type="number"
                    value={state.amount}
                    onChange={(e) => actions.onChangeAmount(e.target.value)}
                  />
                )}
              </div>
            )}

            <br />
            <div className="c-popup__btn">
              <ButtonArt type="button" onClick={closeModal}>
                Cancel
              </ButtonArt>
              {balance && balance < state.amount && data.type === 'bid' ? (
                <ButtonArt
                  disabled={isLoading}
                  type="button"
                  onClick={() =>
                    store.addNotification({
                      title: 'Warning !',
                      message: (
                        <div className="custom-fontsize">
                          <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true" /> Insufficient
                          balance !
                        </div>
                      ),
                      type: 'warning',
                      width: 300,
                      insert: 'center',
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
                </ButtonArt>
              ) : (
                <ButtonArt
                  disabled={isLoading}
                  type="button"
                  onClick={() => {
                    _onSubmit()
                    closeModal()
                  }}
                >
                  Submit
                </ButtonArt>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <ButtonArt
        onClick={() => {
          _onCick()
        }}
        disabled={isLoading}
        type="button"
        className={className}
      >
        {textLabel}
        {isLoading || loadingCustom ? <i className="fa fa-spinner fa-spin" /> : ''}
      </ButtonArt>
    </>
  )
}
export default ButtonCustom
