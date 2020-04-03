import { Action, Dictionary } from '@outcast.by/js-ext'
import gql from '../gql/auth'
import { Cookies, Config } from '@outcast.by/js-ext'

export const SIGN_IN = 'auth/SIGN_IN'
export const SIGN_UP = 'auth/SIGN_UP'
export const COMPLETE = 'auth/COMPLETE'
export const PROVIDER_LOGIN = 'auth/PROVIDER_LOGIN'
export const FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD'
export const RESTORE_PASSWORD = 'auth/RESTORE_PASSWORD'
export const GET_TWITTER_AUTH_URL = 'auth/GET_TWITTER_AUTH_URL'
export const LOGOUT = 'auth/LOGOUT'
export const REFRESH_TOKEN = 'auth/REFRESH_TOKEN'

interface Params<T> {
  variables: { entity: T }
}

interface SignIn {
  email: string
  password: string
}

export const signIn = ({ variables: { entity } }: Params<SignIn>): Action => {
  const deviceUuid = Cookies.getDecrypted(Config.get(['jsAuth', 'deviceUuidKey']))

  return {
    type: SIGN_IN,
    request: {
      query: gql.signIn(),
      variables: { ...entity, deviceUuid },
    },
  }
}

interface SignUp {
  email: string
  password: string
  passwordConfirmation: string
}

export const signUp = ({ variables }: Params<SignUp>): Action => ({
  type: SIGN_UP,
  request: {
    query: gql.signUp(),
    variables,
  },
})

interface ForgotPassword {
  email: string
  restoreUrl: string
}

export const forgotPassword = ({ variables: { entity } }: Params<ForgotPassword>): Action => ({
  type: FORGOT_PASSWORD,
  request: {
    query: gql.forgotPassword(),
    variables: entity,
  },
})

interface RestorePassword {
  restoreHash: string
  password: string
  passwordConfirmation: string
}

export const restorePassword = ({ variables }: Params<RestorePassword>): Action => {
  const deviceUuid = Cookies.getDecrypted(Config.get(['jsAuth', 'deviceUuidKey']))

  return {
    type: RESTORE_PASSWORD,
    request: {
      query: gql.restorePassword(),
      variables: { ...variables, deviceUuid },
    },
  }
}

interface ProviderLogin {
  payload: string
  provider: string
  extraParams: object | null
}

export const providerLogin = (variables: ProviderLogin): Action => {
  const deviceUuid = Cookies.getDecrypted(Config.get(['jsAuth', 'deviceUuidKey']))

  return {
    type: PROVIDER_LOGIN,
    request: {
      query: gql.providerAuth(),
      variables: { ...variables, deviceUuid },
    },
  }
}

interface GetTwitterAuthUrl {
  getTwitterAuthUrl: string
}

export const getTwitterAuthUrl = (variables: GetTwitterAuthUrl): Action => ({
  type: GET_TWITTER_AUTH_URL,
  request: {
    query: gql.twitterAuthenticateUrl(),
    variables,
  },
})

interface CompleteParams {
  variables: {
    entity: Dictionary<any>
    oauthData: { uid: string; provider: string }
  }
}

export const complete = ({ variables }: CompleteParams): Action => {
  const deviceUuid = Cookies.getDecrypted(Config.get(['jsAuth', 'deviceUuidKey']))

  return {
    type: COMPLETE,
    request: {
      query: gql.completeOauth(),
      variables: { ...variables, deviceUuid },
    },
  }
}

export const logout = (): Action => ({
  type: LOGOUT,
})

interface RefreshToken {
  refreshToken: string | undefined
  deviceUuid: string | undefined
}

export const refreshToken = (variables: RefreshToken): Action => ({
  type: REFRESH_TOKEN,
  request: {
    query: gql.refreshToken(),
    variables,
  },
})
