import _ from 'lodash'
import { Cookies, Config } from '@outcast.by/js-ext'
import Dictionary from '../interfaces/Dictionary'
import Action from '../interfaces/Action'
import { refreshToken } from '../redux/actions'

const logout = (): void => {
  Cookies.remove(Config.get(['jsAuth', 'accessTokenKey']))
  Cookies.remove(Config.get(['jsAuth', 'refreshTokenKey']))
  window.location.replace('/auth')
}

const MAX_ERROR_COUNT = 5
let refreshTokenErrorCount = 0

const handleTokenError = (action: Action): any => {
  const store = Config.get(['jsAuth', 'store'])
  store
    .dispatch(refreshToken({ refreshToken: Cookies.getDecrypted('refreshToken') }))
    .then((resp: object) => {
      store.dispatch(action)
      return resp
    })
    .catch((errors: Dictionary<any>) => {
      if (_.some(errors.message, ['message', 'invalid_refresh_token'])) {
        if (refreshTokenErrorCount < MAX_ERROR_COUNT) {
          refreshTokenErrorCount++
          store.dispatch(action)
        } else {
          logout()
        }
      }
    })
}

export default {
  logout,
  handleTokenError,
}
