import Dictionary from './Dictionary'

declare global {
  interface Window {
    fbAsyncInit: any
    FB: Dictionary<any>
    gapi: Dictionary<any>
  }
}
