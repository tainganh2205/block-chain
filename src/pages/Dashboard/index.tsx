import React, { useCallback, useState } from "react";
import axios from "axios";

import BoxContent from "./BoxContent";
import { ReactComponent as Logo } from "../../images/fish/busd.svg";
import { useAsyncEffect, useDisclosure } from "@dwarvesf/react-hooks";
import "./style.less";
import { PageWrapper } from "pages/App";
import classnames from "classnames";
import { useAuthContext } from "../../context/authNew";
import { showMessage } from "components/TransactionConfirmationModal/helpers";
import { useFishContract } from "../../hooks/useContract1";
import TransactionFishPendingModal from "../../components/TransactionFishPendingModal";
import { useCallWithGasPrice } from "../../hooks/useCallWithGasPrice";
import { BigNumber, FixedNumber, utils } from "ethers";
import FishButton from "../../components/FishButton";

const { REACT_APP_API_URL } = process.env;

export interface ReceivableOptionsData {
  description?: string;
  image: string;
  name: string;
  name_id: string;
  power: number;
  rarity: number;
  rarity_percent: number;
  star: number;
}

interface StoryData {
  created_at: string;
  currency: string;
  discount: number;
  image: string;
  name: string;
  name_id: string;
  price: number;
  smart_contract_address: string;
  updated_at: string;
  receivable_options: ReceivableOptionsData[];
}

const Dashboard = () => {
  const [stories, setStories] = React.useState<StoryData[]>([]);
  const [options, setOptions] = React.useState<ReceivableOptionsData[]>();
  const [modalState, setModalState] = useState<0 | 1 | 2>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [modalShowConfirmText, setModalShowConfirmText] = useState<boolean>(true);
  const [modalText, setModalText] = useState<string>("");
  const { isWalletSign, walletId, balanceFloat, refetch, refetchGem, requestAllowance } = useAuthContext();
  const fishContract = useFishContract();
  const { callWithGasPrice } = useCallWithGasPrice();
  const {
    isOpen: isOpenConfirm,
    onClose: closeConfirm,
    onOpen: openConfirm
  } = useDisclosure();

  useAsyncEffect(async () => {
    const response = await axios.get(`${REACT_APP_API_URL}/v1/mystory`);
    if (response.data.data && response.data.data.length) {
      setStories(response.data.data);
      setOptions(response.data.data[0].receivable_options);
    }
  }, []);

  const boxes = React.useMemo(() => {
    if (stories.length) {
      return stories.map((item, index) => {
        console.log('item',item);
        return <div className="box-full-blue mt-4" key={item.name_id}>
          <img src="/images/fish/box-full-blue.png" alt="" />
          <img src={item.image} className="chest" alt="" />
          <div className="box-content">
            <span className="box-full-blue-title">{item.name}</span>
            <div className="flex items-center gap-4 text-xl font-bold">
              <Logo />
              <span className="box-content-price">
                {item.price}
              </span>
            </div>
          </div>
          <div className="flex btn-footer gap-2">
            <FishButton
              className={classnames({ disable: isLoading })}
              action={() => onBuy(item.price, index + 1)}
              text="Get" />
            <FishButton action={() => setOptions(item.receivable_options)} text="What’s inside?" />
          </div>
        </div>;
      });
    }
    return null;
  }, [stories]);

  const onBuy = useCallback(async (price, index) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    if (!isWalletSign || !walletId) {
      showMessage("Please login and sign fist!");
    } else {
      let error = "";
      // Check allowance
      setModalText("Get approval the allowance before buying gem!");
      setModalState(0);
      setModalShowConfirmText(true);
      openConfirm();
      // Request allowance
      if (await requestAllowance(price)) {
        setModalText("Buying gem...");
        setModalState(1);
        openConfirm();
        // Swap Gem
        let transaction;
        try {
          transaction = await callWithGasPrice(fishContract!.mintNFT, [index], {
            value: BigNumber.from(FixedNumber.fromString(price.toString(), "fixed128x18"))
          });
        } catch (e) {
          error = "Buying Gem fail!";
          console.error(e);
        }
        if (transaction) {
          setModalState(2);
          setModalShowConfirmText(false);
          const receipt = await transaction.wait();
          await axios.post(`${REACT_APP_API_URL}/v1/weapon/mint`, {
            "walletAddress": walletId,
            "txHash": transaction.hash,
            "tokenId": 0,
            "status": "success",
            blockNumber: receipt.blockNumber
          });
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
    }
    setIsLoading(false);
  }, [fishContract, isWalletSign, walletId, balanceFloat, openConfirm, closeConfirm, isLoading, refetchGem, refetch, requestAllowance]);
  return (
    <PageWrapper className="PageWrapper">
      <TransactionFishPendingModal
        onClose={closeConfirm}
        message={modalText}
        state={modalState}
        showConfirmText={modalShowConfirmText}
        isOpen={isOpenConfirm}
      />
      <div className="flex p-6 gap-6 justify-center flex-wrap">
        {boxes}
      </div>
      {options && <>
        <div className="separator">Series Content</div>
        <BoxContent data={options} />
      </>}
    </PageWrapper>
  );
};

export default Dashboard;
