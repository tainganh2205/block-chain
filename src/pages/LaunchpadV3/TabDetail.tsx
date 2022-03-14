import React, { useRef, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Store } from 'react-notifications-component'
import { isMobile } from 'react-device-detect'
import { CHAINID_FULLNAME, CHAINID_CONVERT, MAPPING_CHAINID } from 'config/constants'
import { useActiveWeb3React } from 'hooks'
import { Modal } from 'antd'
import switchNetwork from 'utils/wallet'
import DetailsTabsContentActive from '../LaunchpadV3Detail/DetailsTabsContentActive'
import { useHookProjects } from './Store'

import { useHookDetail } from '../LaunchpadV3Detail/Store-Detail'

function usePrevious(value) {
  const ref = useRef()
  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes
  return ref.current
}
let loadFirst = false


const TabDetail = (props): any => {
  const { chainId } = useActiveWeb3React()
  const [isOtherChain, setOtherChain] = useState(false)
  const [state, actions]: any = useHookProjects()
  const [stateDetail, actionsDetail]: any = useHookDetail()
  const { activeTab } = props
  const { account } = useWeb3React()
  const prevCount = usePrevious(account)
  // ------- GET PATH NAME --------
  const history = useHistory()
  const pathHash = history.location.search.split('?')
  const tabSymbol = pathHash[2]

  const [activeDetail, setActiveDetail] = useState<any>(null)

  const handleCallDetail = async (symbol) => {
    const address = account
    const param = { address, symbol }
    actions.getProjectDetal(param).then((res) => {
      if (res && res.status === 200) {
        setActiveDetail(res.data.data)
        actionsDetail.updateShowDisClaimer(res.data?.data?.showdisclaimer)
      }
    })
  }

  useEffect(() => {

    if (tabSymbol) {
      if (!loadFirst) {
        handleCallDetail(tabSymbol)
        loadFirst = true
      } else if (prevCount !== account) {
        handleCallDetail(tabSymbol)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabSymbol, account])

  useEffect(() => {
    if (activeDetail) {
      if (isMobile && chainId) {
        if (activeDetail && activeDetail.network !== CHAINID_CONVERT[chainId]) {
          setOtherChain(true)
        }
      } else {
        switchNetwork(MAPPING_CHAINID[activeDetail.network])
      }
    }
    return () => {
      // TODO
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDetail, account, chainId])

  useEffect(() => {
    if (activeTab && !tabSymbol) {
      loadFirst = false

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])
  return (
    <>
      <Modal onCancel={() => setOtherChain(false)} className="modal-beta-show" title="Alert!" visible={isOtherChain}>
        <>
          <div className="content-modal-show">
            <p className="desc-beta">This one choose network {activeDetail && CHAINID_FULLNAME[activeDetail.network]}</p>
          </div>
        </>
      </Modal>
      {activeDetail && (
        <div className="main-cnt-tabs">
          <div className="box-content-active">
            <div className="top-content">
              <div className="box-img">
                <img src={activeDetail?.logoUrl} alt="" />
              </div>
              <h4 className="title">
                {activeDetail?.name} <span>{activeDetail?.unit}</span>
              </h4>
            </div>
            <div className="body-content">
              <div className="guide-wrap">
                <div className="wrap-top">
                  <p className="desc">{activeDetail?.description}</p>
                </div>
                <div className="wrap-middle">
                  <div className="list-info-ido">
                    <div className="item">
                      <div className="t-left">Swap Rate:</div>
                      <div className="t-right">{activeDetail?.swapAmount}</div>
                    </div>
                    <div className="item">
                      <div className="t-left">IDO Supply:</div>
                      <div className="t-right">
                        {activeDetail?.idoSupply} {activeDetail?.symbol}
                      </div>
                    </div>
                    <div className="item">
                      <div className="t-left">Total Supply:</div>
                      <div className="t-right">
                        {activeDetail?.totalSupply || 'TBA'} {activeDetail?.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="list-info-ido border-none">
                    {activeDetail?.schedules.map((item) => (
                      <div className="item">
                        <div className="t-left">{item.round}</div>
                        <div className="t-right">{item.startDate}</div>
                      </div>
                    ))}
                  </div>
                  <div className="social-address">
                    <div className="box-address">
                      <div className="address-wl">
                        <span>
                          {activeDetail?.idoContract &&
                            `${activeDetail?.idoContract.substring(0, 8)}...${activeDetail?.idoContract.substring(
                              32,
                              activeDetail?.idoContract.length
                            )}`}
                        </span>
                        <CopyToClipboard
                          text={activeDetail?.idoContract}
                          onCopy={() =>
                            Store.addNotification({
                              title: 'Copied',
                              message: (
                                <div className="custom-fontsize">
                                  <i className="fa fa-check-square-o icon-success" aria-hidden="true" />
                                  Successfully !
                                </div>
                              ),
                              type: 'warning',
                              width: 300,
                              insert: 'top',
                              container: 'top-center',
                              animationIn: ['animate__animated success', 'animate__fadeIn'],
                              animationOut: ['animate__animated success', 'animate__fadeOut'],
                              dismiss: {
                                duration: 1000,
                                onScreen: true,
                                pauseOnHover: true,
                                click: true,
                                touch: true,
                              },
                            })
                          }
                        >
                          <span className="img">
                            <img src="/images/imagesV3/copy-v3.svg" alt="" />
                          </span>
                        </CopyToClipboard>
                      </div>
                    </div>
                    <div className="box-social">
                      <a href={activeDetail?.socical.telegram} target="blank">
                        <img src="/images/imagesV3/telegram.svg" alt="" />
                      </a>
                      <a href={activeDetail?.socical.twitter} target="blank">
                        <img src="/images/imagesV3/twi.svg" alt="" />
                      </a>
                      <a href={activeDetail?.socical.medium} target="blank">
                        <img src="/images/imagesV3/medium.svg" alt="" />
                      </a>
                      <a href={activeDetail?.socical.website} target="blank">
                        <img src="/images/imagesV3/youtube.svg" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-content-active-detail">
            <DetailsTabsContentActive
              activeDetail={activeDetail}
            />
          </div>
        </div>
      )}
    </>
  )
}
export default TabDetail
