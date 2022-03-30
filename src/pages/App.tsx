import React, { Suspense, useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { Credentials, StringTranslations } from "@crowdin/crowdin-api-client";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import yall from "yall-js";
import Popups from "../components/Popups";
import Web3ReactManager from "../components/Web3ReactManager";
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from "./AddLiquidity/redirects";
import { RedirectOldRemoveLiquidityPathStructure } from "./RemoveLiquidity/redirects";
import AddLiquidity from "./AddLiquidity";
import Pool from "./Pool";
import PoolFinder from "./PoolFinder";
import RemoveLiquidity from "./RemoveLiquidity";
import Swap from "./Swap";
import Dashboard from "./Dashboard";
import Transactions from "./Transactions";
import Maintenance from "../components/Maintenance/index";
import NftDetail from "./NftDetail";
import MysteryBoxDetail from "./MysteryBoxDetail/index";
import Upload from "./Upload";
import UserCenter from "./UserCenter";
import PersonalInfo from "./PersonalInfo";
import { useHookNft } from "./Nft/Store-Nft";
import { useActiveWeb3React } from "../hooks";

import { RedirectPathToSwapOnly } from "./Swap/redirects";
import { EN, allLanguages } from "../constants/localisation/languageCodes";
import { LanguageContext } from "../hooks/LanguageContext";
import { TranslationsContext } from "../hooks/TranslationsContext";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import MenuNew from "../components/MenuNew";
import encodeAddress from "../utils/encodeData";
import ToTop from "../components/ToTop";

import "./App.less";
import "bootstrap/dist/css/bootstrap.min.css";
import Bridge from "./Bridge";
import ComingSoon from "./CommingSoon";
import Staking from "./Staking";
import { GameLegend } from "./LegendOfGalaxy";
import ComingSoonStaking from "./CommingSoonStaking";
import AirdropsPortal from "./AirdropsPortal";

const Nft = React.lazy(() => import("./Nft_new"));
const MyArtworks = React.lazy(() => import("./MyArtworks"));
const StakeNFT = React.lazy(() => import("./StakeNFT/index"));
const Ido = React.lazy(() => import("./LaunchpadV3"));
const LaunchpadDetail = React.lazy(() => import("./LaunchpadDetail"));
const GenesisMarketplace = React.lazy(() => import("./GenesisMarketplace"));
const Introduction = React.lazy(() => import("./GameIntroduction/index"));
const MysteryBox = React.lazy(() => import("./GameMysteryBox"));


const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`;
const BodyWrapper = styled.div`
  margin-top: ${(props) => (props["data-is-mobile"] ? "0" : "78px")};
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
  // background-image: url('/images/group-image.png');
  background-repeat: no-repeat;
  background-position: bottom 24px center;
  background-size: 90%;
  justify-content: flex-start !important;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
      // background-image: url('/images/archh-${({ theme }) => (theme.isDark ? "dark" : "light")}.svg'),
    //   url('/images/left-image.svg'), url('/images/right-image.svg');
    background-repeat: no-repeat;
    background-position: center 420px, 10% 230px, 90% 230px;
    background-size: contain, 266px, 266px;
    min-height: 90vh;
    // height: 100vh;
  }
`;

const Marginer = styled.div`
  margin-top: 5rem;
