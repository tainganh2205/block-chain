import React from "react";
import { createContext } from "@dwarvesf/react-utils";
import { Web3Provider } from "@ethersproject/providers";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TokenBalance, useTokenBalance } from "hooks/useTokenBalance";
import { ConnectorId, useWalletModal } from "@artechain/uikit";
import { injected, walletconnect } from "../connectors";
import axios from "axios";
import { toast } from "../components/Toast";

interface ContextValues extends TokenBalance {
  isWalletConnected: boolean;
  isWalletSign: boolean;
  showConnectModal: () => void;
  walletId?: string | null;
  token: TokenBlob;
  accessToken?: string | null;
  isExpiredSignature: boolean;
}

const signatureKey = "lfw-signature-fish";

interface TokenBlob {
  walletAddress?: string;
  exp?: number;
  signature?: string;
  accessToken?: string;
}

function isExpired(expiredTime: number) {
  return !dayjs(expiredTime * 1000)
    .subtract(5, "minutes")
    .isAfter(dayjs());
}

const getStoredSignature = (): TokenBlob => {
  try {
    const data = JSON.parse(window.localStorage.getItem(signatureKey) || "{}");
    if (isExpired(data.exp || 0)) {
      return {};
    }
    return data;
  } catch {
    return {};
  }
};

const { REACT_APP_API_URL } = process.env;
let requestTime = 0;

const signMessage = ({ account, library, now, setToken }) => {
  axios.get(`${REACT_APP_API_URL}/v1/auth/nonce?walletAddress=${account}`).then(res => {
    library?.getSigner(account).signMessage(res.data.data.nonce.toString()).then(signature => {
      axios.post(`${REACT_APP_API_URL}/v1/auth`, {
        signature: signature.replace("0x", ""),
        walletAddress: account
      }).then(response => {
        if (now === requestTime && response.data.data) {
          const data = JSON.parse(Buffer.from(response.data.data.split(".")[1], "base64").toString());
          // Sign success
          const token = { accessToken: response.data.data, signature: signature.replace("Ox", ""), walletAddress: account, exp: data.exp } as TokenBlob;
          setToken(token);
        }
      });
    });
  });
};

const [Provider, useAuthContext] = createContext<ContextValues>();

export const AuthContextProvider: React.FC<any> = ({ children }) => {
  const { account, activate, deactivate, error, library } = useWeb3React<Web3Provider>();
  const [token, setToken] = useState<TokenBlob>({});

  const handleLogin = (connectorId: ConnectorId) => {
    setToken({});
    if (connectorId === "walletconnect") {
      return activate(walletconnect);
    }
    return activate(injected);
  };

  const deactivateWallet = useCallback(() => {
    setToken({});
    deactivate();
  }, [deactivate]);

  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(handleLogin, deactivateWallet, account as string);

  useEffect(() => {
    const token = getStoredSignature();
    setToken(token);
  }, []);

  useEffect(() => window.localStorage.setItem(signatureKey, JSON.stringify(token)), [token]);

  const isExpiredSignature = useMemo(() => {
    return isExpired(token.exp ?? 0);
  }, [token.exp]);

  const accessToken = useMemo(() => {
    if (account && account === token.walletAddress && !isExpired(token.exp ?? 0)) {
      return token.accessToken;
    }
    return undefined;
  }, [token, account]);

  const tokenBalance = useTokenBalance({ accessToken });

  const isWalletSign = useMemo(() => !!account && account === token.walletAddress && !isExpired(token.exp ?? 0) && !!token.accessToken, [account, token, isExpired]);

  useEffect(() => {
    const now = Date.now();
    requestTime = now;
    if (account && token && account.toLowerCase() !== token.walletAddress?.toLocaleLowerCase()) {
      signMessage({ now, setToken, account, library });
    }

    return function() {
      requestTime = Date.now();
    };
  }, [account, token, library]);

  const showConnectModal = useMemo(() => {
    if (!account) {
      return onPresentConnectModal;
    } else if (isWalletSign) {
      return onPresentAccountModal;
    }
    return () => {
      const now = Date.now();
      requestTime = now;
      signMessage({ now, setToken, account, library });
    };

  }, [account, isWalletSign, onPresentConnectModal, onPresentAccountModal, library]);


  useEffect(() => {
    if (error && !(error instanceof UnsupportedChainIdError)) {
      toast.error({ title: error.message });
    }
  }, [error]);

  return (
    <Provider
      value={{
        isWalletSign,
        isWalletConnected: !!account,
        showConnectModal,
        walletId: account,
        token,
        accessToken,
        isExpiredSignature,
        ...tokenBalance
      }}
    >
      {children}
    </Provider>
  );
};

export { useAuthContext };
