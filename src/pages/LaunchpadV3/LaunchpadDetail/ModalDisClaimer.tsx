import React, { memo, useCallback, useEffect, useState } from "react";
import { Modal, Button, Checkbox, Select } from "antd";
import { useWeb3React } from "@web3-react/core";
import { useHookDetail } from "./components/Store-Detail";
import dataCountry from "./dataCountry";


const ModalDisClaimer = (props) => {
  const { account }: any = useWeb3React();
  const { Option } = Select;
  const { isOpenJoin, idoID,setIsModalConfirm } = props;
  const [acceptConfirm, setAcceptConfirm] = useState(false);
  const [listCondition, setListCondition] = useState<string[]>([]);
  const [state, actions]: any = useHookDetail();
  const [valueConfirm, setValueConfirm] = useState({
    ownerAddress: account,
    idoId: parseInt(idoID),
    countryId: 84,
    status: 1
  });

  function handleChange(value) {
    setValueConfirm({
      ...valueConfirm,
      countryId: value
    });
  }


  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = (type) => {
    if (type === "confirm") {
      if (acceptConfirm) {
        const newValueConfirm = { ...valueConfirm };
        newValueConfirm.status = 1;
        setIsModalVisible(false);
        actions.addDisclaimer(newValueConfirm);
        actions.updateShowDisClaimer(false);
      }
    } else {
      const newValueConfirm = { ...valueConfirm };
      newValueConfirm.status = 0;
      setIsModalVisible(false);
      actions.addDisclaimer(newValueConfirm);
      actions.updateShowDisClaimer(false);
    }
    setIsModalConfirm(false);
  };

  const handleCancel = () => {
    setIsModalConfirm(false);
    setIsModalVisible(false);
  };

  function onChange(e) {
    const checked = e.target.checked;
    const value = e.target.value;
    if (checked) {
      if (!listCondition.includes(value)) {
        listCondition.push(value);
      }
    } else {
      const index = listCondition.indexOf(value);
      listCondition.splice(index, 1);
    }
    setListCondition([...listCondition]);
  }


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
          By entering to this website and/or using our Services, you hereby agree, represent and warrant that:
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
        <h3 className="title">
          Please confirm that you are not a citizen or permanent resident of, you do not have a primary residence in, and you are not physically located in the following territories or possessions:
        </h3>
        <ul className="list-text-claimer">
          <li>
            United States of America, Singapore, Malaysia, Albania, Barbados, Burkina Faso, Balkans, Belarus, Cambodia, Cayman Islands, Cote DIvoire (Ivory Coast), Cuba, Democratic Republic of Congo,
            Haiti, Jamaica, Malta, Morocco, Myanmar, Nicaragua, Pakistan, Panama, Senegal, South Sudan, Syria, Uganda, Yemen, Zimbabwe, Iran, Iraq, Liberia, Democratic Peoples Republic of Korea
            (DPRK), Jordan, Mali, Peoples Republic of China, Hong Kong SAR, Macau SAR and Turkey.
          </li>
        </ul>
        <div className="content-checkbox">
          <ul className="list-checkbox">
            <li>
              <Checkbox value="condition-1" onChange={onChange}>I declare that I am NOT a resident of the prohibited territories or possessions as listed above. </Checkbox>
            </li>
            <li>
              <Checkbox value="condition-2" onChange={onChange}>I have read,Understood , and agree with the <span className="main-color-claimer">Privacy Policy</span> and the <span
                className="main-color-claimer">Term of Service</span> </Checkbox>
            </li>
            <li>
              <Checkbox value="condition-3" onChange={onChange}>I declare that,I am the resident of </Checkbox>
              <div className="box-select">
                <Select defaultValue={valueConfirm.countryId} style={{ width: 150 }} onChange={handleChange}>
                  {
                    dataCountry.map((item, index) => (
                      <Option key={index} value={item.phoneCode}>{item.value}</Option>
                    ))
                  }
                </Select>
              </div>
            </li>
          </ul>
        </div>
        <div className="footer-modal">
          <button className="btn-modal-claimer" type="button" onClick={() => handleOk("nerverMind")}>
            Nevermind
          </button>
          <button className={`btn-modal-claimer ${!acceptConfirm ? "disable" : ""}`} type="button" onClick={() => handleOk("confirm")}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Modal className="modal-disclaimer" title="Just A Sec!" onCancel={handleCancel} visible={isModalVisible}>
        {contentModal}
      </Modal>
    </>
  );
};
export default ModalDisClaimer;
