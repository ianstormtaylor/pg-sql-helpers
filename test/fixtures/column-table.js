
import { sql } from 'pg-sql'
import { COLUMN } from '../..'

export const input = sql`
  ${COLUMN('users', 'name')}
`

export const output = {
  text: `"users"."name"`,
  values: [],
}
