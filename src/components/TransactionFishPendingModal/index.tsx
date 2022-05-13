import { Modal } from "antd";
import { useEffect, useMemo, useState } from "react";

import "./index.less";

export default function TransactionFishPendingModal
({ isOpen, onClose, message, state, showConfirmText = true }: { isOpen: boolean, onClose: () => void, message: string, state: 0 | 1 | 2, showConfirmText: boolean }) {
  const [loadingIndex, setLoadingIndex] = useState(0);
  const loadingText = useMemo(() => `Loading${Array(loadingIndex).fill(".").join("")}`, [loadingIndex]);

  useEffect(() => {
    const handler = () => setTimeout(() => {
      setLoadingIndex(last => (last + 1) % 4);
      handler();
    }, 1000);
    handler();
  }, []);

  return <Modal wrapClassName={"TransactionFishPendingModal"}
                visible={isOpen} onCancel={onClose} maskClosable={false} keyboard={false} footer={null} closable={false} centered={true}>
    <img src={"/images/fish/bg_modal.png"} className={"FishPendingModalBg"} alt={""} />
    <img src={"/images/fish/close-btn.png"} className={"FishPendingModalCloseBtn"} alt={""} onClick={onClose} />
    <div className={"FishPendingModalContent"}>
      <h1>{showConfirmText ? "Waiting for confirmation" : "Almost done!"}</h1>
      <div className={"FishPendingModalProgress"}>
        {[0, 1, 2].map((index) => <img key={index} alt={""} className={state !== index ? "hidden" : ""} src={`/images/fish/loading-frame-${index}.png`} />)}
        <h2>{loadingText}</h2>
      </div>
      <h3>{message}</h3>
      {showConfirmText && <h4>Confirm this transaction in your wallet</h4>}
    </div>
  </Modal>;
}