`;

export default function App() {
  const [stateNFT, actionsNFT] = useHookNft();
  const { account } = useActiveWeb3React();
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined);
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined);
  const [translations, setTranslations] = useState<Array<any>>([]);
  const apiKey = `${process.env.REACT_APP_CROWDIN_APIKEY}`;
  const projectId = parseInt(`${process.env.REACT_APP_CROWDIN_PROJECTID}`);
  const fileId = 6;

  const credentials: Credentials = {
    token: apiKey
  };

  const stringTranslationsApi = new StringTranslations(credentials);

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode;
    })[0];
  };

  useEffect(() => {
    const storedLangCode = localStorage.getItem("artInfinitySwapLanguage");
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode);
      setSelectedLanguage(storedLang);
    } else {
      setSelectedLanguage(EN);
    }
  }, []);

  const fetchTranslationsForSelectedLanguage = async () => {
    stringTranslationsApi
      .listLanguageTranslations(projectId, selectedLanguage.code, undefined, fileId, 200)
      .then((translationApiResponse) => {
        if (translationApiResponse.data.length < 1) {
          setTranslations(["error"]);
        } else {
          setTranslations(translationApiResponse.data);
        }
      })
      .then(() => setTranslatedLanguage(selectedLanguage))
      .catch((error) => {
        setTranslations(["error"]);
        // console.error(error)
      });
  };

  useEffect(() => {
    if (selectedLanguage) {
      fetchTranslationsForSelectedLanguage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage]);

  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    if (account) {
      actionsNFT.validateWhitelist(account);
      actionsNFT.checkBuy(account);
      setCookie("user", encodeAddress(account));
    } else {
      setCookie("user", null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function() {
      yall({
        observeChanges: true,
        noPolyfill: true,
        lazyClass: "lazy-loading-bsc"
      });
    });
  }, []);

  // @ts-ignore
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <ReactNotifications />
          <LanguageContext.Provider
            value={{ selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              <MenuNew />
              <Menu>
                <div className="full-with">
                  <BodyWrapper data-is-mobile={isMobile} id="body-wrapper-bsc">
                    <Popups />

                    <Web3ReactManager>
                      <Switch>
                        <Route exact strict path="/Dashboard" component={Dashboard} />
                        <Route exact strict path="/swap" component={Swap} />
                        <Route exact strict path="/coming-soon" component={ComingSoon} />
                        <Route exact strict path="/staking" component={Staking} />
                        <Route exact strict path="/legend-of-galaxy" component={GameLegend} />
                        <Route exact strict path="/airdrops" component={AirdropsPortal} />

                        <Route exact strict path="/find" component={PoolFinder} />
                        <Route exact strict path="/pool" component={Pool} />
                        <Route exact strict path="/bridge" component={Bridge} />
                        <Route exact strict path="/transactions" component={Transactions} />
                        <Route exact path="/add" component={AddLiquidity} />
                        <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                        {/* Redirection: These old routes are still used in the code base */}
                        <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                        <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                        <Route
                          exact
                          strict
                          path="/remove/:tokens"
                          component={RedirectOldRemoveLiquidityPathStructure}
                        />
                        <Route exact strict path="/NFTmarket" component={Nft} />
                        <Route exact strict path="/launchpad" component={Ido} />
                        <Route exact strict path="/launchpad/:ownerAddress/:id" component={LaunchpadDetail} />
                        {/* <Route exact strict path="/LaunchpadV3/:ownerAddress/:id" component={LaunchpadV3Detail} /> */}
                        <Route exact strict path="/genesisMarket" component={GenesisMarketplace} />
                        <Route exact strict path="/maintenance" component={Maintenance} />

                        <Route exact strict path="/NFTdetail/:id" component={NftDetail} />
                        <Route exact strict path="/mintNFT" component={Upload} />
                        <Route exact strict path="/collections" component={MyArtworks} />
                        <Route exact strict path="/stakeNFT" component={StakeNFT} />
                        {/* GameFi */}
                        <Route exact strict path="/Introduction" component={Introduction} />
                        <Route exact strict path="/MysteryBox" component={MysteryBox} />
                        <Route exact strict path="/MysteryBoxDetail/:id" component={MysteryBoxDetail} />

                        <Route exact strict path="/usercenter/:id" component={UserCenter} />
                        <Route exact strict path="/createArtists" component={PersonalInfo} />
                        <Route component={RedirectPathToSwapOnly} />
                      </Switch>
                    </Web3ReactManager>
                    <Footer />
                  </BodyWrapper>
                </div>
              </Menu>
              <ToTop />
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  );
}
