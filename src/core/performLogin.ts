import SignInProps from './interfaces/SignInProps'
import Dictionary from '../interfaces/Dictionary'
import { Config } from '@outcast.by/js-ext'

const performLogin = ({
  oauthData,
  provider,
  providerLogin,
  setCompleteAuth,
  onSuccess,
  history,
}: SignInProps): any => {
  const extraParams = Config.get(['jsAuth', 'extraParams']) ? Config.get(['jsAuth', 'extraParams'])() : null
  providerLogin({ payload: JSON.stringify(oauthData), provider, extraParams })
    .catch((errors: Dictionary<any>) => {
      if (errors.message.length > 0) {
        const [
          {
            message,
            details: { missingFields, oauthData },
          },
        ] = errors.message

        if (message === 'authorization_not_complete') {
          setCompleteAuth({ missingFields: missingFields, oauthData, isShowCompleteAuth: true })
          history.push('/auth/complete_oauth')
        }
      }
    })
    .then((res: Dictionary<any>) => {
      if (res) {
        onSuccess()
      }
    })
}

export default performLogin
