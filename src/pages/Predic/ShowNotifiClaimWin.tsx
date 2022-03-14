import React, { useEffect } from 'react'
import { Store } from 'react-notifications-component'
import { CloseOutlined } from '@ant-design/icons'
import { useHookPrediction } from './Store'
import { useActiveWeb3React } from '../../hooks'

const ShowNotifiClaimWin = () => {
  const [state, actions] = useHookPrediction()
  const { account } = useActiveWeb3React()
  useEffect(() => {
    actions.checkClaim(account)
  }, [account, actions])
  const { roundIdToClaim } = state

  useEffect(() => {
    if (roundIdToClaim !== 0) {
      Store.addNotification({
        title: 'Warning !',
        message: (
          <div className="box-colleting-win cus over-flow">
            <div className="icon-colleting">
              <img src="/images/imagesPrediction/icon-collecting.png" alt="" />
            </div>
            <div className="text-collecting">
              <button
                type="button"
                className="btn-collecting"
              >
                Collect Winnings
              </button>
            </div>
            <div className="icon-close-claim">
              <CloseOutlined />
            </div>
          </div>
        ),
        type: 'warning',
        width: 350,
        insert: 'top',
        container: 'bottom-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 55000,
          onScreen: true,
          pauseOnHover: true,
          click: true,
          touch: true,
        },
      })
    }
  }, [roundIdToClaim])
  return <></>
}
export default React.memo(ShowNotifiClaimWin)
