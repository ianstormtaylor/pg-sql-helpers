
import { sql } from 'pg-sql'
import { UPDATE } from '../..'

export const input = sql`
  ${UPDATE('users', { name: 'abe', age: 42 })}
`

export const output = {
  text: `UPDATE "users" SET ("name", "age") = ROW($1, $2)`,
  values: ['abe', 42],
}
