
# pg-sql

A simple, safe way to write powerful SQL queries in Javascript.

---

### Features

- Uses a simple, SQL-like syntax for string interpolation.
- Compatible with [`pg`]() and [`pg-promise`]() out of the box.
- Enables dynamic `WHERE`, `ORDER BY`, `INSERT`, `UPDATE`, ... clauses.
- Ensures that SQL queries are safe from SQL injection by default.
- Allows for raw (potentially unsafe!) SQL literal strings when needed.

---

### Example

In the simplest case, `pg-sql` will automatically handle Javascript interpolations in a safe way, constructing a query object...

```js
import SQL from 'pg-sql'

const userId = '1'
const query = SQL`
  SELECT id, name, age
  FROM users
  WHERE id = ${userId}
`

console.log(query)
```
```
{
  text: 'SELECT id, name, age\n  FROM users\n  WHERE id = $1',
  values: ['1'],
}
```

These query objects are supported out of the box by libraries like [`pg`]() and [`pg-promise`](), so that you can interpolate values in a safe way that prevents SQL injection.

But `pg-sql` also includes helpers to make dynamic cases, which are common when building APIs, easier.

For example, filtering with `WHERE` clauses...

```js
await pg.query(SQL`
  SELECT id, name, age
  FROM users
  ${SQL.WHERE({ name: 'john', age: { gt: 42 }})}
`)
```

...or inserting dynamic dictionaries of attributes...

```js
await pg.query(SQL`
  ${SQL.INSERT('users', { name: 'jenny', age: 42 })}
  RETURNING *
`)
```

...or ordering by a dynamic set of parameters...

```js
await pg.query(SQL`
  SELECT id, name, age
  FROM users
  ${SQL.ORDER_BY(['name', '-age'])}
`)
```

You can also import the helpers directly, to make it even more SQL-like...

```js
import SQL, { UPDATE, WHERE, ORDER_BY } from 'pg-sql'

function updateUser(userId, attributes) {
  return await pg.query(SQL`
    WITH updated_users AS (
      ${UPDATE('users', attributes)}
      RETURNING *
      ${WHERE({ id: userId })}
    )
    SELECT id, name, age
    FROM updated_users
    ${ORDER_BY(['name', '-age'])}
  `)
}
```

And the helpers are exported in both lower and upper cases, so you can match your existing case preferences for writing SQL...

```js
import SQL, { UPDATE, update } from 'pg-sql'

SQL`
  ${UPDATE('users', attributes)}
  RETURNING *
`

SQL`
  ${update('users', attributes)}
  returning *
`
```

That's it!

---

### Why?

There are tons of hotkey libraries, but they're often coupled to the view layer, or they bind events globally, or all kinds of weird things. You don't really want them to bind the events for you, you can do that yourself. 

Instead, you want to just check whether a single event matches a hotkey. And you want to define your hotkeys in the standard-but-non-trivial-to-parse syntax that everyone knows.

But most libraries don't expose their parsing logic. And even for the ones that do expose their hotkey parsing logic, pulling in an entire library just to check a hotkey string is overkill.

So... this is a simple and lightweight hotkey checker!

---

### API

