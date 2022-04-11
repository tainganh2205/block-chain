import React, { useRef, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Store } from "react-notifications-component";
import { isMobile } from "react-device-detect";
import { CHAINID_FULLNAME, CHAINID_CONVERT, MAPPING_CHAINID } from "config/constants";
import { useActiveWeb3React } from "hooks";
import { Modal, Tooltip, Progress } from "antd";
import switchNetwork from "utils/wallet";
import { useHookProjects } from "./Store";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHookDetail } from "../LaunchpadV3Detail/Store-Detail";
import ModalSuccess from "./LaunchpadDetail/ModalSuccess";
import ConnectWalletButton from "../../components/ConnectWalletButton";
import axios from "axios";
import ModalDisClaimer from "./LaunchpadDetail/ModalDisClaimer";

const { REACT_APP_API_URL } = process.env;

function usePrevious(value) {
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  return ref.current;
}

let loadFirst = false;


const TabDetail = (props): any => {
  const { chainId } = useActiveWeb3React();
  const [isOtherChain, setOtherChain] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [isApplySuccess, setIsApplySuccess] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [state, actions]: any = useHookProjects();
  const [stateDetail, actionsDetail]: any = useHookDetail();
  const { activeTab, idoDetail } = props;
  const { account } = useWeb3React();
  const prevCount = usePrevious(account);
  // ------- GET PATH NAME --------
  const history = useHistory();
  const pathHash = history.location.search.split("?");
  const tabSymbol = pathHash[2];
  const [activeDetail, setActiveDetail] = useState<any>(idoDetail);

  const handleCallDetail = async (symbol) => {
    const address = account;
    const param = { address, symbol };
    actions.getProjectDetal(param).then((res) => {
      if (res && res.status === 200) {
        setActiveDetail(res.data.data);
        actionsDetail.updateShowDisClaimer(res.data?.data?.showdisclaimer);
      }
    });
  };
  useEffect(() => {
    if (activeTab.includes("Upcoming") && idoDetail && account) {
      axios.get(`${REACT_APP_API_URL}/v1/launchpad/${idoDetail._id}/isApplied?walletAddress=${account}`).then(res => {
        setIsApplied(res.data.data.applied);
      });
    }
  }, [account]);

  useEffect(() => {

    if (tabSymbol) {
      if (!loadFirst) {
        handleCallDetail(tabSymbol);
        loadFirst = true;
      } else if (prevCount !== account) {
        handleCallDetail(tabSymbol);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabSymbol, account]);

  useEffect(() => {
    if (activeDetail) {
      if (isMobile && chainId) {
        if (activeDetail && activeDetail.network !== CHAINID_CONVERT[chainId]) {
          setOtherChain(true);
        }
      } else {
        switchNetwork(MAPPING_CHAINID[activeDetail.network]);
      }
    }
    return () => {
      // TODO
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDetail, account, chainId]);

  useEffect(() => {
    if (activeTab && !tabSymbol) {
      loadFirst = false;

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);
  const handleApply = () => {
    const token = JSON.parse(localStorage.getItem("lfw-signature")!);
    if (token && token.access_token) {
      axios.post(`${REACT_APP_API_URL}/v1/launchpad/${idoDetail._id}/apply`, {}, {
        headers: {
          Authorization: "Bearer " + token.access_token
        }
      }).then(response => {
        if (response.data.success) {
          axios.get(`${REACT_APP_API_URL}/v1/launchpad/${idoDetail._id}/isApplied?walletAddress=${account}`).then(res => {
            setIsApplied(res.data.data.applied);
          });
          setIsApplySuccess(true);
        }
        setIsModalConfirm(true);
      }).catch(err => {
        setIsModalConfirm(true);
        setIsApplySuccess(false);
      });
    }
  };

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
                      <div className="t-right">{activeDetail?.swap_rate}</div>
                    </div>
                    <div className="item">
                      <div className="t-left">IDO Supply:</div>
                      <div className="t-right">
                        {activeDetail?.total_sale} {activeDetail?.symbol}
                      </div>
                    </div>
                    <div className="item">
                      <div className="t-left">Total Supply:</div>
                      <div className="t-right">
                        {activeDetail?.token_supply || "TBA"} {activeDetail?.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="list-info-ido border-none">
                    <div className="item">
                      <div className="t-left">Private</div>
                      <div className="t-right">{activeDetail.start_date}</div>
                    </div>
                  </div>
                  <div className="social-address gap-3">
                    <div className="box-address">
                      <div className="address-wl">
                        <span>
                          {activeDetail?.ido_contract_address &&
                            `${activeDetail?.ido_contract_address.substring(0, 8)}...${activeDetail?.ido_contract_address.substring(
                              32,
                              activeDetail?.ido_contract_address.length
                            )}`}
                        </span>
                        <CopyToClipboard
                          text={activeDetail?.ido_contract_address}
                          onCopy={() =>
                            Store.addNotification({
                              title: "Copied",
                              message: (
                                <div className="custom-fontsize">
                                  <i className="fa fa-check-square-o icon-success" aria-hidden="true" />
                                  Successfully !
                                </div>
                              ),
                              type: "warning",
                              width: 300,
                              insert: "top",
                              container: "top-center",
                              animationIn: ["animate__animated success", "animate__fadeIn"],
                              animationOut: ["animate__animated success", "animate__fadeOut"],
                              dismiss: {
                                duration: 1000,
                                onScreen: true,
                                pauseOnHover: true,
                                click: true,
                                touch: true
                              }
                            })
                          }
                        >
                          <span className="img">
                            <img src="/images/imagesV3/copy-v3.svg" alt="" />
                          </span>
                        </CopyToClipboard>
                      </div>
                    </div>
                    <div className="flex box-social gap-2">
                      <a href={activeDetail?.extra_info.Telegram} target="blank">
                        <img src="/images/imagesV3/telegram.svg" alt="" />
                      </a>
                      <a href={activeDetail?.extra_info.Twitter} target="blank">
                        <img src="/images/imagesV3/twi.svg" alt="" />
                      </a>
                      <a href={activeDetail?.extra_info.Medium} target="blank">
                        <img src="/images/imagesV3/medium.svg" alt="" />
                      </a>
                      <a href={activeDetail?.extra_info.Website} target="blank">
                        <img src="/images/imagesV3/youtube.svg" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-content-active-detail">

            <div className="round-one">
              <div className="g-title">
                <h4 className="title">Private</h4>
                <img className="blur-title" src="/images/imagesV3/blur-title.svg" alt="" />
              </div>
              <div className="list-info-ido border-none">
                <div className="item">
                  <div className="t-left">Total Raise:</div>
                  <div className="t-right">$ {Number(activeDetail.soft_cap).toFixed(2}</div>
                </div>
                <div className="item">
                  <div className="t-left">Swap Rate:</div>
                  <div className="t-right">{activeDetail.swap_rate}</div>
                </div>
                <div className="item">
                  <div className="t-left">Start Pool:</div>
                  <div className="t-right">{activeDetail.start_date}</div>
                </div>
                <div className="item">
                  <div className="t-left">End Pool:</div>
                  <div className="t-right">{activeDetail.end_date}</div>
                </div>
                <div className="item">
                  <div className="t-left w-50">
                    Vesting:
                    <div className="flex justify-between items-center exc-vt">
                      <Progress percent={50} showInfo={false} size="small" className="mr-2" />
                      <Tooltip placement="leftTop" title="TBA">
                        <ExclamationCircleOutlined />
                      </Tooltip>
                    </div>
                  </div>
                  {!account ?
                    <ConnectWalletButton /> :
                    activeTab.includes("Upcoming") ?
                      <div className="t-right">
                        <button type="button"
                                className="btn-contact h__btnContact"
                                style={{
                                  background: "linear-gradient(92.34deg, #1682E7 13.61%, #7216E7 104.96%)"
                                }}
                                onClick={() => {
                                  if (!isApplied) {
                                    handleApply()
                                  }
                                }
                                }
                                disabled={isApplied}
                        >
                          {isApplied ? "Applied" : "Apply Now"}
                        </button>
                      </div> :
                      <div className="t-right">
                        <button type="button" style={{
                          background: "linear-gradient(92.34deg, #1682E7 13.61%, #7216E7 104.96%)"
                        }} className="btn-contact h__btnContact" onClick={handleApply}>Join Now
                        </button>
                      </div>
                  }

                </div>
              </div>
            </div>
          </div>
          {
            isApplySuccess ? <ModalSuccess isOpenJoin={isModalConfirm} setIsModalConfirm={setIsModalConfirm} /> :
              <ModalDisClaimer isOpenJoin={isModalConfirm} setIsModalConfirm={setIsModalConfirm} />
          }

        </div>
      )}
    </>
  );
};
export default TabDetail;
