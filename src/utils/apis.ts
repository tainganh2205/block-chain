import fetcher from './fetcher'
import { HandlerTokenInfoResponse } from './schema'

export const BASE_URL = process.env.REACT_APP_BASE_URL

export const GET_PATHS = {
  tokenInfo: '/v1/portal/token-info',
}

class Client {
  headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  getTokenInfo() {
    return fetcher<Required<HandlerTokenInfoResponse>>(
      `${BASE_URL}/v1/portal/token-info`,
      {
        headers: this.headers,
      },
    )
  }
}

const client = new Client()

export {client}
