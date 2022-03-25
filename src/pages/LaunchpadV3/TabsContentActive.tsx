import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Store } from "react-notifications-component";

import { useHookProjects } from "./Store";
import TabDetail from "./TabDetail";

const TabsContentActive = (props): any => {
  const [state]: any = useHookProjects();
  const { idoList, activeTab } = props;


  // ------- GET PATH NAME --------
  const history = useHistory();
  const pathHash = history.location.search.split("?");
  const tabSymbol = pathHash[2];

  const [typeView, setTypeView] = useState("");

  const [idoListView, setIdoListView] = useState(idoList);

  const handleCallClick = (symbol) => {
    history.push({
      pathname: history.location.pathname,
      search: `${activeTab}?${symbol}`
    });
    setTypeView("detail");
  };

  useEffect(() => {

    if (tabSymbol) {
      setTypeView("detail");
    } else {
      setTypeView("list");
      setIdoListView(state.idoList);
    }
  }, [state.idoList, tabSymbol]);


  useEffect(() => {
    if (!tabSymbol) {
      setIdoListView(state.idoList);
      setTypeView("list");
    }
  }, [state, tabSymbol]);

  return (
    <>
      {typeView === "list" ? idoListView?.length > 0
        ? idoListView.map((ido, index) => (
          <div className="main-cnt-tabs" key={+index + 1}>
            <div className="box-content-active">
              <div className="top-content">
                <div className="box-img">
                  <img src={ido.logoUrl} alt="" />
                </div>
                <h4 className="title">
                  {ido.name} <span>{ido.unit}</span>
                </h4>
              </div>
              <div className="body-content">
                <div className="guide-wrap">
                  <div className="wrap-top">
                    <p className="desc">{ido.description}</p>
                  </div>
                  <div className="wrap-middle">

                    <div className="list-info-ido">
                      <div className="item">
                        <div className="t-left">Swap Rate:</div>
                        <div className="t-right">{ido.swapAmount}</div>
                      </div>
                      <div className="item">
                        <div className="t-left">IDO Supply:</div>
                        <div className="t-right">
                          {ido.idoSupply} {ido.symbol}
                        </div>
                      </div>
                      <div className="item">
                        <div className="t-left">Total Supply:</div>
                        <div className="t-right">
                          {ido.totalSupply || "TBA"} {ido.symbol}
                        </div>
                      </div>
                    </div>
                    <div className="list-info-ido border-none">
                      {ido.schedules.map((item) => (
                        <div className="item">
                          <div className="t-left">{item.round}</div>
                          <div className="t-right">{item.startDate}</div>
                        </div>
                      ))}
                    </div>
                    <div className="social-address gap-3">
                      <div className="box-address">
                        <div className="address-wl">
                                  <span>
                                    {ido.idoContract &&
                                      `${ido.idoContract.substring(0, 8)}...${ido.idoContract.substring(
                                        28,
                                        ido.idoContract.length
                                      )}`}
                                  </span>
                          <CopyToClipboard
                            text={ido.idoContract}
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
                                      <img src="/images/imagesV3/copy-v3.png" alt="" style={{ objectFit: "contain", height: "100%" }} />
                                    </span>
                          </CopyToClipboard>
                        </div>
                      </div>

                      <div className="flex box-social gap-2">
                        <a href={ido.socical.telegram} target="blank">
                          <img src="/images/imagesV3/telegram.svg" alt="" />
                        </a>
                        <a href={ido.socical.twitter} target="blank">
                          <img src="/images/imagesV3/twi.svg" alt="" />
                        </a>
                        <a href={ido.socical.medium} target="blank">
                          <img src="/images/imagesV3/medium.svg" alt="" />
                        </a>
                        <a href={ido.socical.website} target="blank">
                          <img src="/images/imagesV3/youtube.svg" alt="" />
                        </a>
                      </div>

                    </div>
                    <div className="box-button-dt mt-2">
                      {state?.owner !== null && typeView === "list" && (
                        <button type="button" className="btn-view-dt" onClick={() => handleCallClick(ido.symbol)}>
                          View details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
        : (
          <div className="box-message res">
            <div className="info-message">Empty !</div>
            <img src="/images/imagesV3/noEmpty.svg" alt="unknown-artwork" className="img-message" />
          </div>
        ) : <TabDetail activeTab={activeTab} />

      }

    </>
  );
};
export default TabsContentActive;
