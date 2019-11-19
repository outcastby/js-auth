import gql from 'graphql-tag'
import { Config } from '@outcast.by/js-ext'
import additionalVariables from '../additionalVariables'

export default (): any => gql`
  mutation signUp($entity: SignUpParams ${additionalVariables()}) {
    signUp(entity: $entity) {
      ...AuthFields
    }
  }
  ${Config.get(['jsAuth', 'fields'])}
`
