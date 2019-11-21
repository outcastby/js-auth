import gql from 'graphql-tag'
import { Config } from '@outcast.by/js-ext'
import AdditionalVariables from '../../core/gql/AdditionalVariables'

export default (): any => gql`
  mutation restorePassword($entity: RestoreParams ${AdditionalVariables.run()}) {
    restorePassword(entity: $entity) {
      ...AuthFields
    }
  }
  ${Config.get(['jsAuth', 'fields'])}
`
