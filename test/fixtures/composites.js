
import { sql } from 'pg-sql'
import { COMPOSITES } from '../..'

export const input = sql`
  ${COMPOSITES({ name: 'jimmy', age: 42 })}
`

export const output = {
  text: `($1, $2)`,
  values: [42, 'jimmy'],
}
