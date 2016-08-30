import { getCookie, setCookie } from 'SRC/utils/cookie.js'

export default function getUser() {
  const name = getCookie('productName_user') || ''
  return {
    name
  }
}

export function setUser(userName, time) {
  setCookie('productName_user', userName, time)
}
