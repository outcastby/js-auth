import gql from 'graphql-tag'
import { Config } from '@outcast.by/js-ext'
import additionalVariables from '../additionalVariables'

export default (): any => gql`
  mutation CompleteOauth($entity: OauthManagerParams, $oauthData: OauthDataParams ${additionalVariables()}) {
    completeOauth(entity: $entity, oauthData: $oauthData) {
      ...AuthFields
    }
  }
  ${Config.get(['jsAuth', 'fields'])}
`
