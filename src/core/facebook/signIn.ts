import { Dictionary } from '@outcast.by/js-ext'
import SignInProps from '../interfaces/SignInProps'
import PerformLogin from '../oauth/PerformLogin'

const signIn = ({ setCompleteAuth, onSuccess, pushToHistory }: SignInProps): void => {
  window.FB.getLoginStatus((response: Dictionary<any>) => {
    if (response.status === 'connected') {
      PerformLogin.run({
        oauthData: response.authResponse,
        provider: 'FACEBOOK',
        setCompleteAuth,
        onSuccess,
        pushToHistory,
      })
    } else {
      window.FB.login(
        (response: Dictionary<any>) => {
          if (response.authResponse) {
            PerformLogin.run({
              oauthData: response.authResponse,
              provider: 'FACEBOOK',
              setCompleteAuth,
              onSuccess,
              pushToHistory,
            })
          }
        },
        { scope: 'public_profile,email' }
      )
    }
  })
}

export default signIn
