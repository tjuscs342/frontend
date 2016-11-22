import demo from './demo.js'
import base from './base.js'
import ask from './ask.js'
import me from './me.js'

const host = 'http://10.235.110.31:8888/attendence-system'
const baseObj = base(host)
const askObj = ask(host)
const meObj = me(host)
const apiMap = {
  demo,
  base: baseObj,
  ask: askObj,
  me: meObj
}

const api = (path, ...args) => {
  const [key, value] = path.split(':')
  if (typeof apiMap[key][value] === 'string') {
    return apiMap[key][value]
  }
  try {
    return apiMap[key][value](...args)
  } catch (e) {
    console.error('SRC/api', path)
    console.error(e)
    return ''
  }
}

export default api
export function getHost() {
  return host
}
