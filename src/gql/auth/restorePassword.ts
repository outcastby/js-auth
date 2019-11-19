import gql from 'graphql-tag'
import { Config } from '@outcast.by/js-ext'
import additionalVariables from '../additionalVariables'

export default (): any => gql`
  mutation restorePassword($entity: RestoreParams ${additionalVariables()}) {
    restorePassword(entity: $entity) {
      ...AuthFields
    }
  }
  ${Config.get(['jsAuth', 'fields'])}
`
