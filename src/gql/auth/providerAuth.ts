import gql from 'graphql-tag'
import { Config } from '@outcast.by/js-ext'
import additionalVariables from '../additionalVariables'

export default (): any => {
  const extraParams = Config.get(['jsAuth', 'extraParams']) ? ', $extraParams: OauthExtraParams' : ''

  return gql`
  mutation providerAuth($payload: Json!, $provider: ProviderTypes! ${extraParams} ${additionalVariables()}) {
    providerAuth(payload: $payload, provider: $provider ${extraParams ? ', extraParams: $extraParams' : ''}) {
      ...AuthFields
    }
  }
  ${Config.get(['jsAuth', 'fields'])}
`
}
