/* eslint-disable prefer-template */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback, useEffect } from "react";
import { Tabs , Collapse , Progress ,Modal, Button } from 'antd';
import { Link } from 'react-router-dom'
import bgTakePark from '../../images/bg-take-park.png';
import bgLiner from '../../images/img-bg-liner.jpg';


const IdoMiddle = () => {
    return (
        <>
            <div className="box-take-park">
                <div className="table-take-park" style={{ backgroundImage: `url(${bgTakePark})` }}>
                    <div className="guide-box-wrap">
                        <h3 className="title">
                            How To Take Part
                        </h3>
                        <div className="columns">
                            <div className="colum">
                                <div className="box-item" style={{ backgroundImage: `url(${bgLiner})` }}>
                                    <h4 className="txt">
                                        Join the Farms
                                    </h4>
                                    <p className="desc">
                                        Stake ATF Token or Farm LP tokens.
                                    </p>
                                        <a href="/" className="btn-buy-item mar-l-15">Stake ATF</a>
                                </div>
                            </div>


                            <div className="colum">
                                <div className="box-item" style={{ backgroundImage: `url(${bgLiner})` }}>
                                    <h4 className="txt">
                                        Buy ATF
                                    </h4>
                                    <p className="desc">
                                        Buy ATF from our ArtInfinity with BUSD
                                    </p>
                                    <Link to="/swap" className="btn-buy-item">Buy ATF now</Link>
                                </div>
                            </div>
                            <div className="colum">
                                <div className="box-item" style={{ backgroundImage: `url(${bgLiner})` }}>
                                    <h4 className="txt">
                                        Claim your tokens
                                    </h4>
                                    <p className="desc mar-b-0">
                                        After the IDO sales finish, you can claim IDO tokens from the pool you have joined.<br />
                                        Add the Official Contract Address of IDO tokens into your wallet.
                                    </p>
                                </div>
                            </div>
                            <div className="colum">
                                <div className="box-item" style={{ backgroundImage: `url(${bgLiner})` }}>
                                    <h4 className="txt">
                                        Join the pools
                                    </h4>
                                    <p className="desc mar-b-0">
                                        When the IDO Pools are live, you can join the IDO pools and pay the relevant funds.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default IdoMiddle;