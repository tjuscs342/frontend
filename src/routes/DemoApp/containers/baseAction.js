import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'
import { setUser } from 'SRC/utils/getUser'
import logger from 'SRC/utils/logger'
export function setVisible() {
  return {
    type: 'BASE@SET_VISIBLE'
  }
}
function loginWaiting() {
  return {
    type: 'BASE@LOGIN_WAITING'
  }
}
function loginDone(value) {
  const result = {
    error: value.status === 'fail',
    success: value.status === 'succ'
  }
  if (result.success) {
    setUser(value.data.userName, 2)
  }
  return {
    type: 'BASE@LOGIN_DONE',
    result
  }
}
export function clearModal() {
  return {
    type: 'BASE@CLEAR_MODAL'
  }
}
export function logout() {
  setUser('', -1)
  return {
    type: 'BASE@LOGOUT'
  }
}
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
        return { status: 'fail', result: -1 }
      })
      .then(json => (
        dispatch(loginDone(json))
      ))
  }
}
