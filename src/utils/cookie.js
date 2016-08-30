export function getCookie(name) { // eslint-disable-line
  const value = '; ' + document.cookie // eslint-disable-line
  const parts = value.split("; " + name + "=") // eslint-disable-line
  if (parts.length === 2) return parts.pop().split(';').shift()
}

export function setCookie(name, value, hours) {
  const date = new Date()
  date.setTime(date.getTime() + Number(hours) * 3600 * 1000)
  document.cookie = `${name}=${value}; path=/;expires=${date.toGMTString()};`
}
