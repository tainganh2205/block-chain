import React, { Suspense, useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Credentials, StringTranslations } from "@crowdin/crowdin-api-client";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import yall from "yall-js";
import Popups from "../components/Popups";
import Web3ReactManager from "../components/Web3ReactManager";
import Dashboard from "./Dashboard";
import { MyAsset } from "./MyAsset";
import { Reward } from "./Reward";
import { useActiveWeb3React } from "../hooks";

import { RedirectPathToSwapOnly } from "./Dashboard/redirects";
import { EN, allLanguages } from "../constants/localisation/languageCodes";
import { LanguageContext } from "../hooks/LanguageContext";
import { TranslationsContext } from "../hooks/TranslationsContext";
import Menu from "../components/Menu";
import MenuNew from "../components/MenuNew";
import ToTop from "../components/ToTop";
import { WrapperPage } from "../components/Art";

import "./App.less";
import "bootstrap/dist/css/bootstrap.min.css";
import { GemCenter } from "./GemCenter";


const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  min-height: 100vh;
`;
const BodyWrapper = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: 1;
  justify-content: flex-start !important;

  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: calc(100vh - 60px);
  }
`;
export const PageWrapper = styled(WrapperPage)`

  .wrapper-body {
    margin: auto;
  }

  width: 100%;
  height: calc(100vh - 60px);
  background: url(./images/fish/bg-game.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
export default function App() {

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
      });
  };

  useEffect(() => {
    if (selectedLanguage) {
      fetchTranslationsForSelectedLanguage();
    }
  }, [selectedLanguage]);


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
                  <BodyWrapper id="body-wrapper-bsc">
                    <Popups />

                    <Web3ReactManager>
                      <Switch>
                        <Route exact strict path="/Dashboard" component={Dashboard} />
                        <Route exact strict path="/gun-nft" component={Dashboard} />
                        <Route exact strict path="/gem-center" component={GemCenter} />
                        <Route exact strict path="/my-asset/:slug" component={MyAsset} />
                        <Route exact strict path="/my-asset" component={MyAsset} />
                        <Route exact strict path="/reward" component={Reward} />
                        <Route component={RedirectPathToSwapOnly} />
                      </Switch>
                    </Web3ReactManager>
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
