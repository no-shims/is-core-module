/* eslint-disable node/prefer-global/process */
import data from '../core.json'

type Data = Record<string, string | string[] | boolean>

function specifierIncluded(current: string, specifier: string) {
  const nodeParts = current.split('.')
  const parts = specifier.split(' ')
  const op = parts.length > 1 ? parts[0] : '='
  const versionParts = (parts.length > 1 ? parts[1] : parts[0]).split('.')

  for (let i = 0; i < 3; ++i) {
    const cur = Number.parseInt(nodeParts[i] || '0', 10)
    const ver = Number.parseInt(versionParts[i] || '0', 10)
    if (cur === ver) {
      continue
    }
    if (op === '<') {
      return cur < ver
    }
    if (op === '>=') {
      return cur >= ver
    }
    return false
  }
  return op === '>='
}

function matchesRange(current: string, range: string) {
  const specifiers = range.split(/ ?&& ?/)
  if (specifiers.length === 0) {
    return false
  }
  for (const specifier of specifiers) {
    if (!specifierIncluded(current, specifier)) {
      return false
    }
  }
  return true
}

function versionIncluded(
  nodeVersion: string | undefined,
  specifierValue: Data[string],
) {
  if (typeof specifierValue === 'boolean') {
    return specifierValue
  }

  const current =
    typeof nodeVersion === 'undefined' && typeof process !== 'undefined'
      ? process.versions && process.versions.node
      : nodeVersion

  if (typeof current !== 'string') {
    throw new TypeError(
      typeof nodeVersion === 'undefined'
        ? 'Unable to determine current node version'
        : 'If provided, a valid node version is required',
    )
  }

  if (specifierValue && typeof specifierValue === 'object') {
    for (const element of specifierValue) {
      if (matchesRange(current, element)) {
        return true
      }
    }
    return false
  }
  return matchesRange(current, specifierValue)
}

export default function isCore(x: string, nodeVersion?: string) {
  return (
    Object.hasOwn(data, x) && versionIncluded(nodeVersion, (data as Data)[x])
  )
}
