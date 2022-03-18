import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ResetCSS } from "@artechain/uikit";
import GlobalStyle from "./style/Global";
import App from "./pages/App";
import ApplicationUpdater from "./state/application/updater";
import ListsUpdater from "./state/lists/updater";
import MulticallUpdater from "./state/multicall/updater";
import TransactionUpdater from "./state/transactions/updater";
import Providers from "./Providers";
import { Toaster } from 'components/Toast'
import "inter-ui";
import "./i18n";
import "./axiosClient";
import "./style/index.css";
import { TransactionProvider } from "hooks/useTransactions";

if ("ethereum" in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false;
}

window.addEventListener("error", () => {
  localStorage?.removeItem("redux_localstorage_simple_lists");
});

ReactDOM.render(
  <StrictMode>
    <Providers>
      <Toaster />
      <TransactionProvider>
        <>
          <ListsUpdater />
          <ApplicationUpdater />
          <TransactionUpdater />
          <MulticallUpdater />

        </>
        <ResetCSS />
        <GlobalStyle />
        <App />
      </TransactionProvider>
    </Providers>
  </StrictMode>,
  document.getElementById("root")
);
