
import SQL from '../..'

export const input = SQL`${SQL.JOIN([
  SQL`one`,
  SQL`two`,
])}`

export const text = `one,two`

export const values = []
