import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'
import logger from 'SRC/utils/logger'

export function formSet(formCategory, formKey, values) {
  return {
    type: 'PUSH_PROMOTION@FORM_SET',
    formCategory,
    formKey,
    values,
    timestamp: new Date().getTime()
  }
}
// 移除一个标签
export function formDelete(formCategory, formKey, values) {
  return {
    type: 'PUSH_PROMOTION@FORM_DELETE',
    formCategory,
    formKey,
    values,
    timestamp: new Date().getTime()
  }
}

export function formReset() {
  return {
    type: 'PUSH_PROMOTION@FORM_RESET',
    timestamp: new Date().getTime()
  }
}
// 移除所有标签
export function formClear() {
  return {
    type: 'PUSH_PROMOTION@FORM_CLEAR',
    timestamp: new Date().getTime()
  }
}

export function clearSubmitState() {
  return {
    type: 'PUSH_PROMOTION@CLEAR_SUBMIT'
  }
}
/**
 * 操作触发计算用户数前将数字改成计算中
 */
export function userSetSizeLoading() {
  return {
    type: 'PUSH_PROMOTION@USER_SET_SIZE_LOADING'
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
        type: 'PUSH_PROMOTION@FORM_CONFIG',
        formCategory,
        formKey,
        api: url,
        data: json
      }))
  )
}
/**
 * 预估用户数 已弃用
 */
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
        type: 'PUSH_PROMOTION@PRE_SUBMIT',
        data: json
      }))
  }
}
/**
 * 实时获取用户数
 */
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
        type: 'PUSH_PROMOTION@USER_SET_SIZE',
        data: json
      }))
  }
}

export function submitUserSetData(data) {
  return (dispatch) => {
    const bodyData = new FormData()
    bodyData.append('data', data)
    return fetchPro(api('extractUserSet:pushPromotionSubmit'), {
      method: 'POST',
      body: bodyData
    }).then(response => response.json())
      .catch((e) => {
        logger.error(e)
        return { status: 'fail', result: -1 }
      })
      .then(json => (
        dispatch({
          type: 'PUSH_PROMOTION@SUBMIT',
          status: json.status,
          id: json.result
        })
      ))
  }
}
