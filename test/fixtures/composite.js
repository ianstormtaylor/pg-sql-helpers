
import { sql } from 'pg-sql'
import { COMPOSITE } from '../..'

export const input = sql`
  ${COMPOSITE({ name: 'jimmy', age: 42 })}
`

export const output = {
  text: `($1, $2)`,
  values: [42, 'jimmy'],
}
