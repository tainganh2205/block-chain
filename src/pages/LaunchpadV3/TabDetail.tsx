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
import { wait } from "../../utils/wait";
import { BigNumber, constants, FixedNumber } from "ethers";
import { toast } from "../../components/Toast";
import { ERROR_MESSAGES } from "../../constant/errorMessages";
import { handleTransactionError } from "../../utils/error";
import { inputNumberToBigNumber } from "../../utils/number";
import { useCallWithGasPrice } from "../../hooks/useCallWithGasPrice";
import { useIdoContract, usePoolContract } from "../../hooks/useContract1";
import { useAsyncEffect, useDisclosure } from "@dwarvesf/react-hooks";
import { JoinModal } from "./JoinModal";
import { ModalTitle } from "../../components/Modal1";
import { BlockchainLoadingModal } from "../../components/BlockchainLoadingModal";
import { BUSD_CONTRACT, IDO_CONTRACT } from "constant/contracts";
import erc20ABI from "../../config/abi/erc20.json";
import multicall from "utils/multicall";
import { EnableContractButton } from "pages/LaunchpadPools/PoolCard/EnableContractButton";
import { useFetchWithCache } from "../../hooks/useFetchWithCache";
import { client, GET_PATHS } from "../../libs";
import { useFetchUserDataLaunchpad } from "../../hooks/staking/useFetchUserData";

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
  const idoContract = useIdoContract();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { callWithGasPrice } = useCallWithGasPrice();
  const [isOtherChain, setOtherChain] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [isApplySuccess, setIsApplySuccess] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [spend, setSpend] = useState(0);
  const [state, actions]: any = useHookProjects();
  const [stateDetail, actionsDetail]: any = useHookDetail();
  const { activeTab, idoDetail } = props;
  const { account } = useWeb3React();
  // Fetch pools data from BE
  const {
    data: poolsFromBE,
    isLoading: isLoadingPoolsFromBE,
    error
  } = useFetchWithCache(
    GET_PATHS.getStakingInfo,
    () => client.getLaunchpadPoolInfo(),
    {
      refreshInterval: 20000
    }
  );

  const {
    data: usersData,
    isLoading: isLoadingUserData,
    refetch: refetchUserData
  } = useFetchUserDataLaunchpad(account as string, poolsFromBE?.data);
  const userData = usersData?.find(
    (pool) => pool.poolAddress === (poolsFromBE?.data ?? [])[0].poolAddress as string
  );
  const balance = account
    ? BigNumber.from(userData?.balance ?? 0)
    : constants.Zero;
  const stakedBalance = account
    ? BigNumber.from(userData?.stakedBalance ?? 0)
    : constants.Zero;
  const prevCount = usePrevious(account);
  // ------- GET PATH NAME --------
  const history = useHistory();
  const pathHash = history.location.search.split("?");
  const tabSymbol = pathHash[2];
  const [activeDetail, setActiveDetail] = useState<any>(idoDetail);
  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen
  } = useDisclosure();

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

  useAsyncEffect(async () => {
    if (idoDetail && account) {
      if (activeTab.includes("Upcoming")) {
        axios.get(`${REACT_APP_API_URL}/v1/launchpad/${idoDetail._id}/isApplied?walletAddress=${account}`).then(res => {
          setIsApplied(res.data.data.applied);
        });
      } else {
        callActive();
      }
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
  const callActive = async () => {
    const calls = [{
      address: BUSD_CONTRACT as string,
      name: "allowance",
      params: [account, IDO_CONTRACT]
    }];
    const allowances = await multicall(erc20ABI, calls);
    const allowance = BigNumber.from((allowances[0] as BigNumber).toString() ?? 0);

    setIsEnabled(allowance.gt(0));
    axios.get(`${REACT_APP_API_URL}/v1/launchpad/${idoDetail._id}/whitelist?walletAddress=${account}`).then(res => {
      setIsWhitelisted(res.data.data.whitelisted);
    });
  };
  const whitelistDate = React.useMemo(() => {
    if (activeDetail) {
      let date = new Date(activeDetail.start_date);
      date.setDate(date.getDate() - 1);
      return new Date(date).toUTCString();
    }
    return null;
  }, [activeDetail]);
  const handleJoin = async () => {
    try {
      onClose();
      await wait(200);
      onConfirmOpen();
      const tx = await callWithGasPrice(idoContract!.join, [
        BigNumber.from(FixedNumber.fromString(spend.toString(), "fixed128x18"))
      ]);
      const receipt = await tx.wait();
      if (receipt.status) {
        onConfirmClose();
        toast.success({
          title: "Success",
          message: "Stake successfully"
        });
      } else {
        onConfirmClose();
        toast.error({
          title: "Error",
          message: ERROR_MESSAGES.TRANSACTION_ERROR
        });
      }
    } catch (error) {
      console.log("error", error);
      handleTransactionError("Join error", error, [
        inputNumberToBigNumber(spend).toString()
      ]);
      onConfirmClose();
    } finally {
      setSpend(0);
    }
  };
  const handleJoinClick = () => {
    onOpen();
  };
  const RightButton = React.useMemo(() => {
    if (!activeTab.includes("Upcoming")) {
      if (isWhitelisted) {
        if (!isEnabled) {
          return <EnableContractButton onSuccess={callActive} tokenAddress={BUSD_CONTRACT} poolAddress={IDO_CONTRACT} />;
        }
        return <button type="button" style={{
          background: "linear-gradient(92.34deg, #1682E7 13.61%, #7216E7 104.96%)"
        }} className="btn-contact h__btnContact" onClick={handleJoinClick}>
          Join Now
        </button>;
      }
      return <span className="text-danger">You’re not whitelisted</span>;
    }
    return <button type="button"
                   className="btn-contact h__btnContact"
                   style={{
                     background: "linear-gradient(92.34deg, #1682E7 13.61%, #7216E7 104.96%)"
                   }}
                   onClick={() => {
                     if (!isApplied) {
                       handleApply();
                     }
                   }
                   }
                   disabled={isApplied}
    >
      {isApplied ? "Applied" : "Apply Now"}
    </button>;

  }, [isWhitelisted, isEnabled, isApplied]);
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
                  <div className="t-right">$ {Number(activeDetail.soft_cap).toFixed(2)}</div>
                </div>
                <div className="item">
                  <div className="t-left">Swap Rate:</div>
                  <div className="t-right">{activeDetail.swap_rate}</div>
                </div>
                <div className="item">
                  <div className="t-left">Whitelist Date:</div>
                  <div className="t-right">{whitelistDate}</div>
                </div>
                <div className="item">
                  <div className="t-left">Start IDO Pool:</div>
                  <div className="t-right">{new Date(activeDetail.start_date).toUTCString()}</div>
                </div>
                <div className="item">
                  <div className="t-left">End IDO Pool:</div>
                  <div className="t-right">{new Date(activeDetail.end_date).toUTCString()}</div>
                </div>
                <div className="item justify-between">
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
                    <div className="t-right w-50 text-right">
                      {RightButton}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          {
            isApplySuccess ?
              <ModalSuccess isOpenJoin={isModalConfirm} setIsModalConfirm={setIsModalConfirm} /> :
              <ModalDisClaimer isOpenJoin={isModalConfirm} setIsModalConfirm={setIsModalConfirm} />
          }
        </div>
      )}
      {(poolsFromBE?.data ?? [])[0] && isOpen &&
        <JoinModal
          title="Join IDO with BUSD"
          label="Join"
          rightButtonText="Join"
          rightButtonDisabled={!spend}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSpend(0);
          }}
          onSubmit={handleJoin}
          spend={spend}
          setSpend={setSpend}
          hasBottom
          balance={balance}
          staked={stakedBalance}
          tokenAddress={(poolsFromBE?.data ?? [])[0].token?.address as string}
          tokenSymbol={(poolsFromBE?.data ?? [])[0].token?.symbol as string}
          url={(poolsFromBE?.data ?? [])[0].getTokenUrl as string}
        />}

      <BlockchainLoadingModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        topRender={<ModalTitle className="text-white text-32 font-semibold">
          Join asset
        </ModalTitle>
        }
        bottomRender={<ModalTitle className="text-white sm:text-30 text-2xl font-semibold sm:pb-10 pb-5 pt-5">
          Join your asset...
        </ModalTitle>}
      />
    </>
  );
};
export default TabDetail;
