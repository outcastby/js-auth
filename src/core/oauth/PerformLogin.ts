import SignInProps from '../interfaces/SignInProps'
import { Config, Dictionary } from '@outcast.by/js-ext'
import { providerLogin } from '../../redux/actions'

export default {
  run: ({ oauthData, provider, setCompleteAuth, onSuccess, pushToHistory }: SignInProps): any => {
    const extraParams = Config.get(['jsAuth', 'extraParams']) ? Config.get(['jsAuth', 'extraParams'])() : null
    const dispatch = Config.get(['jsAuth', 'dispatch'])

    dispatch(providerLogin({ payload: JSON.stringify(oauthData), provider, extraParams }))
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
            pushToHistory('/auth/complete_oauth')
          }
        }
      })
      .then((res: Dictionary<any>) => {
        if (res) {
          onSuccess()
        }
      })
  },
}
