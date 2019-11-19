import gql from 'graphql-tag'
import { Config } from '@outcast.by/js-ext'
import additionalVariables from '../additionalVariables'

export default (): any => gql`
  mutation refreshToken($refreshToken: String! ${additionalVariables()}) {
    refreshToken(refreshToken: $refreshToken) {
      ...AuthFields
    }
  }
  ${Config.get(['jsAuth', 'fields'])}
`
