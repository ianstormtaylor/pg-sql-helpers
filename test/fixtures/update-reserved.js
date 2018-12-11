
import { sql } from 'pg-sql'
import { UPDATE } from '../..'

export const input = sql`
  ${UPDATE('user', { name: 'abe', age: 42 })}
`

export const output = {
  text: `UPDATE "user" SET ("age", "name") = ROW ($1, $2)`,
  values: [42, 'abe'],
}
