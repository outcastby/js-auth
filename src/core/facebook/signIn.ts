import Dictionary from '../../interfaces/Dictionary'
import SignInProps from '../interfaces/SignInProps'
import performLogin from '../performLogin'

const signIn = ({ providerLogin, setCompleteAuth, onSuccess, history }: SignInProps): void => {
  window.FB.getLoginStatus((response: Dictionary<any>) => {
    if (response.status === 'connected') {
      performLogin({
        oauthData: response.authResponse,
        provider: 'FACEBOOK',
        providerLogin,
        setCompleteAuth,
        onSuccess,
        history,
      })
    } else {
      window.FB.login(
        (response: Dictionary<any>) => {
          if (response.authResponse) {
            performLogin({
              oauthData: response.authResponse,
              provider: 'FACEBOOK',
              providerLogin,
              setCompleteAuth,
              onSuccess,
              history,
            })
          }
        },
        { scope: 'public_profile,email' }
      )
    }
  })
}

export default signIn
