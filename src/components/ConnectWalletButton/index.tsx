import React from "react";
import { useWeb3React } from "@web3-react/core";
import { ConnectorId, useWalletModal } from "@artechain/uikit";
import { injected, walletconnect } from "connectors";
import useI18n from "hooks/useI18n";
import { ButtonArt as Button } from "components/Art";

const UnlockButton = (props) => {
  const TranslateString = useI18n();
  const { account, activate, deactivate } = useWeb3React();

  const handleLogin = (connectorId: ConnectorId) => {
    if (connectorId === "walletconnect") {
      return activate(walletconnect);
    }
    return activate(injected);
  };
  const handleLogout = () => {
    localStorage.removeItem("lfw-signature");
    deactivate();
  };
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(handleLogin, handleLogout, account as string);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

  return (
    <div>
      {account ? (
        <>
          <Button type="button" className="button-cnt" style={{ width: "100%", borderRadius: "8px", height: "44px" }} onClick={onPresentAccountModal} {...props}>
            <img src="/images/connect.png" alt="" />
            {accountEllipsis}
          </Button>
        </>
      ) : (
        <Button type="button" className="button-cnt" style={{ width: "100%", borderRadius: "8px", height: "44px" }} onClick={onPresentConnectModal} {...props}>
          <img src="/images/connect.png" alt="" />
          {TranslateString(292, "Connect Wallet")}
        </Button>
      )}
    </div>
  );
};

export default UnlockButton;
