/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from 'components/Toast'
import React from 'react'

export function handleTransactionError(
  title: string,
  error: any,
  _context?: any,
) {
  let newMessage: any = error?.message || ''
  switch (true) {
    case newMessage.includes('item balance insufficient'):
      newMessage = (
        <div>
          Insufficient number of LCs. You can purchase LCs{' '}
          <a
            href="https://hq.legendfantasywar.com/marketplace/consumables?sort=lowest-price&type=chest"
            target="_blank"
            rel="noreferrer"
            className="underline text-primary"
          >
            here.
          </a>
        </div>
      )
      break
    case newMessage.includes('transfer amount exceeds balance'):
      newMessage = (
        <div>
          Insufficient amount of LFW Tokens. You can purchase LFW Tokens{' '}
          <a
            href="https://pancakeswap.finance/swap?outputCurrency=0xd71239a33c8542bd42130c1b4aca0673b4e4f48b"
            target="_blank"
            rel="noreferrer"
            className="underline text-primary"
          >
            here.
          </a>
        </div>
      )
      break
    default:
      newMessage = error?.message
  }
  const isCancel = error?.code === 4001
  if (!isCancel) {
    toast.error({
      title,
      message: newMessage,
    })
  }
}
