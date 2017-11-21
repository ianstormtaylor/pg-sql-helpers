
import { sql } from 'pg-sql'
import { UPDATE } from '../..'

export const input = sql`
  INSERT INTO users (name, age) VALUES ('abe', 42)
  ON CONFLICT DO ${UPDATE({ age: 42 })}
`

export const output = {
  text: `INSERT INTO users (name, age) VALUES ('abe', 42) ON CONFLICT DO UPDATE SET ("age") = ($1)`,
  values: [42],
}
