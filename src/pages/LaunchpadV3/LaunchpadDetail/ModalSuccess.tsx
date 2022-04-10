import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useHistory } from "react-router-dom";
import { CheckCircleFilled } from "@ant-design/icons";

const ModalSuccess = (props) => {
  const history = useHistory();
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
          <li>
            You will be solely responsible to proceed at your own discretion.
          </li>
          <li>
            You are not using, and will not in the future use, a VPN to mask your physical location from a restricted location.
          </li>
          <li>
            You are responsible for ensuring compliance with the laws of your jurisdiction in connections with your use of the our Services.
          </li>
          <li>
            You understand that BSCStation is not liable for your compliance or non-compliance with any such laws.
          </li>
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
