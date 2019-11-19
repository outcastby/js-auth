import Dictionary from '../interfaces/Dictionary'
import Action from '../interfaces/Action'
import gql from '../gql/auth'

export const SIGN_IN = 'auth/SIGN_IN'
export const SIGN_UP = 'auth/SIGN_UP'
export const COMPLETE = 'auth/COMPLETE'
export const PROVIDER_LOGIN = 'auth/PROVIDER_LOGIN'
export const FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD'
export const RESTORE_PASSWORD = 'auth/RESTORE_PASSWORD'
export const GET_TWITTER_AUTH_URL = 'auth/GET_TWITTER_AUTH_URL'
export const LOGOUT = 'auth/LOGOUT'
export const REFRESH_TOKEN = 'auth/REFRESH_TOKEN'

export const signIn = ({ variables: { entity } }: Dictionary<any>): Action => ({
  type: SIGN_IN,
  request: {
    query: gql.signIn(),
    variables: entity,
  },
})

export const signUp = ({ variables }: Dictionary<any>): Action => ({
  type: SIGN_UP,
  request: {
    query: gql.signUp(),
    variables,
  },
})

export const forgotPassword = ({ variables: { entity } }: Dictionary<any>): Action => ({
  type: FORGOT_PASSWORD,
  request: {
    query: gql.forgotPassword(),
    variables: entity,
  },
})

export const restorePassword = ({ variables }: Dictionary<any>): Action => ({
  type: RESTORE_PASSWORD,
  request: {
    query: gql.restorePassword(),
    variables,
  },
})

export const providerLogin = (variables: Dictionary<any>): Action => {
  return {
    type: PROVIDER_LOGIN,
    request: {
      query: gql.providerAuth(),
      variables,
    },
  }
}

export const getTwitterAuthUrl = (variables: Dictionary<any>): Action => ({
  type: GET_TWITTER_AUTH_URL,
  request: {
    query: gql.twitterAuthenticateUrl(),
    variables,
  },
})

export const complete = ({ variables }: Dictionary<any>): Action => ({
  type: COMPLETE,
  request: {
    query: gql.completeOauth(),
    variables,
  },
})

export const logout = (): Action => ({
  type: LOGOUT,
})

export const refreshToken = (variables: Dictionary<any>): Action => ({
  type: REFRESH_TOKEN,
  request: {
    query: gql.refreshToken(),
    variables,
  },
})
