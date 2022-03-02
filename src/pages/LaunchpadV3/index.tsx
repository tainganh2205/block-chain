/* eslint-disable prefer-template */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react'
import { useHistory, Route } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import TopIDO from './TopIDO'
import TabsIDO from './TabsIDO'
import { useHookProjects } from './Store'
import './style.less'

const LaunchPadV3 = () => {
  const [state, actions]: any = useHookProjects()
  const history = useHistory()
  // Get Path Name
  // const typePath = history.location.search.split("?")
  // const typeIdo = typePath[1];
  

  const { account } = useWeb3React()

  // const returnCate = () => {
  //   let cate: number | null = null;

  //   switch (typeIdo) {
  //     case 'gamefi':
  //       cate = 0
  //       break
  //     case 'meta':
  //       cate = 1
  //       break
  //     case 'defi':
  //       cate = 2
  //       break
  //     default:
  //       break
  //   }

  //   return cate;
  // }

  const d = new Date()
  const currentMonth = d.getMonth() + 1
  const currentYear = d.getFullYear()

  const loadDataOnConnectWallet = useCallback(() => {
    if (account) {
      actions.getOwner({ account })
      actions.getBalanceByWallet(account)
      // actions.getScheduleJoined({
      //   month:currentMonth,
      //   year:currentYear,
      //   ownerAddress: account,
      // })
      actions.getProjectJoined({
        category: 0,
        symbol: '',
        address: account,
        lastTime: null,
      })
    }
  }, [account, actions])

  const initData = useCallback(() => {
    const param = {
      category: 0,
    }
    // GET CURRENT MONTH AND YEAR

    
    // actions.getProject()
    actions.getProjectNew({
      category: 0,
    })

    actions.getProjectEnd({
      category: 0,
      symbol: ''
    })

   // actions.getSchedule(currentMonth, currentYear)
  }, [actions.getProject, actions.getSchedule, actions.getProjectEnd, actions.getProjectJoined ])

  useEffect(() => {
    initData()
  }, [initData])

  useEffect(() => {
    loadDataOnConnectWallet()
  }, [loadDataOnConnectWallet])
  return (
    <>
      <div className='w-100'>
        <TopIDO />
        <TabsIDO />
      </div>
    </>
  )
}
export default LaunchPadV3
