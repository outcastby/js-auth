import { Config } from '@outcast.by/js-ext'
import _ from 'lodash'

export default {
  run: (): string => {
    const variables = Config.get(['jsAuth', 'gqlVariables'])
    return variables ? `, ${_.map(variables, (v, k) => `$${k}: ${v}`).join(', ')}` : ''
  },
}
