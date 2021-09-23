import { sql } from 'pg-sql'
import { UPSERT } from '../../lib'

export const input = sql`
  ${UPSERT('users', ['age', 'name'], { name: 'abe', age: 42 })}
`

export const output = {
  text: `INSERT INTO "users" ("age", "name") VALUES ($1, $2) ON CONFLICT ("age", "name") DO NOTHING`,
  values: [42, 'abe'],
}
