import _ from 'lodash'
import { Cookies, Config, GQLAction, Dictionary, GQL } from '@outcast.by/js-ext'
import { refreshToken } from '../redux/actions'

const logout = (): void => {
  Cookies.remove(Config.get(['jsAuth', 'accessTokenKey']))
  Cookies.remove(Config.get(['jsAuth', 'refreshTokenKey']))
  window.location.replace('/auth')
}

const MAX_ERROR_COUNT = 5
let refreshTokenErrorCount = 0

const handleTokenError = (action: GQLAction): Promise<any> => {
  const dispatch = Config.get(['jsAuth', 'dispatch'])

  return dispatch(refreshToken({ refreshToken: Cookies.getDecrypted(Config.get(['jsAuth', 'refreshTokenKey'])) }))
    .then(() => {
      return GQL.Fetch.run(action.request.query, action.request.variables)
    })
    .catch((errors: Dictionary<any>) => {
      if (_.some(errors.message, ['message', 'invalid_refresh_token'])) {
        if (refreshTokenErrorCount < MAX_ERROR_COUNT) {
          refreshTokenErrorCount++
          return GQL.Fetch.run(action.request.query, action.request.variables)
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
