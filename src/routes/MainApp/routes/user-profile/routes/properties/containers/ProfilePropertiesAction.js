import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'

import { SUBMIT_STATUS } from './ProfilePropertiesConstant'
import getUser from 'SRC/utils/getUser'

export function formSet(formCategory, values) {
  return {
    type: 'USER_PROFILE@PROPERTIES@FORM_SET',
    formCategory,
    values
  }
}

export function selectAll() {
  return {
    type: 'USER_PROFILE@PROPERTIES@FORM_SET_ALL'
  }
}

export function formDelete(category, values) {
  return {
    type: 'USER_PROFILE@PROPERTIES@FORM_DELETE',
    category,
    values
  }
}

export function formReset() {
  return {
    type: 'USER_PROFILE@PROPERTIES@FORM_RESET'
  }
}

export function formClear() {
  return {
    type: 'USER_PROFILE@PROPERTIES@FORM_CLEAR'
  }
}

export function submitStatusChange(status) {
  return {
    type: 'USER_PROFILE@PROPERTIES@SUBMIT_STATUS_CHANGE',
    submitStatus: status
  }
}

/**

  Async Actions

*/

export function fetchAllProperties() {
  return (dispatch) => (
    fetchPro(api('properties:getAllProperties'))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: [] }))
      .then(json => dispatch({
        type: 'USER_PROFILE@PROPERTIES@PULL',
        data: json
      }))
  )
}

export function submitAllProperties(id, tags) {
  const bodyData = new FormData()
  bodyData.append('id', id)
  bodyData.append('tags', tags)
  bodyData.append('user', getUser().name)
  return (dispatch/* , getState*/) => {
    dispatch(submitStatusChange(SUBMIT_STATUS.submit))
    return fetchPro(api('properties:submitAllProperties'), {
      method: 'POST',
      body: bodyData
    })
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: -1 }))
      .then(json => dispatch({
        type: 'USER_PROFILE@PROPERTIES@PUSH',
        data: json
      }))
  }
}
