import React, { useCallback, useContext, useEffect, useState, useMemo } from 'react'
import Modal from 'react-modal'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useHookNft } from './Store'
import { TOKEN_BSCS, CONTRACT_NFT, CONTRACT_BID, API_IMAGE } from '../../constants'

const Info = ({ props }: any): any => {
  const [state, actions]: any = useHookNft()
  const { objData } = state

  const {
    match: { params },
  }: any = props

  useEffect(() => {
    // actions.getUserDetail(params && params.id)
    actions.getUserDetail(params && params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="info">
        {/* //l-container  */}
        <div className="c-productdetail bgNews">
          <div className="c-productdetail__title">
            <div className="c-productdetail__img">
              <img className="img-profile" src={`${API_IMAGE}${objData && objData.avatarName}?v=122`} alt="" />{' '}
              {/* {objData?.avatarName === undefined ? (
                <img className="img-profile img-default" src="images/defaultNew.png" alt="default" />
              ) : (
                <img className="img-profile" src={`${API_IMAGE}${objData.avatarName}?v=122`} alt="" />
              )} */}
            <div className="social-top">
                <div className="icon-sc">
                  <img src="images/tele.png" alt="default" />
                </div>
                <div className="icon-sc">
                  <img src="images/tw.png" alt="default" />
                </div>
                <div className="icon-sc">
                  <img src="images/yt.png" alt="default" />
                </div>
              </div>
            </div>
            <h3 className="text-white" style={{fontSize: '16px', marginTop:'-30px'}}>
              <span style={{display: 'inline-flex', color:'#808982' }}>{`Artist : `}</span>
              &nbsp;{objData && objData.artistName}
              {/* <span className="decs-info text-white">{objData && objData.artistDescription}</span> */}

              <span className="decs-info text-custom row-flex custom text-grey d-flex">
                Social :{' '}
                <p className="address-color text-white" style={{ display:'inline-flex', alignItems:'center'}}>
                  {objData && objData.publicProfileLink}
                  <a href={`${objData.publicProfileLink}`} target="_blank" rel="noreferrer">
                    {/* <i className="fa fa-external-link btn-copied cl-yl" aria-hidden="true" /> */}
                    <img src="/images/link-direct.svg" alt="edit" style={{ marginLeft:'10px'}}/>
                    {' '}
                  </a>{' '}
                </p>
              </span>


              <span className=" text-grey decs-info d-flex row-flex ">
                {`Wallet address : `}
                <p className="address-color text-white">
                  {objData &&
                    objData.ownerAddress &&
                    `${objData.ownerAddress.substring(0, 8)}...${objData.ownerAddress.substring(
                      28,
                      objData.ownerAddress.length
                    )}`}
                </p>

                <CopyToClipboard
                  text={objData && objData.ownerAddress}
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
                  {/* <i className="fa fa-clone btn-copied" aria-hidden="true" /> */}
                  <img src="/images/Copy.svg" alt="copy" style={{marginLeft:'10px', cursor: 'pointer', objectFit: 'cover'}} />

                </CopyToClipboard>
              </span>
              <span className="decs-info text-white">{objData && objData.artistDescription}</span>

            </h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Info
