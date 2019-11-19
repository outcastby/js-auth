import Dictionary from '../../interfaces/Dictionary'
import { Config } from '@outcast.by/js-ext'

const signIn = ({ getTwitterAuthUrl }: Dictionary<any>): void => {
  return getTwitterAuthUrl({ callbackUrl: `${window.location.origin}${Config.get(['jsAuth', 'twitterCallbackPath'])}` })
}

export default signIn
