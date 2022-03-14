import { HandlerStakingInfoResponse } from 'types/schema'

import fetcher from './fetcher'

export const BASE_URL = process.env.BASE_URL

export const GET_PATHS = {
  getStakingInfo: '/v1/gem-center/staking-info',
}

class Client {
  headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  privateHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  address: string = ''

  setHeaders(headers: Record<string, any>) {
    this.headers = { ...this.headers, ...headers }
  }

  setAddress(newAddress: string) {
    this.address = newAddress
  }

  setPrivateHeaders(headers: Record<string, any>) {
    this.privateHeaders = { ...this.privateHeaders, ...headers }
  }

  setSignature(Signature: string) {
    const lfwSignature = JSON.parse(
      window.localStorage.getItem('lfw-signature') || '{}',
    )
    this.setPrivateHeaders({ Signature: Signature || lfwSignature.signature })
  }

  setChallenge(Challenge: string) {
    const lfwSignature = JSON.parse(
      window.localStorage.getItem('lfw-signature') || '{}',
    )
    this.setPrivateHeaders({ Challenge: Challenge || lfwSignature.challenge })
  }

  clearTokens() {
    this.privateHeaders = { 'Content-Type': 'application/json' }
  }


  getStakingInfo() {
    return fetcher<Required<HandlerStakingInfoResponse>>(
      `${BASE_URL}/v1/gem-center/staking-info`,
      {
        headers: this.headers,
      },
    )
  }

}

const client = new Client()

export { client }
