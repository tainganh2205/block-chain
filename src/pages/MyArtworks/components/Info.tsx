/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useRef } from 'react'
import { Avatar } from 'antd'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { UserOutlined, FormOutlined, createFromIconfontCN } from '@ant-design/icons'
import { Store } from 'react-notifications-component'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useActiveWeb3React } from 'hooks'
import { API_IMAGE } from 'constants/index'
import { useHookUpload } from 'pages/Upload/Store-Upload'
import Button from 'components/Button'
import { useHistory } from 'react-router-dom'
import '../index.less'

import CreateProfile from './CreateProfile'
import EditProfile from './EditProfile'

const WrapperArtControlMobile = styled.div`
  visibility: hidden;
  ${(props) => (props['data-mobile'] ? `visibility: visible;` : '')};
`

const WrapperArtControl = styled.div`
  visibility: visible;
  width: 40%;
  .art-control {
    width: 100%;
  }
  ${(props) => (props['data-mobile'] ? `visibility: hidden;` : '')};
`

const WrapperAvatar = styled.div`
  ${(props) => (props['data-mobile'] ? `
    display: flex;
    justify-content: space-between;
    align-items: center;
    .art-control {
      white-space: nowrap;
      .art-btn {
        margin: 0;
      }
    }
  ` : '')};
`;

