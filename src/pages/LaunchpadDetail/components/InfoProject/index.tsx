/* eslint-disable no-useless-return */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useWeb3React } from "@web3-react/core";
import "react-notifications-component/dist/theme.css";
import Actions from '../Actions'
import { useHookDetail } from "../Store-Detail";
import './index.less'

const InfoProject = React.memo(({ props }: any): any => {
  const [state, actions]: any = useHookDetail();
  const { objData } = state;
  const { account } = useWeb3React();

  const {
    match: { params },
  }: any = props;

  useEffect(() => {
    if (account) {
      actions.getYourAllocations(account, params.id)
      if (state.listAllocations.length > 0) {
        actions.checkIsClaim(params.id, account);
        actions.checkJoinPool({
          idoId: parseInt(params.id),
          address: account,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, params.id])

  // set const
  const pending = 0;
  const coming = 1;
  const going = 2;
  const open = 3;
  const projectName = objData && objData.name;
  const shortDescription = objData && objData.shortDescription;

  return (
    <div
      className='bsc-p-launchpad_detail-project'
    >
      <div
        className='bsc-p-launchpad_detail-project-title'
      >
        <span>{projectName}</span>
      </div>
      <div className='bsc-p-launchpad_detail-project-status'>
        {objData && objData.status === pending ? (
          <span >Pending</span>
        ) : objData && objData.status === coming ? (
          <span >Coming</span>
        ) : objData && objData.status === going ? (
          <span >On Going</span>
        ) : objData && objData.status === open ? (
          <span >Open</span>
        ) : (
          <span>
            Close
          </span>
        )}
      </div>
      <div
        className='bsc-p-launchpad_detail-project-desc'
      >
        <span>
          {shortDescription}
        </span>
      </div>
      <div
        className='bsc-p-launchpad_detail-project-actions'
      >
        {!isMobile && (<Actions props={props} />)}
      </div>
    </div>
  )
})

export default InfoProject