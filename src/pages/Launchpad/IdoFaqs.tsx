/* eslint-disable prefer-template */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback, useEffect } from "react";
import { Tabs , Collapse , Progress ,Modal, Button } from 'antd';

const IdoFaqs = () => {
    const { TabPane } = Tabs;
    function callback(key) {
        console.log(key);
    }
    const { Panel } = Collapse;
    const DesciptionFaqs = (
        <p className="txt">DesciptionFaqs</p>
    )
    const HeaderFaqsV1 = (
        <p>What the difference between Community Round vs ATF Round?</p>
    )
    const HeaderFaqsV2 = (
        <p>How much is the transaction fee?</p>
    )
    const HeaderFaqsV3 = (
        <p>What does the transaction fee go to?</p>
    )
    return (
        <>
            <div className="box-content-faqs">
                <div className="table-faq">
                    <div className="columns align-center ">
                        <div className="colum left">
                            <div className="box-img">
                                {/* <img src="/images/launchpad/bscs-wrap.png" alt="" /> */}
                            </div>
                        </div>
                        <div className="colum right">
                            <div className="faqs-guide">
                            <h4 className="title">FAQS</h4>
                            <Collapse accordion>
                                <Panel header={HeaderFaqsV1} key="1">
                                    {DesciptionFaqs}
                                </Panel>
                                <Panel header={HeaderFaqsV2} key="2">
                                    {DesciptionFaqs}
                                </Panel>
                                <Panel header={HeaderFaqsV3} key="3">
                                    {DesciptionFaqs}
                                </Panel>
                            </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default IdoFaqs;