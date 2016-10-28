import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'
import logger from 'SRC/utils/logger'

export function hiddenModal() {
  return {
    type: 'ASK@HIDDEN_MODAL'
  }
}

export function submit(value) {
  return (dispatch) => {
    // dispatch({
    //   type: 'ASK@SUBMIT_LOADING'
    // })
    const formData = new FormData()
    formData.append('type', value.type)
    formData.append('reason', value.reason)
    formData.append('handOver', value.handOver)
    formData.append('start', value.start)
    formData.append('end', value.end)

    return fetchPro(api('ask:apply'), {
      method: 'POST',
      credentials: 'include',
      body: formData
    }).then(response => response.json())
      .catch((e) => {
        logger.error(e)
      })
      .then(json => {
        console.log('json', json)
        dispatch({
          type: 'ASK@SUBMIT_DONE',
          value: json
        })
      })
  }
}
