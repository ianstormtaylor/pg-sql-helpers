import { sql } from 'pg-sql'
import { UPSERT } from '../../lib'

export const input = sql`
  ${UPSERT('users', 'name', { name: 'abe', age: 42 })}
`

export const output = {
  text: `INSERT INTO "users" ("age", "name") VALUES ($1, $2) ON CONFLICT ("name") DO UPDATE SET ("age", "name") = ("excluded"."age", "excluded"."name")`,
  values: [42, 'abe'],
}
