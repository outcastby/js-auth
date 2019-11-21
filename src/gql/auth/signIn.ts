import gql from 'graphql-tag'
import { Config } from '@outcast.by/js-ext'
import AdditionalVariables from '../../core/gql/AdditionalVariables'

export default (): any => gql`
  mutation signIn($email: String!, $password: String! ${AdditionalVariables.run()}) {
    signIn(email: $email, password: $password) {
      ...AuthFields
    }
  }
  ${Config.get(['jsAuth', 'fields'])}
`
