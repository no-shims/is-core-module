# @no-shims/is-core-module [![npm](https://img.shields.io/npm/v/@no-shims/is-core-module.svg)](https://npmjs.com/package/@no-shims/is-core-module)

[![Unit Test](https://github.com/no-shims/is-core-module/actions/workflows/unit-test.yml/badge.svg)](https://github.com/no-shims/is-core-module/actions/workflows/unit-test.yml)

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

## License

[MIT](./LICENSE) License © 2024 [no-shims](https://github.com/no-shims)

[MIT](./LICENSE-original) License © 2014 Dave Justice
