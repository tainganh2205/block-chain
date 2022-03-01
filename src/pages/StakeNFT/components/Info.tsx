/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useRef } from 'react'
import { store } from 'react-notifications-component'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useActiveWeb3React } from 'hooks'

import { API_IMAGE } from 'constants/index'
import { useHookUpload } from 'pages/Upload/Store-Upload'
import { useHookNft, PropertiesArtwork } from 'pages/Nft/Store-Nft'
import styled from 'styled-components'
import PageHeaderStakeNFT from '../../../components/PageHeaderStakeNFT'

import CreateProfile from './CreateProfile'
import EditProfile from './EditProfile'

const Info = memo(() => {
  const refEditProfile = useRef<any>(null)
  const refCreateProfile = useRef<any>(null)
  const { account } = useActiveWeb3React()
  const [state, actions] = useHookUpload()
  const { objData } = state
  const [boostnft, actionsboost] = useHookNft()
  const { nftList } = boostnft
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

  useEffect(() => {
    handleGetArtistsByWallet()
  }, [handleGetArtistsByWallet])

  const CustomWrapper = styled.div`
    .h__productdetail {
      font-family: 'Montserrat';
      background: transparent !important;
      padding: 20px 210px 40px 33px;
      @media (max-width: 1040px) {
        padding-right: 33px;

        @media (max-width: 576px) {
          padding: 25px 29px 24px 18px;
          border: 1px solid #808982;
        }
      }

      .c-productdetail__title {
        flex: 1 1;

        .h__productdetail-title {
          width: 100%;
        }
      }

      .h__productdetail-title {
        & > h3 {
          color: #808982;
          font-weight: 600;
          font-size: 24px;
          line-height: 29px;
          font-family: 'Montserrat';

          @media (max-width: 576px) {
            font-size: 14px;
          }
          & > span {
            color: #05D8F5;
            font-family: 'Montserrat';

            @media (max-width: 576px) {
              font-size: 14px;
            }
          }
        }
      }

      .fs-24 {
        font-size: 24px;
        overflow: hidden;
      }

      .h__imgIcon, .h__imgInfo {
        cursor: pointer;
        padding-left: 12px;
        height: 23px;
      }

      .pt-7 {
        padding-top: 7px;
      }
    }
  `

  return (
    <CustomWrapper>
      <CreateProfile ref={refCreateProfile} />
      <EditProfile ref={refEditProfile} />
      <div className="info">
        <PageHeaderStakeNFT
          title="NFT Staking Pool"
          subtitle1="Easy Staking & Earn Tokens with Artinfinity NFTs."
          subtitle2="The more staked ATF help opportunity more profit."
        />
        <div className="h__customMobile">
          <div className="c-productdetail h__productdetail">
            <div className="c-productdetail__title h__custom__title">
              <div className="h__productdetail-title">
                {!objData?.ownerAddress ? (
                  <h3 className="d-flex align-items-center">
                    Wallet address: <span className="fs-24">&nbsp; N/A</span>
                  </h3>
                ) : (
                  <h3 className="row-flex align-items-center">
                    Wallet address :&nbsp;
                    <span className="fs-24">
                      {objData.ownerAddress &&
                        `${objData.ownerAddress.substring(0, 8)}...${objData.ownerAddress.substring(
                          28,
                          objData.ownerAddress.length
                        )}`}
                    </span>
                    <CopyToClipboard
                      // className='dsfsdfas2134567'
                      text={objData && objData.ownerAddress}
                      onCopy={() =>
                        store.addNotification({
                          title: 'Copied',
                          message: (
                            <div className="custom-fontsize">
                              <i className="fa fa-check-square-o icon-success" aria-hidden="true" />
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
                      <img src="/images/Copy.svg" alt="copy" className="h__imgIcon" />
                    </CopyToClipboard>
                  </h3>
                )}
                <h3 className="fs-24 d-flex align-items-center pt-7">
                  Current tier:
                  <span className="fs-24 ">&nbsp; N/A</span>
                  <img className='h__imgInfo' src="/images/infoI.png" alt="..." />
                </h3>
              </div>
            </div>
            <div className="h__productdetail-title">
              <h3>
                Balance:
                <span>{` 0`}</span>
              </h3>
              <h3 className="pt-7">
                NFT Boost:
                <span>{` No`}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </CustomWrapper>
  )
})

export default Info
