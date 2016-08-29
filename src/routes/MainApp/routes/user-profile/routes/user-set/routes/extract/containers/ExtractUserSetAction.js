import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'
import logger from 'SRC/utils/logger'

export function formSet(formCategory, formKey, values) {
  return {
    type: 'USER_PROFILE@FORM_SET',
    formCategory,
    formKey,
    values,
    timestamp: new Date().getTime()
  }
}

export function formDelete(formCategory, formKey, values) {
  return {
    type: 'USER_PROFILE@FORM_DELETE',
    formCategory,
    formKey,
    values,
    timestamp: new Date().getTime()
  }
}

export function formReset() {
  return {
    type: 'USER_PROFILE@FORM_RESET',
    timestamp: new Date().getTime()
  }
}

export function formClear() {
  return {
    type: 'USER_PROFILE@FORM_CLEAR',
    timestamp: new Date().getTime()
  }
}

export function clearSubmitState() {
  return {
    type: 'USER_PROFILE@CLEAR_SUBMIT'
  }
}
/**
 * 操作触发计算用户数前将数字改成计算中
 */
export function userSetSizeLoading() {
  return {
    type: 'USER_PROFILE@USER_SET_SIZE_LOADING'
  }
}

/**

  Async Actions

*/

export function fetchFormConfig(formCategory, formKey, url) {
  return (dispatch/* , getState*/) => (
    fetchPro(api(url))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: null }))
      .then(json => dispatch({
        type: 'USER_PROFILE@FORM_CONFIG',
        formCategory,
        formKey,
        api: url,
        data: json
      }))
  )
}

export function fetchUserSetSize(data) {
  return (dispatch/* , getState*/) => {
    const bodyData = new FormData()
    bodyData.append('data', data)
    return fetchPro(api('extractUserSet:userSetPreSubmit'), {
      method: 'POST',
      body: bodyData
    }).then(response => response.json())
      .catch(() => ({ status: 'fail', result: -1 }))
      .then(json => dispatch({
        type: 'USER_PROFILE@PRE_SUBMIT',
        data: json
      }))
  }
}

export function fetchUserSetSizeQuick(data) {
  return (dispatch/* , getState*/) => {
    dispatch(userSetSizeLoading())
    const bodyData = new FormData()
    bodyData.append('data', data)
    return fetchPro(api('extractUserSet:userSetPreSubmit'), {
      method: 'POST',
      body: bodyData
    }).then(response => response.json())
      .catch(() => ({ status: 'fail', result: -1 }))
      .then(json => dispatch({
        type: 'USER_PROFILE@USER_SET_SIZE',
        data: json
      }))
  }
}

export function submitUserSetData(data) {
  return (dispatch) => {
    const bodyData = new FormData()
    bodyData.append('data', data)
    return fetchPro(api('extractUserSet:userSetSubmit'), {
      method: 'POST',
      body: bodyData
    }).then(response => response.json())
      .catch((e) => {
        logger.error(e)
        return { status: 'fail', result: -1 }
      })
      .then(json => (
        dispatch({
          type: 'USER_PROFILE@SUBMIT',
          status: json.status,
          id: json.result
        })
      ))
  }
}
