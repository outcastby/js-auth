export default interface SignInProps {
  oauthData: object
  provider: string
  setCompleteAuth: Function
  onSuccess: Function
  pushToHistory: Function
}
