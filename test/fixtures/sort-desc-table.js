
import { sql } from 'pg-sql'
import { SORT } from '../..'

export const input = sql`
  ${SORT('users', '-name')}
`

export const output = {
  text: `"users"."name" DESC NULLS LAST`,
  values: [],
}
