import { Config } from '@outcast.by/js-ext'
import _ from 'lodash'

const additionalVariables = (): string => {
  const variables = Config.get(['jsAuth', 'gqlVariables'])
  return variables ? `, ${_.map(variables, (v, k) => `$${k}: ${v}`).join(', ')}` : ''
}
export default additionalVariables
