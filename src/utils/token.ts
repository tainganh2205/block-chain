import { toast } from 'components/Toast'
import { ERROR_MESSAGES } from 'constant/errorMessages'

export interface TokenProps {
  address: string
  symbol: string
  decimals: number
  image: string
}

export const addTokenToWallet = async (props: TokenProps) => {
  const { address, symbol, decimals, image } = props

  try {
    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals,
          image,
        },
      },
    })
    if (!wasAdded) {
      toast.error({
        title: 'Error',
        message: ERROR_MESSAGES.UNKNOW_ERROR,
      })
    }
  } catch (error: any) {
    toast.error({
      title: 'Error',
      message: error?.message,
    })
  }
}
