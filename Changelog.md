
### `0.3.0` — December 10, 2018

###### NEW

**Added the `ROW` helper.** This new helper is for lower-level concerns, like constructing an `UPDATE` helper. But it can sometimes be useful to write an inline row expression.

```js
ROW({ id: 'a', name: 'Bob' })
// ROW ($1, $2)
// ['a', 'Bob']
```

###### BREAKING

**Renamed the `KEYS` helper to `COLUMNS`.** This is to better match up with the SQL specification for naming, since it was always used to create a list of column names.

**Changed the `VALUES` helper to return a string with `"VALUES"` in it.** Previously the `VALUES` helper was a lower-level helper for returning a list of values concatenated. But this was confusing since "VALUES" is a concept in SQL. Now it returns a full `VALUES` statement exactly as you'd expect:

```js
VALUES([{ id: 'a' }, { id: 'b' }])
// VALUES ($1), ($2)
// ['a', 'b']

---

### `0.2.1` — November 27, 2018

###### NEW

**Added the `COLUMN` and `SORT` helpers.** These are lower level than the existing `ORDER_BY` helper and can be useful when you need to construct more complex `ORDER BY` clauses from different tables.

```js
COLUMN('users', 'name')
// `"users"."name"`
```
```js
SORT('users', '-name')
// "users"."name" DESC NULLS LAST
```

---

### `0.2.0` — November 26, 2018

###### BREAKING

**The `VALUES` and `KEYS` helpers now always use alphabetical order.** Previously they respected the order of the object definition itself, but this is error prone, especially when inserting or updating multiple values at once.

###### NEW

**The `VALUES` helper will now error when multiple values have different columns.** Previously it would silently fail when Postgres errored out because of a column mismatch, or it would silently succeed but with corruped data if the columns didn't line up. Usually this is not an issue, since you're most often creating an array of inserts in a loop.

---

### `0.1.0` — November 21, 2017

:sparkles: