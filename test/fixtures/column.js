
import { sql } from 'pg-sql'
import { COLUMN } from '../..'

export const input = sql`
  ${COLUMN('name')}
`

export const output = {
  text: `"name"`,
  values: [],
}
