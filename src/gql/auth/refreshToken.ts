import gql from 'graphql-tag'
import { Config } from '@outcast.by/js-ext'
import AdditionalVariables from '../../core/gql/AdditionalVariables'

export default (): any => gql`
  mutation refreshToken($refreshToken: String!, $deviceUuid: String ${AdditionalVariables.run()}) {
    refreshToken(refreshToken: $refreshToken, deviceUuid: $deviceUuid) {
      ...AuthFields
    }
  }
  ${Config.get(['jsAuth', 'fields'])}
`
