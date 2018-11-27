
import { sql } from 'pg-sql'
import { VALUES } from '../..'

export const input = sql`
  UPDATE users
  SET (age, name) = (${VALUES({ name: 'abe', age: 42 })})
`

export const output = {
  text: `UPDATE users SET (age, name) = ($1, $2)`,
  values: [42, 'abe'],
}
