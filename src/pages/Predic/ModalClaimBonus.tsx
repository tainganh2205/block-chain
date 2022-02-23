import React from 'react'
import { Modal } from 'antd'
import { store } from 'react-notifications-component'
import './styless.css'

const ModalClaimBonus = React.memo((props: any): any => {
  const { handleCancel, isModal, objBonus, actions, account, handleOk } = props
  return (
    <Modal title="Collect Winnings" className="modal-collect" visible={isModal} onOk={handleOk} onCancel={handleCancel}>
      <div className="content-modal-collect">
        <div className="box-icon">
          <img src="/images/imagesPrediction/logo-modal-collect.png" alt="" />
        </div>
        <div className="collect-price">
          <h5 className="title">Collecting</h5>
          <p className="price">
            {objBonus.Bonus} BNB <span className="txt">{objBonus.BonusPrice}$</span>
          </p>
        </div>
        <button
          onClick={() => {
            actions.claimBonus(account, objBonus.ReceiveId).then((res) => {
              if (res.succeeded) {
                store.addNotification({
                  title: 'Collecting',
                  message: (
                    <div className="custom-fontsize">
                      <i className="fa fa-check-square-o icon-success" aria-hidden="true" /> {res.message || 'Successfully'}
                    </div>
                  ),
                  type: 'warning',
                  width: 300,
                  insert: 'center',
                  container: 'top-center',
                  animationIn: ['animate__animated success', 'animate__fadeIn'],
                  animationOut: ['animate__animated success', 'animate__fadeOut'],
                  dismiss: {
                    duration: 2000,
                    onScreen: true,
                    pauseOnHover: true,
                    click: true,
                    touch: true,
                  },
                })
              } else {
                store.addNotification({
                  title: 'Collecting',
                  message: (
                    <div className="custom-fontsize">
                      <i className="fa fa-times icon-fail" aria-hidden="true" /> Collecting fail
                    </div>
                  ),
                  type: 'warning',
                  width: 300,
                  insert: 'center',
                  container: 'top-center',
                  animationIn: ['animate__animated fail', 'animate__fadeIn'],
                  animationOut: ['animate__animated fail', 'animate__fadeOut'],
                  dismiss: {
                    duration: 2000,
                    onScreen: true,
                    pauseOnHover: true,
                    click: true,
                    touch: true,
                  },
                })
              }
              actions.getTheBests(2, account)
              handleCancel()
            })
          }}
          type="button"
          className="btn-cofirm"
        >
          Confirm
        </button>
      </div>
    </Modal>
  )
})

export default React.memo(ModalClaimBonus)
