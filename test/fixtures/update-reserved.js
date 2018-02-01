
import { sql } from 'pg-sql'
import { UPDATE } from '../..'

export const input = sql`
  ${UPDATE('user', { name: 'abe', age: 42 })}
`

export const output = {
  text: `UPDATE "user" SET ("name", "age") = ($1, $2)`,
  values: ['abe', 42],
}
