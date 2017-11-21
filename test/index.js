
import 'babel-polyfill'

import assert from 'assert'
import fs from 'fs'
import { basename, extname, resolve } from 'path'

/**
 * Tests.
 */

describe('SQL', () => {
  const testsDir = resolve(__dirname, 'fixtures')
  const tests = fs.readdirSync(testsDir).filter(t => t[0] !== '.').map(t => basename(t, extname(t)))

  for (const test of tests) {
    it(test, async () => {
      const module = require(resolve(testsDir, test))
      const { input, output } = module
      assert.deepEqual(input.text, output.text)
      assert.deepEqual(input.values, output.values)
    })
  }
})
