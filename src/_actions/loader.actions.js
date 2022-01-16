import { loaderConstants } from '../_constants'

function run () {
  return { type: loaderConstants.RUN }
}

function stop () {
  return { type: loaderConstants.STOP }
}

export const loaderActions = {
  run,
  stop
}
