export default function ask(host) {
  return {
    apply: `${host}/apply.do`,
    applyList: userName => `${host}/apply/${userName}`,
    modify: `${host}/apply/modify.do`
  }
}
