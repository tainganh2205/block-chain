/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable no-nested-ternary */

import React, { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { useWeb3React } from '@web3-react/core'
import { MAPPING_CHAINID, ADDRESS_RECEVIE_BUSD, ADDRESS_USD } from 'config/constants'
import { useContract } from 'hooks/useContract'
import Button, { PropsButtonBSC } from 'components/Button'
import addNotify from 'components/Notify/addNotify'
import switchNetwork from 'utils/wallet'
import './index.less'
import { useHookDetail } from '../Store-Detail'
import { _joinPool } from '../utils'
import abiBUSD from '../abiBUSD.json'

const Actions = memo(({ props }: any): any => {
  const [state, actions]: any = useHookDetail()
  const { objData, objJoin, process, listAllocations } = state
  const [loading, setLoading] = useState(false)
  const [statusJoin, setstatusJoin] = useState(false)
  const [amount, setAmount]: any = useState(0)
  const [decimal, setDecimal]: any = useState(0)
  const { account, chainId }: any = useWeb3React()

  const busdContract = useContract(ADDRESS_USD[chainId], abiBUSD)
  const params: any = useParams()
  const idoId = params && params.id

  useEffect(() => {
    if (busdContract && account) {
      busdContract.balanceOf(account).then((res) => {
        setAmount(res.toString())
      })
      busdContract.decimals().then((res) => {
        if (res === 6) setDecimal(1e6)
        else setDecimal(1e18)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idoId, busdContract, account])

  const is_network_bep = objData && objData.network === 'bep'
  const is_network_erc = objData && objData.network === 'erc'
  const is_network_poly = objData && objData.network === 'poly'

  const projectAddress = objData && objData.ownerAddress
  let url = ''
  if (projectAddress === 'TBA' || projectAddress === '') {
    url = is_network_bep ? 'https://bscscan.com' : is_network_poly ? 'https://polygonscan.com' : 'https://etherscan.io'
  } else {
    url = is_network_bep
      ? `https://bscscan.com/token/${projectAddress}`
      : is_network_poly
      ? `https://polygonscan.com/token/${projectAddress}`
      : `https://etherscan.io/token/${projectAddress}`
  }

  const current_timestamp = parseInt(String(new Date().valueOf() / 1000))
  let isJoinPool = false
  let owner_address_key = ''
  if (account) {
    owner_address_key = `${account}_${idoId}`
    const lock_timestamp = localStorage.getItem(owner_address_key)
    if (lock_timestamp !== null) {
      isJoinPool = true
      if (current_timestamp - parseInt(lock_timestamp) > 900) {
        localStorage.removeItem(owner_address_key)
      }
    }
  }
  useEffect(() => {
    if (objData) {
      switchNetwork(MAPPING_CHAINID[objData.network])
    }
    return () => {
      console.log("cleaned up");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idoId, objData])

  const _handleJoinPool = () => {
    const amtJoin = objJoin.busd
    if (is_network_bep && chainId !== 56) {
      store.addNotification(addNotify('Please select network BSC', 'danger'))
      return
    }
    if (is_network_erc && chainId !== 1) {
      store.addNotification(addNotify('Please select network Ethereum', 'danger'))
      return
    }
    if (is_network_poly && chainId !== 137) {
      store.addNotification(addNotify('Please select network Polygon', 'danger'))
      return
    }
    if (amount && !isJoinPool && parseFloat(amount) / decimal >= objJoin.busd) {
      setLoading(true)
      actions
        .checkJoinPool({
          idoId: parseInt(idoId),
          address: account,
        })
        .then((response) => {
          if (!response.succeeded) {
            setLoading(false)
            store.addNotification(addNotify(response.message, 'danger'))
          } else if (response.data.isJionPool) {
            _joinPool(busdContract, ADDRESS_RECEVIE_BUSD, amtJoin, account, chainId)
              .then((res) => {
                if (owner_address_key !== '' && res.hash !== null)
                  localStorage.setItem(owner_address_key, String(current_timestamp))
                actions
                  .addJoinPool({
                    id: idoId,
                    account,
                    amount: objJoin.totalToken,
                    blockHash: res.hash,
                  })
                  .then((rel) => {
                    if (!rel.succeeded) {
                      store.addNotification(addNotify(`${rel.message} Retry after 15 minutes!`, 'danger'))
                    } else {
                      store.addNotification(addNotify('Join Pool Successful', 'success'))
                    }
                  })
                setLoading(false)
                setstatusJoin(!statusJoin)
              })
              .catch((error) => {
                setLoading(false)
              })
          } else {
            setLoading(false)
            store.addNotification(addNotify('Invalid Join Pool', 'danger'))
          }
        })
    } else {
      let _error_meg = is_network_bep
        ? 'Insufficient BUSD balance'
        : is_network_poly
        ? 'Insufficient USDC balance'
        : 'Insufficient USDT balance'
      store.addNotification(addNotify(_error_meg, 'warning'))
    }
  }

  let checkJoin = false
  if (objJoin.isJionPool) {
    checkJoin = true
  }

  const accessType = objData && objData.accessType
  const tierWhitelist = 0
  const isHot = objData && objData.orderBy === 1

  let whiteListed = true
  if (accessType === tierWhitelist && !isHot) {
    whiteListed = false
  } else if (listAllocations.length !== 0) {
    whiteListed = false
  }

  if (objData && objData.length > 0 && objData.status === 3 && objJoin.status === 3) {
    objJoin.status = 1
  }

  const actions1: PropsButtonBSC[] = [
    {
      text: is_network_bep ? 'View on BscScan' : is_network_poly ? 'View on Polygonscan' : 'View on Etherscan',
      className: 'bsc-p-launchpad_detail-project-actions-btn',
      ghost: true,
      disabled: false,
      click: () => {
        window.open(`${url}`)
      },
    },
    {
      text: objJoin.status === 2 || isJoinPool ? 'Joined' : objJoin.status === 3 ? 'Coming soon' : 'Join Pool',
      className: whiteListed ? 'hide' : 'bsc-p-launchpad_detail-project-actions-btn',
      loading: loading,
      primary: objJoin.status === 1 && !isJoinPool,
      disabled: isJoinPool || !checkJoin || loading,
      click: () => {
        _handleJoinPool()
      },
    },
  ]
  // console.log("objJoin:", objJoin)

  return (
    <div className="bsc-p-launchpad_detail-project-actions-wrapper">
      {actions1.map((btn) => (
        <Button {...btn} />
      ))}
    </div>
  )
})

export default Actions