- [`AND`](#and)
- [`IDENT`](#ident)
- [`INSERT`](#insert)
- [`JOIN`](#join)
- [`KEYS`](#keys)
- [`LIMIT`](#limit)
- [`LITERAL`](#literal)
- [`NAMED`](#named)
- [`OFFSET`](#offset)
- [`OR`](#or)
- [`ORDER_BY`](#order_by)
- [`UPDATE`](#update)
- [`VALUES`](#values)
- [`WHERE`](#where)

#### `AND`
`AND([ident: String], params: Object)`

```js
SQL`
  SELECT *
  FROM users
  WHERE name = 'John'
  ${AND({ age: { gt: 42 }})}
`
```

The same as the [`WHERE`](#where) helper, but the keyword will be `AND` instead. Useful when you've already got a hardcoded `WHERE` you need to augment.

#### `IDENT`
`IDENT(string: String)`

```js
SQL`
  SELECT *
  FROM ${IDENT('users')}
`
```

Outputs a `string` as an escaped SQL identifier. Useful when you need an identifier to be dynamic, because without using `IDENT` it will be treated as an interpolated value.

#### `JOIN`
`JOIN(fragments: Array, [delimiter: String])`

```js
const clauses = users.map(user => SQL`${user.id}`)

SQL`
  SELECT *
  FROM users
  WHERE id IN (${JOIN(clauses, ',')})
`
```

Joins multiple SQL `clauses` into one, with a `delimiter`. The `delimiter` defaults to `','`.

#### `KEYS`
`KEYS(attributes: Object|Array)`

```js
SQL`
  SELECT ${KEYS({ name: true, age: true })}
  FROM users
`
```

Extract and join the keys of `attributes` into a SQL string. Useful for building dynamic clauses like `SELECT`, `INSERT`, `UPDATE`, etc.

#### `LIMIT`
`LIMIT(number: Number)`

```js
SQL`
  SELECT id, name, age
  FROM users
  ${LIMIT(20)}
`
```

Safely create a literal SQL "LIMIT" clause from a dynamic `number`. Passing a non-number value will throw an error.

#### `LITERAL`
`LITERAL(string: String)`

```js
SQL`
  SELECT id, ${LITERAL(options.full ? 'first | \' \' | last', 'first, last')}
  FROM users
`
```

**CAUTION:** This method is not safe! You should not pass dynamic user input to it, because it does not guard against SQL injection.

Inserts a literal SQL value in the string, instead of an interpolated one. This can be useful when you need to control certain SQL statements based on pre-defined options, but be careful because it is not safe.

#### `NAMED`
`NAMED(name: String)`

```js
SQL.NAMED('get_users')`
  SELECT id, name, age
  FROM users
`
```

Create a named SQL query object, instead of the default unnamed. This can be helpful in certain cases where named queries offer better performance.

#### `OFFSET`
`OFFSET(number: Number)`

```js
SQL`
  SELECT id, name, age
  FROM users
  LIMIT 10 ${OFFSET(20)}
`
```

Safely create a literal SQL "OFFSET" clause from a dynamic `number`. Passing a non-number value will throw an error.

#### `OR`
`OR([ident: String], params: Object)`

```js
SQL`
  SELECT *
  FROM users
  WHERE name = 'John'
  ${OR({ age: { gt: 42 }})}
`
```

The same as the [`WHERE`](#where) helper, but the keyword will be `OR` instead. Useful when you've already got a hardcoded `WHERE` you need to augment.

#### `ORDER_BY`
`ORDER_BY([table: String], params: Array)`

```js
SQL`
  SELECT *
  FROM users
  ${ORDER_BY(['name', '-age'])}
`
```

Create a SQL "ORDER BY" clause from an array of `params`. The params are column name identifiers. They default to `ASC NULLS LAST`, but can be prefixed with `'-'` to denote `DESC NULLS LAST`.

#### `UPDATE`
`UPDATE(table: String, attributes: Object|Array)`

```js
SQL`
  ${UPDATE('users', { name: 'john', age: 42 })}
  WHERE id = '1'
  RETURNING *
`
```

Create a SQL "UPDATE" clause from a set of `attributes`. Useful when writing dynamic updates based on attributes that may or may not be passed.

#### `VALUES`
`VALUES(attributes: Object|Array)`

```js
SQL`
  UPDATE users
  SET (name, age) = (${VALUES({ name: 'john', age: 42 })})
`
```

Extract and join the values of `attributes` into a SQL string. Useful for building dynamic clauses like `INSERT`, `UPDATE`, etc.

#### `WHERE`
`WHERE([table: String], params: Object)`

```js
SQL`
  SELECT * 
  FROM users
  ${WHERE({ age: { gte: 42 }})}
`
```

Create a SQL "WHERE" clause from a set of `params`, with optional `table` name string. Useful when writing dynamic filters based on parameters that may or may not be passed.

The parameters are nested objects with modifiers: 

|**Operator**|**SQL**|
|---|---|
|`eq`|`=`|
|`ne`|`!=`|
|`gt`|`>`|
|`gte`|`>=`|
|`lt`|`<`|
|`lte`|`<=`|

If a parameter value is not an object, it will be defaulted to `eq` and compared using `=`.

---

### License

This package is [MIT-licensed](./License.md).
