# Lib for auth
## Consist
1. Action creators: 
    - for auth: `signIn`, `signUp`, `forgotPassword`, `restorePassword`, `logout`, `refreshToken`
    - for oauth: `providerLogin`, `getTwitterAuthUrl`, `complete`
2. Action types: 
    - for auth: `SIGN_IN`, `SIGN_UP`, `FORGOT_PASSWORD`, `RESTORE_PASSWORD`, `LOGOUT`, `REFRESH_TOKEN`,
    - for oauth: `PROVIDER_LOGIN`, `GET_TWITTER_AUTH_URL`, `COMPLETE`
3. `apiLoaders` - list of functions for initialization providers oauth
4. Functions for performing providers authorization: `facebookSignIn`, `googleSignIn`, `twitterSignIn`
5. Auth utils - `logout`, `handleTokenError` 

## Action creators
Usage example:
```javascript
// connect.js

import { connect } from 'react-redux'
import { signIn } from '@outcast.by/js-auth'

export default connect(
  () => ({}),
  { signIn }
)
```

## Api Loaders
Usage example:
```javascript
import { apiLoaders } from '@outcast.by/js-auth'

_.each(apiLoaders, (loader) => loader())
```
## `rootSignIn`
Add to `rootSignIn.js` functions according what providers you need to use
```javascript
import {facebookSignIn} from '@outcast.by/js-auth'
import {googleSignIn} from '@outcast.by/js-auth'

export default { google: googleSignIn, facebook: facebookSignIn }
```

## Auth utils
1. `Auth.logout()` - clear cookies keys for oauth and replace window location to `/auth`
2. `Auth.handleTokenError(action)` - provide `invalidTokenCallback` for `React` module from `@outcast.by/js-ext`.
    When server response with `401` and error message is `invalid_access_token` this function requests new JWT data 
    from `refreshToken` gql mutation.
    For prevent endless requests, we calculate count of `refreshToken` requests. If this count more than 5 performed `logout()`
## Setup
1. Add jsAuth config to your app config
```javascript
// config/common/jsAuth.js

import store from 'store'
import { FIELDS } from 'gql/auth/fields'
import LocalStorage from 'utils/LocalStorage'

export default {
  accessTokenKey: 'accessToken',
  refreshTokenKey: 'refreshToken',
  dispatcher: store.dispatch,
  fields: FIELDS,
  gqlVariables: { filter: 'String', limit: 'Int', order: 'String' },
  extraParams: () => ({ ownerUuid: LocalStorage.getIn('ownerUuid') }),
  facebookId: 'process.env.REACT_APP_FACEBOOK_ID',
  googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  twitterCallbackPath: '/auth/twitter/callback'
}
```
`accessTokenKey` and `refreshTokenKey` - keys for storing and getting `accessToken` and `refreshToken` from cookies  
`dispatcher` - used for `dispatch` actions in lib  
`fields` - fields for gql requests  
`gqlVariables` - additional variables for gql requests
`extraParams` - using for creating new user by oauth with additional params
`facebookId` and `googleClientId` - data for providers oauth 

2. Add fields for gql
    example:
    ```javascript
    // gql/auth/fields.js
   
    import gql from 'graphql-tag'
    import { USER_FIELDS } from '../users/userFields'
    
    export const FIELDS = gql`
      fragment AuthFields on Auth {
        accessToken
        refreshToken
        currentUser {
          ...UserFields
        }
      }
      ${USER_FIELDS}
    `
    ```
