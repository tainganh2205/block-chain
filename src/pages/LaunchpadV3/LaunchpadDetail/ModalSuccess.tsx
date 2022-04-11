import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

const ModalSuccess = (props) => {
  const { isOpenJoin, idoID, setIsModalConfirm } = props;
  const [acceptConfirm, setAcceptConfirm] = useState(false);
  const [listCondition, setListCondition] = useState<string[]>([]);

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
        <CheckCircleFilled color="#1FFFC9" className="text-center w-full text-6xl" />
        <h3 className="text-center mt-2 text-2xl font-bold" style={{color:"#05D8F5"}}>
          Successful
        </h3>
        <ul className="list-text-claimer">
          You have been added into allow-list. Your eligible tickets from the Launchpad pool will be used in a lucky draw for IDO allocation. The more tickets you have, the higher chance you get an allocation (and with a larger allocated amount.)
        </ul>
      </div>
    </>
  );

  return (
    <>
      <Modal className="modal-disclaimer modal-success" title="" onCancel={handleCancel} visible={isModalVisible}>
        {contentModal}
      </Modal>
    </>
  );
};
export default ModalSuccess;
