export function encodeName(name) {
  return `__scroll__${name}`
}

export function decodeName(name) {
  return name.replace(/__scroll__/, '')
}

// export function scrollTo(name, wrapper) {
//   const topPos = document.getElementById(encodeName(name)).offsetTop
//   if (wrapper) {
//     document.getElementById(encodeName(wrapper)).scrollTop = topPos
//   } else {
//     window.scroll(0, topPos)
//   }
// }
