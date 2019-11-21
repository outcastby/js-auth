import { Config } from '@outcast.by/js-ext'

const triggerGoogleLoaded = (): void => {
  window.dispatchEvent(new Event('google-loaded'))
}

const apiLoader = (): void => {
  const script = document.createElement('script')

  script.src = 'https://apis.google.com/js/platform.js'
  script.async = true
  script.defer = true
  script.onload = triggerGoogleLoaded

  document.body.appendChild(script)

  const _onError = (err: object): void => {
    console.error('error', err)
  }

  window.addEventListener('google-loaded', () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id: Config.get(['jsAuth', 'googleClientId']), // eslint-disable-line @typescript-eslint/camelcase
        })
        .then(null, _onError)
    })
  })
}

export default apiLoader
