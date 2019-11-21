# Lib for auth

## Content

* [Action creators](#action-creators):
   - for auth: [`signIn`](#signin), [`signUp`](#signup), [`forgotPassword`](#forgotpassword), 
   [`restorePassword`](#restorepassword), [`logout`](#logout), [`refreshToken`](#refreshtoken)
   - for oauth: [`getTwitterAuthUrl`](#gettwitterauthurl), [`complete`](#complete)
* Action types:
   - for auth: `SIGN_IN`, `SIGN_UP`, `FORGOT_PASSWORD`, `RESTORE_PASSWORD`, `LOGOUT`, `REFRESH_TOKEN`,
   - for oauth: `PROVIDER_LOGIN`, `GET_TWITTER_AUTH_URL`, `COMPLETE`
* [`apiLoaders`](#api-loaders) - list of functions for initialization providers oauth
* [Functions for performing providers authorization](#rootsignin): `facebookSignIn`, `googleSignIn`, `twitterSignIn`
* [Auth utils](#auth-utils) - `logout`, `handleTokenError`

## Action creators

Usage example:

```javascript
// connect.js

import { connect } from 'react-redux'
import { signIn } from '@outcast.by/js-auth'

export default connect(() => ({}), { signIn })
```

### `signIn`

Takes object as variables for the gql request:

```javascript
signIn({ variables: { entity: { email: 'email', password: 'password' } } })
```

If you use `Base Form` pass it as `onSubmit` prop

```javascript
<Form
  ...
  onSubmit={signIn}
  ...
/>
```

### `signUp`

Takes object as variables for the gql request:

```javascript
signUp({ variables: { entity: { email: 'email', password: 'password', passwordConfirmation: 'password' } } })
```

If you use `Base Form` pass it as `onSubmit` prop

If you need to pass extraParams, declare function `gatherVariables` and pass it to `Form`

```javascript
const gatherVariables = (state) => {
  return { entity: { ..._.omit(state, 'errors'), extraParams: LocalStorage.getIn('extraParams') } }
}

<Form
  ...
  onSubmit={signUp}
  gatherVariables={gatherVariables}
  ...
/>
```

### `forgotPassword`

Takes object as variables for the gql request:

```javascript
forgotPassword({ variables: { entity: { email: 'email', restoreUrl: `${window.location.origin}/auth/restore` } } })
```

If you use `Base Form` pass it as `onSubmit` prop and declare function `gatherVariables`.

```javascript
const gatherVariables = (state) => {
  return { entity: { restoreUrl: `${window.location.origin}/auth/restore`, ..._.omit(state, ['errors']) } }
}

<Form
  ...
  onSubmit={forgotPassword}
  gatherVariables={gatherVariables}
  ...
/>
```

### `restorePassword`

Takes object as variables for the gql request:

```javascript
restorePassword({
  variables: { entity: { restoreHash: 'hash', password: 'password', passwordConfirmation: 'password' } },
})
```
`hash` locate in query string of url 

If you use `Base Form` pass it as `onSubmit` prop and declare function `gatherVariables`.

```javascript
const { hash } = queryString.parse(window.location.search)

const gatherVariables = (state) => {
  return { entity: { restoreHash: hash, ..._.omit(state, ['errors']) } }
}

<Form
  ...
  onSubmit={restorePassword}
  gatherVariables={gatherVariables}
  ...
/>
```

### `refreshToken`
Takes object as variables for the gql request:

```javascript
refreshToken({ variables: { entity: { refreshToken: `refreshToken` } } })
```

### `logout`
Used without variables 
```javascript
logout()
```

### `complete`
Takes object as variables for the gql request:

```javascript
restorePassword({
  variables: { entity: entityParams, oauthData: { uid: 'uid', provider: 'GOOGLE' } },
})
```

If you use `Base Form` pass it as `onSubmit` prop and declare function `gatherVariables`.

```javascript
const gatherVariables = (state) => {
    const { uid, provider } = oauthData
    return { entity: _.omit(state, ['errors']), oauthData: { uid, provider: provider.toUpperCase() } }
}

<Form
  ...
  onSubmit={complete}
  gatherVariables={gatherVariables}
  ...
/>
```

### `getTwitterAuthUrl`
Takes object as variables for the gql request:

```javascript
getTwitterAuthUrl({ getTwitterAuthUrl: `${window.location.origin}${process.env.REACT_APP_TWITTER_CALLBACK_PATH}` })
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
import { facebookSignIn } from '@outcast.by/js-auth'
import { googleSignIn } from '@outcast.by/js-auth'

export default { google: googleSignIn, facebook: facebookSignIn }
```

These functions takes object with 3 params: useState setter, onSuccess function and history.push
```javascript
const [completeAuth, setCompleteAuth] = useState({ missingFields: [], onSuccess: null, isShowCompleteAuth: false })
const onSuccess = () => history.push('/')

const onClickOauth = () => {
  facebookSignIn({ setCompleteAuth, onSuccess, pushToHistory: history.push })
}
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
  dispatch: store.dispatch,
  fields: FIELDS,
  gqlVariables: { filter: 'String', limit: 'Int', order: 'String' },
  extraParams: () => ({ ownerUuid: LocalStorage.getIn('ownerUuid') }),
  facebookId: 'process.env.REACT_APP_FACEBOOK_ID',
  googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  twitterCallbackPath: '/auth/twitter/callback',
}
```

`accessTokenKey` and `refreshTokenKey` - keys for storing and getting `accessToken` and `refreshToken` from cookies  
`dispatch` - used for `dispatch` actions in lib  
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
