/* eslint-disable react/jsx-no-target-blank */
import React, { memo } from 'react'
import './index.less'
import { useHookDetail } from "../Store-Detail";

const AboutProject = memo(() => {

  const [state, actions]: any = useHookDetail();
  const { objData } = state;

  const des = objData && objData.description;

  return (
    <div
      className='bsc-p-launchpad_detail-about'
    >
      <div
        className='bsc-p-launchpad_detail-about-top'
      >
        
        <a 
        href={objData && (objData.socical && objData.socical.telegram)}
        target="_blank">
          <img src='/images/social-network/telegram.svg' alt='telegram' />
        </a>
        <a 
        href={objData && (objData.socical && objData.socical.twitter)}
        target="_blank">
          <img src='/images/social-network/twitter.svg' alt='twitter' />
        </a>
        <a 
        href={objData && (objData.socical && objData.socical.medium)}
        target="_blank">
          <img src='/images/social-network/medium.svg' alt='medium' />
        </a>
      </div>
      <div
        className='bsc-p-launchpad_detail-about-bottom'
      >
        <span dangerouslySetInnerHTML={{ __html: des }} />
      </div>
    </div>
  )
})

export default memo(AboutProject)