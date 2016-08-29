import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'
import getUser from 'SRC/utils/getUser'
import logger from 'SRC/utils/logger'
export function setVisible() {
  return {
    type: 'BASE@SET_VISIBLE'
  }
}
function loginWaiting() {
  return {
    type: 'LOGIN_WAITING'
  }
}
function loginDone(value) {
  const result = {
    error: value.status === 'fail',
    success: value.status === 'succ'
  }
  return {
    type: 'LOGIN_DONE',
    result
  }
}
export function login(text) {
  return (dispatch) => {
    dispatch(loginWaiting())
    const bodyData = new FormData()
    bodyData.append('user', getUser().name)
    bodyData.append('text', text)
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
