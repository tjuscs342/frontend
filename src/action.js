export function persistentSet(key, value) {
  return {
    type: 'PERSISTENT@SET',
    key,
    value
  }
}
