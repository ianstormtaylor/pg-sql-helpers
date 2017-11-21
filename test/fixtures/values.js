
import { sql } from 'pg-sql'
import { VALUES } from '../..'

export const input = sql`
  UPDATE users
  SET (name, age) = (${VALUES({ name: 'abe', age: 42 })})
`

export const output = {
  text: `UPDATE users SET (name, age) = ($1, $2)`,
  values: ['abe', 42],
}
