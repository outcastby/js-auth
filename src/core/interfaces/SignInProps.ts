export default interface SignInProps {
  oauthData: object
  provider: string
  providerLogin: Function
  setCompleteAuth: Function
  onSuccess: Function
  history: History
}

interface History {
  push: Function
}
