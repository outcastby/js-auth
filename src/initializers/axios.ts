import { Cookies, Config, Dictionary } from '@outcast.by/js-ext'
import { refreshToken } from '../redux/actions'
import _ from 'lodash'
import { AxiosStatic } from 'axios'
import Auth from '../utils/auth'

interface State {
  isRefreshing: boolean
  subscribers: Function[]
}

const authAxiosInitializer = (axios: AxiosStatic): void => {
  let state: State = {
    isRefreshing: false,
    subscribers: [],
  }

  const subscribeTokenRefresh = (cb: Function): void => {
    state = { ...state, subscribers: [...state.subscribers, cb] }
  }

  const onRrefreshed = (token: string): void => {
    state.subscribers.map((cb) => cb(token))
  }

  axios.interceptors.request.use(
    (request) => {
      const accessTokenKey = Config.get(['jsAuth', 'accessTokenKey'])
      if (Cookies.get(accessTokenKey)) {
        request.headers.common['Authorization'] = Cookies.getDecrypted(accessTokenKey)
      }
      return request
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(undefined, (err) => {
    const {
      config: originalRequest,
      response: { data },
    } = err

    if (data === 'invalid_access_token') {
      const token = Cookies.getDecrypted(Config.get(['jsAuth', 'refreshTokenKey']))
      const deviceUuid = Cookies.getDecrypted(Config.get(['jsAuth', 'deviceUuidKey']))

      if (!state.isRefreshing) {
        state = { ...state, isRefreshing: true }

        const dispatch = Config.get(['jsAuth', 'dispatch'])

        dispatch(refreshToken({ refreshToken: token, deviceUuid }))
          .then((response: Dictionary<any>) => {
            const { accessToken } = response
            state.isRefreshing = false
            onRrefreshed(accessToken)
            state = { ...state, subscribers: [] }
          })
          .catch((errors: Dictionary<any>) => {
            if (_.some(errors.message, ['message', 'invalid_refresh_token'])) {
              Auth.logout()
            }
          })
      }
      const requestSubscribers = new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers.Authorization = token
          resolve(axios(originalRequest))
        })
      })
      return requestSubscribers
    }
    return Promise.reject(err)
  })
}

export default authAxiosInitializer
