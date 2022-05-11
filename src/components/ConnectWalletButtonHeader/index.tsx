import React from "react";
import useI18n from "hooks/useI18n";
import { ButtonArt as Button } from "components/Art";
import { useAuthContext } from "../../context/authNew";

const UnlockButton = (props) => {
  const TranslateString = useI18n();

  const { showConnectModal, walletId: account, isWalletSign } = useAuthContext();

  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

  return (
    <div>
      <>
        <Button type="button" className="button-cnt" style={{ width: "100%", borderRadius: "8px", height: "40px" }} onClick={showConnectModal} {...props}>
          {account && isWalletSign ? accountEllipsis : account && !isWalletSign ? `${accountEllipsis} (not sign yet)` : TranslateString(292, "Connect Wallet")}
        </Button>
      </>
    </div>
  );
};

export default UnlockButton;
