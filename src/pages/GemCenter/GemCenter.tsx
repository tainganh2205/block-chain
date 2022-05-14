import React, { useCallback, useEffect, useState } from "react";
import { useDisclosure } from "@dwarvesf/react-hooks";
import classnames from "classnames";
import { PageWrapper } from "../App";
import BuyGem from "./BuyGem";
import DepositGem from "./DepositGem";
import { useFishContract } from "../../hooks/useContract1";
import { useAuthContext } from "../../context/authNew";
import { FISH_SERVER_ID } from "../../constant/contracts";
import { inputNumberToBigNumber } from "../../utils/number";
import { useFishTabs } from "../../hooks/useFishTabs";
import BalanceCard from "../../components/BalanceCard";
import { showMessage } from "../../components/TransactionConfirmationModal/helpers";
import TransactionFishPendingModal from "../../components/TransactionFishPendingModal";

import "./style.less";

const GemCenter = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { currentTab: tab, tabsDom } = useFishTabs([{ key: "buy", label: "Buy Gem" }, { key: "deposit", label: "Deposit" }]);
  const [convertRatio, setConvertRatio] = useState(0);
  const fishContract = useFishContract();

  const { isWalletSign, walletId, balanceFloat, refetch, refetchGem, requestAllowance } = useAuthContext();

  useEffect(() => {
    fishContract?.conversionRate()?.then(rate => setConvertRatio(rate.toNumber()));
  }, [fishContract]);

  const [inputLfwValue, setInputLfwValue] = useState<number>(0);

  const [modalText, setModalText] = useState("");
  const [modalState, setModalState] = useState<0 | 1 | 2>(0);
  const [modalShowConfirmText, setModalShowConfirmText] = useState<boolean>(true);

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
          setModalState(0);
          setModalShowConfirmText(true);
          openConfirm();
          // Request allowance
          if (await requestAllowance(inputLfwValue)) {

            setModalText("Buying gem...");
            setModalState(1);
            openConfirm();
            // Swap Gem
            let transaction;
            try {
              transaction = await fishContract?.swapDiamond(inputNumberToBigNumber(inputLfwValue).toString(), FISH_SERVER_ID);
            } catch (e) {
              console.error(e);
            }
            if (transaction) {
              setModalText("Wait for transaction complete!");
              setModalShowConfirmText(false);
              setModalState(2);
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
    <PageWrapper className="PageWrapper GemCenter relative d-flex flex-column items-center justify-center pb-6">
      <TransactionFishPendingModal isOpen={isOpenConfirm} onClose={closeConfirm} message={modalText} state={modalState} showConfirmText={modalShowConfirmText} />
      <BalanceCard />
      <div className="flex flex-column items-center justify-center pt-6 pb-6">
        {tabsDom}
        <div className="relative tabContent">
          <img src="/images/fish/box-reward.png" alt="" />
          <img src="/images/fish/btn-buy1.png" alt="" className={classnames("btn-buy-gem", { disable: isLoading || (tab === "buy" && !inputLfwValue) })} onClick={onBuy} />
          <div className="gem-input-wrapper">
            {tab === "buy" ? <BuyGem convertRatio={convertRatio} inputLfwValue={inputLfwValue} setInputLfwValue={setInputLfwValue} /> : tab === "deposit" ? <DepositGem /> : <></>}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default GemCenter;
