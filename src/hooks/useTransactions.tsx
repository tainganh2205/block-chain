import { createContext, isSSR } from '@dwarvesf/react-utils'
import { orderBy } from 'lodash'
import { Web3Provider } from '@ethersproject/providers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { WithChildren } from 'types/common'

export const transactionsSessionStorageKey = 'lfw-transactions'

export interface SerializableTransactionReceipt {
  to: string
  from: string
  transactionHash: string
  status?: number
}

export interface TransactionDetails {
  hash: string
  approval?: { tokenAddress?: string; spender?: string }
  summary?: string
  receipt?: SerializableTransactionReceipt
  addedTime?: number
  confirmedTime?: number
  from?: string
  chainId?: number
}

export interface TransactionsState {
  [hash: string]: TransactionDetails
}

export const useLocalStorage = () => {
  const findAll = useCallback((key: string) => {
    if (!isSSR() && window.localStorage) {
      const strValue = window.localStorage.getItem(key)
      try {
        return JSON.parse(strValue ?? '{}') as TransactionsState
      } catch (error) {
        return {}
      }
    }
    return {}
  }, [])

  const insert = useCallback(
    (key: string, value: TransactionDetails) => {
      if (!isSSR() && window.localStorage) {
        const currentData = findAll(key)
        const currentTx = currentData[value.hash]
        currentData[value.hash] = { ...value, ...(currentTx ?? {}) }
        window.localStorage.setItem(key, JSON.stringify(currentData))
      }
    },
    [findAll],
  )

  const remove = useCallback(
    (key: string) => {
      if (!isSSR() && window.localStorage) {
        const currentData = findAll(key)
        delete currentData[key]
        window.localStorage.setItem(key, JSON.stringify(currentData))
      }
    },
    [findAll],
  )

  const clearAll = useCallback(() => {
    if (!isSSR() && window.localStorage) {
      window.localStorage.removeItem(transactionsSessionStorageKey)
    }
  }, [])

  return { insert, remove, findAll, clearAll }
}

interface TransactionContextValues {
  transactions: TransactionDetails[]
  pending: boolean
  clearTransactions: () => void
  addTransaction: (
    hash: string,
    detail: {
      summary?: string
      approval?: { tokenAddress?: string; spender?: string }
    },
  ) => void
  removeTransaction: (hash: string) => void
}

const [Provider, useTransactionContext] =
  createContext<TransactionContextValues>()

const TransactionProvider = ({ children }: WithChildren) => {
  const { findAll, clearAll, insert, remove } = useLocalStorage()
  const [block, setBlock] = useState()
  const [transactions, setTransactions] = useState<TransactionDetails[]>(() =>
    orderBy(findAll(transactionsSessionStorageKey), 'addedTime', 'desc'),
  )
  const { library, chainId, account } = useWeb3React<Web3Provider>()

  useEffect(() => {
    library?.on('block', (block) => {
      setBlock(block)
    })
  }, [library])

  const pending = useMemo(() => {
    return transactions.some(({ receipt }) => !receipt)
  }, [transactions])

  const clearTransactions = useCallback(() => {
    clearAll()
    setTransactions([])
  }, [clearAll])

  const addTransaction = useCallback(
    (hash, { summary, approval } = {}) => {
      if (!account || !chainId) {
        return
      }

      if (!hash) {
        throw Error('No transaction hash found.')
      }

      const tx = {
        hash,
        from: account,
        chainId,
        approval,
        summary,
        addedTime: new Date().getTime(),
      }
      insert(transactionsSessionStorageKey, tx)
      setTransactions((prev) => [tx, ...prev])
    },
    [insert, chainId, account],
  )

  const removeTransaction = useCallback(
    (hash) => {
      if (!account || !chainId) {
        return
      }

      if (!hash) {
        throw Error('No transaction hash found.')
      }

      remove(hash)
      setTransactions((prevs) => prevs.filter((trans) => trans.hash !== hash))
    },
    [remove, chainId, account],
  )

  useEffect(() => {
    function updateTransaction(e: StorageEvent) {
      if (e.key === transactionsSessionStorageKey) {
        setTransactions(
          orderBy(findAll(transactionsSessionStorageKey), 'addedTime', 'desc'),
        )
      }
    }

    window.addEventListener('storage', updateTransaction)
    return () => {
      window.removeEventListener('storage', updateTransaction)
    }
  }, [findAll])

  useEffect(() => {
    if (!chainId || !library) {
      return
    }
    transactions.forEach((transaction) => {
      if (transaction.receipt) {
        return
      }
      library
        ?.getTransactionReceipt(transaction.hash)
        .then((receipt) => {
          if (receipt) {
            insert(transactionsSessionStorageKey, {
              hash: transaction.hash,
              receipt,
            })
            setTransactions((prev) =>
              prev.map((tx) => {
                if (tx.hash === transaction.hash) {
                  return { ...tx, receipt }
                }
                return tx
              }),
            )
          }
        })
        .catch((error) => {
          console.error(
            `failed to check transaction hash: ${transaction?.hash}`,
            error,
          )
        })
    })
  }, [chainId, library, transactions, insert, block])

  useEffect(() => {
    if (account) {
      setTransactions(
        orderBy(
          findAll(transactionsSessionStorageKey),
          'addedTime',
          'desc',
        ).filter((tran) => tran.from === account),
      )
    } else {
      setTransactions([])
    }
  }, [account, findAll])

  return (
    <Provider
      value={{
        transactions,
        removeTransaction,
        clearTransactions,
        addTransaction,
        pending,
      }}
    >
      {children}
    </Provider>
  )
}

export { useTransactionContext, TransactionProvider }
