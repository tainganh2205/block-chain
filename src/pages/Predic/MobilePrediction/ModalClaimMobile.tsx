import React, { useState } from 'react'
import { Modal, Checkbox } from 'antd'
import { Store } from 'react-notifications-component'
import '../styless.css'

const ModalClaimMobile = React.memo((props: any): any => {
  const { handleCancel, isModal, objHistory, actions, account, handleOk } = props
  return (
    <Modal title="Collect Winnings" className="modal-collect" visible={isModal} onOk={handleOk} onCancel={handleCancel}>
      <div className="content-modal-collect">
        <div className="box-icon">
          <img src="/images/imagesPrediction/logo-modal-collect.png" alt="" />
        </div>
        <div className="collect-price">
          <h5 className="title">Collecting</h5>
          <p className="price">
            {objHistory.amount} BNB <span className="txt">{(objHistory.amount* objHistory.closedPrice).toFixed(4)}$</span>
          </p>
        </div>
        <button
          onClick={() => {
            actions.claim(account, objHistory.id).then((res) => {
              if (res.succeeded) {
                Store.addNotification({
                  title: 'Successfully',
                  message: (
                    <div className="custom-fontsize">
                      <i className="fa fa-check-square-o icon-success" aria-hidden="true" /> {res.message || 'Successfully'}
                    </div>
                  ),
                  type: 'warning',
                  width: 300,
                  insert: 'top',
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
                Store.addNotification({
                  title: 'Collecting',
                  message: (
                    <div className="custom-fontsize">
                      <i className="fa fa-times icon-fail" aria-hidden="true" /> Collecting fail
                    </div>
                  ),
                  type: 'warning',
                  width: 300,
                  insert: 'top',
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
              actions.getHitorys(account)
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
function areEqual(prevProps, nextProps) {
  if (prevProps.objHistory.id === nextProps.objHistory.id && prevProps.isModal === nextProps.isModal) {
    return true
  }
  return false
}
export default React.memo(ModalClaimMobile, areEqual)
