import additionalVariables from '../../src/gql/additionalVariables'
import { Config } from '@outcast.by/js-ext'

test('Auth logout', (): void => {
  Config.set({ jsAuth: { gqlVariables: { var1: 'String', var2: 'Int!' } } })
  expect(additionalVariables()).toEqual(', $var1: String, $var2: Int!')
})
