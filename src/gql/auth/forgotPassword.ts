import gql from 'graphql-tag'

export default (): any => gql`
  mutation forgotPassword($email: String!, $restoreUrl: String!) {
    forgotPassword(email: $email, restoreUrl: $restoreUrl)
  }
`
