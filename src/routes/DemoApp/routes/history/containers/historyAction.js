import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'
import logger from 'SRC/utils/logger'

export function loadingBegin() {
  return {
    type: 'HISTORY@LOADING'
  }
}

export function loadingOver() {
  return {
    type: 'HISTORY@LOADING_OVER'
  }
}

export function loadTable() {
  return (dispatch) => {
    dispatch(loadingBegin())
    return fetchPro(api('ask:apply'), {
      // credentials: 'include'
    })
      .then(response => response.json())
      .catch((e) => logger.error(e))
      .then(json => {
        dispatch({
          type: 'HISTORY@LOAD_TABLE',
          value: json.status === 'success' ? json.data : []
        })
        dispatch(loadingOver())
      })
  }
}
