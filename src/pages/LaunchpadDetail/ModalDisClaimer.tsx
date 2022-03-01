import React, { memo, useCallback, useEffect, useState } from 'react'
import { Modal, Button , Checkbox , Select } from 'antd';
import { useWeb3React } from '@web3-react/core'
import { useHookDetail } from './components/Store-Detail'; 
import dataCountry from "./dataCountry";



const ModalDisClaimer = (props) => {
    const { account }: any = useWeb3React()
    const { Option } = Select;
    const {isOpenJoin, idoID, startJoinPool} = props;
    const [acceptConfirm, setAcceptConfirm] = useState(false);
    const [listCondition, setListCondition] = useState<string[]>([]);
    const [state, actions]: any = useHookDetail()
    const [valueConfirm, setValueConfirm] = useState({
        ownerAddress: account,
        idoId: parseInt(idoID),
        countryId: 84,
        status: 1,
    })
    function handleChange(value) {
        setValueConfirm({
            ...valueConfirm,
            countryId: value,
        })
    }



    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (type) => {
        if (type === "confirm") {
            if (acceptConfirm) {
                const newValueConfirm = {...valueConfirm}
                newValueConfirm.status = 1
                setIsModalVisible(false)
                actions.addDisclaimer(newValueConfirm)
                actions.updateShowDisClaimer(false)
            }
        } else {
          const newValueConfirm = {...valueConfirm}
          newValueConfirm.status = 0
          setIsModalVisible(false)
          actions.addDisclaimer(newValueConfirm)
          actions.updateShowDisClaimer(false)
        }
    };

    const handleCancel = () => {
       setIsModalVisible(false);
    };

    function onChange(e) {
        const checked = e.target.checked;
        const value = e.target.value;
        if(checked) {
            if(!listCondition.includes(value)) {
                listCondition.push(value)
            }
        } else {
            const index = listCondition.indexOf(value);
            listCondition.splice(index, 1);
        }
        setListCondition([...listCondition]);
    }


    useEffect(() => {
        if(listCondition.length === 3) {
            setAcceptConfirm(true)
        } else {
            setAcceptConfirm(false);
        }
    },[listCondition])

    useEffect(() => {
        if(isOpenJoin) {
            setIsModalVisible(true)
        }
    },[isOpenJoin]);

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
                        United States of America, Singapore, Malaysia, Albania, Barbados, Burkina Faso, Balkans, Belarus, Cambodia, Cayman Islands, Cote DIvoire (Ivory Coast), Cuba, Democratic Republic of Congo, Haiti, Jamaica, Malta, Morocco, Myanmar, Nicaragua, Pakistan, Panama, Senegal, South Sudan, Syria, Uganda, Yemen, Zimbabwe, Iran, Iraq, Liberia, Democratic Peoples Republic of Korea (DPRK), Jordan, Mali, Peoples Republic of China, Hong Kong SAR, Macau SAR and Turkey.
                    </li>
                </ul>
                <div className="content-checkbox">
                    <ul className="list-checkbox">
                        <li>
                            <Checkbox value="condition-1" onChange={onChange}>I declare that I am NOT a resident of the prohibited territories or possessions as listed above. </Checkbox>
                        </li>
                        <li>
                            <Checkbox value="condition-2"  onChange={onChange}>I have read,Understood , and agree with the <span className="main-color-claimer">Privacy Policy</span> and the <span className="main-color-claimer">Term of Service</span> </Checkbox>
                        </li>
                        <li>
                            <Checkbox value="condition-3"  onChange={onChange}>I declare that,I am the resident of  </Checkbox>
                            <div className="box-select">
                                <Select defaultValue={valueConfirm.countryId} style={{ width: 150 }} onChange={handleChange}>
                                    {
                                        dataCountry.map((item,index) => (
                                            <Option value={item.phoneCode} >{item.value}</Option>
                                        ))
                                    }

                                   
                                    {/* <Option value={1}>United States of America</Option>
                                    <Option value={62}>Indonesia</Option>
                                    <Option value={63}>Philippines</Option>
                                    <Option value={65}>Singapore</Option>
                                    <Option value={60}>Malaysia</Option>
                                    <Option value={355}>Albania</Option>
                                    <Option value={1246}>Barbados</Option>
                                    <Option value={226}>Burkina Faso</Option>
                                    <Option value={7}>Balkans</Option>
                                    <Option value={375}>Belarus</Option>
                                    <Option value={855}>Cambodia</Option>
                                    <Option value={1345}>Cayman Islands</Option>
                                    <Option value={225}>Cote DIvoire (Ivory Coast)</Option>
                                    <Option value={53}>Cuba</Option>
                                    <Option value={243}>Democratic Republic of Congo</Option>
                                    <Option value={509}>Haiti</Option>
                                    <Option value={1876}>Jamaica</Option>
                                    <Option value={356}>Malta</Option>
                                    <Option value={212}>Morocco</Option>
                                    <Option value={95}>Myanmar</Option>
                                    <Option value={505}>Nicaragua</Option>
                                    <Option value={92}>Pakistan</Option>
                                    <Option value={507}>Panama</Option>
                                    <Option value={221}>Senegal</Option>
                                    <Option value={249}>South Sudan</Option>
                                    <Option value={963}>Syria</Option>
                                    <Option value={256}>Uganda</Option>
                                    <Option value={967}>Yemen</Option>
                                    <Option value={263}>Zimbabwe</Option>
                                    <Option value={98}>Iran</Option>
                                    <Option value={964}>Iraq</Option>
                                    <Option value={231}>Liberia</Option>
                                    <Option value={850}>Democratic Peoples Republic of Korea (DPRK)</Option>
                                    <Option value={962}>Jordan</Option>
                                    <Option value={223}>Mali</Option>
                                    <Option value={86}>Peoples Republic of China</Option>
                                    <Option value={852}>Hong Kong SAR</Option>
                                    <Option value={90}>Macau SAR and Turkey</Option>
                                    <Option value={93}>Afghanistan</Option>
                                    <Option value={856}>Laos</Option>
                                    <Option value={371}>Latvia</Option>
                                    <Option value={213}>Algeria</Option>
                                    <Option value={961}>Lebanon</Option>

                                    <Option value={684}>American Samoa</Option>
                                    <Option value={266}>Lesotho</Option>
                                    <Option value={376}>Andorra</Option>
                                    <Option value={231}>Liberia</Option>
                                    <Option value={244}>Angola</Option>
                                    <Option value={218}>Libya</Option>
                                    <Option value={1264}>Anguilla</Option>

                                    <Option value={423}>Liechtenstein</Option>
                                    <Option value={1268}>Antigua & Barbuda</Option>
                                    <Option value={370}>Lithuania</Option>
                                    <Option value={54}>Argentina</Option>
                                    <Option value={352}>Luxembourg</Option>
                                    <Option value={374}>Armenia</Option>
                                    <Option value={297}>Aruba</Option>
                                    <Option value={389}>Macedonia</Option>
                                    <Option value={61}>Australia</Option>

                                    <Option value={261}>Madagascar</Option>
                                    <Option value={43}>Austria ( Áo )</Option>
                                    <Option value={265}>Malawi</Option>
                                    <Option value={994}>Azerbaijan</Option>
                                    <Option value={960}>Bahamas</Option>
                                    <Option value={960}>Maldives</Option>
                                    <Option value={973}>Bahrain</Option>
                                    <Option value={223}>Mali</Option>
                                    <Option value={880}>Bangladesh</Option>
                                    <Option value={356}>Malta</Option>
                                    <Option value={692}>Marshall Islands</Option>
                                    <Option value={375}>Bỉ</Option>
                                    <Option value={222}>Mauritania</Option>
                                    <Option value={501}>Belize</Option>
                                    <Option value={230}>Mauritius</Option>
                                    <Option value={229}>Benin</Option>
                                    <Option value={52}>Mexico</Option>
                                    <Option value={1441}>Bermuda</Option>
                                    <Option value={808}>Midway Islands</Option>
                                    <Option value={975}>Bhutan</Option>
                                    <Option value={373}>Moldova</Option>

                                    <Option value={591}>Bolivia</Option>
                                    <Option value={377}>Monaco</Option>
                                    <Option value={387}>Bosnia & Herzegovina</Option>
                                    <Option value={976}>Mongolia</Option>
                                    <Option value={267}>Botswana</Option>
                                    <Option value={381}>Montenegro & Serbia</Option>
                                    <Option value={55}>Brazil</Option>
                                    <Option value={1664}>Montserrat</Option>
                                    <Option value={673}>Brunei</Option>
                                    <Option value={359}>Bulgaria</Option>
                                    <Option value={258}>Mozambique</Option>
                                    <Option value={226}>Burkina Faso</Option>
                                    <Option value={264}>Namibia</Option>
                                    <Option value={977}>Nepal</Option>
                                    <Option value={237}>Cameroon</Option>
                                    <Option value={31}>Netherlands</Option>
                                    <Option value={1}>Canada</Option>
                                    <Option value={238}>Cape Verde</Option>

                                    <Option value={687}>New Caledonia</Option>
                                    <Option value={1345}>Cayman Islands</Option>
                                    <Option value={64}>New Zealand</Option>
                                    <Option value={236}>Central African Republic</Option>
                                    <Option value={505}>Nicaragua</Option>
                                    <Option value={227}>Niger Republic</Option>
                                    <Option value={246}>Chagos Archipelago</Option>
                                    <Option value={234}>Nigeria</Option>
                                    <Option value={56}>Chile</Option>
                                    <Option value={1670}>Northern Mariana Isl.</Option>
                                    <Option value={47}>Norway</Option>
                                    <Option value={57}>Colombia</Option>
                                    <Option value={968}>Oman</Option>
                                    <Option value={269}>Comoros</Option>
                                    <Option value={680}>Palau</Option>
                                    <Option value={238}>Costa Rica</Option>
                                    <Option value={238}>Cape</Option>
                                    <Option value={238}>Cape</Option>
                                    <Option value={238}>Cape</Option>
                                    <Option value={238}>Cape</Option>
                                    <Option value={238}>Cape</Option> */}
                                </Select>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="footer-modal">
                    <button className="btn-modal-claimer" type="button" onClick={()=>handleOk("nerverMind")}>
                        Nevermind
                    </button>
                    <button className={`btn-modal-claimer ${!acceptConfirm ? "disable" : "" }`} type="button" onClick={()=>handleOk("confirm")}>
                        Confirm
                    </button>
                </div>
            </div>
        </>
    )

    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal className="modal-disclaimer" title="Just A Sec!" onCancel={handleCancel} visible={isModalVisible}>
                {contentModal}
            </Modal>
        </>
    )
}
export default ModalDisClaimer