/* eslint-disable react-hooks/exhaustive-deps */
import * as signalR from "@microsoft/signalr"
import web3 from 'web3'

import {
  SOCKET_LAUNCHPAD
} from '../../config/constants'

const _joinPool = async (joinPoolContract, to, amount, account) => {
  const parseAmount = web3.utils.toWei(amount.toString(), 'ether')
  const args = [to, parseAmount]
  const estimatedGas = await joinPoolContract.estimateGas.transferBNB(...args, {
    value: parseAmount,
    from: account,
  })
  return joinPoolContract.transferBNB(...args, {
    gasLimit: estimatedGas,
    value: parseAmount,
  })
}

export const socketSignalR = () => {
  const protocol = new signalR.JsonHubProtocol();
  const transport = signalR.HttpTransportType.WebSockets || signalR.HttpTransportType.LongPolling;
  // const transport = signalR.HttpTransportType.WebSockets;
  // let access_token = _getCookie("access_token");

  const options = {
    transport,
    formatType: "json&format=text",
    skipNegotiation: true,
    // accessTokenFactory: () => access_token,
  };
  let socketConnect;
  try {
    socketConnect = new signalR.HubConnectionBuilder()
    .withUrl(`${SOCKET_LAUNCHPAD}/stocks`, options)
    // .withUrl("http://localhost:4235/stocks", options)
      .withHubProtocol(protocol)
      .withAutomaticReconnect()
      // .withAutomaticReconnect({
      //   nextRetryDelayInMilliseconds: (retryContext) => {
      //     if (retryContext.elapsedMilliseconds < 5000) {
      //       return Math.random() * 3000;
      //     } 
      //     // else {
      //     //   return null;
      //     // }
      //   },
      // })
      .build();
  } catch{
      // socketConnect.stop();
      // socketConnect.off("CHART_BTC_USD");
      // socketConnect.off("NEW_CHART_BTC_USD");
      // socketConnect.off("servertime");
  }
  return socketConnect;
}
export default _joinPool