const Info = memo(() => {
  const refEditProfile = useRef<any>(null)
  const refCreateProfile = useRef<any>(null)
  const { account } = useActiveWeb3React()
  const [state, actions] = useHookUpload()
  const { objData } = state
  const history = useHistory()
  const showModalCreateProfile = useCallback(() => {
    if (refCreateProfile.current) {
      refCreateProfile.current?.toggle()
    }
  }, [refCreateProfile])

  const showModalEditProfile = useCallback(() => {
    if (refEditProfile.current) {
      refEditProfile.current?.toggle()
    }
  }, [refEditProfile])

  const handleGetArtistsByWallet = useCallback(() => {
    if (account) {
      actions.getArtistsByWallet(account)
    }
  }, [account, actions.getArtistsByWallet])

  const gotoMintNft = useCallback(() => {
    history.push('/mintNFT')
  }, [])

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  })

  const artControl = (
    <div className="art-control">
      <div className="art-btn">
        {account ? (
          !(objData?.id && objData.ownerAddress === account) ? (
            <div className="css-btn-collection">
              <Button text="Activate Profile" primary click={showModalCreateProfile} />
            </div>
          ) : (
            <div className="css-btn-collection">
              <Button primary click={gotoMintNft} text="Mint an NFT" />
            </div>
          )
        ) : (
          <div className="css-btn-collection">
            <Button
              className="customButton"
              type="button"
              primary
              click={() =>
                Store.addNotification({
                  title: 'Warning !',
                  message: (
                    <div className="custom-fontsize">
                      <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true" /> Please Unlock Wallet!
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
              text="Activate Profile"
            />
          </div>
        )}
        {/* {!objData?.id ? (
                  <>
                    {!account ? (
                      <div className="css-btn-collection">
                        <Button
                          className="customButton"
                          type="button"
                          primary
                          click={() =>
                            store.addNotification({
                              title: 'Warning !',
                              message: (
                                <div className="custom-fontsize">
                                  <i className="fa fa-exclamation-triangle icon-warning" aria-hidden="true" /> Please Unlock
                                  Wallet!
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
                          text="Create artist"
                        />
                      </div>
                    ) : (
                      <div className="css-btn-collection">
                        <Button text="Create artist" primary click={showModalCreateProfile} />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="css-btn-collection">
                    <Button primary click={gotoMintNft} text="Mint NFT" />
                  </div>
                )} */}
      </div>
    </div>
  )

  useEffect(() => {
    handleGetArtistsByWallet()
  }, [handleGetArtistsByWallet])

  // console.log('objData: ', objData)
  return (
    <>
      <CreateProfile ref={refCreateProfile} />
      <EditProfile ref={refEditProfile} />
      {/* <div className="mArt-top"> */}

      {account ? (
        objData?.artistName === '' || objData?.author === '' ? (
          <>
            <img className="mArt-banner-img" src="/images/not-banner.png" alt="banner" />
            <WrapperAvatar className="mArt-avatar" data-mobile={isMobile}>
              <Avatar size={90} src="/images/not-avatar.png" />
              <WrapperArtControlMobile data-mobile={isMobile}>{artControl}</WrapperArtControlMobile>
            </WrapperAvatar>
          </>
        ) : (
          <>
            <img className="mArt-banner-img" src="/images/isbanner.png" alt="banner" />
            <WrapperAvatar className="mArt-avatar" data-mobile={isMobile}>
              <Avatar size={90} src={objData.avatarName} />
              <WrapperArtControlMobile data-mobile={isMobile}>{artControl}</WrapperArtControlMobile>
            </WrapperAvatar>
            {/* {objData?.avatarName === '' ? (
              <div className='mArt-avatar'>
              <Avatar size={90} src={objData.avatarName} />
            </div>
            ):(
              <div className='mArt-avatar'>
              <Avatar size={90} src="/images/not-avatar.png" />
            </div>
            )} */}
          </>
        )
      ) : (
        <>
          <img className="mArt-banner-img" src="/images/not-banner.png" alt="banner" />
          <div className="mArt-avatar">
            <Avatar size={90} src="/images/not-avatar.png" />
          </div>
        </>
      )}

      <div className="mArt-content">
        {account ? (
          objData?.author === '' ? (
            <h3 className="author">
              <span className="author-title">Author:&ensp; </span>
              <span className="author-name" style={{ color: '#169CE7' }}>
                N/A{' '}
              </span>
            </h3>
          ) : (
            <>
              <h3 className="author">
                <span className="author-title">Author:&ensp; </span>
                <span className="author-name">{objData.artistName} </span>
                <button className="btn-editAuthor" type="button" onClick={showModalEditProfile}>
                  <img
                    src="/images/edit.png"
                    alt="editAuthor"
                    style={{ marginLeft: '4px', cursor: 'pointer', display: 'block' }}
                  />
                </button>
              </h3>
            </>
          )
        ) : (
          <h3 className="author">
            <span className="author-title">Author:&ensp; </span>
            <span className="author-name" style={{ color: '#169CE7' }}>
              {' '}
              N/A{' '}
            </span>
          </h3>
        )}
        <div className="art-mid">
          {account ? (
            objData?.artistDescription === '' ? (
              <div className="art-des" />
            ) : (
              <div className="art-des">{objData.artistDescription}</div>
            )
          ) : (
            <div className="art-des" />
          )}

          <div className="art-social-wallet">
            <h3 className="art-item">
              <span className="author-title">Social:&nbsp; </span>
              {account ? (
                objData?.publicProfileLink === undefined ? (
                  <>
                    <span className="author-social" style={{ color: '#169CE7' }}>
                      N/A
                    </span>
                  </>
                ) : (
                  <>
                    <span className="author-social">{objData.publicProfileLink}</span>
                    <a href={objData.publicProfileLink} target="_blank" rel="noreferrer">
                      <img
                        src="/images/Social.png"
                        alt="editAuthor"
                        style={{ marginLeft: '4px', cursor: 'pointer', display: 'block' }}
                      />
                    </a>
                  </>
                )
              ) : (
                <span className="author-social" style={{ color: '#169CE7' }}>
                  N/A
                </span>
              )}
            </h3>
            <h3 className="art-item">
              <span className="author-title">Wallet:&nbsp; </span>
              {account ? (
                <>
                  <span className="art-add">
                    {account.slice(0, 4)}...{account.slice(-4)}
                  </span>
                  <span>
                    <CopyToClipboard
                      text={objData && objData.ownerAddress}
                      onCopy={() =>
                        Store.addNotification({
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
                      {/* <i className="fa fa-clone btn-copied" aria-hidden="true" /> */}
                      <img
                        src="/images/Copy.svg"
                        alt="copy"
                        style={{ marginLeft: '4px', cursor: 'pointer', display: 'block' }}
                      />
                    </CopyToClipboard>
                  </span>
                </>
              ) : (
                <span className="art-add" style={{ color: '#169CE7' }}>
                  N/A
                </span>
              )}
            </h3>
          </div>
          <WrapperArtControl data-mobile={isMobile}>{artControl}</WrapperArtControl>
        </div>
      </div>
    </>
  )
})

export default Info
