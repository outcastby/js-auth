import gql from 'graphql-tag'
import { Config } from '@outcast.by/js-ext'
import AdditionalVariables from '../../core/gql/AdditionalVariables'

export default (): any => gql`
  mutation CompleteOauth($entity: OauthManagerParams, $oauthData: OauthDataParams, $deviceUuid: String ${AdditionalVariables.run()}) {
    completeOauth(entity: $entity, oauthData: $oauthData, deviceUuid: $deviceUuid) {
      ...AuthFields
    }
  }
  ${Config.get(['jsAuth', 'fields'])}
`
