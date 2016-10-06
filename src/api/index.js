import demo from './demo.js'
import base from './base.js'
import ask from './ask.js'
import me from './me.js'
const apiMap = {
  demo,
  base,
  ask,
  me
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
