import React, { useCallback, useEffect, useState } from "react";
import { Store, NOTIFICATION_TYPE } from "react-notifications-component";
import { useDisclosure } from "@dwarvesf/react-hooks";
import classnames from "classnames";
import { PageWrapper } from "../App";
import BuyGem from "./BuyGem";
import DepositGem from "./DepositGem";
import { useFishContract } from "../../hooks/useContract1";
import TransactionConfirmationModal from "../../components/TransactionConfirmationModal";
import { useAuthContext } from "../../context/authNew";
import { FISH_SERVER_ID } from "../../constant/contracts";
import { inputNumberToBigNumber } from "../../utils/number";

import "./style.less";

const showMessage = (message: string, type: NOTIFICATION_TYPE = "warning", duration = 2000) => Store.addNotification({
  message: message, container: "top-center", type, insert: "top", dismiss: { duration }
});

const GemCenter = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [tab, setTab] = React.useState<string>("buy");
  const [convertRatio, setConvertRatio] = useState(0);
  const fishContract = useFishContract();

  const { isWalletSign, walletId, balanceFloat, refetch, refetchGem, requestAllowance } = useAuthContext();

  useEffect(() => {
    fishContract?.conversionRate()?.then(rate => setConvertRatio(rate.toNumber()));
  }, [fishContract]);

  const [inputLfwValue, setInputLfwValue] = useState<number>(0);

  const [modalText, setModalText] = useState("");

  const {
    isOpen: isOpenConfirm,
    onClose: closeConfirm,
    onOpen: openConfirm
  } = useDisclosure();

  const onBuy = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    if (!isWalletSign || !walletId) {
      showMessage("Please login and sign fist!");
    } else {
      if (tab === "buy" && inputLfwValue > 0) {
        if (inputLfwValue <= balanceFloat) {
          let error = "";
          // Check allowance
          setModalText("Get approval the allowance before buying gem!");
          openConfirm();
          // Request allowance
          if (await requestAllowance(inputLfwValue)) {

            setModalText("Buying gem...");
            openConfirm();
            // Swap Gem
            let transaction;
            try {
              transaction = await fishContract?.swapDiamond(inputNumberToBigNumber(inputLfwValue).toString(), FISH_SERVER_ID);
            } catch (e) {
              console.error(e);
            }
            if (transaction) {
              const receipt = await transaction.wait();
              if (!receipt.blockNumber) {
                error = "Buying Gem fail!";
              }
            } else {
              error = "Transaction to buy gem cannot complete!";
            }
          } else {
            error = "Your allowance is not enough!";
          }

          closeConfirm();
          if (error) {
            showMessage(error, "danger", 0);
          } else {
            showMessage("Transaction complete! Please refresh page to get your Gem.", "success", 0);
          }

          refetchGem();
          refetch();
        } else {
          showMessage("Your balance is not enough!");
        }
      } else if (tab === "deposit") {
        showMessage("Not support yet!");
      }
    }

    setIsLoading(false);
  }, [tab, inputLfwValue, fishContract, isWalletSign, walletId, balanceFloat, openConfirm, closeConfirm, isLoading, refetchGem, refetch, requestAllowance]);

  return (
    <PageWrapper className="PageWrapper GemCenter relative d-flex items-center justify-center">
      <TransactionConfirmationModal isOpen={isOpenConfirm} onDismiss={closeConfirm} hash={undefined} content={() => <></>} attemptingTxn={true} pendingText={modalText} />
      <div className="flex flex-column items-center justify-center">
        <div className="tabControl flex gap-1 mb-2">
          {[{ tab: "buy", title: "Buy Gem" }, { tab: "deposit", title: "Deposit" }].map(btn => <button
            key={btn.tab} onClick={() => isLoading ? false : setTab(btn.tab)}
            className={classnames("btn-tab", { "opacity-50": tab !== btn.tab })}>
            <img src="/images/fish/btn-tab-reward.png" alt="" />
            <span className="btn-tab-text">
                {btn.title}
            </span>
          </button>)}
        </div>
        <div className="relative tabContent">
          <img src="/images/fish/box-reward.png" alt="" />
          <img src="/images/fish/btn-buy1.png" alt="" className={classnames("btn-buy-gem", { disable: isLoading || !inputLfwValue })} onClick={onBuy} />
          <div className="gem-input-wrapper">
            {tab === "buy" ? <BuyGem convertRatio={convertRatio} inputLfwValue={inputLfwValue} setInputLfwValue={setInputLfwValue} /> : tab === "deposit" ? <DepositGem /> : <></>}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default GemCenter;
