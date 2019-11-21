import gql from 'graphql-tag'
import { Config } from '@outcast.by/js-ext'
import AdditionalVariables from '../../core/gql/AdditionalVariables'

export default (): any => gql`
  mutation CompleteOauth($entity: OauthManagerParams, $oauthData: OauthDataParams ${AdditionalVariables.run()}) {
    completeOauth(entity: $entity, oauthData: $oauthData) {
      ...AuthFields
    }
  }
  ${Config.get(['jsAuth', 'fields'])}
`
