function getCookie(name) { // eslint-disable-line
  const value = '; ' + document.cookie // eslint-disable-line
  const parts = value.split("; " + name + "=") // eslint-disable-line
  if (parts.length === 2) return parts.pop().split(';').shift()
}

export default function getUser() {
  const name = getCookie('productName_user') || ''
  return {
    name
  }
}
