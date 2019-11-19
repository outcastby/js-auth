import SignInProps from '../interfaces/SignInProps'
import performLogin from '../performLogin'

interface GoogleUser {
  getAuthResponse: Function
}
const signIn = ({ providerLogin, setCompleteAuth, onSuccess, history }: SignInProps): void => {
  const auth2 = window.gapi.auth2.getAuthInstance()
  auth2.signIn().then((googleUser: GoogleUser) => {
    const { id_token: idToken } = googleUser.getAuthResponse()
    performLogin({ oauthData: { idToken }, provider: 'GOOGLE', providerLogin, setCompleteAuth, onSuccess, history })
  })
}

export default signIn
