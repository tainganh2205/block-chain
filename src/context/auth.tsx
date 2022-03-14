import React from "react";
import { useAsyncEffect, useDisclosure } from "@dwarvesf/react-hooks";
import { createContext } from "@dwarvesf/react-utils";
import { Web3Provider } from "@ethersproject/providers";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { toast } from "components/Toast";
import dayjs from "dayjs";
import { client } from "libs/apis";
import { emitter, EVENTS } from "libs/emitter";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getReferralCode, removeReferralCode } from "utils/referral";
import { useTokenBalance } from "hooks/useTokenBalance";
import { BigNumber } from "@ethersproject/bignumber";

interface ContextValues {
  isWalletConnected: boolean;
  isWalletModalOpen: boolean;
  closeWalletModal: () => void;
  openWalletModal: () => void;
  walletId?: string | null;
  challenge?: string | null;
  getSignature: () => Promise<string | undefined>;
  storeSignature: (signature: string) => void;
  token: SignatureBlob;
  isExpiredSignature: boolean;
  checkExpiredSignature: () => boolean;
  clearSignature: () => void;
  balance: BigNumber;
  refreshBalance: () => void;
}

const signatureKey = "lfw-signature";

interface SignatureBlob {
  address?: string;
  exp?: number;
  signature?: string;
  challenge?: string;
}

function isExpired(expiredTime: number) {
  return !dayjs(expiredTime * 1000)
    .subtract(5, "minutes")
    .isAfter(dayjs());
}

const getStoredSignature = (): SignatureBlob => {
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

const [Provider, useAuthContext] = createContext<ContextValues>();

export const AuthContextProvider: React.FC<any> = ({ children }) => {
  const { account, error, library } = useWeb3React<Web3Provider>();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const waitingForUpsertAccount = useRef(true);
  const [token, setToken] = useState<SignatureBlob>({});
  const [challenge, setChallenge] = useState<string | null>(null);
  const { balance, refetch: refreshBalance } = useTokenBalance();

  const {
    isOpen: isWalletModalOpen,
    onClose: closeWalletModal,
    onOpen: openWalletModal
  } = useDisclosure();

  useEffect(() => {
    const token = getStoredSignature();
    setToken(token);
  }, []);

  useEffect(() => {
    waitingForUpsertAccount.current = true;
  }, [account]);

  const isExpiredSignature = useMemo(() => {
    return isExpired(token.exp ?? 0);
  }, [token.exp]);

  const checkExpiredSignature = useCallback(() => {
    return isExpired(token.exp ?? 0);
  }, [token.exp]);

  useEffect(() => {
    if (token.challenge) {
      setChallenge(token.challenge);
    }
  }, [token]);

  const storeSignature = useCallback(
    (signature: string) => {
      if (challenge) {
        try {
          const data = JSON.parse(Buffer.from(challenge, "base64").toString());
          const token = { ...data, signature, challenge };
          window.localStorage.setItem(signatureKey, JSON.stringify(token));
          setToken(token);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [challenge]
  );

  const clearSignature = useCallback(() => {
    setChallenge(null);
    setToken({});
  }, []);

  useEffect(() => {
    emitter.on(EVENTS.API_ERROR, (data: any) => {
      if (data?.status === 401 || data?.status === 403) {
        setToken({});
        setChallenge("");
      }
    });

    return () => {
      emitter.off(EVENTS.API_ERROR);
    };
  }, []);

  useAsyncEffect(async () => {
    if (account && !error) {
      setIsWalletConnected(false);
      waitingForUpsertAccount.current = true;
      try {
        const referralCode = getReferralCode();
        // await client.postUpsertWallet({
        //   walletAddress: account,
        //   referralCode,
        // })
        setIsWalletConnected(true);
        waitingForUpsertAccount.current = false;
        removeReferralCode();
      } catch (err: any) {
        toast.error({ title: err.message });
      }
    }
  }, [account, error]);

  useEffect(() => {
    if (account && token.address && account !== token.address) {
      setToken({});
      client.clearTokens();
    }
  }, [account, token]);

  useAsyncEffect(async () => {
    if (account && !token.challenge && !waitingForUpsertAccount.current) {
      try {
        // const response = await client.getChallenge(account)
        // setChallenge(response.data.challenge || null)
      } catch (e) {
        console.error(e);
      }
    }
  }, [account, token, isWalletConnected]);

  const getSignature = useCallback(async () => {
    if (!account || !challenge) {
      throw new Error("Invalide account or challenge code");
    }

    return library?.getSigner(account).signMessage(challenge);
  }, [account, challenge, library]);

  useEffect(() => {
    if (error && !(error instanceof UnsupportedChainIdError)) {
      toast.error({ title: error.message });
    }
  }, [error]);

  useEffect(() => {
    client.setAddress(account || "");
    if (!account) {
      setIsWalletConnected(false);
    }
  }, [account]);

  useEffect(() => {
    if (token.signature) {
      client.setSignature(token.signature);
    }
  }, [token.signature]);

  useEffect(() => {
    if (token.challenge) {
      client.setChallenge(token.challenge);
    }
  }, [token.challenge]);

  return (
    <Provider
      value={{
        isExpiredSignature,
        isWalletConnected,
        isWalletModalOpen,
        closeWalletModal,
        openWalletModal,
        walletId: account,
        challenge,
        getSignature,
        storeSignature,
        token,
        clearSignature,
        balance,
        refreshBalance,
        checkExpiredSignature
      }}
    >
      {children}
    </Provider>
  );
};

export { useAuthContext };
