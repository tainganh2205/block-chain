import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Store } from "react-notifications-component";
import axios from "axios";
import { useHookProjects } from "./Store";
import TabDetail from "./TabDetail";
import { useAsyncEffect } from "@dwarvesf/react-hooks";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const { REACT_APP_API_URL } = process.env;
const TabsContentActive = (props): any => {
  const [state]: any = useHookProjects();
  const { idoList, activeTab } = props;


  // ------- GET PATH NAME --------
  const history = useHistory();
  const pathHash = history.location.search.split("?");
  const tabSymbol = pathHash[2];

  const [typeView, setTypeView] = useState("");
  const [idoDetail, setIdoDetail] = useState(null);
  const [idoListView, setIdoListView] = useState<any>([]);
  const query = useQuery();

  useAsyncEffect(async () => {
    const status = query.get("tab");
    const response = await axios.get(`${REACT_APP_API_URL}/v1/launchpad?status=${!status ? "upcoming" : status?.toLowerCase()}`);
    setIdoListView(response.data.data);
  }, [query]);

  const handleCallClick = (ido) => {
    setIdoDetail(ido);
    setTypeView("detail");
  };

  useEffect(() => {

    if (tabSymbol) {
      setTypeView("detail");
    } else {
      setTypeView("list");
      setIdoListView(idoListView);
    }
  }, [idoListView, tabSymbol]);


  useEffect(() => {
    if (!tabSymbol) {
      setIdoListView(idoListView);
      setTypeView("list");
    }
  }, [idoListView, tabSymbol]);

  return (
    <>
      {typeView === "list" ? idoListView?.length > 0
        ? idoListView.map((ido, index) => (
          <div className="main-cnt-tabs" key={+index + 1}>
            <div className="box-content-active">
              <div className="top-content">
                <div className="box-img">
                  <a href="https://legendofgalaxy.io" target="blank">
                    <img src={ido.extra_info.LogoUrl} width="70" height="70" alt="" />
                  </a>
                </div>
                <h4 className="title">
                  {ido.name} <span>{ido.unit}</span>
                </h4>
              </div>
              <div className="body-content">
                <div className="guide-wrap">
                  <div className="wrap-top">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<p class="desc">
${(ido.description || "").replace("Legend of Galaxy", "<a href=\"https://legendofgalaxy.io/\" class=\"text-primary\" target=\"_blank\">Legend of Galaxy </a>")}</p>`
                      }} />


                  </div>
                  <div className="wrap-middle">

                    <div className="list-info-ido">
                      <div className="item">
                        <div className="t-left">Swap Rate:</div>
                        <div className="t-right">{ido.swap_rate}</div>
                      </div>
                      <div className="item">
                        <div className="t-left">IDO Supply:</div>
                        <div className="t-right">
                          {ido.total_sale} {ido.symbol}
                        </div>
                      </div>
                      <div className="item">
                        <div className="t-left">Total Supply:</div>
                        <div className="t-right">
                          {ido.token_supply || "TBA"} {ido.symbol}
                        </div>
                      </div>
                    </div>
                    <div className="list-info-ido border-none">
                      <div className="item">
                        <div className="t-left">Private</div>
                        <div className="t-right">{new Date(ido.start_date).toUTCString()}</div>
                      </div>
                    </div>
                    <div className="social-address gap-3">
                      {ido.ido_contract_address &&
                        <div className="box-address">
                          <div className="address-wl">
                                  <span>
                                    {`${ido.ido_contract_address.substring(0, 8)}...${ido.ido_contract_address.substring(
                                      28,
                                      ido.ido_contract_address.length
                                    )}`}
                                  </span>
                            <CopyToClipboard
                              text={ido.ido_contract_address}
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
                      }


                      <div className="flex box-social gap-2">
                        <a href={ido.extra_info.Telegram} target="blank">
                          <img src="/images/imagesV3/telegram.svg" alt="" />
                        </a>
                        <a href={ido.extra_info.Twitter} target="blank">
                          <img src="/images/imagesV3/twi.svg" alt="" />
                        </a>
                        <a href={ido.extra_info.Medium} target="blank">
                          <img src="/images/imagesV3/medium.svg" alt="" />
                        </a>
                        <a href="https://legendofgalaxy.io" target="blank">
                          <img src="/images/imagesV3/youtube.svg" alt="" />
                        </a>
                      </div>

                    </div>
                    <div className="box-button-dt mt-2">
                      <button type="button" className="btn-view-dt" onClick={() => handleCallClick(ido)}>
                        View details
                      </button>
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
        ) : <TabDetail activeTab={activeTab} idoDetail={idoDetail} />

      }

    </>
  );
};
export default TabsContentActive;
