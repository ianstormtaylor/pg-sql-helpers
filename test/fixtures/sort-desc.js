
import { sql } from 'pg-sql'
import { SORT } from '../..'

export const input = sql`
  ${SORT('-name')}
`

export const output = {
  text: `"name" DESC NULLS LAST`,
  values: [],
}
