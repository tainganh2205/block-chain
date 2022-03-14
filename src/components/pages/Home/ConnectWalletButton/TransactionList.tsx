import React from 'react'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { IconViewTransaction } from 'components/icons/components/IconViewTransaction'
import { IconTransactionSuccess } from 'components/icons/components/IconTransactionSuccess'
import { IconTransactionFailed } from 'components/icons/components/IconTransactionFailed'
import { IconTransactionPending } from 'components/icons/components/IconTransactionPending'
import {
  TransactionDetails,
  useTransactionContext,
} from 'hooks/useTransactions'
import { useWeb3React } from '@web3-react/core'
import { getScanLink } from 'utils/connector'

export const TransactionList = () => {
  const { transactions, clearTransactions } = useTransactionContext()

  const handleClearTransactions = () => {
    clearTransactions()
  }

  if (transactions.length === 0) {
    return null
  }

  return (
    <>
      <hr className="w-full border-gray-550 mt-6" />
      <div className="w-full sm:px-10 px-6 mt-2">
        <div className="flex justify-between items-center">
          <Text className="text-lg font-semibold" color="gray-300">
            Recent transactions
          </Text>
          <Button
            onClick={handleClearTransactions}
            appearance="link"
            className="!p-0"
          >
            Clear all
          </Button>
        </div>
        <div className="max-h-[200px] overflow-y-auto">
          {transactions.map((tx) => (
            <TransactionItem key={tx.hash} {...tx} />
          ))}
        </div>
      </div>
    </>
  )
}

export const TransactionItem = ({
  hash,
  receipt,
  summary,
}: TransactionDetails) => {
  const { chainId } = useWeb3React()

  const renderIcon = () => {
    if (!receipt) {
      return <IconTransactionPending className="w-4 h-4 animate-spin mr-2" />
    }

    return receipt?.status === 1 || typeof receipt?.status === 'undefined' ? (
      <IconTransactionSuccess className="w-4 h-4 mr-2" />
    ) : (
      <IconTransactionFailed className="w-4 h-4 mr-2" />
    )
  }

  if (!hash) return null

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        {renderIcon()}
        <Text className="font-medium" color="white">
          {summary}
        </Text>
      </div>
      <Button
        as="a"
        target="_blank"
        href={getScanLink(hash, 'transaction', chainId)}
        className="text-gray-300 !p-0"
        Icon={IconViewTransaction}
        appearance="link"
      />
    </div>
  )
}

export default TransactionList
