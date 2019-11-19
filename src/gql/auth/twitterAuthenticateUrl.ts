import gql from 'graphql-tag'

export default (): any => gql`
  mutation TwitterAuthenticateUrl($callbackUrl: String!) {
    twitterAuthenticateUrl(callbackUrl: $callbackUrl)
  }
`
