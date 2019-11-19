import gql from 'graphql-tag'
import { Config } from '@outcast.by/js-ext'
import additionalVariables from '../additionalVariables'

export default (): any => gql`
  mutation signIn($email: String!, $password: String! ${additionalVariables()}) {
    signIn(email: $email, password: $password) {
      ...AuthFields
    }
  }
  ${Config.get(['jsAuth', 'fields'])}
`
