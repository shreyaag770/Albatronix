import { notificationConstants } from '../_constants'

function success (message) {
  return { type: notificationConstants.SUCCESS, message }
}

function error (message) {
  return { type: notificationConstants.ERROR, message }
}

function clear () {
  return { type: notificationConstants.CLEAR }
}

export const alertActions = {
  success,
  error,
  clear
}
