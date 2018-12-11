
import { sql } from 'pg-sql'
import { ROW } from '../..'

export const input = sql`
  ${ROW({ name: 'jimmy', age: 42 })}
`

export const output = {
  text: `ROW ($1, $2)`,
  values: [42, 'jimmy'],
}
