import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'
import getUser, { setUser } from 'SRC/utils/getUser'
import logger from 'SRC/utils/logger'
// 登陆框是否可见
export function setVisible() {
  return {
    type: 'BASE@SET_VISIBLE'
  }
}
// 开始登陆请求
function loginWaiting() {
  return {
    type: 'BASE@LOGIN_WAITING'
  }
}
// 登陆结果返回后
function loginDone(value, userName) {
  const result = {
    error: value.status === 'fail',
    success: value.status === 'success',
    userName
  }
  if (result.success) {
    setUser(userName, 2)
  }
  return {
    type: 'BASE@LOGIN_DONE',
    result,
    value
  }
}
// 首页跳转到ask
export function goToAsk() {
  return {
    type: 'BASE@GO_TO_ASK'
  }
}
// 菜单显示/隐藏
export function setMenuShow(value) {
  return {
    type: 'BASE@SET_MENU_SHOW',
    value
  }
}
// 清空对话框状态
export function clearModal() {
  return {
    type: 'BASE@CLEAR_MODAL'
  }
}
// 登出
export function logout() {
  setUser('', -1)
  return {
    type: 'BASE@LOGOUT'
  }
}
// 登陆
export function login(userName, password) {
  return (dispatch) => {
    dispatch(loginWaiting())
    const bodyData = new FormData()
    bodyData.append('userName', userName)
    bodyData.append('password', password)
    return fetchPro(api('base:login'), {
      method: 'POST',
      body: bodyData
    }).then(response => response.json())
      .catch((e) => {
        logger.error(e)
      })
      .then(json => {
        console.log(json)
        return dispatch(loginDone(json, userName))
      })
  }
}
