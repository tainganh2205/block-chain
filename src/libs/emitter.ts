import mitt from 'mitt'

export const emitter = mitt()

export const EVENTS = {
  API_ERROR: 'API_ERROR',
}
