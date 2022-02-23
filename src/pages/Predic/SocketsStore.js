import { SOCKET_LAUNCHPAD } from '../../config/constants'

class WebSocketClient {
  static instance = null

  // callbacks = {}

  static getInstance() {
    if (!WebSocketClient.instance)
      WebSocketClient.instance = new WebSocketClient()
    return WebSocketClient.instance
  }

  constructor() {
    this.socketRef = null
  }

  // addCallbacks = ( ...callbacks ) => {this.callbacks = {...callbacks }}

  /* callbackData = (fnc) => {
    this.socketRef.onmessage = e => {
      fnc(JSON.parse(e.data));
    }
    return fnc(null)
  } */

  connect = () => {
    if (this.socketRef == null) {
      this.socketRef = new WebSocket(SOCKET_LAUNCHPAD)
      this.socketRef.onopen = () => {
        console.log('WebSocket open')
      }
    }
    
  }

  
}
export default WebSocketClient.getInstance();