import AdditionalVariables from '../../src/core/gql/AdditionalVariables'
import { Config } from '@outcast.by/js-ext'

test('Auth logout', (): void => {
  Config.set({ jsAuth: { gqlVariables: { var1: 'String', var2: 'Int!' } } })
  expect(AdditionalVariables.run()).toEqual(', $var1: String, $var2: Int!')
})
