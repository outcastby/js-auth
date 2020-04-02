import gql from 'graphql-tag'
import { Config } from '@outcast.by/js-ext'
import AdditionalVariables from '../../core/gql/AdditionalVariables'

export default (): any => {
  const extraParams = Config.get(['jsAuth', 'extraParams']) ? ', $extraParams: OauthExtraParams' : ''

  return gql`
  mutation providerAuth(
      $payload: Json!, $provider: ProviderTypes!, $deviceUuid: String ${extraParams} ${AdditionalVariables.run()}
    ) {
    providerAuth(payload: $payload, provider: $provider, deviceUuid: $deviceUuid ${
      extraParams ? ', extraParams: $extraParams' : ''
    }) {
      ...AuthFields
    }
  }
  ${Config.get(['jsAuth', 'fields'])}
`
}
