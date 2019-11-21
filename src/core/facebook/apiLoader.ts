import { Config } from '@outcast.by/js-ext'

const apiLoader = (): void => {
  window.fbAsyncInit = (): void => {
    window.FB.init({
      appId: Config.get(['jsAuth', 'facebookId']),
      xfbml: true,
      version: 'v3.3',
    })

    window.FB.AppEvents.logPageView()
  }
  ;((d, s, id): void => {
    const [fjs] = d.getElementsByTagName(s)
    if (d.getElementById(id)) {
      return
    }
    const js = d.createElement(s) as HTMLScriptElement
    js.id = id
    js.src = 'https://connect.facebook.net/en_US/sdk.js'
    fjs.parentNode?.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
}

export default apiLoader
