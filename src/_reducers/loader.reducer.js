import { loaderConstants } from '../_constants'

export function loader (state = {}, action) {
  switch (action.type) {
    case loaderConstants.RUN:
      return {
        run: true
      }
    case loaderConstants.STOP:
      return {
        run: false
      }
    default:
      return state
  }
}
