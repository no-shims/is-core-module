import process from 'node:process'
import { createRequire } from 'node:module'
import semver from 'semver'
import { describe, expect, test } from 'vitest'
import isCore from '../src'
import data from '../core.json'

const require = createRequire(import.meta.url)
const supportsNodePrefix = semver.satisfies(
  process.versions.node,
  '^14.18 || >= 16',
  { includePrerelease: true },
)

describe('core modules', () => {
  test('isCore()', () => {
    expect(isCore('fs')).toBe(true)
    expect(isCore('net')).toBe(true)
    expect(isCore('http')).toBe(true)

    expect(!isCore('seq')).toBe(true)
    expect(!isCore('../')).toBe(true)

    expect(!isCore('toString')).toBe(true)
  })

  test('core list', () => {
    const cores = Object.keys(data)
    for (const mod of cores) {
      const requireFunc = () => require(mod)
      if (isCore(mod)) {
        expect(
          requireFunc,
          `${mod} supported; requiring does not throw`,
        ).not.toThrow()
      } else {
        expect(requireFunc, `${mod} not supported; requiring throws`).throws()
      }
    }
  })

  test('core via repl module', { skip: !data.repl }, (st) => {
    const libs = require('node:repl')._builtinLibs as string[]
    if (!libs) {
      // repl._builtinLibs does not exist
      st.skip()
    } else {
      for (const mod of libs) {
        expect(data[mod]).toBeTruthy()
        expect(
          () => require(mod),
          `requiring ${mod} does not throw`,
        ).not.throw()
        if (mod.slice(0, 5) !== 'node:') {
          if (supportsNodePrefix) {
            expect(
              () => require(`node:${mod}`),
              `requiring node:${mod} does not throw`,
            ).not.throw()
          } else {
            expect(
              () => require(`node:${mod}`),
              `requiring node:${mod} throws`,
            ).not.throw()
          }
        }
      }
    }
  })

  test('core via builtinModules list', { skip: !data.module }, (st) => {
    let libs = require('node:module').builtinModules as string[]
    if (!libs) {
      // module.builtinModules does not exist
      st.skip()
    } else {
      const excludeList = [
        '_debug_agent',
        'v8/tools/tickprocessor-driver',
        'v8/tools/SourceMap',
        'v8/tools/tickprocessor',
        'v8/tools/profile',
      ]
      // see https://github.com/nodejs/node/issues/42785
      if (semver.satisfies(process.version, '>= 18')) {
        libs = [...libs, 'node:test']
      }
      for (const mod of libs) {
        if (!excludeList.includes(mod)) {
          expect(data[mod], `${mod} is a core module`).toBeTruthy()
          expect(
            () => require(mod),
            `requiring ${mod} does not throw`,
          ).not.throw()
          if (mod.slice(0, 5) !== 'node:') {
            if (supportsNodePrefix) {
              expect(
                () => require(`node:${mod}`),
                `requiring node:${mod} does not throw`,
              ).not.throw()
            } else {
              expect(
                () => require(`node:${mod}`),
                `requiring node:${mod} throws`,
              )
            }
          }
        }
      }
    }
  })

  test('Object.prototype pollution', (context) => {
    const nonKey = 'not a core module'

    context.onTestFinished(() => {
      // @ts-expect-error
      delete Object.prototype.fs
      // @ts-expect-error
      delete Object.prototype.path
      // @ts-expect-error
      delete Object.prototype.http
      delete Object.prototype[nonKey]
    })

    // @ts-expect-error
    Object.prototype.fs = true
    // @ts-expect-error
    Object.prototype.path = '>= 999999999'
    // @ts-expect-error
    Object.prototype.http = data.http
    Object.prototype[nonKey] = true

    expect(
      isCore('fs'),
      'fs is a core module even if Object.prototype lies',
    ).toBe(true)
    expect(
      isCore('path'),
      'path is a core module even if Object.prototype lies',
    ).toBe(true)
    expect(
      isCore('http'),
      'path is a core module even if Object.prototype matches data',
    ).toBe(true)
    expect(
      isCore(nonKey),
      `"${nonKey}" is not a core module even if Object.prototype lies`,
    ).toBe(false)
  })
})
