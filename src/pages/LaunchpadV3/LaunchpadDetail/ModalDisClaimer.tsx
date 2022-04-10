import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useWeb3React } from "@web3-react/core";
import { useHookDetail } from "./components/Store-Detail";
import { useHistory } from "react-router-dom";


const ModalDisClaimer = (props) => {
  const { account }: any = useWeb3React();
  const history = useHistory();
  const { isOpenJoin, idoID, setIsModalConfirm } = props;
  const [acceptConfirm, setAcceptConfirm] = useState(false);
  const [listCondition, setListCondition] = useState<string[]>([]);
  const [state, actions]: any = useHookDetail();
  const [valueConfirm, setValueConfirm] = useState({
    ownerAddress: account,
    idoId: parseInt(idoID),
    countryId: 84,
    status: 1
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalConfirm(false);
    setIsModalVisible(false);
  };


  useEffect(() => {
    if (listCondition.length === 3) {
      setAcceptConfirm(true);
    } else {
      setAcceptConfirm(false);
    }
  }, [listCondition]);

  useEffect(() => {
    if (isOpenJoin) {
      setIsModalVisible(true);
    }
  }, [isOpenJoin]);

  const contentModal = (
    <>
      <div className="content-modal-claimer">
        <h3 className="title">
          Please join our launchpad pool to earn both LFW and eligible tickets for IDO allocation.
        </h3>
        <div className="footer-modal text-right">
          <button className="btn-contact" type="button" onClick={() => {
            history.push(`/launchpad-pools`);
          }}>
            Join Launchpad pool
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Modal className="modal-disclaimer modal-false" title="Apply Condition" onCancel={handleCancel} visible={isModalVisible}>
        {contentModal}
      </Modal>
    </>
  );
};
export default ModalDisClaimer;
