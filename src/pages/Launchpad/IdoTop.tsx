/* eslint-disable prefer-template */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/aria-props */
import React, { useState } from 'react'
import { Modal } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { store } from 'react-notifications-component'
import Button from 'components/Button'

import { POOL_WEIGHT } from './index.d'
import { useHookProjects } from './Store'
import bgFarm from '../../images/bg-ido.png'
import bgLiner from '../../images/img-bg-liner.jpg'

const IdoTop = () => {
  const [state, actions]: any = useHookProjects()
  const tierText = (() => {
    switch (state.owner?.currentTier) {
      // case POOL_WEIGHT.Iron:
      // return POOL_WEIGHT[POOL_WEIGHT.Iron];
      // return 'N/A'
      case POOL_WEIGHT.Bronze:
        return POOL_WEIGHT[POOL_WEIGHT.Bronze]
      case POOL_WEIGHT.Diamond:
        return POOL_WEIGHT[POOL_WEIGHT.Diamond]
      case POOL_WEIGHT.Gold:
        return POOL_WEIGHT[POOL_WEIGHT.Gold]
      case POOL_WEIGHT.Platinum:
        return POOL_WEIGHT[POOL_WEIGHT.Platinum]
      case POOL_WEIGHT.Silver:
        return POOL_WEIGHT[POOL_WEIGHT.Silver]
      default:
        return 'N/A'
    }
  })()
  const tieractive = (() => {
    switch (state.owner?.currentTier) {
      // case POOL_WEIGHT.Iron:
      // return 'icon-modal'
      case POOL_WEIGHT.Bronze:
        return 'icon-modal active-tier'
      case POOL_WEIGHT.Diamond:
        return 'icon-modal active-tier'
      case POOL_WEIGHT.Gold:
        return 'icon-modal active-tier'
      case POOL_WEIGHT.Platinum:
        return 'icon-modal active-tier'
      case POOL_WEIGHT.Silver:
        return 'icon-modal active-tier'
      default:
        return 'icon-modal'
    }
  })()
  const ModalTitle = (
    <div className="title-modal-header">
      Current Tier : <span className="txt-title">{tierText}</span>
    </div>
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      <div className="box-ido-initial">
        <div className="table-ido-initial" style={{ backgroundImage: `url(${bgFarm})` }}>
          <div className="columns">
            <div className="colum">
              <div className="content-left">
                <h3 className="title">ArtInfinity Launchpad</h3>
                <p className="desc">
                  The Ultimate Incubation Hub on Binance Smart Chain,
                  <br />
                  Ethereum and Polygon
                </p>
              </div>
            </div>
            <div className="colum">
              <div className="content-right">
                <div className="box-wallet" style={{ backgroundImage: `url(${bgLiner})` }}>
                  <h4 className="main-wallet ">
                    Wallet Address:
                    <span className="txt-address flex-repon">
                      {state.owner?.ownerAddress &&
                        `${state.owner?.ownerAddress.substring(0, 8)}...${state.owner?.ownerAddress.substring(
                          28,
                          state.owner?.ownerAddress.length
                        )}`}{' '}
                      {/* {state.owner?.ownerAddress || ""} */}
                      <CopyToClipboard
                        text={state.owner?.ownerAddress}
                        onCopy={() =>
                          store.addNotification({
                            title: 'Copied',
                            message: (
                              <div className="custom-fontsize">
                                {/* <i className="fa fa-check-square-o icon-success" aria-hidden="true" /> */}
                                <i className="fa fa-check-circle icon-success" aria-hidden="true" />
                                Successfully !
                              </div>
                            ),
                            type: 'warning',
                            width: 300,
                            insert: 'center',
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
                        <i className="fa fa-clone btn-copied" aria-hidden="true" />
                      </CopyToClipboard>
                    </span>
                  </h4>
                  <ul className="list-wallet">
                    <li>
                      <div className="item-wallet">
                        <h4 className="wallet-name">
                          Balance:
                          <span className="wallet-price">
                            {state.yourBalanceBSCS?.result ? (state.yourBalanceBSCS.result / 1e18).toLocaleString() : 0}
                          </span>
                        </h4>
                      </div>
                    </li>
                    <li>
                      <div className="item-wallet">
                        <h4 className="wallet-name">
                          Staking:
                          <span className="wallet-price d-block mar-top-5" style={{ paddingLeft: '5px' }}>
                            {state.owner?.staking || ''}
                          </span>
                        </h4>
                      </div>
                    </li>
                    <li>
                      <div className="item-wallet">
                        <h4 className="wallet-name" style={{ display: 'flex', alignItems: 'center' }}>
                          Current tier:
                          <Button
                            text={tierText}
                            link
                            click={showModal}
                            right={<img src="/images/launchpad/information.png" alt="" className="img-info" />}
                          />
                        </h4>
                      </div>
                    </li>
                    <li>
                      <div className="item-wallet">
                        <h4 className="wallet-name">
                          NFT Boost :<span className="wallet-price">{state.owner?.nftBoost || 'No'}</span>
                        </h4>
                      </div>
                    </li>
                    <li>
                      <div className="item-wallet">
                        <h4 className="wallet-name">
                          Staking Boost:
                          <span className="wallet-price">0%</span>
                        </h4>
                      </div>
                    </li>
                    <li>
                      <div className="item-wallet">
                        <h4 className="wallet-name">
                          Additional Pool Weight:
                          <span className="wallet-price">{state.owner?.poolWeight || '0%'}</span>
                        </h4>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-content-wrap">
          <Modal
            className="modal-content-wrap-show"
            title={ModalTitle}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {tierText === POOL_WEIGHT[POOL_WEIGHT.Diamond] ? (
              <>
                <ul className="list-item-modal" aria-progress={state.owner?.currentTier}>
                  <li>
                    <div className="icon-modal active-tier">
                      <img src="/images/launchpad/bronze.png" alt="" />
                    </div>
                    <h4 className="text">
                      BRONZE <span className="price">15,000 ATF</span>
                    </h4>
                  </li>
                  <li>
                    <div className="icon-modal active-tier">
                      <img src="/images/launchpad/silver.png" alt="" />
                    </div>
                    <h4 className="text">
                      SILVER <span className="price">30,000 ATF</span>
                    </h4>
                  </li>
                  <li>
                    <div className="icon-modal active-tier">
                      <img src="/images/launchpad/gold.png" alt="" />
                    </div>
                    <h4 className="text">
                      GOLD <span className="price">50,000 ATF</span>
                    </h4>
                  </li>
                  <li>
                    <div className="icon-modal active-tier">
                      <img src="/images/launchpad/platinum.png" alt="" />
                    </div>
                    <h4 className="text">
                      PLATINUM <span className="price">150,000 ATF</span>
                    </h4>
                  </li>
                  <li>
                    <div className="icon-modal active-tier mar-top-12">
                      <img src="/images/launchpad/diamond.png" alt="" />
                    </div>
                    <h4 className="text">
                      DIAMOND <span className="price">300,000 ATF</span>
                    </h4>
                  </li>
                </ul>
              </>
            ) : (
              <>
                {tierText === POOL_WEIGHT[POOL_WEIGHT.Platinum] ? (
                  <>
                    <ul className="list-item-modal" aria-progress={state.owner?.currentTier}>
                      <li>
                        <div className="icon-modal active-tier">
                          <img src="/images/launchpad/bronze.png" alt="" />
                        </div>
                        <h4 className="text">
                          BRONZE <span className="price">15,000 ATF</span>
                        </h4>
                      </li>
                      <li>
                        <div className="icon-modal active-tier">
                          <img src="/images/launchpad/silver.png" alt="" />
                        </div>
                        <h4 className="text">
                          SILVER <span className="price">30,000 ATF</span>
                        </h4>
                      </li>
                      <li>
                        <div className="icon-modal active-tier">
                          <img src="/images/launchpad/gold.png" alt="" />
                        </div>
                        <h4 className="text">
                          GOLD <span className="price">50,000 ATF</span>
                        </h4>
                      </li>
                      <li>
                        <div className="icon-modal active-tier">
                          <img src="/images/launchpad/platinum.png" alt="" />
                        </div>
                        <h4 className="text">
                          PLATINUM <span className="price">150,000 ATF</span>
                        </h4>
                      </li>
                      <li>
                        <div className="icon-modal mar-top-12">
                          <img src="/images/launchpad/diamond.png" alt="" />
                        </div>
                        <h4 className="text">
                          DIAMOND <span className="price">300,000 ATF</span>
                        </h4>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    {tierText === POOL_WEIGHT[POOL_WEIGHT.Gold] ? (
                      <>
                        <ul className="list-item-modal" aria-progress={state.owner?.currentTier}>
                          <li>
                            <div className="icon-modal active-tier">
                              <img src="/images/launchpad/bronze.png" alt="" />
                            </div>
                            <h4 className="text">
                              BRONZE <span className="price">15,000 ATF</span>
                            </h4>
                          </li>
                          <li>
                            <div className="icon-modal active-tier">
                              <img src="/images/launchpad/silver.png" alt="" />
                            </div>
                            <h4 className="text">
                              SILVER <span className="price">30,000 ATF</span>
                            </h4>
                          </li>
                          <li>
                            <div className="icon-modal active-tier">
                              <img src="/images/launchpad/gold.png" alt="" />
                            </div>
                            <h4 className="text">
                              GOLD <span className="price">50,000 ATF</span>
                            </h4>
                          </li>
                          <li>
                            <div className="icon-modal">
                              <img src="/images/launchpad/platinum.png" alt="" />
                            </div>
                            <h4 className="text">
                              PLATINUM <span className="price">150,000 ATF</span>
                            </h4>
                          </li>
                          <li>
                            <div className="icon-modal mar-top-12">
                              <img src="/images/launchpad/diamond.png" alt="" />
                            </div>
                            <h4 className="text">
                              DIAMOND <span className="price">300,000 ATF</span>
                            </h4>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        {tierText === POOL_WEIGHT[POOL_WEIGHT.Silver] ? (
                          <>
                            <ul className="list-item-modal" aria-progress={state.owner?.currentTier}>
                              <li>
                                <div className="icon-modal active-tier">
                                  <img src="/images/launchpad/bronze.png" alt="" />
                                </div>
                                <h4 className="text">
                                  BRONZE <span className="price">15,000 ATF</span>
                                </h4>
                              </li>
                              <li>
                                <div className="icon-modal active-tier">
                                  <img src="/images/launchpad/silver.png" alt="" />
                                </div>
                                <h4 className="text">
                                  SILVER <span className="price">30,000 ATF</span>
                                </h4>
                              </li>
                              <li>
                                <div className="icon-modal">
                                  <img src="/images/launchpad/gold.png" alt="" />
                                </div>
                                <h4 className="text">
                                  GOLD <span className="price">50,000 ATF</span>
                                </h4>
                              </li>
                              <li>
                                <div className="icon-modal">
                                  <img src="/images/launchpad/platinum.png" alt="" />
                                </div>
                                <h4 className="text">
                                  PLATINUM <span className="price">150,000 ATF</span>
                                </h4>
                              </li>
                              <li>
                                <div className="icon-modal mar-top-12">
                                  <img src="/images/launchpad/diamond.png" alt="" />
                                </div>
                                <h4 className="text">
                                  DIAMOND <span className="price">300,000 ATF</span>
                                </h4>
                              </li>
                            </ul>
                          </>
                        ) : (
                          <>
                            {tierText === POOL_WEIGHT[POOL_WEIGHT.Bronze] ? (
                              <>
                                <ul className="list-item-modal" aria-progress={state.owner?.currentTier}>
                                  <li>
                                    <div className="icon-modal active-tier">
                                      <img src="/images/launchpad/bronze.png" alt="" />
                                    </div>
                                    <h4 className="text">
                                      BRONZE <span className="price">15,000 ATF</span>
                                    </h4>
                                  </li>
                                  <li>
                                    <div className="icon-modal">
                                      <img src="/images/launchpad/silver.png" alt="" />
                                    </div>
                                    <h4 className="text">
                                      SILVER <span className="price">30,000 ATF</span>
                                    </h4>
                                  </li>
                                  <li>
                                    <div className="icon-modal">
                                      <img src="/images/launchpad/gold.png" alt="" />
                                    </div>
                                    <h4 className="text">
                                      GOLD <span className="price">50,000 ATF</span>
                                    </h4>
                                  </li>
                                  <li>
                                    <div className="icon-modal">
                                      <img src="/images/launchpad/platinum.png" alt="" />
                                    </div>
                                    <h4 className="text">
                                      PLATINUM <span className="price">150,000 ATF</span>
                                    </h4>
                                  </li>
                                  <li>
                                    <div className="icon-modal mar-top-12">
                                      <img src="/images/launchpad/diamond.png" alt="" />
                                    </div>
                                    <h4 className="text">
                                      DIAMOND <span className="price">300,000 ATF</span>
                                    </h4>
                                  </li>
                                </ul>
                              </>
                            ) : (
                              <>
                                <ul className="list-item-modal" aria-progress={state.owner?.currentTier}>
                                  <li>
                                    <div className="icon-modal">
                                      <img src="/images/launchpad/bronze.png" alt="" />
                                    </div>
                                    <h4 className="text">
                                      BRONZE <span className="price">15,000 ATF</span>
                                    </h4>
                                  </li>
                                  <li>
                                    <div className="icon-modal">
                                      <img src="/images/launchpad/silver.png" alt="" />
                                    </div>
                                    <h4 className="text">
                                      SILVER <span className="price">30,000 ATF</span>
                                    </h4>
                                  </li>
                                  <li>
                                    <div className="icon-modal">
                                      <img src="/images/launchpad/gold.png" alt="" />
                                    </div>
                                    <h4 className="text">
                                      GOLD <span className="price">50,000 ATF</span>
                                    </h4>
                                  </li>
                                  <li>
                                    <div className="icon-modal">
                                      <img src="/images/launchpad/platinum.png" alt="" />
                                    </div>
                                    <h4 className="text">
                                      PLATINUM <span className="price">150,000 ATF</span>
                                    </h4>
                                  </li>
                                  <li>
                                    <div className="icon-modal mar-top-12">
                                      <img src="/images/launchpad/diamond.png" alt="" />
                                    </div>
                                    <h4 className="text">
                                      DIAMOND <span className="price">300,000 ATF</span>
                                    </h4>
                                  </li>
                                </ul>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Modal>
        </div>
      </div>
    </>
  )
}
export default IdoTop
