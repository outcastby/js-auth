import SignInProps from '../interfaces/SignInProps'
import PerformLogin from '../oauth/PerformLogin'

interface GoogleUser {
  getAuthResponse: Function
}
const signIn = ({ setCompleteAuth, onSuccess, pushToHistory }: SignInProps): void => {
  const auth2 = window.gapi.auth2.getAuthInstance()
  auth2.signIn().then((googleUser: GoogleUser) => {
    const { id_token: idToken } = googleUser.getAuthResponse()
    PerformLogin.run({ oauthData: { idToken }, provider: 'GOOGLE', setCompleteAuth, onSuccess, pushToHistory })
  })
}

export default signIn
