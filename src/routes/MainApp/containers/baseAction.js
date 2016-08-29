import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'
import getUser from 'SRC/utils/getUser'
import logger from 'SRC/utils/logger'
export function setMsgBoard() {
  return {
    type: 'BASE@SET_MSG_BOARD'
  }
}
function msgSubmitWaiting() {
  return {
    type: 'BASE@MSG_SUBMIT_WAITING'
  }
}
function msgSubmitDone(value) {
  const result = {
    error: value.status === 'fail',
    success: value.status === 'succ'
  }
  return {
    type: 'BASE@MSG_SUBMIT_DONE',
    result
  }
}
export function msgSubmit(text) {
  return (dispatch) => {
    dispatch(msgSubmitWaiting())
    const bodyData = new FormData()
    bodyData.append('user', getUser().name)
    bodyData.append('text', text)
    return fetchPro(api('base:sendEmail'), {
      method: 'POST',
      body: bodyData
    }).then(response => response.json())
      .catch((e) => {
        logger.error(e)
        return { status: 'fail', result: -1 }
      })
      .then(json => (
        dispatch(msgSubmitDone(json))
      ))
  }
}
