# @no-shims/is-core-module <sup>[![Version Badge][2]][1]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![dependency status][5]][6]
[![dev dependency status][7]][8]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][11]][1]

Is this specifier a node.js core module? Optionally provide a node version to check; defaults to the current node version.

## Example

```js
import assert from 'node:assert'
import isCore from '@no-shims/is-core-module'

assert(isCore('fs'))
assert(!isCore('butts'))
```

## Tests

Clone the repo, `pnpm install`, and run `pnpm test`

[1]: https://npmjs.org/package/@no-shims/is-core-module
[2]: https://versionbadg.es/no-shims/is-core-module.svg
[5]: https://david-dm.org/no-shims/is-core-module.svg
[6]: https://david-dm.org/no-shims/is-core-module
[7]: https://david-dm.org/no-shims/is-core-module/dev-status.svg
[8]: https://david-dm.org/no-shims/is-core-module#info=devDependencies
[11]: https://nodei.co/npm/@no-shims/is-core-module.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/@no-shims/is-core-module.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/@no-shims/is-core-module.svg
[downloads-url]: https://npm-stat.com/charts.html?package=@no-shims/is-core-module
[codecov-image]: https://codecov.io/gh/no-shims/is-core-module/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/no-shims/is-core-module/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/no-shims/is-core-module
[actions-url]: https://github.com/no-shims/is-core-module/actions
